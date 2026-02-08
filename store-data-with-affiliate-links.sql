-- ============================================
-- SAMPLE STORE DATA FOR DEALCASH
-- ============================================
-- IMPORTANT: Replace affiliate IDs with YOUR actual IDs after joining networks
-- ============================================

-- Insert sample categories
INSERT INTO categories (name, slug, icon, display_order) VALUES
('Fashion', 'fashion', '👗', 1),
('Electronics', 'electronics', '💻', 2),
('Home & Garden', 'home-garden', '🏠', 3),
('Travel', 'travel', '✈️', 4),
('Food & Drink', 'food-drink', '🍔', 5),
('Beauty', 'beauty', '💄', 6),
('Sports', 'sports', '⚽', 7),
('Toys & Games', 'toys-games', '🎮', 8);

-- Insert sample banners
INSERT INTO banners (title, description, image_url, link_url, display_order, is_active) VALUES
('Welcome to DealCash', 'Earn cashback on every purchase', 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400', '/stores.html', 1, true),
('Holiday Deals', 'Up to 15% cashback on travel bookings', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400', '/stores.html?category=travel', 2, true),
('Fashion Sale', 'Extra 10% cashback on top brands', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400', '/stores.html?category=fashion', 3, true);

-- ============================================
-- STORES WITH AFFILIATE LINK TEMPLATES
-- ============================================
-- After joining affiliate networks, you'll replace:
-- - {YOUR_AWIN_ID} with your AWIN publisher ID
-- - {YOUR_CJ_PID} with your CJ publisher ID  
-- - {ADVERTISER_ID} with the specific advertiser's ID
-- - {{CLICK_ID}} stays as-is (replaced dynamically)
-- ============================================

-- AWIN Stores (UK/EU Focus)
INSERT INTO stores (
    name, slug, category, 
    base_commission_rate, cashback_rate, 
    affiliate_network, affiliate_id, 
    tracking_url,
    logo_url, offer_text, sale_badge, is_active
) VALUES

-- Amazon UK (AWIN)
('Amazon UK', 'amazon-uk', 'Electronics', 
8.00, 5.00, 
'awin', '1234',  -- Replace with actual advertiser ID
'https://www.awin1.com/cread.php?awinmid=1234&awinaffid={YOUR_AWIN_ID}&clickref={{CLICK_ID}}&p=https://www.amazon.co.uk',
'https://logo.clearbit.com/amazon.co.uk',
'Free delivery on Prime orders', '5% Back', true),

-- ASOS (AWIN)
('ASOS', 'asos', 'Fashion',
10.00, 7.00,
'awin', '2987',  -- Replace with actual advertiser ID
'https://www.awin1.com/cread.php?awinmid=2987&awinaffid={YOUR_AWIN_ID}&clickref={{CLICK_ID}}&p=https://www.asos.com',
'https://logo.clearbit.com/asos.com',
'Free delivery & returns', '7% Back', true),

-- eBay UK (AWIN)
('eBay UK', 'ebay-uk', 'Electronics',
5.00, 3.00,
'awin', '2343',  -- Replace with actual advertiser ID
'https://www.awin1.com/cread.php?awinmid=2343&awinaffid={YOUR_AWIN_ID}&clickref={{CLICK_ID}}&p=https://www.ebay.co.uk',
'https://logo.clearbit.com/ebay.co.uk',
'Millions of items', '3% Back', true),

-- John Lewis (AWIN)
('John Lewis', 'john-lewis', 'Home & Garden',
6.00, 4.00,
'awin', '2988',  -- Replace with actual advertiser ID
'https://www.awin1.com/cread.php?awinmid=2988&awinaffid={YOUR_AWIN_ID}&clickref={{CLICK_ID}}&p=https://www.johnlewis.com',
'https://logo.clearbit.com/johnlewis.com',
'2 year guarantee on everything', '4% Back', true),

-- Booking.com (AWIN)
('Booking.com', 'booking-com', 'Travel',
4.00, 3.00,
'awin', '4329',  -- Replace with actual advertiser ID
'https://www.awin1.com/cread.php?awinmid=4329&awinaffid={YOUR_AWIN_ID}&clickref={{CLICK_ID}}&p=https://www.booking.com',
'https://logo.clearbit.com/booking.com',
'Free cancellation on most hotels', '3% Back', true),

-- Currys (AWIN)
('Currys', 'currys', 'Electronics',
3.00, 2.00,
'awin', '1599',  -- Replace with actual advertiser ID
'https://www.awin1.com/cread.php?awinmid=1599&awinaffid={YOUR_AWIN_ID}&clickref={{CLICK_ID}}&p=https://www.currys.co.uk',
'https://logo.clearbit.com/currys.co.uk',
'Price match guarantee', '2% Back', true),

-- Argos (AWIN)
('Argos', 'argos', 'Home & Garden',
4.00, 3.00,
'awin', '1599',  -- Replace with actual advertiser ID
'https://www.awin1.com/cread.php?awinmid=1599&awinaffid={YOUR_AWIN_ID}&clickref={{CLICK_ID}}&p=https://www.argos.co.uk',
'https://logo.clearbit.com/argos.co.uk',
'Same day collection available', '3% Back', true),

-- CJ Affiliate Stores (US/Global Focus)
-- Hotels.com (CJ)
('Hotels.com', 'hotels-com', 'Travel',
6.00, 4.00,
'cj', '12345',  -- Replace with actual advertiser ID
'https://www.jdoqocy.com/click-{YOUR_CJ_PID}-12345?url=https://www.hotels.com&sid={{CLICK_ID}}',
'https://logo.clearbit.com/hotels.com',
'Collect 10 nights, get 1 free', 'Hot Deal', true),

-- ShareASale Stores
-- Wayfair (ShareASale)
('Wayfair', 'wayfair', 'Home & Garden',
7.00, 5.00,
'shareasale', '27206',  -- Replace with actual merchant ID
'https://shareasale.com/r.cfm?b=999&u={YOUR_AFFILIATE_ID}&m=27206&urllink=www.wayfair.com&afftrack={{CLICK_ID}}',
'https://logo.clearbit.com/wayfair.com',
'Free shipping over £40', '5% Back', true),

-- Rakuten Stores
-- Nike (Rakuten)
('Nike', 'nike', 'Sports',
5.00, 3.50,
'rakuten', 'nike',
'https://click.linksynergy.com/fs-bin/click?id={YOUR_RAKUTEN_ID}&offerid=123456&type=3&subid={{CLICK_ID}}&u1={{CLICK_ID}}',
'https://logo.clearbit.com/nike.com',
'Free returns within 60 days', '3.5% Back', true);

-- ============================================
-- SETUP INSTRUCTIONS
-- ============================================
-- 1. Sign up for affiliate networks:
--    - AWIN: https://www.awin.com/gb/publishers
--    - CJ: https://www.cj.com
--    - ShareASale: https://www.shareasale.com
--    - Rakuten: https://rakutenadvertising.com
--
-- 2. Apply to join each retailer's program
--
-- 3. Get your IDs:
--    - AWIN: Your Publisher ID (e.g., 123456)
--    - CJ: Your PID (e.g., 8765432)
--    - ShareASale: Your Affiliate ID (e.g., 654321)
--    - Rakuten: Your RAN ID
--
-- 4. Find each retailer's advertiser/merchant ID
--
-- 5. Update the tracking URLs above with YOUR IDs
--
-- 6. Test each link to ensure tracking works
--
-- 7. DO NOT change {{CLICK_ID}} - this is replaced dynamically
-- ============================================

-- Sample data verification
SELECT 
    name,
    category,
    cashback_rate,
    affiliate_network,
    is_active
FROM stores
ORDER BY category, name;

-- Check total stores added
SELECT 
    category,
    COUNT(*) as store_count,
    AVG(cashback_rate) as avg_cashback
FROM stores
WHERE is_active = true
GROUP BY category
ORDER BY store_count DESC;
