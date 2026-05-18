# SmartCash — Setup Guide

## Fix Email Verification (The localhost:3000 Problem)

When you click "Confirm email address" in the signup email, it redirects to `localhost:3000`
instead of your live Vercel site. Here's how to fix it in **2 minutes**:

---

### Step 1 — Set Redirect URLs in Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **Authentication** in the left sidebar
4. Click **URL Configuration**
5. Set these fields:

**Site URL:**
```
https://cashback-pztizzogi-veeras-projects-2f7d9936.vercel.app
```

**Redirect URLs (add all of these):**
```
https://cashback-pztizzogi-veeras-projects-2f7d9936.vercel.app/auth-callback.html
https://cashback-pztizzogi-veeras-projects-2f7d9936.vercel.app/**
http://localhost:3000/auth-callback.html
http://localhost:5500/auth-callback.html
```

6. Click **Save**

---

### Step 2 — Deploy auth-callback.html

Make sure `auth-callback.html` is uploaded to your Vercel project alongside the other files.
This page receives the verification token and redirects to the dashboard.

---

### Step 3 — Disable Email Confirmation (Optional — Easiest Fix)

If you want users to log in immediately without email verification:

1. Go to **Authentication → Providers → Email**
2. Toggle OFF **"Confirm email"**
3. Save

Users will be able to login immediately after signing up.

---

### How It Works Now

```
User signs up on SmartCash
        ↓
Supabase sends verification email
        ↓
User clicks "Confirm email address"
        ↓
Browser opens: your-vercel-site.vercel.app/auth-callback.html#access_token=...
        ↓
auth-callback.html reads the token, sets the session
        ↓
Redirects to dashboard.html — user is logged in ✅
```

---

## Config File

Edit `config.js` with your Supabase credentials:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT_ID.supabase.co',
  anonKey: 'eyJhbGci...'  // Your anon/public key
};
```

Find these at: **Supabase Dashboard → Settings → API**

---

## Deploying Updates to Vercel

Just drag and drop ALL files onto https://vercel.com/new or use:

```bash
npx vercel --prod
```

Files to always include:
- `app.html` (homepage)
- `stores.html`
- `how-it-works.html`
- `price-tracker.html`
- `dashboard.html`
- `auth-callback.html` ← NEW, required for email verification
- `theme.css`
- `config.js`
- `index.html`
