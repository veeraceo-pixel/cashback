// ================================================================
// AMAZON RECONCILIATION — Manual monthly process
// Amazon doesn't send webhooks. This endpoint lets you paste in
// your Amazon Associates monthly report CSV and it matches orders
// to users based on click timestamps.
// ================================================================
// Access at: /api/amazon-reconcile (admin only, needs ADMIN_KEY header)

import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // Admin auth
  if (req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Expects: { orders: [{date, category, commission, orderRef}] }
  const { orders } = req.body;
  let credited = 0;

  for (const order of orders) {
    const orderDate = new Date(order.date);
    const windowStart = new Date(orderDate - 24*60*60*1000); // ±24h window

    // Find Amazon clicks in that time window
    const { data: clicks } = await sb
      .from('clicks')
      .select('click_id, user_id')
      .eq('store_slug', 'amazon')
      .gte('created_at', windowStart.toISOString())
      .lte('created_at', orderDate.toISOString())
      .order('created_at', { ascending: false })
      .limit(1);

    if (clicks?.length) {
      const click = clicks[0];
      const cashbackAmt = parseFloat((order.commission * 0.85).toFixed(2));

      await sb.rpc('credit_cashback', {
        p_user_id:   click.user_id,
        p_click_id:  click.click_id,
        p_amount:    cashbackAmt,
        p_store:     'Amazon UK',
        p_order_ref: order.orderRef,
        p_status:    'confirmed'
      });
      credited++;
    }
  }

  return res.status(200).json({ credited, total: orders.length });
}
