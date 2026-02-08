// DealCash Configuration
// Replace these values with your actual Supabase credentials

const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL',  // e.g., 'https://xxxxx.supabase.co'
    anonKey: 'YOUR_SUPABASE_ANON_KEY'  // Your public anon key
};

// Initialize Supabase client
const supabase = window.supabase.createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey
);

// ==========================================
// SETUP INSTRUCTIONS:
// ==========================================
// 1. Go to https://supabase.com and create a free account
// 2. Create a new project
// 3. Go to Project Settings → API
// 4. Copy your Project URL and paste above
// 5. Copy your anon/public key and paste above
// 6. Save this file as 'config.js'
// 7. Include it in all your HTML files:
//    <script src="config.js"></script>
// ==========================================
