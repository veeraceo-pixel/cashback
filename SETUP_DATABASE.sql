-- ================================================================
-- SMARTCASH — Run this in your Supabase SQL Editor
-- supabase.com → Your Project → SQL Editor → Paste & Run
-- ================================================================

-- 1. Add missing columns to clicks table (if schema already applied)
ALTER TABLE public.clicks 
  ADD COLUMN IF NOT EXISTS store_slug TEXT,
  ADD COLUMN IF NOT EXISTS store_name TEXT,
  ADD COLUMN IF NOT EXISTS cashback_rate DECIMAL(5,2),
  ADD COLUMN IF NOT EXISTS session_url TEXT,
  ADD COLUMN IF NOT EXISTS user_agent TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'clicked';

-- 2. Ensure users table has all needed columns
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS total_cashback DECIMAL(10,2) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS pending_cashback DECIMAL(10,2) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS withdrawn_cashback DECIMAL(10,2) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS bank_account_details JSONB,
  ADD COLUMN IF NOT EXISTS paypal_email TEXT;

-- 3. Withdrawals table  
CREATE TABLE IF NOT EXISTS public.withdrawals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('bank_transfer','paypal','gift_card')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','paid','failed')),
  account_details JSONB,
  notes TEXT,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,
  transaction_ref TEXT
);

-- 4. Row Level Security — users only see their own data
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_own_clicks" ON public.clicks;
CREATE POLICY "users_own_clicks" ON public.clicks
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_own_transactions" ON public.transactions;
CREATE POLICY "users_own_transactions" ON public.transactions
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_own_withdrawals" ON public.withdrawals;
CREATE POLICY "users_own_withdrawals" ON public.withdrawals
  FOR ALL USING (auth.uid() = user_id);

-- 5. Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, referral_code)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    'SC' || upper(substr(encode(gen_random_bytes(4),'hex'), 1, 6))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Function to credit cashback (called by webhook)
CREATE OR REPLACE FUNCTION public.credit_cashback(
  p_user_id UUID,
  p_click_id TEXT,
  p_amount DECIMAL,
  p_store TEXT,
  p_order_ref TEXT,
  p_status TEXT DEFAULT 'pending'
) RETURNS void AS $$
BEGIN
  -- Insert transaction record
  INSERT INTO public.transactions (
    user_id, click_id, store_id, transaction_id, 
    cashback_amount, status, created_at
  )
  SELECT 
    p_user_id,
    c.id,
    c.store_id,
    p_order_ref,
    p_amount,
    p_status,
    NOW()
  FROM public.clicks c
  WHERE c.click_id = p_click_id
  ON CONFLICT (transaction_id) DO UPDATE SET status = p_status;

  -- Update user balance
  IF p_status = 'confirmed' THEN
    UPDATE public.users SET
      total_cashback = total_cashback + p_amount,
      updated_at = NOW()
    WHERE id = p_user_id;
  ELSIF p_status = 'pending' THEN
    UPDATE public.users SET
      pending_cashback = pending_cashback + p_amount,
      updated_at = NOW()
    WHERE id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_clicks_click_id ON public.clicks(click_id);
CREATE INDEX IF NOT EXISTS idx_clicks_user_id ON public.clicks(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_user ON public.withdrawals(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status ON public.withdrawals(status);

SELECT 'Database setup complete ✓' as status;
