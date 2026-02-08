# 🚀 Deployment Guide

This guide covers deploying your DealCash platform to various hosting services.

## Table of Contents
1. [Quick Setup (Supabase Only)](#quick-setup)
2. [Deploy Frontend](#deploy-frontend)
3. [Deploy Webhooks](#deploy-webhooks)
4. [Configure Domain](#configure-domain)
5. [Enable HTTPS](#enable-https)

---

## Quick Setup (Supabase Only)

**Time: 10 minutes**

Perfect for testing or MVP. Uses Supabase for everything.

### Steps:

1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com/dashboard
   # Click "New Project"
   # Choose a name, password, and region
   ```

2. **Run Database Schema**
   ```bash
   # Copy contents of supabase-schema.sql
   # Paste in SQL Editor
   # Click "Run"
   ```

3. **Update HTML Files**
   ```javascript
   // In index.html, dashboard.html, admin.html
   const SUPABASE_URL = 'https://xxxxx.supabase.co'
   const SUPABASE_ANON_KEY = 'eyJhbGc...'
   ```

4. **Host Files**
   - Upload to Supabase Storage as public bucket, OR
   - Deploy to free static host (see below)

---

## Deploy Frontend

### Option 1: Vercel (Recommended)

**Best for**: Static sites with serverless functions

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts
# Set environment variables in Vercel dashboard
```

**Custom Domain:**
```bash
vercel domains add yourdomain.com
vercel domains add www.yourdomain.com
```

### Option 2: Netlify

**Best for**: Simple static hosting

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Or use Netlify UI:
# 1. Drag & drop your files
# 2. Configure environment variables
# 3. Done!
```

**Configuration:**
Create `netlify.toml`:
```toml
[build]
  publish = "."
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### Option 3: GitHub Pages (Free)

**Best for**: Basic static hosting

```bash
# Create repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/dealcash.git
git push -u origin main

# Enable GitHub Pages
# Go to Settings → Pages
# Select branch: main
# Click Save

# Your site: https://yourusername.github.io/dealcash
```

**⚠️ Note:** GitHub Pages doesn't support serverless functions. Use Supabase Edge Functions for webhooks.

### Option 4: Cloudflare Pages

**Best for**: Global CDN, DDoS protection

```bash
# Connect GitHub repo to Cloudflare Pages
# Or use Wrangler CLI:

npm install -g wrangler
wrangler login
wrangler pages publish . --project-name dealcash
```

### Option 5: AWS S3 + CloudFront

**Best for**: Full control, scalability

```bash
# Create S3 bucket
aws s3 mb s3://dealcash-frontend

# Upload files
aws s3 sync . s3://dealcash-frontend --exclude ".git/*"

# Enable static website hosting
aws s3 website s3://dealcash-frontend --index-document index.html

# Create CloudFront distribution (for HTTPS & CDN)
# Use AWS Console or CLI
```

---

## Deploy Webhooks

### Option 1: Supabase Edge Functions (Recommended)

**Best for**: Integration with Supabase database

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref YOUR_PROJECT_REF

# Create function
mkdir -p supabase/functions/affiliate-webhook

# Copy webhook-handler.js into function
cp webhook-handler.js supabase/functions/affiliate-webhook/index.ts

# Deploy
supabase functions deploy affiliate-webhook

# Get URL
supabase functions list
# URL: https://xxxxx.supabase.co/functions/v1/affiliate-webhook
```

**Set Environment Variables:**
```bash
supabase secrets set WEBHOOK_SECRET=your_secret
supabase secrets set AWIN_API_TOKEN=your_token
```

### Option 2: Vercel Serverless Functions

**Best for**: Already using Vercel for frontend

```bash
# Create /api directory
mkdir api

# Create /api/webhooks/awin.js
cat > api/webhooks/awin.js << 'EOF'
import { handleAwinWebhook } from '../../webhook-handler'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  const response = await handleAwinWebhook(req)
  return res.status(response.status).send(response.body)
}
EOF

# Deploy
vercel --prod

# Webhook URL: https://yourdomain.com/api/webhooks/awin
```

### Option 3: AWS Lambda

**Best for**: Existing AWS infrastructure

```bash
# Install Serverless Framework
npm install -g serverless

# Create serverless.yml
cat > serverless.yml << 'EOF'
service: dealcash-webhooks

provider:
  name: aws
  runtime: nodejs18.x
  region: eu-west-2
  environment:
    SUPABASE_URL: ${env:SUPABASE_URL}
    SUPABASE_SERVICE_ROLE_KEY: ${env:SUPABASE_SERVICE_ROLE_KEY}

functions:
  awin-webhook:
    handler: webhook-handler.handleAwinWebhook
    events:
      - http:
          path: webhooks/awin
          method: post
EOF

# Deploy
serverless deploy
```

---

## Configure Affiliate Networks

### AWIN Setup

1. Login to AWIN Publisher Dashboard
2. Go to **Settings → API**
3. Generate API token
4. Go to **Settings → Postback**
5. Set Postback URL: `https://yourdomain.com/api/webhooks/awin`
6. Set Signature Secret (for validation)

### CJ (Commission Junction)

1. Login to CJ Account
2. Go to **Account → Web Services**
3. Generate Personal Access Token
4. Go to **Account → Tracking Integration**
5. Set Server Postback URL: `https://yourdomain.com/api/webhooks/cj`

### ShareASale

1. Login to ShareASale
2. Go to **Tools → API**
3. Generate API Token & Secret
4. Go to **Tools → Postback URL**
5. Set URL: `https://yourdomain.com/api/webhooks/shareasale`

---

## Configure Domain

### Buy Domain (if needed)
- Namecheap: ~$10/year
- Google Domains: ~$12/year
- Cloudflare Registrar: ~$8/year (at cost)

### Point Domain to Hosting

#### Vercel:
```bash
# Add domain in Vercel dashboard
# Add DNS records:
# A record: @ → 76.76.21.21
# CNAME record: www → cname.vercel-dns.com
```

#### Netlify:
```bash
# Add domain in Netlify dashboard
# Add DNS records:
# A record: @ → 75.2.60.5
# CNAME record: www → your-site.netlify.app
```

#### Cloudflare Pages:
```bash
# Domain already on Cloudflare
# Add CNAME: @ → your-site.pages.dev
```

---

## Enable HTTPS

All modern hosts provide free SSL (Let's Encrypt):

### Vercel
✅ Automatic - HTTPS enabled by default

### Netlify
✅ Automatic - HTTPS enabled by default

### Cloudflare
✅ Automatic - HTTPS + additional security

### Manual (Certbot)
```bash
# Only if self-hosting
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Environment Variables

Set these in your hosting platform:

### Vercel
```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
# etc.
```

### Netlify
```bash
# In Netlify UI:
# Site Settings → Build & Deploy → Environment
```

### Supabase Edge Functions
```bash
supabase secrets set WEBHOOK_SECRET=xxx
```

---

## Post-Deployment Checklist

- [ ] Supabase database schema deployed
- [ ] Frontend hosted and accessible
- [ ] Webhook endpoints working
- [ ] Affiliate network webhooks configured
- [ ] Custom domain connected
- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Email authentication configured
- [ ] Test user signup
- [ ] Test store click tracking
- [ ] Test transaction webhook
- [ ] Test admin panel access

---

## Monitoring & Maintenance

### Supabase Dashboard
- Monitor database size
- Check query performance
- View API usage

### Webhook Monitoring
```bash
# View Supabase Edge Function logs
supabase functions logs affiliate-webhook

# View Vercel logs
vercel logs

# Set up error alerting
# Use services like Sentry, LogRocket
```

### Scheduled Tasks
```bash
# Set up cron job for transaction sync
# Use:
# - GitHub Actions (free)
# - Vercel Cron
# - Supabase pg_cron
```

Example GitHub Action (`.github/workflows/sync.yml`):
```yaml
name: Sync Transactions
on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Sync
        run: node scripts/sync-transactions.js
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
```

---

## Backup Strategy

### Supabase Automatic Backups
- Free plan: Daily backups (7-day retention)
- Pro plan: PITR (Point-in-Time Recovery)

### Manual Backup
```bash
# Export database
supabase db dump -f backup.sql

# Export specific table
supabase db dump --data-only -t users > users-backup.sql
```

---

## Scaling Considerations

### Database
- Use connection pooling
- Add indexes on frequently queried columns
- Archive old transactions (>1 year)

### Frontend
- Enable CDN caching
- Optimize images (use Cloudinary/ImageKit)
- Lazy load components

### API
- Implement rate limiting
- Cache frequent queries
- Use Redis for session storage

---

## Cost Estimation

### Free Tier (MVP)
- Supabase: Free (500MB database)
- Vercel/Netlify: Free
- Domain: $10/year
- **Total: ~$10/year**

### Low Traffic (<10k users)
- Supabase Pro: $25/month
- Vercel Pro: $20/month
- CDN: Included
- **Total: ~$45/month**

### Medium Traffic (10k-100k users)
- Supabase Team: $599/month
- Vercel Pro: $20/month
- CDN + monitoring: $50/month
- **Total: ~$670/month**

---

## Troubleshooting

### Site not loading
1. Check DNS propagation (up to 48 hours)
2. Verify Supabase URL is correct
3. Check browser console for errors

### Webhooks not receiving data
1. Test endpoint: `curl -X POST https://yourdomain.com/api/webhooks/awin`
2. Check logs in hosting platform
3. Verify signature validation

### Database connection errors
1. Check API keys are correct
2. Verify RLS policies
3. Check connection limit (upgrade if needed)

---

## Support Resources

- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
- AWIN API: https://wiki.awin.com/index.php/API
- CJ Developer: https://developers.cj.com/

---

**Ready to Deploy? Start with the Quick Setup and expand from there!**
