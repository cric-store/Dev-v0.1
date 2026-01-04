"""
Backend API Tests for CricStore Checkout Flow
Tests: POST /api/checkout, GET /api/checkout/status/{session_id}
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Basic API health check"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Hello World"


class TestCheckoutAPI:
    """Stripe Checkout API tests"""
    
    def test_checkout_with_valid_cart(self):
        """Test POST /api/checkout with valid cart items"""
        payload = {
            "cart_items": [
                {
                    "product_id": "test-product-1",
                    "name": "Test Cricket Shoes",
                    "price": 199.99,
                    "quantity": 1
                }
            ],
            "origin_url": "https://bat-n-ball-3.preview.emergentagent.com"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/checkout",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Verify response structure
        assert "checkout_url" in data, "Response should contain checkout_url"
        assert "session_id" in data, "Response should contain session_id"
        
        # Verify checkout_url is a valid Stripe URL
        assert data["checkout_url"].startswith("https://checkout.stripe.com"), \
            f"checkout_url should be a Stripe URL, got: {data['checkout_url']}"
        
        # Verify session_id format
        assert data["session_id"].startswith("cs_"), \
            f"session_id should start with 'cs_', got: {data['session_id']}"
        
        return data["session_id"]
    
    def test_checkout_with_multiple_items(self):
        """Test POST /api/checkout with multiple cart items"""
        payload = {
            "cart_items": [
                {
                    "product_id": "test-product-1",
                    "name": "Cricket Spikes",
                    "price": 249.00,
                    "quantity": 1
                },
                {
                    "product_id": "test-product-2",
                    "name": "Cricket Rubber Studs",
                    "price": 179.00,
                    "quantity": 2
                }
            ],
            "origin_url": "https://bat-n-ball-3.preview.emergentagent.com"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/checkout",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert "checkout_url" in data
        assert "session_id" in data
        assert data["checkout_url"].startswith("https://checkout.stripe.com")
    
    def test_checkout_with_empty_cart(self):
        """Test POST /api/checkout with empty cart - should fail"""
        payload = {
            "cart_items": [],
            "origin_url": "https://bat-n-ball-3.preview.emergentagent.com"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/checkout",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Should return 400 for empty cart
        assert response.status_code == 400, f"Expected 400 for empty cart, got {response.status_code}"
    
    def test_checkout_with_invalid_item_format(self):
        """Test POST /api/checkout with invalid item format"""
        payload = {
            "cart_items": [
                {
                    "product_id": "test-product-1",
                    "name": "Test Product"
                    # Missing price and quantity
                }
            ],
            "origin_url": "https://bat-n-ball-3.preview.emergentagent.com"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/checkout",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Should return 400 for invalid format
        assert response.status_code == 400, f"Expected 400 for invalid format, got {response.status_code}"
    
    def test_checkout_missing_origin_url(self):
        """Test POST /api/checkout without origin_url"""
        payload = {
            "cart_items": [
                {
                    "product_id": "test-product-1",
                    "name": "Test Product",
                    "price": 99.99,
                    "quantity": 1
                }
            ]
            # Missing origin_url
        }
        
        response = requests.post(
            f"{BASE_URL}/api/checkout",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Should return 422 for missing required field
        assert response.status_code == 422, f"Expected 422 for missing origin_url, got {response.status_code}"


class TestCheckoutStatusAPI:
    """Checkout status API tests"""
    
    def test_checkout_status_with_valid_session(self):
        """Test GET /api/checkout/status/{session_id} with valid session"""
        # First create a checkout session
        payload = {
            "cart_items": [
                {
                    "product_id": "test-status-product",
                    "name": "Test Status Product",
                    "price": 99.99,
                    "quantity": 1
                }
            ],
            "origin_url": "https://bat-n-ball-3.preview.emergentagent.com"
        }
        
        create_response = requests.post(
            f"{BASE_URL}/api/checkout",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert create_response.status_code == 200
        session_id = create_response.json()["session_id"]
        
        # Now check the status
        status_response = requests.get(f"{BASE_URL}/api/checkout/status/{session_id}")
        
        assert status_response.status_code == 200, f"Expected 200, got {status_response.status_code}: {status_response.text}"
        data = status_response.json()
        
        # Verify response structure
        assert "session_id" in data
        assert "status" in data
        assert "payment_status" in data
        assert data["session_id"] == session_id
        
        # For a new session, status should be open and payment_status should be unpaid
        assert data["status"] in ["open", "complete", "expired"], f"Unexpected status: {data['status']}"
        assert data["payment_status"] in ["unpaid", "paid", "no_payment_required"], f"Unexpected payment_status: {data['payment_status']}"
    
    def test_checkout_status_with_invalid_session(self):
        """Test GET /api/checkout/status/{session_id} with invalid session"""
        invalid_session_id = "cs_invalid_session_12345"
        
        response = requests.get(f"{BASE_URL}/api/checkout/status/{invalid_session_id}")
        
        # Should return error status (500 or 520) as Stripe will fail to find the session
        assert response.status_code >= 500, f"Expected 5xx for invalid session, got {response.status_code}"


class TestOrdersAPI:
    """Orders API tests"""
    
    def test_get_orders(self):
        """Test GET /api/orders endpoint"""
        response = requests.get(f"{BASE_URL}/api/orders")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Should return a list
        assert isinstance(data, list), "Orders should be a list"


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
