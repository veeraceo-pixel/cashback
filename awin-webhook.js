// ================================================================
// SMARTCASH — AWIN Webhook Handler
// Deploy: this file goes in /api/awin-webhook.js in your repo
// Vercel auto-deploys it as: cashback-eight.vercel.app/api/awin-webhook
// Then set this URL in AWIN dashboard → Programme → Transactions → Webhook
// ================================================================
import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // service role — never expose this
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const tx = req.body;

    // AWIN sends: clickRef (our click_id), commissionAmount, status, transactionId
    const { clickRef, commissionAmount, transactionId, status, saleAmount } = tx;

    if (!clickRef || !clickRef.startsWith('sc_')) {
      return res.status(200).json({ ok: true, note: 'Not a SmartCash click' });
    }

    // Find the click in our DB
    const { data: click } = await sb
      .from('clicks')
      .select('id, user_id, store_name, cashback_rate')
      .eq('click_id', clickRef)
      .single();

    if (!click) {
      console.error('Click not found:', clickRef);
      return res.status(200).json({ ok: true, note: 'Click not found' });
    }

    // Calculate cashback = commission × 85% (we keep 15%)
    // e.g. AWIN pays us £10 commission → user gets £8.50
    const commission   = parseFloat(commissionAmount) || 0;
    const cashbackAmt  = parseFloat((commission * 0.85).toFixed(2));
    const txStatus     = status === 'approved' ? 'confirmed' : 'pending';

    // Credit to user
    await sb.rpc('credit_cashback', {
      p_user_id:   click.user_id,
      p_click_id:  clickRef,
      p_amount:    cashbackAmt,
      p_store:     click.store_name,
      p_order_ref: transactionId,
      p_status:    txStatus
    });

    // Update click status
    await sb.from('clicks').update({ status: txStatus }).eq('click_id', clickRef);

    // Send email notification to user (via Supabase email or Resend.com — free tier)
    if (txStatus === 'confirmed') {
      await sb.from('notifications').insert({
        user_id: click.user_id,
        type:    'cashback_confirmed',
        title:   `£${cashbackAmt} cashback confirmed from ${click.store_name}!`,
        body:    `Your cashback of £${cashbackAmt} from ${click.store_name} has been confirmed and added to your balance.`,
        read:    false
      }).throwOnError().catch(() => {}); // notifications table optional
    }

    return res.status(200).json({ ok: true, credited: cashbackAmt });
  } catch (e) {
    console.error('Webhook error:', e);
    return res.status(500).json({ error: e.message });
  }
}
