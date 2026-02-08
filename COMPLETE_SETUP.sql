-- =====================================================
-- COMPLETE FRESH SETUP WITH SAMPLE DATA
-- Copy and paste this ENTIRE script into Supabase SQL Editor
-- =====================================================

-- STEP 1: Clear existing data (optional, skip if you want to keep existing)
-- TRUNCATE public.categories CASCADE;
-- TRUNCATE public.stores CASCADE;
-- TRUNCATE public.banners CASCADE;

-- STEP 2: Ensure tables have correct RLS setup
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- STEP 3: Drop old policies
DROP POLICY IF EXISTS "Stores are viewable by everyone" ON public.stores;
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.categories;
DROP POLICY IF EXISTS "Banners are viewable by everyone" ON public.banners;
DROP POLICY IF EXISTS "Allow public read access to stores" ON public.stores;
DROP POLICY IF EXISTS "Allow public read access to categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public read access to banners" ON public.banners;

-- STEP 4: Create correct policies for new API keys
CREATE POLICY "Enable read for all users" 
ON public.categories 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Enable read for all users" 
ON public.stores 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Enable read for all users" 
ON public.banners 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- STEP 5: Insert Categories
INSERT INTO public.categories (name, slug, icon, display_order, is_active) 
VALUES
    ('Fashion', 'fashion', '👗', 1, true),
    ('Electronics', 'electronics', '📱', 2, true),
    ('Home & Garden', 'home-garden', '🏡', 3, true),
    ('Beauty', 'beauty', '💄', 4, true),
    ('Sports', 'sports', '⚽', 5, true),
    ('Travel', 'travel', '✈️', 6, true),
    ('Food & Drink', 'food-drink', '🍔', 7, true),
    ('Books', 'books', '📚', 8, true)
ON CONFLICT (slug) DO UPDATE 
SET is_active = true;

-- STEP 6: Insert Stores (all set to ACTIVE for testing)
INSERT INTO public.stores (
    name, slug, description, logo_url, category, 
    base_commission_rate, cashback_rate, 
    affiliate_network, affiliate_id, tracking_url,
    sale_badge, offer_text, priority, is_active
) VALUES
(
    'Amazon UK',
    'amazon-uk',
    'Everything you need, from A to Z',
    'https://logo.clearbit.com/amazon.co.uk',
    'Electronics',
    8.00,
    5.00,
    'awin',
    'PENDING',
    'https://www.amazon.co.uk',
    '🔥 Hot',
    'Free delivery over £25',
    100,
    true  -- ACTIVE for testing
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
    'PENDING',
    'https://www.asos.com',
    '70% OFF',
    'Up to 70% off sale',
    90,
    true
),
(
    'eBay UK',
    'ebay-uk',
    'Buy and sell electronics, fashion, and more',
    'https://logo.clearbit.com/ebay.co.uk',
    'Electronics',
    6.00,
    4.00,
    'awin',
    'PENDING',
    'https://www.ebay.co.uk',
    NULL,
    'Free postage on many items',
    85,
    true
),
(
    'John Lewis',
    'john-lewis',
    'Quality you can trust',
    'https://logo.clearbit.com/johnlewis.com',
    'Home & Garden',
    5.00,
    3.00,
    'awin',
    'PENDING',
    'https://www.johnlewis.com',
    NULL,
    '2 year guarantee',
    80,
    true
),
(
    'Tesco',
    'tesco',
    'Every little helps',
    'https://logo.clearbit.com/tesco.com',
    'Food & Drink',
    4.00,
    2.00,
    'awin',
    'PENDING',
    'https://www.tesco.com',
    NULL,
    'Clubcard prices',
    75,
    true
),
(
    'Boots',
    'boots',
    'Feel good with Boots',
    'https://logo.clearbit.com/boots.com',
    'Beauty',
    7.00,
    4.00,
    'awin',
    'PENDING',
    'https://www.boots.com',
    NULL,
    'Advantage Card points',
    70,
    true
),
(
    'Currys',
    'currys',
    'Tech made simple',
    'https://logo.clearbit.com/currys.co.uk',
    'Electronics',
    3.00,
    2.00,
    'awin',
    'PENDING',
    'https://www.currys.co.uk',
    NULL,
    'Price match promise',
    65,
    true
),
(
    'Argos',
    'argos',
    'Same day collection available',
    'https://logo.clearbit.com/argos.co.uk',
    'Home & Garden',
    4.00,
    2.50,
    'awin',
    'PENDING',
    'https://www.argos.co.uk',
    NULL,
    'Fast track delivery',
    60,
    true
),
(
    'Very',
    'very',
    'Fashion, home, electricals & more',
    'https://logo.clearbit.com/very.co.uk',
    'Fashion',
    6.00,
    3.50,
    'awin',
    'PENDING',
    'https://www.very.co.uk',
    'NEW',
    'Buy now, pay later',
    55,
    true
),
(
    'Next',
    'next',
    'Contemporary fashion & homeware',
    'https://logo.clearbit.com/next.co.uk',
    'Fashion',
    5.00,
    3.00,
    'awin',
    'PENDING',
    'https://www.next.co.uk',
    NULL,
    'Next day delivery',
    50,
    true
),
(
    'Marks & Spencer',
    'marks-spencer',
    'Quality British clothing & food',
    'https://logo.clearbit.com/marksandspencer.com',
    'Fashion',
    4.00,
    2.00,
    'awin',
    'PENDING',
    'https://www.marksandspencer.com',
    NULL,
    'Sparks rewards',
    45,
    true
),
(
    'H&M',
    'hm',
    'Fashion and quality at the best price',
    'https://logo.clearbit.com/hm.com',
    'Fashion',
    8.00,
    5.00,
    'awin',
    'PENDING',
    'https://www2.hm.com',
    NULL,
    'Free returns',
    40,
    true
)
ON CONFLICT (slug) DO UPDATE 
SET is_active = true;

-- STEP 7: Insert Banners
INSERT INTO public.banners (title, image_url, link_url, display_order, is_active) 
VALUES
    ('Summer Sale', 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=400&fit=crop', NULL, 1, true),
    ('Tech Deals', 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1400&h=400&fit=crop', NULL, 2, true),
    ('Fashion Week', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=400&fit=crop', NULL, 3, true)
ON CONFLICT DO NOTHING;

-- STEP 8: Verify everything
SELECT 'Categories Count' as check_name, COUNT(*) as count FROM public.categories WHERE is_active = true
UNION ALL
SELECT 'Stores Count', COUNT(*) FROM public.stores WHERE is_active = true
UNION ALL
SELECT 'Banners Count', COUNT(*) FROM public.banners WHERE is_active = true;

-- STEP 9: View sample data
SELECT name, slug, is_active FROM public.categories ORDER BY display_order LIMIT 5;
SELECT name, slug, cashback_rate, is_active FROM public.stores ORDER BY priority DESC LIMIT 5;
SELECT title, is_active FROM public.banners ORDER BY display_order;

-- =====================================================
-- SUCCESS! You should now see:
-- - 8 categories
-- - 12 stores
-- - 3 banners
-- All with is_active = true
-- =====================================================
