// SmartCash — AWIN S2S Postback /api/awin-postback
// Configure in AWIN: Settings → Postback URL → https://cashback-eight.vercel.app/api/awin-postback
import { createClient } from '@supabase/supabase-js';
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
export default async function handler(req, res) {
  const q = req.method === 'GET' ? req.query : req.body;
  const { clickref, amount, transid, status } = q;
  if (!clickref || !amount || !transid) return res.status(400).json({ error: 'Missing params' });
  if (!clickref.startsWith('SC')) return res.status(200).json({ ok: true, note: 'Not SmartCash click' });
  const ourStatus = { approved:'confirmed', pending:'pending', declined:'declined' }[status]||'pending';
  const { data, error } = await sb.rpc('process_s2s_postback', {
    p_click_id: clickref, p_commission: parseFloat(amount)||0,
    p_order_ref: transid, p_network: 'awin', p_status: ourStatus, p_raw: q,
  });
  if (error) { console.error(error); return res.status(500).json({ error: error.message }); }
  return res.status(200).json({ ok: true, ...data });
}
