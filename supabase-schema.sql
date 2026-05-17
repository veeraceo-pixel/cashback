-- =====================================================
-- SMARTCASH AI-POWERED CASHBACK PLATFORM
-- Complete Supabase Schema v2.0
-- Features: AI Recommendations, Price Tracking, Order Sync,
--           Gamification, Smart Alerts, Browser Extension Support
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search

-- =====================================================
-- USERS TABLE (extends Supabase auth.users)
-- =====================================================
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    
    -- Cashback balances
    total_cashback DECIMAL(10, 2) DEFAULT 0.00,
    pending_cashback DECIMAL(10, 2) DEFAULT 0.00,
    withdrawn_cashback DECIMAL(10, 2) DEFAULT 0.00,
    
    -- Gamification
    xp_points INTEGER DEFAULT 0,
    level TEXT DEFAULT 'Bronze', -- Bronze, Silver, Gold, Platinum, Diamond
    streak_days INTEGER DEFAULT 0,
    last_activity_date DATE,
    badges JSONB DEFAULT '[]',
    
    -- AI Preferences (learned from behavior)
    preferred_categories TEXT[] DEFAULT '{}',
    shopping_style TEXT DEFAULT 'balanced', -- deal-hunter, brand-loyal, convenience
    ai_persona_data JSONB DEFAULT '{}', -- AI model of user preferences
    
    -- Referral system
    referral_code TEXT UNIQUE,
    referred_by UUID REFERENCES public.users(id),
    referral_earnings DECIMAL(10, 2) DEFAULT 0.00,
    
    -- Amazon integration
    amazon_connected BOOLEAN DEFAULT false,
    amazon_last_sync TIMESTAMP WITH TIME ZONE,
    
    -- Notification preferences
    email_alerts BOOLEAN DEFAULT true,
    price_drop_alerts BOOLEAN DEFAULT true,
    cashback_rate_alerts BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    color TEXT DEFAULT '#FF6B6B',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    avg_cashback_rate DECIMAL(5,2) DEFAULT 0.00, -- computed periodically
    total_stores INTEGER DEFAULT 0
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
    website_url TEXT,
    category TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id),
    
    -- Commission structure
    base_commission_rate DECIMAL(5, 2) NOT NULL,
    cashback_rate DECIMAL(5, 2) NOT NULL,
    profit_rate DECIMAL(5, 2) GENERATED ALWAYS AS (base_commission_rate - cashback_rate) STORED,
    max_cashback_per_order DECIMAL(10, 2),
    
    -- Affiliate network info
    affiliate_network TEXT NOT NULL, -- awin, cj, impact, amazon_associates, etc.
    affiliate_id TEXT NOT NULL,
    tracking_url TEXT NOT NULL,
    
    -- SmartCash Exclusive features
    is_exclusive_deal BOOLEAN DEFAULT false,   -- We negotiated higher rates
    exclusive_cashback_rate DECIMAL(5, 2),     -- Higher exclusive rate
    has_price_tracking BOOLEAN DEFAULT false,  -- Price history available
    supports_order_sync BOOLEAN DEFAULT false, -- Can pull order data
    
    -- Badges & offers
    sale_badge TEXT,
    offer_text TEXT,
    featured_deal TEXT,
    
    -- Performance metrics
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    priority INTEGER DEFAULT 0,
    total_clicks INTEGER DEFAULT 0,
    total_conversions INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5, 2) DEFAULT 0.00,
    total_commission_earned DECIMAL(10, 2) DEFAULT 0.00,
    avg_order_value DECIMAL(10, 2) DEFAULT 0.00,
    user_rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INTEGER DEFAULT 0,
    
    -- SmartCash AI score (0-100)
    ai_recommendation_score DECIMAL(5, 2) DEFAULT 50.00,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- PRODUCTS TABLE (for price tracking)
-- =====================================================
CREATE TABLE public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
    external_product_id TEXT, -- ASIN for Amazon, product ID for others
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    product_url TEXT NOT NULL,
    affiliate_url TEXT,
    category TEXT,
    brand TEXT,
    
    -- Pricing
    current_price DECIMAL(10, 2),
    original_price DECIMAL(10, 2),
    lowest_price_ever DECIMAL(10, 2),
    highest_price_ever DECIMAL(10, 2),
    price_currency TEXT DEFAULT 'GBP',
    
    -- Cashback on this specific product
    cashback_rate DECIMAL(5, 2),
    cashback_amount DECIMAL(10, 2) GENERATED ALWAYS AS (
        CASE WHEN current_price IS NOT NULL AND cashback_rate IS NOT NULL
        THEN ROUND(current_price * cashback_rate / 100, 2)
        ELSE 0 END
    ) STORED,
    
    -- AI features
    ai_deal_score DECIMAL(5, 2) DEFAULT 50.00, -- 0-100 how good is this deal
    price_trend TEXT DEFAULT 'stable', -- rising, falling, stable, volatile
    predicted_price_next_week DECIMAL(10, 2),
    buy_recommendation TEXT DEFAULT 'neutral', -- buy_now, wait, neutral
    
    is_tracked BOOLEAN DEFAULT true,
    last_price_check TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- PRICE HISTORY TABLE
-- =====================================================
CREATE TABLE public.price_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL,
    cashback_rate DECIMAL(5, 2),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    source TEXT DEFAULT 'scraper' -- scraper, manual, api
);

-- =====================================================
-- PRICE ALERTS TABLE
-- =====================================================
CREATE TABLE public.price_alerts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    target_price DECIMAL(10, 2),         -- Alert when price drops below this
    cashback_rate_threshold DECIMAL(5,2), -- Alert when cashback rises above this
    alert_type TEXT DEFAULT 'price_drop', -- price_drop, cashback_rise, back_in_stock
    is_active BOOLEAN DEFAULT true,
    triggered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- WISHLISTS TABLE
-- =====================================================
CREATE TABLE public.wishlists (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(user_id, product_id)
);

-- =====================================================
-- CLICK TRACKING TABLE
-- =====================================================
CREATE TABLE public.clicks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    click_id TEXT UNIQUE NOT NULL,
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    device_type TEXT DEFAULT 'web', -- web, mobile, extension
    clicked_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- TRANSACTIONS TABLE
-- =====================================================
CREATE TABLE public.transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE NOT NULL,
    click_id UUID REFERENCES public.clicks(id),
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    
    -- Transaction details
    transaction_id TEXT UNIQUE,
    order_id TEXT,
    order_amount DECIMAL(10, 2) NOT NULL,
    
    -- Product snapshot
    product_name TEXT,
    product_image TEXT,
    product_url TEXT,
    
    -- Cashback calculation
    commission_rate DECIMAL(5, 2) NOT NULL,
    commission_amount DECIMAL(10, 2) NOT NULL,
    cashback_rate DECIMAL(5, 2) NOT NULL,
    cashback_amount DECIMAL(10, 2) NOT NULL,
    profit_amount DECIMAL(10, 2) GENERATED ALWAYS AS (commission_amount - cashback_amount) STORED,
    
    -- Bonus cashback (gamification, referral, exclusive deals)
    bonus_cashback DECIMAL(10, 2) DEFAULT 0.00,
    bonus_reason TEXT,
    
    -- Status
    status TEXT NOT NULL DEFAULT 'pending',
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    confirmation_date TIMESTAMP WITH TIME ZONE,
    payment_date TIMESTAMP WITH TIME ZONE,
    
    -- Amazon order sync data
    amazon_order_id TEXT,
    amazon_asin TEXT,
    synced_from_amazon BOOLEAN DEFAULT false,
    
    -- Affiliate network data
    network_status TEXT,
    network_updated_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    
    CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled', 'paid'))
);

-- =====================================================
-- AMAZON ORDERS SYNC TABLE
-- Stores order data pulled from Amazon (via user-provided data)
-- =====================================================
CREATE TABLE public.amazon_orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    amazon_order_id TEXT NOT NULL,
    order_date TIMESTAMP WITH TIME ZONE,
    order_status TEXT, -- Pending, Shipped, Delivered, Cancelled
    items JSONB DEFAULT '[]', -- Array of {asin, name, price, qty, image}
    total_amount DECIMAL(10, 2),
    cashback_eligible BOOLEAN DEFAULT false,
    cashback_claimed BOOLEAN DEFAULT false,
    transaction_id UUID REFERENCES public.transactions(id),
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(user_id, amazon_order_id)
);

-- =====================================================
-- WITHDRAWALS TABLE
-- =====================================================
CREATE TABLE public.withdrawals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    method TEXT NOT NULL, -- bank_transfer, paypal, gift_card, donate
    account_details JSONB,
    status TEXT NOT NULL DEFAULT 'pending',
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    processed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    
    CONSTRAINT valid_withdrawal_status CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    CONSTRAINT minimum_withdrawal CHECK (amount >= 10.00) -- Lower minimum than competitors!
);

-- =====================================================
-- AI RECOMMENDATIONS TABLE
-- =====================================================
CREATE TABLE public.ai_recommendations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    recommendation_type TEXT NOT NULL, -- store, product, deal, cashback_boost
    entity_id UUID, -- store_id or product_id
    entity_type TEXT, -- store, product
    score DECIMAL(5, 2) NOT NULL, -- 0-100 confidence
    reason TEXT, -- Human-readable explanation
    ai_context JSONB DEFAULT '{}', -- Data used for recommendation
    shown_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    clicked BOOLEAN DEFAULT false,
    converted BOOLEAN DEFAULT false,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (TIMEZONE('utc', NOW()) + INTERVAL '24 hours')
);

-- =====================================================
-- CASHBACK BOOSTS TABLE (Limited-time higher rates)
-- =====================================================
CREATE TABLE public.cashback_boosts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
    boost_rate DECIMAL(5, 2) NOT NULL, -- Extra % on top of normal rate
    min_order_amount DECIMAL(10, 2) DEFAULT 0.00,
    max_uses INTEGER, -- NULL = unlimited
    current_uses INTEGER DEFAULT 0,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    boost_reason TEXT, -- "Flash Sale", "Weekend Boost", "Exclusive for SmartCash"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- REVIEWS TABLE (Users review stores)
-- =====================================================
CREATE TABLE public.store_reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    title TEXT,
    body TEXT,
    cashback_received BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(user_id, store_id)
);

-- =====================================================
-- BANNERS TABLE
-- =====================================================
CREATE TABLE public.banners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    cta_text TEXT DEFAULT 'Shop Now',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    target_category TEXT, -- Show to users interested in this category
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- REFERRALS TABLE
-- =====================================================
CREATE TABLE public.referrals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    referrer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    referred_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    referral_code TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, qualified, rewarded
    referrer_bonus DECIMAL(10, 2) DEFAULT 5.00,
    referred_bonus DECIMAL(10, 2) DEFAULT 2.50,
    qualified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(referrer_id, referred_id)
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_referral_code ON public.users(referral_code);
CREATE INDEX idx_stores_slug ON public.stores(slug);
CREATE INDEX idx_stores_category ON public.stores(category);
CREATE INDEX idx_stores_active ON public.stores(is_active);
CREATE INDEX idx_stores_featured ON public.stores(is_featured);
CREATE INDEX idx_products_store ON public.products(store_id);
CREATE INDEX idx_products_external_id ON public.products(external_product_id);
CREATE INDEX idx_price_history_product ON public.price_history(product_id, recorded_at DESC);
CREATE INDEX idx_clicks_user_id ON public.clicks(user_id);
CREATE INDEX idx_clicks_click_id ON public.clicks(click_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_status ON public.transactions(status);
CREATE INDEX idx_transactions_date ON public.transactions(transaction_date);
CREATE INDEX idx_amazon_orders_user ON public.amazon_orders(user_id);
CREATE INDEX idx_amazon_orders_order_id ON public.amazon_orders(amazon_order_id);
CREATE INDEX idx_recommendations_user ON public.ai_recommendations(user_id, expires_at);
CREATE INDEX idx_boosts_store ON public.cashback_boosts(store_id, is_active);
CREATE INDEX idx_price_alerts_user ON public.price_alerts(user_id, is_active);

-- Full text search on stores and products
CREATE INDEX idx_stores_name_search ON public.stores USING gin(name gin_trgm_ops);
CREATE INDEX idx_products_name_search ON public.products USING gin(name gin_trgm_ops);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amazon_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cashback_boosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- User policies
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Public read policies
CREATE POLICY "Stores are publicly viewable" ON public.stores FOR SELECT USING (is_active = true);
CREATE POLICY "Products are publicly viewable" ON public.products FOR SELECT USING (is_tracked = true);
CREATE POLICY "Price history is publicly viewable" ON public.price_history FOR SELECT USING (true);
CREATE POLICY "Categories are publicly viewable" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Banners are publicly viewable" ON public.banners FOR SELECT USING (is_active = true);
CREATE POLICY "Reviews are publicly viewable" ON public.store_reviews FOR SELECT USING (true);
CREATE POLICY "Boosts are publicly viewable" ON public.cashback_boosts FOR SELECT USING (is_active = true);

-- User-owned data policies
CREATE POLICY "Users can view own clicks" ON public.clicks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert clicks" ON public.clicks FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own amazon orders" ON public.amazon_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert amazon orders" ON public.amazon_orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own withdrawals" ON public.withdrawals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create withdrawals" ON public.withdrawals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own recommendations" ON public.ai_recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own price alerts" ON public.price_alerts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own reviews" ON public.store_reviews FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own referrals" ON public.referrals FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = TIMEZONE('utc', NOW()); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON public.stores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Generate referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
    NEW.referral_code = 'SC' || UPPER(SUBSTRING(MD5(NEW.id::TEXT || RANDOM()::TEXT) FROM 1 FOR 6));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_referral_code BEFORE INSERT ON public.users
    FOR EACH ROW WHEN (NEW.referral_code IS NULL) EXECUTE FUNCTION generate_referral_code();

-- Auto-create user profile after signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update cashback on transaction status change
CREATE OR REPLACE FUNCTION update_user_cashback()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'confirmed' AND OLD.status = 'pending' THEN
        UPDATE public.users SET
            pending_cashback = pending_cashback - (NEW.cashback_amount + NEW.bonus_cashback),
            total_cashback = total_cashback + (NEW.cashback_amount + NEW.bonus_cashback),
            xp_points = xp_points + GREATEST(10, FLOOR((NEW.cashback_amount + NEW.bonus_cashback) * 10)::INTEGER)
        WHERE id = NEW.user_id;
        NEW.confirmation_date = TIMEZONE('utc', NOW());
    ELSIF NEW.status = 'cancelled' AND OLD.status = 'pending' THEN
        UPDATE public.users SET
            pending_cashback = pending_cashback - (NEW.cashback_amount + NEW.bonus_cashback)
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

-- Add pending cashback on new transaction
CREATE OR REPLACE FUNCTION add_pending_cashback()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.users SET
        pending_cashback = pending_cashback + (NEW.cashback_amount + NEW.bonus_cashback),
        xp_points = xp_points + 5 -- Points for making a purchase
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_pending_cashback_on_transaction
    AFTER INSERT ON public.transactions
    FOR EACH ROW EXECUTE FUNCTION add_pending_cashback();

-- Update user level based on XP
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
    NEW.level = CASE
        WHEN NEW.xp_points >= 10000 THEN 'Diamond'
        WHEN NEW.xp_points >= 5000 THEN 'Platinum'
        WHEN NEW.xp_points >= 2000 THEN 'Gold'
        WHEN NEW.xp_points >= 500 THEN 'Silver'
        ELSE 'Bronze'
    END;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_level_on_xp_change
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    WHEN (OLD.xp_points IS DISTINCT FROM NEW.xp_points)
    EXECUTE FUNCTION update_user_level();

-- Store click tracking
CREATE OR REPLACE FUNCTION increment_store_clicks()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.stores SET total_clicks = total_clicks + 1 WHERE id = NEW.store_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_click_created
    AFTER INSERT ON public.clicks
    FOR EACH ROW EXECUTE FUNCTION increment_store_clicks();

-- Price history logging
CREATE OR REPLACE FUNCTION log_price_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.current_price IS DISTINCT FROM NEW.current_price THEN
        INSERT INTO public.price_history (product_id, price, cashback_rate)
        VALUES (NEW.id, NEW.current_price, NEW.cashback_rate);
        
        -- Update lowest/highest
        NEW.lowest_price_ever = LEAST(COALESCE(OLD.lowest_price_ever, NEW.current_price), NEW.current_price);
        NEW.highest_price_ever = GREATEST(COALESCE(OLD.highest_price_ever, NEW.current_price), NEW.current_price);
        
        -- Update price trend
        IF NEW.current_price < OLD.current_price THEN NEW.price_trend = 'falling';
        ELSIF NEW.current_price > OLD.current_price THEN NEW.price_trend = 'rising';
        ELSE NEW.price_trend = 'stable';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_price_change
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION log_price_change();

-- =====================================================
-- VIEWS
-- =====================================================

-- Store performance dashboard
CREATE OR REPLACE VIEW store_performance AS
SELECT 
    s.id, s.name, s.category, s.total_clicks, s.total_conversions,
    CASE WHEN s.total_clicks > 0 
        THEN ROUND((s.total_conversions::DECIMAL / s.total_clicks * 100), 2) ELSE 0 
    END as conversion_rate,
    s.total_commission_earned,
    COUNT(t.id) as transaction_count,
    COALESCE(SUM(t.cashback_amount), 0) as total_cashback_paid,
    COALESCE(AVG(t.order_amount), 0) as avg_order_value,
    COALESCE(AVG(r.rating), 0) as avg_rating
FROM public.stores s
LEFT JOIN public.transactions t ON s.id = t.store_id
LEFT JOIN public.store_reviews r ON s.id = r.store_id
GROUP BY s.id;

-- User cashback summary
CREATE OR REPLACE VIEW user_cashback_summary AS
SELECT 
    u.id, u.email, u.full_name, u.level, u.xp_points,
    u.total_cashback, u.pending_cashback, u.withdrawn_cashback,
    COUNT(DISTINCT t.id) as total_transactions,
    COUNT(DISTINCT t.store_id) as stores_used,
    COALESCE(SUM(CASE WHEN t.status = 'pending' THEN t.cashback_amount END), 0) as pending_amount,
    MAX(t.transaction_date) as last_purchase_date,
    u.created_at
FROM public.users u
LEFT JOIN public.transactions t ON u.id = t.user_id
GROUP BY u.id;

-- Best deals view (products with best AI deal score)
CREATE OR REPLACE VIEW best_deals AS
SELECT 
    p.*,
    s.name as store_name,
    s.logo_url as store_logo,
    s.cashback_rate as store_cashback_rate,
    ROUND(((p.original_price - p.current_price) / NULLIF(p.original_price, 0)) * 100, 0) as discount_pct,
    COALESCE(
        (SELECT boost_rate FROM public.cashback_boosts 
         WHERE store_id = s.id AND is_active = true AND end_date > NOW() 
         LIMIT 1), 0
    ) as active_boost
FROM public.products p
JOIN public.stores s ON p.store_id = s.id
WHERE p.is_tracked = true AND s.is_active = true
ORDER BY p.ai_deal_score DESC;

-- =====================================================
-- SEED DATA
-- =====================================================

INSERT INTO public.categories (name, slug, icon, color, display_order) VALUES
('Fashion', 'fashion', '👗', '#FF6B9D', 1),
('Electronics', 'electronics', '📱', '#4ECDC4', 2),
('Home & Garden', 'home-garden', '🏠', '#45B7D1', 3),
('Beauty & Health', 'beauty', '💄', '#F7DC6F', 4),
('Sports & Outdoors', 'sports', '⚽', '#82E0AA', 5),
('Travel', 'travel', '✈️', '#BB8FCE', 6),
('Food & Drink', 'food-drink', '🍔', '#F0B27A', 7),
('Books & Media', 'books', '📚', '#85C1E9', 8),
('Toys & Games', 'toys', '🎮', '#F1948A', 9),
('Automotive', 'automotive', '🚗', '#A9CCE3', 10);

INSERT INTO public.stores (name, slug, description, logo_url, website_url, category, base_commission_rate, cashback_rate, affiliate_network, affiliate_id, tracking_url, sale_badge, offer_text, is_featured, priority, has_price_tracking, supports_order_sync, is_exclusive_deal, exclusive_cashback_rate) VALUES
('Amazon UK', 'amazon-uk', 'Everything from A to Z — electronics, fashion, home & more', 'https://logo.clearbit.com/amazon.co.uk', 'https://amazon.co.uk', 'Electronics', 8.00, 5.00, 'amazon_associates', 'YOUR_AMAZON_ASSOCIATE_ID', 'https://www.amazon.co.uk/?tag=YOUR_AMAZON_ASSOCIATE_ID&tracking_id=CLICK_ID', '5% Back', 'Free delivery on Prime orders', true, 100, true, true, false, NULL),
('ASOS', 'asos', 'Discover the latest fashion online — clothes, shoes, accessories', 'https://logo.clearbit.com/asos.com', 'https://asos.com', 'Fashion', 10.00, 7.00, 'awin', 'YOUR_AWIN_ASOS_ID', 'https://www.awin1.com/cread.php?awinmid=YOUR_AWIN_ASOS_ID&awinaffid=YOUR_AWIN_ID&clickref=CLICK_ID&p=https://www.asos.com', '70% OFF', 'Up to 70% off + free returns', true, 95, false, false, true, 8.50),
('Booking.com', 'booking-com', 'Find your perfect stay — hotels, apartments, villas worldwide', 'https://logo.clearbit.com/booking.com', 'https://booking.com', 'Travel', 6.00, 4.00, 'awin', 'YOUR_AWIN_BOOKING_ID', 'https://www.awin1.com/cread.php?awinmid=YOUR_AWIN_BOOKING_ID&awinaffid=YOUR_AWIN_ID&clickref=CLICK_ID&p=https://www.booking.com', '4% Back', 'Best price guarantee', true, 90, false, false, false, NULL),
('Nike', 'nike', 'Just Do It — shop the latest Nike shoes, clothing and accessories', 'https://logo.clearbit.com/nike.com', 'https://nike.com', 'Sports & Outdoors', 8.00, 6.00, 'awin', 'YOUR_AWIN_NIKE_ID', 'https://www.awin1.com/cread.php?awinmid=YOUR_AWIN_NIKE_ID&awinaffid=YOUR_AWIN_ID&clickref=CLICK_ID&p=https://www.nike.com', '6% Back', 'Free delivery on orders over £50', false, 85, false, false, false, NULL),
('Currys', 'currys', 'UK''s largest electricals retailer — TVs, laptops, white goods', 'https://logo.clearbit.com/currys.co.uk', 'https://currys.co.uk', 'Electronics', 5.00, 3.50, 'awin', 'YOUR_AWIN_CURRYS_ID', 'https://www.awin1.com/cread.php?awinmid=YOUR_AWIN_CURRYS_ID&awinaffid=YOUR_AWIN_ID&clickref=CLICK_ID&p=https://www.currys.co.uk', '3.5% Back', 'Price match guaranteed', false, 80, false, false, false, NULL),
('John Lewis', 'john-lewis', 'Quality products, trusted brands — fashion, home, electricals', 'https://logo.clearbit.com/johnlewis.com', 'https://johnlewis.com', 'Home & Garden', 7.00, 5.00, 'awin', 'YOUR_AWIN_JL_ID', 'https://www.awin1.com/cread.php?awinmid=YOUR_AWIN_JL_ID&awinaffid=YOUR_AWIN_ID&clickref=CLICK_ID&p=https://www.johnlewis.com', '5% Back', 'Never knowingly undersold', false, 75, false, false, false, NULL),
('Boots', 'boots', 'Beauty, health and pharmacy — brands you love at great prices', 'https://logo.clearbit.com/boots.com', 'https://boots.com', 'Beauty & Health', 6.00, 4.50, 'awin', 'YOUR_AWIN_BOOTS_ID', 'https://www.awin1.com/cread.php?awinmid=YOUR_AWIN_BOOTS_ID&awinaffid=YOUR_AWIN_ID&clickref=CLICK_ID&p=https://www.boots.com', 'Up to 4.5%', 'Advantage Card points + cashback', false, 70, false, false, false, NULL),
('Expedia', 'expedia', 'Flights, hotels and car hire — build your perfect trip', 'https://logo.clearbit.com/expedia.co.uk', 'https://expedia.co.uk', 'Travel', 5.00, 3.00, 'cj', 'YOUR_CJ_EXPEDIA_ID', 'https://www.jdoqocy.com/click-YOUR_CJ_PID-YOUR_CJ_EXPEDIA_ID?url=https://www.expedia.co.uk&sid=CLICK_ID', '3% Back', 'Compare millions of deals', false, 65, false, false, false, NULL);

INSERT INTO public.banners (title, subtitle, image_url, link_url, cta_text, display_order, is_active) VALUES
('Earn More. Shop Smarter.', 'AI-powered cashback that learns your style', 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=500&fit=crop', '#stores', 'Start Earning', 1, true),
('Up to 8.5% on Fashion', 'Exclusive SmartCash rates on ASOS, Nike & more', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=500&fit=crop', '#fashion', 'Shop Fashion', 2, true),
('Price Drop Alerts 🔔', 'Never miss a deal — set alerts on any product', 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1400&h=500&fit=crop', '#price-alerts', 'Set Alerts', 3, true);
