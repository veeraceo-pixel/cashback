# DealCash - Affiliate Cashback Platform

A complete cashback platform similar to CashKaro, built with **Supabase** (open-source Firebase alternative) and vanilla HTML/CSS/JavaScript.

## 🎯 Features

### User Features
- ✅ User registration and authentication
- ✅ Browse stores and earn cashback
- ✅ Click tracking with unique IDs
- ✅ Real-time cashback calculation
- ✅ Transaction history with status tracking
- ✅ Withdrawal system (minimum £50)
- ✅ Referral program
- ✅ User dashboard

### Admin Features
- ✅ Dashboard with analytics
- ✅ Transaction management (approve/decline)
- ✅ Store management (add/edit/deactivate)
- ✅ Withdrawal processing
- ✅ User management
- ✅ Revenue tracking

### Technical Features
- ✅ Affiliate network integration (AWIN, CJ, ShareASale)
- ✅ Webhook handlers for transaction updates
- ✅ Commission calculation and profit tracking
- ✅ Database triggers for automatic cashback updates
- ✅ Row-level security (RLS)

## 📁 Project Structure

```
dealcash/
├── index.html              # Homepage with store listings
├── dashboard.html          # User dashboard
├── admin.html             # Admin panel
├── supabase-schema.sql    # Database schema
├── webhook-handler.js     # Affiliate network webhooks
└── README.md             # This file
```

## 🚀 Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Copy your project URL and API keys:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon Key: `eyJhbGc...` (public, safe for frontend)
   - Service Role Key: `eyJhbGc...` (secret, for backend only)

### 2. Set Up Database

1. Go to **SQL Editor** in Supabase dashboard
2. Copy the entire contents of `supabase-schema.sql`
3. Paste and run it to create all tables, functions, and triggers

### 3. Configure Frontend Files

In **index.html**, **dashboard.html**, and **admin.html**, replace:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

With your actual Supabase credentials:

```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGc...';
```

### 4. Set Up Affiliate Networks

#### Join Affiliate Networks:
1. **AWIN** - https://www.awin.com/gb/publishers
2. **CJ (Commission Junction)** - https://www.cj.com
3. **ShareASale** - https://www.shareasale.com
4. **Impact** - https://impact.com

#### Get Affiliate Links:
After approval, you'll get:
- Advertiser IDs for each store
- Tracking URL templates
- API credentials (for webhooks)

#### Add Stores to Database:
```sql
INSERT INTO stores (
  name, slug, category, 
  base_commission_rate, cashback_rate,
  affiliate_network, affiliate_id, tracking_url,
  logo_url, offer_text
) VALUES (
  'Amazon UK',
  'amazon-uk',
  'Electronics',
  8.00,  -- Commission from Amazon
  5.00,  -- Cashback to users
  'awin',
  '1234',  -- Your advertiser ID
  'https://www.awin1.com/cread.php?awinmid=1234&awinaffid=YOUR_ID&clickref=CLICK_ID&p=https://amazon.co.uk',
  'https://logo.clearbit.com/amazon.co.uk',
  'Free delivery over £25'
);
```

Replace:
- `YOUR_ID` with your AWIN publisher ID
- `1234` with Amazon's advertiser ID on AWIN

### 5. Deploy Webhook Handler

#### Option A: Supabase Edge Functions (Recommended)
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy function
supabase functions deploy affiliate-webhook --no-verify-jwt
```

#### Option B: Vercel Serverless
1. Create `/api/webhooks/awin.js` in your project
2. Deploy to Vercel
3. Get webhook URL: `https://yoursite.vercel.app/api/webhooks/awin`

#### Configure Webhooks in Affiliate Networks:
1. AWIN: Settings → Postback URL
2. CJ: Account → Tracking Integration
3. Set URL to your webhook endpoint

### 6. Enable Email in Supabase

1. Go to **Authentication → Settings**
2. Configure email templates for signup confirmation
3. Or enable social auth (Google, Facebook, etc.)

### 7. Test the System

1. **Sign Up**: Create a test user account
2. **Browse Stores**: Click on a store
3. **Make Purchase**: Complete a test purchase on the retailer's site
4. **Check Transaction**: View in user dashboard (will be pending)
5. **Admin Approval**: Login to admin panel, confirm transaction
6. **Withdrawal**: Request withdrawal once balance reaches £50

## 💰 How It Works

### Revenue Model

```
Customer spends £100 on Amazon
↓
Amazon pays you 8% commission = £8
↓
You give customer 5% cashback = £5
↓
Your profit = £3 (3%)
```

### Flow Diagram

```
1. User clicks store on DealCash
2. Click recorded with unique ID
3. User redirected to retailer with tracking link
4. User makes purchase
5. Affiliate network notifies via webhook
6. Transaction created (status: pending)
7. After 30-60 days, retailer confirms
8. Admin approves transaction
9. Cashback moves to user's available balance
10. User withdraws when balance ≥ £50
```

## 🔐 Security

### Row Level Security (RLS)
All tables have RLS enabled. Users can only:
- View their own data
- Cannot modify others' balances
- Cannot approve their own transactions

### Admin Access
To create admin users, add a custom claim:
```sql
-- In Supabase SQL Editor
UPDATE auth.users 
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'
WHERE email = 'admin@yourdomain.com';
```

Then add RLS policy:
```sql
CREATE POLICY "Admins can manage everything" ON transactions
FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);
```

## 📊 Database Schema

### Core Tables
- **users**: User profiles and balances
- **stores**: Retailer information and rates
- **clicks**: Click tracking
- **transactions**: Purchase records
- **withdrawals**: Payout requests
- **categories**: Store categories
- **banners**: Homepage sliders

### Key Relationships
```
users ←→ transactions ←→ stores
users ←→ clicks ←→ stores
users ←→ withdrawals
```

## 🎨 Customization

### Change Branding
1. Update logo in HTML files
2. Modify color scheme in CSS
3. Replace gradient colors:
   - Primary: `#FF6B6B` → `#YOUR_COLOR`
   - Secondary: `#FF8E53` → `#YOUR_COLOR`

### Add New Store
```javascript
// In admin panel or directly in database
INSERT INTO stores (...) VALUES (...);
```

### Modify Cashback Rates
```sql
UPDATE stores 
SET cashback_rate = 6.00 
WHERE slug = 'amazon-uk';
```

## 🐛 Troubleshooting

### Users can't sign up
- Check email configuration in Supabase Auth settings
- Verify RLS policies allow user creation
- Check browser console for errors

### Clicks not tracking
- Verify click_id is being generated
- Check network tab for API errors
- Ensure Supabase URL is correct

### Cashback not updating
- Check transaction status in database
- Verify triggers are enabled
- Run manual update: `UPDATE transactions SET status='confirmed' WHERE id='...'`

### Webhooks not working
- Verify webhook URL is publicly accessible
- Check signature validation
- Look at server logs for errors

## 📈 Scaling

### Performance Optimization
1. Add indexes on frequently queried columns
2. Enable database connection pooling
3. Use Supabase Realtime for live updates
4. Add caching layer (Redis)

### High Traffic Handling
1. Upgrade Supabase plan for more concurrent connections
2. Use CDN for static assets
3. Implement rate limiting
4. Add load balancer

## 💡 Next Steps

### Feature Ideas
- [ ] Mobile app (React Native)
- [ ] Browser extension for auto-activation
- [ ] Push notifications for cashback confirmations
- [ ] Gift card redemption option
- [ ] Leaderboards and gamification
- [ ] API for partners
- [ ] Multi-currency support

### Monetization Ideas
- Premium membership (higher cashback rates)
- Featured store placements
- Sponsored deals
- Data insights for brands

## 📝 Legal Requirements

1. **Privacy Policy**: Explain data collection
2. **Terms & Conditions**: User agreement
3. **Cookie Consent**: GDPR compliance
4. **Affiliate Disclosure**: FTC compliance
5. **Payment Processing**: PCI compliance

## 🤝 Support

For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs
2. Review affiliate network help centers
3. Check browser console for JavaScript errors

## 📄 License

This project is open source. Modify as needed for your business.

## ⚠️ Important Notes

1. **Replace all YOUR_* placeholders** with actual values
2. **Test thoroughly** before going live
3. **Read affiliate network terms** - some prohibit cashback
4. **Comply with tax laws** - you may need to report earnings
5. **Secure sensitive data** - never expose service role keys in frontend

---

Built with ❤️ using Supabase, React, and HTML/CSS
