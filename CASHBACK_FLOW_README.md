# SmartCash — How Cashback Actually Works
## Setup Guide (Do these steps in order)

---

## Step 1: Run Database SQL (5 minutes)
1. Go to supabase.com → Your project → SQL Editor
2. Paste contents of SETUP_DATABASE.sql
3. Click Run

---

## Step 2: Add Environment Variables to Vercel (5 minutes)
Go to vercel.com → SmartCash project → Settings → Environment Variables:

| Variable | Value | Where to get it |
|---|---|---|
| SUPABASE_URL | https://nnmkgtravghlowohlffw.supabase.co | Supabase Settings |
| SUPABASE_ANON_KEY | sb_publishable_... | Supabase Settings |
| SUPABASE_SERVICE_ROLE_KEY | sb_secret_... | Supabase Settings → service_role |
| ADMIN_KEY | any-secret-password | Make one up |
| WEBHOOK_SECRET | any-secret | Make one up |

---

## Step 3: Set up AWIN Webhook (10 minutes, after AWIN approval)
1. Log into AWIN publisher portal
2. Go to: Reports → Transactions → Webhook Settings  
3. Set URL: https://cashback-eight.vercel.app/api/awin-webhook
4. Set secret: same as WEBHOOK_SECRET above
5. Save → test with a test transaction

**What happens automatically after this:**
- User clicks affiliate link → click recorded in Supabase
- User buys → AWIN tells your webhook
- Webhook credits user's balance in Supabase
- Dashboard shows pending → confirmed cashback

---

## Step 4: Amazon Associates (Manual process until API access)
Amazon does NOT send webhooks. Two options:

### Option A: Monthly Manual Reconciliation
1. Download monthly CSV from Amazon Associates Reports
2. POST it to: POST /api/amazon-reconcile (with x-admin-key header)
3. Script matches purchases to users by timestamp

### Option B: Ask Users to Submit Order Numbers
- Add a form in dashboard: "Claim Amazon Cashback"
- User pastes their Amazon order number
- You verify in Amazon Associates Reports and credit manually
- This is how many cashback sites start

---

## Step 5: Withdrawals — How to Pay Users

### Phase 1 (Manual, free): 
- User requests withdrawal → appears in Supabase withdrawals table
- You log into PayPal.com/wise.com and send money manually
- Update status to 'paid' in Supabase

### Phase 2 (Automatic, when you have volume):
PayPal Payouts API: £0 cost for standard, needs PayPal Business account
- Connect in /api/withdraw.js (code is already there, commented out)

### Phase 3 (Full automation):
Stripe Connect — allows users to connect their own bank accounts
Costs ~0.25% per payout

---

## Legal Requirements Before Going Live

| Requirement | Notes |
|---|---|
| FCA registration | Required for holding user funds in UK |
| ICO registration | Required for GDPR — £40/year |
| Terms & Conditions | Must specify cashback terms, expiry, withdrawal limits |
| Separate bank account | Never mix user cashback funds with business funds |
| Company registration | Should be a Ltd company before accepting real money |

---

## How the Numbers Work

Example: User buys £100 on Amazon through your link
- Amazon pays you: £4.50 commission (4.5% rate)
- You keep: £0.68 (15% of £4.50)  
- User gets: £3.82 cashback (85% of £4.50)

Example with AWIN/ASOS: User buys £100
- AWIN pays you: £6.00 commission (6% rate)
- AWIN fee: deducted by them (~30%)
- You actually receive: ~£4.20
- User gets: £3.57 cashback (85% of what you receive)

**Important**: You must track what each network actually pays you 
(after their own fees) and calculate user cashback from that real number.
