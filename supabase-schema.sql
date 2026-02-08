-- =====================================================
-- DEALCASH AFFILIATE CASHBACK PLATFORM
-- Supabase Database Schema
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE (extends Supabase auth.users)
-- =====================================================
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    total_cashback DECIMAL(10, 2) DEFAULT 0.00,
    pending_cashback DECIMAL(10, 2) DEFAULT 0.00,
    withdrawn_cashback DECIMAL(10, 2) DEFAULT 0.00,
    referral_code TEXT UNIQUE,
    referred_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- STORES/BRANDS TABLE
-- =====================================================
CREATE TABLE public.stores (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    banner_url TEXT,
    category TEXT NOT NULL,
    base_commission_rate DECIMAL(5, 2) NOT NULL, -- Commission we get from affiliate network (e.g., 8%)
    cashback_rate DECIMAL(5, 2) NOT NULL, -- Cashback we give to users (e.g., 5%)
    profit_rate DECIMAL(5, 2) GENERATED ALWAYS AS (base_commission_rate - cashback_rate) STORED,
    affiliate_network TEXT NOT NULL, -- awin, cj, impact, etc.
    affiliate_id TEXT NOT NULL, -- Advertiser ID in the network
    tracking_url TEXT NOT NULL, -- Base tracking URL template
    sale_badge TEXT, -- e.g., "50% OFF"
    offer_text TEXT, -- e.g., "Free Delivery"
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 0, -- For sorting popular brands
    total_clicks INTEGER DEFAULT 0,
    total_conversions INTEGER DEFAULT 0,
    total_commission_earned DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- CLICK TRACKING TABLE
-- =====================================================
CREATE TABLE public.clicks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE NOT NULL,
    click_id TEXT UNIQUE NOT NULL, -- Unique identifier for this click
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    clicked_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- TRANSACTIONS/PURCHASES TABLE
-- =====================================================
CREATE TABLE public.transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE NOT NULL,
    click_id UUID REFERENCES public.clicks(id),
    
    -- Transaction details
    transaction_id TEXT UNIQUE, -- ID from affiliate network
    order_id TEXT, -- Customer's order ID from retailer
    order_amount DECIMAL(10, 2) NOT NULL,
    
    -- Commission & Cashback calculation
    commission_rate DECIMAL(5, 2) NOT NULL, -- Rate at time of purchase
    commission_amount DECIMAL(10, 2) NOT NULL, -- Total commission we earn
    cashback_rate DECIMAL(5, 2) NOT NULL, -- Cashback rate given to user
    cashback_amount DECIMAL(10, 2) NOT NULL, -- Cashback given to user
    profit_amount DECIMAL(10, 2) GENERATED ALWAYS AS (commission_amount - cashback_amount) STORED,
    
    -- Status tracking
    status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, cancelled, paid
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    confirmation_date TIMESTAMP WITH TIME ZONE,
    payment_date TIMESTAMP WITH TIME ZONE,
    
    -- Affiliate network data
    network_status TEXT, -- Status from affiliate network
    network_updated_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    
    CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled', 'paid'))
);

-- =====================================================
-- WITHDRAWALS TABLE
-- =====================================================
CREATE TABLE public.withdrawals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    method TEXT NOT NULL, -- bank_transfer, paypal, etc.
    account_details JSONB, -- Encrypted account details
    status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    processed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    
    CONSTRAINT valid_withdrawal_status CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    CONSTRAINT minimum_withdrawal CHECK (amount >= 50.00)
);

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- BANNERS TABLE (for homepage slider)
-- =====================================================
CREATE TABLE public.banners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    link_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_referral_code ON public.users(referral_code);
CREATE INDEX idx_stores_slug ON public.stores(slug);
CREATE INDEX idx_stores_category ON public.stores(category);
CREATE INDEX idx_stores_active ON public.stores(is_active);
CREATE INDEX idx_clicks_user_id ON public.clicks(user_id);
CREATE INDEX idx_clicks_store_id ON public.clicks(store_id);
CREATE INDEX idx_clicks_click_id ON public.clicks(click_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_store_id ON public.transactions(store_id);
CREATE INDEX idx_transactions_status ON public.transactions(status);
CREATE INDEX idx_transactions_date ON public.transactions(transaction_date);
CREATE INDEX idx_withdrawals_user_id ON public.withdrawals(user_id);
CREATE INDEX idx_withdrawals_status ON public.withdrawals(status);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) Policies
-- =====================================================

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Stores are publicly readable
CREATE POLICY "Stores are viewable by everyone" ON public.stores
    FOR SELECT USING (is_active = true);

-- Users can view their own clicks
CREATE POLICY "Users can view own clicks" ON public.clicks
    FOR SELECT USING (auth.uid() = user_id);

-- Users can view their own transactions
CREATE POLICY "Users can view own transactions" ON public.transactions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can view and create their own withdrawals
CREATE POLICY "Users can view own withdrawals" ON public.withdrawals
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create withdrawals" ON public.withdrawals
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Categories and banners are publicly readable
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Banners are viewable by everyone" ON public.banners
    FOR SELECT USING (is_active = true);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON public.stores
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON public.transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
    NEW.referral_code = UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_referral_code BEFORE INSERT ON public.users
    FOR EACH ROW WHEN (NEW.referral_code IS NULL)
    EXECUTE FUNCTION generate_referral_code();

-- Function to update user cashback balance
CREATE OR REPLACE FUNCTION update_user_cashback()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'confirmed' AND OLD.status = 'pending' THEN
        -- Move from pending to confirmed
        UPDATE public.users
        SET 
            pending_cashback = pending_cashback - NEW.cashback_amount,
            total_cashback = total_cashback + NEW.cashback_amount
        WHERE id = NEW.user_id;
        
        NEW.confirmation_date = TIMEZONE('utc', NOW());
    ELSIF NEW.status = 'cancelled' THEN
        -- Remove from pending if cancelled
        UPDATE public.users
        SET pending_cashback = pending_cashback - NEW.cashback_amount
        WHERE id = NEW.user_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cashback_on_status_change
    BEFORE UPDATE ON public.transactions
    FOR EACH ROW
    WHEN (OLD.status IS DISTINCT FROM NEW.status)
    EXECUTE FUNCTION update_user_cashback();

-- Function to add pending cashback on transaction creation
CREATE OR REPLACE FUNCTION add_pending_cashback()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.users
    SET pending_cashback = pending_cashback + NEW.cashback_amount
    WHERE id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_pending_cashback_on_transaction
    AFTER INSERT ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION add_pending_cashback();

-- =====================================================
-- SAMPLE DATA (for testing)
-- =====================================================

-- Insert sample categories
INSERT INTO public.categories (name, slug, icon, display_order) VALUES
('Fashion', 'fashion', '👗', 1),
('Electronics', 'electronics', '📱', 2),
('Home & Garden', 'home-garden', '🏠', 3),
('Beauty', 'beauty', '💄', 4),
('Sports', 'sports', '⚽', 5),
('Travel', 'travel', '✈️', 6),
('Food & Drink', 'food-drink', '🍔', 7),
('Books', 'books', '📚', 8);

-- Insert sample stores (Replace with real affiliate data)
INSERT INTO public.stores (name, slug, description, logo_url, category, base_commission_rate, cashback_rate, affiliate_network, affiliate_id, tracking_url, sale_badge, offer_text, priority) VALUES
(
    'Amazon UK',
    'amazon-uk',
    'Everything you need, from A to Z',
    'https://logo.clearbit.com/amazon.co.uk',
    'Electronics',
    8.00,
    5.00,
    'awin',
    '1234',
    'https://www.awin1.com/cread.php?awinmid=1234&awinaffid=YOUR_AFFILIATE_ID&clickref=CLICK_ID&p=https://www.amazon.co.uk',
    '🔥 Hot',
    'Free delivery over £25',
    100
),
(
    'ASOS',
    'asos',
    'Discover fashion online',
    'https://logo.clearbit.com/asos.com',
    'Fashion',
    10.00,
    7.00,
    'awin',
    '5678',
    'https://www.awin1.com/cread.php?awinmid=5678&awinaffid=YOUR_AFFILIATE_ID&clickref=CLICK_ID&p=https://www.asos.com',
    '70% OFF',
    'Up to 70% off sale',
    90
),
(
    'eBay',
    'ebay',
    'Buy and sell electronics, fashion, and more',
    'https://logo.clearbit.com/ebay.co.uk',
    'Electronics',
    6.00,
    4.00,
    'awin',
    '9012',
    'https://www.awin1.com/cread.php?awinmid=9012&awinaffid=YOUR_AFFILIATE_ID&clickref=CLICK_ID&p=https://www.ebay.co.uk',
    NULL,
    'Free postage',
    85
);

-- Insert sample banners
INSERT INTO public.banners (title, image_url, display_order, is_active) VALUES
('Summer Sale', 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=400&fit=crop', 1, true),
('Tech Deals', 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1400&h=400&fit=crop', 2, true),
('Fashion Week', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=400&fit=crop', 3, true);

-- =====================================================
-- ADMIN FUNCTIONS
-- =====================================================

-- View to see store performance
CREATE OR REPLACE VIEW store_performance AS
SELECT 
    s.id,
    s.name,
    s.category,
    s.total_clicks,
    s.total_conversions,
    CASE WHEN s.total_clicks > 0 
        THEN ROUND((s.total_conversions::DECIMAL / s.total_clicks * 100), 2)
        ELSE 0 
    END as conversion_rate,
    s.total_commission_earned,
    COUNT(t.id) as transaction_count,
    SUM(t.cashback_amount) as total_cashback_paid
FROM public.stores s
LEFT JOIN public.transactions t ON s.id = t.store_id
GROUP BY s.id;

-- View to see top earning users
CREATE OR REPLACE VIEW top_users AS
SELECT 
    u.id,
    u.email,
    u.full_name,
    u.total_cashback,
    u.pending_cashback,
    u.withdrawn_cashback,
    COUNT(t.id) as transaction_count,
    u.created_at
FROM public.users u
LEFT JOIN public.transactions t ON u.id = t.user_id
GROUP BY u.id
ORDER BY u.total_cashback DESC;
