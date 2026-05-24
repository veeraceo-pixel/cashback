-- ================================================================
-- SmartCash — Tracking Schema Migration
-- Run in: supabase.com → SQL Editor
-- Adds columns needed for the new tracking architecture
-- ================================================================

-- Add tracking metadata columns to clicks table
ALTER TABLE public.clicks
  ADD COLUMN IF NOT EXISTS device_type  TEXT CHECK (device_type IN ('mobile','desktop','tablet')),
  ADD COLUMN IF NOT EXISTS os           TEXT CHECK (os IN ('ios','android','desktop')),
  ADD COLUMN IF NOT EXISTS is_webview   BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS affiliate_url TEXT,
  ADD COLUMN IF NOT EXISTS postback_received_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS postback_raw  JSONB;

-- click_id index for fast S2S postback lookup (pt.4)
CREATE INDEX IF NOT EXISTS idx_clicks_click_id_fast
  ON public.clicks(click_id)
  WHERE status = 'clicked';

-- Partial index — pending clicks only (used by reconciliation)
CREATE INDEX IF NOT EXISTS idx_clicks_pending
  ON public.clicks(created_at DESC)
  WHERE status = 'clicked';

-- Function for S2S postback — called by AWIN webhook
-- Matches on click_id (≤32 char), credits user wallet
CREATE OR REPLACE FUNCTION public.process_s2s_postback(
  p_click_id      TEXT,
  p_commission    DECIMAL,
  p_order_ref     TEXT,
  p_network       TEXT DEFAULT 'awin',
  p_status        TEXT DEFAULT 'pending',
  p_raw           JSONB DEFAULT '{}'
) RETURNS jsonb AS $$
DECLARE
  v_click   public.clicks%ROWTYPE;
  v_cashback DECIMAL;
BEGIN
  -- Find the click record
  SELECT * INTO v_click
  FROM public.clicks
  WHERE click_id = p_click_id
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'click_id not found');
  END IF;

  -- Calculate cashback: 85% of commission to user, 15% platform margin
  v_cashback := ROUND((p_commission * 0.85)::NUMERIC, 2);

  -- Upsert transaction record
  INSERT INTO public.transactions (
    user_id, click_id, store_id, transaction_id,
    cashback_amount, commission_amount, network,
    status, created_at
  )
  SELECT
    v_click.user_id,
    p_click_id,
    v_click.store_slug,
    p_order_ref,
    v_cashback,
    p_commission,
    p_network,
    p_status,
    NOW()
  ON CONFLICT (transaction_id) DO UPDATE
    SET status = p_status,
        updated_at = NOW();

  -- Update click status + store postback metadata
  UPDATE public.clicks
  SET status = p_status,
      postback_received_at = NOW(),
      postback_raw = p_raw
  WHERE click_id = p_click_id;

  -- Credit user balance if confirmed
  IF p_status = 'confirmed' THEN
    UPDATE public.users
    SET total_cashback   = total_cashback + v_cashback,
        pending_cashback = GREATEST(0, pending_cashback - v_cashback),
        updated_at = NOW()
    WHERE id = v_click.user_id;
  ELSIF p_status = 'pending' THEN
    UPDATE public.users
    SET pending_cashback = pending_cashback + v_cashback,
        updated_at = NOW()
    WHERE id = v_click.user_id;
  END IF;

  RETURN jsonb_build_object(
    'ok', true,
    'user_id', v_click.user_id,
    'cashback_credited', v_cashback,
    'status', p_status
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

SELECT 'Tracking migration complete ✓' AS status;
