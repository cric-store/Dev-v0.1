-- Supabase Database Schema for CricStore
-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard)

-- =============================================
-- CUSTOMERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    province TEXT,
    postal_code TEXT,
    country TEXT DEFAULT 'Canada',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers(email);

-- =============================================
-- ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY,
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    customer_phone TEXT,
    shipping_address TEXT,
    items JSONB NOT NULL DEFAULT '[]',
    total_amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'CAD',
    stripe_session_id TEXT,
    status TEXT DEFAULT 'pending',
    payment_status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON public.orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- =============================================
-- PRODUCTS TABLE (Optional - for future use)
-- =============================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    brand TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount INTEGER DEFAULT 0,
    stock INTEGER DEFAULT 0,
    in_stock BOOLEAN DEFAULT true,
    category TEXT,
    images JSONB DEFAULT '[]',
    features JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on tables
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access to customers
CREATE POLICY "Service role has full access to customers"
ON public.customers
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy: Allow service role full access to orders
CREATE POLICY "Service role has full access to orders"
ON public.orders
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy: Allow anyone to view products
CREATE POLICY "Anyone can view products"
ON public.products
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy: Only service role can modify products
CREATE POLICY "Service role can modify products"
ON public.products
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for customers
DROP TRIGGER IF EXISTS update_customers_updated_at ON public.customers;
CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for orders
DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for products
DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SAMPLE DATA (Optional)
-- =============================================
-- Uncomment to insert sample products
/*
INSERT INTO public.products (name, description, brand, price, original_price, discount, stock, in_stock, category, images, features)
VALUES 
    ('SG Cricket Bat', 'Premium English Willow bat', 'SG', 299.99, 349.99, 14, 10, true, 'cricket-bats', '["https://example.com/bat1.jpg"]', '["English Willow", "Full Size", "Lightweight"]'),
    ('Cricket Helmet', 'Professional grade helmet', 'Masuri', 149.99, 179.99, 17, 5, true, 'helmets', '["https://example.com/helmet1.jpg"]', '["Steel Grill", "Adjustable Fit", "Ventilated"]');
*/
