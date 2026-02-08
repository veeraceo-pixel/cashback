-- =====================================================
-- ADMIN SETUP - Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Add is_admin column to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Step 2: Create index for performance
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON public.users(is_admin);

-- Step 3: Make yourself an admin
-- ⚠️ IMPORTANT: Replace 'your-email@example.com' with YOUR actual email!
UPDATE public.users 
SET is_admin = true 
WHERE email = 'your-email@example.com';

-- To make multiple users admins:
-- UPDATE public.users 
-- SET is_admin = true 
-- WHERE email IN ('admin1@example.com', 'admin2@example.com');

-- =====================================================
-- ADMIN ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Allow admins to view all users
CREATE POLICY IF NOT EXISTS "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Allow admins to update any user
CREATE POLICY IF NOT EXISTS "Admins can update all users" ON public.users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Allow admins to manage stores (all operations)
CREATE POLICY IF NOT EXISTS "Admins can manage all stores" ON public.stores
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Allow admins to view all transactions
CREATE POLICY IF NOT EXISTS "Admins can view all transactions" ON public.transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Allow admins to update transactions (approve, reject, etc.)
CREATE POLICY IF NOT EXISTS "Admins can update transactions" ON public.transactions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Allow admins to view all withdrawals
CREATE POLICY IF NOT EXISTS "Admins can view all withdrawals" ON public.withdrawals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Allow admins to update withdrawals (approve, process, etc.)
CREATE POLICY IF NOT EXISTS "Admins can update withdrawals" ON public.withdrawals
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Allow admins to view all clicks
CREATE POLICY IF NOT EXISTS "Admins can view all clicks" ON public.clicks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if is_admin column was added successfully
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'is_admin';

-- View all admin users
SELECT id, email, full_name, is_admin, created_at 
FROM public.users 
WHERE is_admin = true;

-- Count total admins
SELECT COUNT(*) as total_admins 
FROM public.users 
WHERE is_admin = true;

-- =====================================================
-- DONE! 
-- =====================================================
-- After running this:
-- 1. Verify your email appears in the admin users list above
-- 2. Use the secured admin.html file
-- 3. Login with your credentials
-- 4. You should now have admin access!
-- =====================================================
