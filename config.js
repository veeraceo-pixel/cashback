// SmartCash Configuration
// Replace these with your actual Supabase credentials
const SUPABASE_CONFIG = {
    url: 'https://nnmkgtravghlowohlffw.supabase.co',        // e.g., https://xxxxx.supabase.co
    anonKey: 'sb_publishable_RepdEqTk8_jPgsSYOhYcgQ_bfmwPUnD' // Your public anon key
};

// Claude AI (Anthropic) - for AI Shopping Assistant
// Get from https://console.anthropic.com
const AI_CONFIG = {
    enabled: true,   // Set to false to disable AI features
    model: 'claude-sonnet-4-20250514'
};

// Amazon Associates - for order sync
const AMAZON_CONFIG = {
    associateId: 'veeraseo-21',  // e.g., yoursite-21
    region: 'uk'
};
