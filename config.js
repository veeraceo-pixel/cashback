// SmartCash Configuration
// Replace these with your actual Supabase credentials
const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL',        // e.g., https://xxxxx.supabase.co
    anonKey: 'YOUR_SUPABASE_ANON_KEY' // Your public anon key
};

// Claude AI (Anthropic) - for AI Shopping Assistant
// Get from https://console.anthropic.com
const AI_CONFIG = {
    enabled: true,   // Set to false to disable AI features
    model: 'claude-sonnet-4-20250514'
};

// Amazon Associates - for order sync
const AMAZON_CONFIG = {
    associateId: 'YOUR_AMAZON_ASSOCIATE_ID',  // e.g., yoursite-21
    region: 'uk'
};
