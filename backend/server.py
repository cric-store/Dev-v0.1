from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from supabase import create_client, Client
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
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
    phone: str
    address: str
    city: str
    province: str
    postal_code: str
    country: str = "Canada"

# Cart Item Model
class CartItem(BaseModel):
    product_id: str
    name: str
    price: float
    quantity: int
    image: Optional[str] = None

# Checkout Request with Customer Info
class CheckoutRequest(BaseModel):
    cart_items: List[CartItem]
    customer: CustomerInfo
    origin_url: str

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
        
        # Calculate total amount
        total_amount = 0.0
        item_names = []
        order_items = []
        
        for item in checkout_data.cart_items:
            item_total = float(item.price) * int(item.quantity)
            total_amount += item_total
            item_names.append(item.name)
            order_items.append({
                "product_id": item.product_id,
                "name": item.name,
                "price": float(item.price),
                "quantity": int(item.quantity),
                "image": item.image
            })
        
        if total_amount <= 0:
            raise HTTPException(status_code=400, detail="Invalid cart total")
        
        # Get Stripe API key
        api_key = os.environ.get('STRIPE_API_KEY')
        if not api_key:
            raise HTTPException(status_code=500, detail="Payment service not configured")
        
        # Generate order ID
        order_id = str(uuid.uuid4())
        
        # Save customer to Supabase (upsert by email)
        customer_data = {
            "email": checkout_data.customer.email,
            "full_name": checkout_data.customer.full_name,
            "phone": checkout_data.customer.phone,
            "address": checkout_data.customer.address,
            "city": checkout_data.customer.city,
            "province": checkout_data.customer.province,
            "postal_code": checkout_data.customer.postal_code,
            "country": checkout_data.customer.country,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        try:
            # Try to upsert customer
            customer_result = supabase.table("customers").upsert(
                customer_data, 
                on_conflict="email"
            ).execute()
            customer_id = customer_result.data[0]["id"] if customer_result.data else None
            logger.info(f"Customer saved/updated: {checkout_data.customer.email}")
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
        
        # Create checkout session
        checkout_request = CheckoutSessionRequest(
            amount=total_amount,
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
        
        # Save order to Supabase
        order_data = {
            "id": order_id,
            "customer_email": checkout_data.customer.email,
            "customer_name": checkout_data.customer.full_name,
            "customer_phone": checkout_data.customer.phone,
            "shipping_address": f"{checkout_data.customer.address}, {checkout_data.customer.city}, {checkout_data.customer.province} {checkout_data.customer.postal_code}, {checkout_data.customer.country}",
            "items": order_items,
            "total_amount": total_amount,
            "currency": "CAD",
            "stripe_session_id": session.session_id,
            "status": "pending",
            "payment_status": "pending",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        try:
            supabase.table("orders").insert(order_data).execute()
            logger.info(f"Order created in Supabase: {order_id}")
        except Exception as e:
            logger.warning(f"Could not save order to Supabase: {e}")
            # Fallback to MongoDB
            await db.orders.insert_one(order_data)
        
        # Also save to MongoDB for backup
        transaction = PaymentTransaction(
            session_id=session.session_id,
            amount=total_amount,
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
                    "status": "completed",
                    "payment_status": "paid",
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }).eq("stripe_session_id", session_id).execute()
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
                        "status": "completed",
                        "payment_status": "paid",
                        "updated_at": datetime.now(timezone.utc).isoformat()
                    }).eq("stripe_session_id", webhook_response.session_id).execute()
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
        result = supabase.table("orders").select("*").order("created_at", desc=True).execute()
        return result.data
    except Exception as e:
        logger.error(f"Error getting orders from Supabase: {str(e)}")
        # Fallback to MongoDB
        transactions = await db.payment_transactions.find({}, {"_id": 0}).to_list(100)
        return transactions


@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    """Get a specific order by ID"""
    try:
        result = supabase.table("orders").select("*").eq("id", order_id).execute()
        if result.data:
            return result.data[0]
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
