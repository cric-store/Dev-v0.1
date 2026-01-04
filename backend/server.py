from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from supabase import create_client, Client
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (keeping for backward compatibility)
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Supabase connection
supabase_url = os.environ.get('SUPABASE_URL')
supabase_key = os.environ.get('SUPABASE_SERVICE_KEY')
supabase: Client = create_client(supabase_url, supabase_key)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Customer Info Model for Guest Checkout
class CustomerInfo(BaseModel):
    full_name: str
    email: str
    phone: Optional[str] = None
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    province: str
    postal_code: str
    country: str = "CA"

# Cart Item Model
class CartItem(BaseModel):
    product_id: str
    name: str
    price: float  # Price in dollars
    quantity: int
    image: Optional[str] = None
    sku: Optional[str] = None

# Checkout Request with Customer Info
class CheckoutRequest(BaseModel):
    cart_items: List[CartItem]
    customer: CustomerInfo
    origin_url: str
    delivery_method: str = "shipping"  # 'shipping' or 'pickup'

class CheckoutResponse(BaseModel):
    checkout_url: str
    session_id: str
    order_id: str

# Payment Models
class PaymentTransaction(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    amount: float
    currency: str
    status: str = "pending"
    payment_status: str = "pending"
    metadata: Optional[Dict[str, str]] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


def dollars_to_cents(dollars: float) -> int:
    """Convert dollars to cents for database storage"""
    return int(round(dollars * 100))


def cents_to_dollars(cents: int) -> float:
    """Convert cents to dollars for display"""
    return cents / 100


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ==================== SUPABASE CUSTOMER & ORDER ENDPOINTS ====================

@api_router.post("/checkout", response_model=CheckoutResponse)
async def create_checkout(request: Request, checkout_data: CheckoutRequest):
    """Create a Stripe checkout session with customer info saved to Supabase"""
    try:
        # Validate cart
        if not checkout_data.cart_items:
            raise HTTPException(status_code=400, detail="Cart is empty")
        
        # Calculate totals in cents
        subtotal_cents = 0
        order_items = []
        item_names = []
        
        for item in checkout_data.cart_items:
            unit_price_cents = dollars_to_cents(item.price)
            line_total_cents = unit_price_cents * item.quantity
            subtotal_cents += line_total_cents
            item_names.append(item.name)
            
            order_items.append({
                "product_id": item.product_id,
                "product_name": item.name,
                "sku": item.sku,
                "quantity": item.quantity,
                "unit_price_cents": unit_price_cents,
                "line_total_cents": line_total_cents
            })
        
        # For now, shipping and tax are 0 (free shipping)
        shipping_cents = 0
        tax_cents = 0
        discount_cents = 0
        total_cents = subtotal_cents + shipping_cents + tax_cents - discount_cents
        
        if total_cents <= 0:
            raise HTTPException(status_code=400, detail="Invalid cart total")
        
        # Get Stripe API key
        api_key = os.environ.get('STRIPE_API_KEY')
        if not api_key:
            raise HTTPException(status_code=500, detail="Payment service not configured")
        
        # Generate order ID
        order_id = str(uuid.uuid4())
        customer_id = None
        
        # Step 1: Create or update customer in Supabase
        try:
            # Check if customer exists by email
            existing_customer = supabase.table("customers").select("id").eq("email", checkout_data.customer.email).execute()
            
            customer_data = {
                "full_name": checkout_data.customer.full_name,
                "email": checkout_data.customer.email,
                "phone": checkout_data.customer.phone,
                "address_line1": checkout_data.customer.address_line1,
                "address_line2": checkout_data.customer.address_line2,
                "city": checkout_data.customer.city,
                "province": checkout_data.customer.province,
                "postal_code": checkout_data.customer.postal_code,
                "country": checkout_data.customer.country
            }
            
            if existing_customer.data:
                # Update existing customer
                customer_id = existing_customer.data[0]["id"]
                supabase.table("customers").update(customer_data).eq("id", customer_id).execute()
                logger.info(f"Customer updated: {checkout_data.customer.email}")
            else:
                # Create new customer
                customer_result = supabase.table("customers").insert(customer_data).execute()
                customer_id = customer_result.data[0]["id"] if customer_result.data else None
                logger.info(f"Customer created: {checkout_data.customer.email}")
                
        except Exception as e:
            logger.warning(f"Could not save customer to Supabase: {e}")
            customer_id = None
        
        # Build URLs from provided origin
        origin_url = checkout_data.origin_url.rstrip('/')
        success_url = f"{origin_url}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}&order_id={order_id}"
        cancel_url = f"{origin_url}/cart"
        
        # Initialize Stripe checkout
        host_url = str(request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)
        
        # Create checkout session (Stripe expects amount in dollars)
        total_dollars = cents_to_dollars(total_cents)
        checkout_request = CheckoutSessionRequest(
            amount=total_dollars,
            currency="cad",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "source": "cric_store",
                "order_id": order_id,
                "customer_email": checkout_data.customer.email,
                "items": ", ".join(item_names[:5]),
                "item_count": str(len(checkout_data.cart_items))
            }
        )
        
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Step 2: Create order in Supabase
        try:
            order_data = {
                "id": order_id,
                "customer_id": customer_id,
                "customer_email": checkout_data.customer.email,
                "customer_phone": checkout_data.customer.phone,
                "status": "pending",
                "delivery_method": checkout_data.delivery_method,
                # Shipping address
                "ship_full_name": checkout_data.customer.full_name,
                "ship_phone": checkout_data.customer.phone,
                "ship_address_line1": checkout_data.customer.address_line1,
                "ship_address_line2": checkout_data.customer.address_line2,
                "ship_city": checkout_data.customer.city,
                "ship_province": checkout_data.customer.province,
                "ship_postal_code": checkout_data.customer.postal_code,
                "ship_country": checkout_data.customer.country,
                # Amounts in cents
                "currency": "CAD",
                "subtotal_cents": subtotal_cents,
                "shipping_cents": shipping_cents,
                "tax_cents": tax_cents,
                "discount_cents": discount_cents,
                "total_cents": total_cents,
                # Stripe
                "stripe_checkout_session_id": session.session_id,
                # JSON snapshot of items
                "items_json": order_items
            }
            
            supabase.table("orders").insert(order_data).execute()
            logger.info(f"Order created in Supabase: {order_id}")
            
            # Step 3: Create order items in Supabase
            for item in order_items:
                item_data = {
                    "order_id": order_id,
                    "product_id": item["product_id"],
                    "product_name": item["product_name"],
                    "sku": item["sku"],
                    "quantity": item["quantity"],
                    "unit_price_cents": item["unit_price_cents"],
                    "line_total_cents": item["line_total_cents"]
                }
                supabase.table("order_items").insert(item_data).execute()
            
            logger.info(f"Order items created for order: {order_id}")
            
        except Exception as e:
            logger.error(f"Could not save order to Supabase: {e}")
            # Fallback to MongoDB
            await db.orders.insert_one({
                "id": order_id,
                "customer_email": checkout_data.customer.email,
                "total_cents": total_cents,
                "items": order_items,
                "stripe_session_id": session.session_id,
                "status": "pending",
                "created_at": datetime.now(timezone.utc).isoformat()
            })
        
        # Also save to MongoDB for backup
        transaction = PaymentTransaction(
            session_id=session.session_id,
            amount=total_dollars,
            currency="cad",
            status="initiated",
            payment_status="pending",
            metadata={"order_id": order_id, "customer_email": checkout_data.customer.email}
        )
        doc = transaction.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        doc['updated_at'] = doc['updated_at'].isoformat()
        await db.payment_transactions.insert_one(doc)
        
        logger.info(f"Checkout session created: {session.session_id}")
        
        return CheckoutResponse(
            checkout_url=session.url,
            session_id=session.session_id,
            order_id=order_id
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating checkout: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create checkout: {str(e)}")


@api_router.get("/checkout/status/{session_id}")
async def get_checkout_status(request: Request, session_id: str):
    """Get the status of a checkout session"""
    try:
        api_key = os.environ.get('STRIPE_API_KEY')
        if not api_key:
            raise HTTPException(status_code=500, detail="Payment service not configured")
        
        host_url = str(request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)
        
        status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Update order status in Supabase
        if status.payment_status == "paid":
            try:
                supabase.table("orders").update({
                    "status": "paid"
                }).eq("stripe_checkout_session_id", session_id).execute()
                logger.info(f"Order updated to paid: {session_id}")
            except Exception as e:
                logger.warning(f"Could not update order in Supabase: {e}")
        
        # Update MongoDB as well
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {
                "$set": {
                    "status": status.status,
                    "payment_status": status.payment_status,
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        
        return {
            "session_id": session_id,
            "status": status.status,
            "payment_status": status.payment_status,
            "amount_total": status.amount_total,
            "currency": status.currency
        }
        
    except Exception as e:
        logger.error(f"Error getting checkout status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get status: {str(e)}")


@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events"""
    try:
        api_key = os.environ.get('STRIPE_API_KEY')
        if not api_key:
            raise HTTPException(status_code=500, detail="Payment service not configured")
        
        body = await request.body()
        signature = request.headers.get("Stripe-Signature")
        
        host_url = str(request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)
        
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        if webhook_response.session_id:
            # Update Supabase order
            if webhook_response.payment_status == "paid":
                try:
                    supabase.table("orders").update({
                        "status": "paid"
                    }).eq("stripe_checkout_session_id", webhook_response.session_id).execute()
                except Exception as e:
                    logger.warning(f"Could not update order in Supabase: {e}")
            
            # Update MongoDB
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {
                    "$set": {
                        "status": webhook_response.event_type,
                        "payment_status": webhook_response.payment_status,
                        "updated_at": datetime.now(timezone.utc).isoformat()
                    }
                }
            )
            logger.info(f"Webhook processed: {webhook_response.event_type} for session {webhook_response.session_id}")
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/orders")
async def get_orders():
    """Get all orders from Supabase"""
    try:
        result = supabase.table("orders").select("*, order_items(*)").order("created_at", desc=True).execute()
        # Convert cents to dollars for display
        orders = result.data
        for order in orders:
            order["subtotal"] = cents_to_dollars(order.get("subtotal_cents", 0))
            order["shipping"] = cents_to_dollars(order.get("shipping_cents", 0))
            order["tax"] = cents_to_dollars(order.get("tax_cents", 0))
            order["discount"] = cents_to_dollars(order.get("discount_cents", 0))
            order["total"] = cents_to_dollars(order.get("total_cents", 0))
        return orders
    except Exception as e:
        logger.error(f"Error getting orders from Supabase: {str(e)}")
        # Fallback to MongoDB
        transactions = await db.payment_transactions.find({}, {"_id": 0}).to_list(100)
        return transactions


@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    """Get a specific order by ID"""
    try:
        result = supabase.table("orders").select("*, order_items(*)").eq("id", order_id).execute()
        if result.data:
            order = result.data[0]
            # Convert cents to dollars for display
            order["subtotal"] = cents_to_dollars(order.get("subtotal_cents", 0))
            order["shipping"] = cents_to_dollars(order.get("shipping_cents", 0))
            order["tax"] = cents_to_dollars(order.get("tax_cents", 0))
            order["discount"] = cents_to_dollars(order.get("discount_cents", 0))
            order["total"] = cents_to_dollars(order.get("total_cents", 0))
            return order
        raise HTTPException(status_code=404, detail="Order not found")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting order: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/customers")
async def get_customers():
    """Get all customers from Supabase"""
    try:
        result = supabase.table("customers").select("*").order("created_at", desc=True).execute()
        return result.data
    except Exception as e:
        logger.error(f"Error getting customers: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
