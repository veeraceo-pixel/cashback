// ================================================================
// WITHDRAWAL HANDLER
// User requests withdrawal → we manually process via PayPal/bank
// Future: connect PayPal Payouts API for automatic processing
// ================================================================
import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Not authenticated' });

  // Verify Supabase JWT
  const token = authHeader.replace('Bearer ', '');
  const sbUser = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const { data: { user }, error } = await sbUser.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: 'Invalid token' });

  const { amount, method, accountDetails } = req.body;

  // Validate minimum £10
  if (!amount || amount < 10) return res.status(400).json({ error: 'Minimum withdrawal is £10' });

  // Check user has enough confirmed balance
  const { data: profile } = await sb.from('users').select('total_cashback').eq('id', user.id).single();
  if (!profile || profile.total_cashback < amount) {
    return res.status(400).json({ error: 'Insufficient confirmed balance' });
  }

  // Create withdrawal request
  await sb.from('withdrawals').insert({
    user_id:         user.id,
    amount,
    method,           // 'bank_transfer' | 'paypal' | 'gift_card'
    status:          'pending',  // admin processes manually for now
    account_details: accountDetails,
    requested_at:    new Date().toISOString()
  });

  // Deduct from balance
  await sb.from('users').update({
    total_cashback: profile.total_cashback - amount
  }).eq('id', user.id);

  // TODO: Future — trigger PayPal Payouts API here automatically:
  // await paypalPayout(accountDetails.paypalEmail, amount);

  return res.status(200).json({
    ok: true,
    message: `Withdrawal of £${amount} requested. We process within 24 hours on weekdays.`
  });
}
