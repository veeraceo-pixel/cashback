/**
 * AFFILIATE NETWORK WEBHOOK HANDLER
 * This file handles incoming transaction notifications from affiliate networks
 * Place this in a serverless function (e.g., Supabase Edge Function, Vercel, Netlify)
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Webhook secret for validation (set in affiliate network dashboard)
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

/**
 * AWIN Webhook Handler
 * Receives transaction updates from AWIN affiliate network
 */
export async function handleAwinWebhook(request) {
  try {
    // Validate webhook signature
    const signature = request.headers.get('X-Awin-Signature')
    if (!validateSignature(signature, request.body)) {
      return new Response('Invalid signature', { status: 401 })
    }

    const data = await request.json()
    
    // Extract transaction data
    const {
      transactionId,
      advertiserId,
      clickRef, // Our click_id
      commissionAmount,
      orderRef,
      saleAmount,
      transactionDate,
      validationDate,
      status // pending, approved, declined
    } = data

    // Find the click in our database
    const { data: click, error: clickError } = await supabase
      .from('clicks')
      .select('id, user_id, store_id')
      .eq('click_id', clickRef)
      .single()

    if (clickError || !click) {
      console.error('Click not found:', clickRef)
      return new Response('Click not found', { status: 404 })
    }

    // Get store details
    const { data: store } = await supabase
      .from('stores')
      .select('cashback_rate')
      .eq('id', click.store_id)
      .single()

    // Calculate cashback
    const cashbackAmount = (parseFloat(saleAmount) * store.cashback_rate) / 100

    // Check if transaction already exists
    const { data: existingTrans } = await supabase
      .from('transactions')
      .select('id')
      .eq('transaction_id', transactionId)
      .single()

    if (existingTrans) {
      // Update existing transaction
      await supabase
        .from('transactions')
        .update({
          status: status === 'approved' ? 'confirmed' : status === 'declined' ? 'cancelled' : 'pending',
          network_status: status,
          network_updated_at: new Date().toISOString()
        })
        .eq('transaction_id', transactionId)
    } else {
      // Create new transaction
      await supabase
        .from('transactions')
        .insert({
          user_id: click.user_id,
          store_id: click.store_id,
          click_id: click.id,
          transaction_id: transactionId,
          order_id: orderRef,
          order_amount: parseFloat(saleAmount),
          commission_rate: parseFloat(commissionAmount) / parseFloat(saleAmount) * 100,
          commission_amount: parseFloat(commissionAmount),
          cashback_rate: store.cashback_rate,
          cashback_amount: cashbackAmount,
          status: status === 'approved' ? 'confirmed' : 'pending',
          transaction_date: transactionDate,
          network_status: status
        })
    }

    // Update store statistics
    await supabase.rpc('increment_store_conversions', { 
      store_id: click.store_id,
      commission: parseFloat(commissionAmount)
    })

    return new Response('Webhook processed', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Internal error', { status: 500 })
  }
}

/**
 * CJ (Commission Junction) Webhook Handler
 */
export async function handleCJWebhook(request) {
  try {
    const data = await request.json()
    
    const {
      actionTrackerId,
      advertiserId,
      orderId,
      saleAmount,
      commissionAmount,
      pubData, // Our click_id
      eventDate,
      actionStatus // new, locked, closed
    } = data

    // Similar logic to AWIN handler
    // Find click, create/update transaction, calculate cashback
    
    return new Response('Webhook processed', { status: 200 })
  } catch (error) {
    console.error('CJ Webhook error:', error)
    return new Response('Internal error', { status: 500 })
  }
}

/**
 * ShareASale Webhook Handler
 */
export async function handleShareASaleWebhook(request) {
  try {
    const data = await request.json()
    
    const {
      transactionId,
      merchantId,
      clickId,
      saleAmount,
      commissionAmount,
      orderNumber,
      transDate,
      status // pending, approved, void
    } = data

    // Similar logic
    
    return new Response('Webhook processed', { status: 200 })
  } catch (error) {
    console.error('ShareASale Webhook error:', error)
    return new Response('Internal error', { status: 500 })
  }
}

/**
 * Validate webhook signature
 */
function validateSignature(signature, body) {
  // Implement signature validation based on network's method
  // Usually HMAC SHA256 with secret key
  const crypto = require('crypto')
  const hash = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(JSON.stringify(body))
    .digest('hex')
  
  return hash === signature
}

/**
 * MANUAL TRANSACTION SYNC (Run periodically via cron)
 * Some networks don't have webhooks, so we need to poll their API
 */
export async function syncTransactions() {
  try {
    // Example: AWIN API
    const response = await fetch('https://api.awin.com/transactions', {
      headers: {
        'Authorization': `Bearer ${process.env.AWIN_API_TOKEN}`
      }
    })

    const transactions = await response.json()

    for (const trans of transactions) {
      // Process each transaction similar to webhook handler
      await processTransaction(trans)
    }

    console.log(`Synced ${transactions.length} transactions`)
  } catch (error) {
    console.error('Sync error:', error)
  }
}

/**
 * SUPABASE DATABASE FUNCTIONS (Run these in SQL editor)
 */
const databaseFunctions = `
-- Function to increment store clicks
CREATE OR REPLACE FUNCTION increment_store_clicks(store_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE stores
  SET total_clicks = total_clicks + 1
  WHERE id = store_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment store conversions
CREATE OR REPLACE FUNCTION increment_store_conversions(store_id UUID, commission DECIMAL)
RETURNS void AS $$
BEGIN
  UPDATE stores
  SET 
    total_conversions = total_conversions + 1,
    total_commission_earned = total_commission_earned + commission
  WHERE id = store_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`

/**
 * DEPLOYMENT INSTRUCTIONS
 * 
 * 1. Deploy as Supabase Edge Function:
 *    - supabase functions deploy affiliate-webhook
 * 
 * 2. Or deploy to Vercel:
 *    - Create /api/webhooks/awin.js
 *    - Export handler: export default handleAwinWebhook
 * 
 * 3. Set environment variables:
 *    - SUPABASE_URL
 *    - SUPABASE_SERVICE_ROLE_KEY
 *    - WEBHOOK_SECRET
 *    - AWIN_API_TOKEN (for sync)
 * 
 * 4. Configure webhook URLs in affiliate networks:
 *    - AWIN: https://yourdomain.com/api/webhooks/awin
 *    - CJ: https://yourdomain.com/api/webhooks/cj
 *    - ShareASale: https://yourdomain.com/api/webhooks/shareasale
 * 
 * 5. Set up cron job for sync:
 *    - Run syncTransactions() every 6 hours
 */
