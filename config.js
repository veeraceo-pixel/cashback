// DealCash Configuration
// =====================================================
// IMPORTANT: Replace these values with your actual Supabase credentials
// DO NOT commit this file to version control if it contains real keys
// =====================================================

const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL',  // e.g., 'https://xxxxx.supabase.co'
    anonKey: 'YOUR_SUPABASE_ANON_KEY'  // Your public anon key
};

// Initialize Supabase client (automatically used by index.html)
let supabase;
if (typeof window !== 'undefined' && window.supabase) {
    supabase = window.supabase.createClient(
        SUPABASE_CONFIG.url,
        SUPABASE_CONFIG.anonKey
    );
}

// ==========================================
// SETUP INSTRUCTIONS:
// ==========================================
// 1. Go to https://supabase.com and create a free account
// 2. Create a new project
// 3. Go to Project Settings → API
// 4. Copy your Project URL and paste above (replace YOUR_SUPABASE_URL)
// 5. Copy your anon/public key and paste above (replace YOUR_SUPABASE_ANON_KEY)
// 6. Save this file
// 7. Make sure this file is included in all your HTML files BEFORE the main script
// ==========================================

// Example of what your config should look like:
// const SUPABASE_CONFIG = {
//     url: 'https://abcdefghijk.supabase.co',
//     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
// };
