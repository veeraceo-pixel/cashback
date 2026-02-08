# 💻 CODE IMPLEMENTATION GUIDE + API COSTS

## 🔧 DO YOU NEED TO CHANGE CODE? YES!

**Current State:** Your code has basic cashback tracking
**To Add Features:** You'll need to modify/add code for each new feature

Let me show you what changes are needed for each feature:

---

## 📝 FEATURE IMPLEMENTATION BREAKDOWN

### **1. INSTANT CASHBACK CALCULATOR** ⚡

**Code Changes Required:** MINIMAL (Easy to add)

**Where to modify:** `index.html` - Add to each store card

**New code to add:**
```javascript
// Add this component to index.html
function CashbackCalculator({ store }) {
    const [amount, setAmount] = React.useState('');
    
    const cashback = amount ? (parseFloat(amount) * store.cashback_rate / 100).toFixed(2) : '0.00';
    
    return (
        <div style={{
            background: '#f0f9ff',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem'
        }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                💰 Calculate Your Cashback
            </label>
            <input
                type="number"
                placeholder="Enter amount (£)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '2px solid #ddd',
                    borderRadius: '6px',
                    marginBottom: '0.5rem'
                }}
            />
            {amount && (
                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#28a745',
                    textAlign: 'center'
                }}>
                    You'll earn: £{cashback}
                </div>
            )}
        </div>
    );
}
```

**Then add to your store cards (around line 550-580 in index.html):**
```javascript
// Inside the store card rendering
<div className="store-card" key={store.id}>
    {/* existing store info */}
    <div className="cashback-rate">{store.cashback_rate}% Cashback</div>
    
    {/* ADD THIS LINE */}
    <CashbackCalculator store={store} />
    
    <button onClick={() => shopNow(store)}>Shop Now</button>
</div>
```

**Database Changes:** NONE needed ✅
**API Calls:** NONE needed ✅
**Difficulty:** 🟢 EASY (10 minutes)

---

### **2. LOWER WITHDRAWAL MINIMUM** 💸

**Code Changes Required:** MINIMAL (Just change a number)

**Where to modify:** `dashboard.html` and database

**1. Update dashboard.html (around line 200-250):**
```javascript
// Find the withdrawal function
function handleWithdraw() {
    const MIN_WITHDRAWAL = 5.00; // Changed from 10.00 or 50.00
    
    if (withdrawAmount < MIN_WITHDRAWAL) {
        alert(`Minimum withdrawal is £${MIN_WITHDRAWAL}`);
        return;
    }
    // rest of code stays same
}
```

**2. Update database constraint:**
```sql
-- Run in Supabase SQL Editor
ALTER TABLE withdrawals 
DROP CONSTRAINT IF EXISTS minimum_withdrawal;

ALTER TABLE withdrawals
ADD CONSTRAINT minimum_withdrawal 
CHECK (amount >= 5.00); -- Changed from 50.00
```

**Database Changes:** 1 SQL command
**API Calls:** NONE needed ✅
**Difficulty:** 🟢 VERY EASY (2 minutes)

---

### **3. RECEIPT UPLOAD SYSTEM** 📸

**Code Changes Required:** MODERATE

**New database table needed:**
```sql
-- Run in Supabase SQL Editor
CREATE TABLE purchase_proofs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    transaction_id UUID REFERENCES transactions(id),
    receipt_url TEXT,
    receipt_file_name TEXT,
    purchase_amount DECIMAL(10,2),
    store_name TEXT,
    purchase_date DATE,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected
    admin_notes TEXT,
    uploaded_at TIMESTAMP DEFAULT NOW(),
    reviewed_at TIMESTAMP
);
```

**Add to dashboard.html:**
```javascript
// Add this component
function ReceiptUpload() {
    const [file, setFile] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    
    async function handleUpload() {
        if (!file) return;
        
        setUploading(true);
        
        try {
            // Upload to Supabase Storage
            const fileName = `${user.id}_${Date.now()}_${file.name}`;
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('receipts')
                .upload(fileName, file);
            
            if (uploadError) throw uploadError;
            
            // Get public URL
            const { data: urlData } = supabase
                .storage
                .from('receipts')
                .getPublicUrl(fileName);
            
            // Create proof record
            await supabase.from('purchase_proofs').insert({
                user_id: user.id,
                receipt_url: urlData.publicUrl,
                receipt_file_name: file.name,
                status: 'pending'
            });
            
            alert('Receipt uploaded! We\'ll review within 24 hours.');
            setFile(null);
        } catch (error) {
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    }
    
    return (
        <div style={{ padding: '1rem', background: '#fff', borderRadius: '8px' }}>
            <h3>📸 Missing a Purchase?</h3>
            <p>Upload your receipt and we'll manually credit your cashback</p>
            <input 
                type="file" 
                accept="image/*,.pdf"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <button 
                onClick={handleUpload}
                disabled={!file || uploading}
                style={{ marginTop: '1rem' }}
            >
                {uploading ? 'Uploading...' : 'Upload Receipt'}
            </button>
        </div>
    );
}
```

**Supabase Storage Setup:**
1. Go to Supabase Dashboard → Storage
2. Create bucket named "receipts"
3. Set it to public

**Database Changes:** 1 new table
**API Calls:** Supabase Storage (FREE tier: 1GB storage)
**Difficulty:** 🟡 MODERATE (30 minutes)

---

### **4. GAMIFICATION (STREAKS & CHALLENGES)** 🎮

**Code Changes Required:** MODERATE-HIGH

**Database changes:**
```sql
-- Add to users table
ALTER TABLE users
ADD COLUMN streak_days INTEGER DEFAULT 0,
ADD COLUMN last_purchase_date DATE,
ADD COLUMN streak_bonus_multiplier DECIMAL(3,2) DEFAULT 1.00;

-- Create challenges table
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    reward_amount DECIMAL(10,2),
    reward_type TEXT, -- bonus_cashback, multiplier
    requirement_type TEXT, -- days_streak, store_count, total_amount
    requirement_value INTEGER,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true
);

-- User challenge progress
CREATE TABLE user_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    challenge_id UUID REFERENCES challenges(id),
    current_progress INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP,
    reward_claimed BOOLEAN DEFAULT false
);

-- Insert sample challenges
INSERT INTO challenges (name, description, reward_amount, reward_type, requirement_type, requirement_value, start_date, end_date) VALUES
('7 Day Streak', 'Shop 7 days in a row', 5.00, 'bonus_cashback', 'days_streak', 7, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days'),
('Big Spender', 'Earn £50 cashback this month', 10.00, 'bonus_cashback', 'total_amount', 50, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days'),
('Store Explorer', 'Shop at 5 different stores', 3.00, 'bonus_cashback', 'store_count', 5, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days');
```

**Add to dashboard.html:**
```javascript
function StreakTracker({ user }) {
    const streakBonuses = [
        { days: 7, bonus: '10%', color: '#ffd700' },
        { days: 14, bonus: '20%', color: '#ff6b6b' },
        { days: 30, bonus: '50%', color: '#a855f7' }
    ];
    
    return (
        <div className="streak-card" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '1rem'
        }}>
            <h3>🔥 Shopping Streak</h3>
            <div style={{ fontSize: '3rem', fontWeight: '800' }}>
                {user.streak_days} days
            </div>
            <p>Keep shopping daily to unlock bonus cashback!</p>
            
            <div style={{ marginTop: '1rem' }}>
                {streakBonuses.map(s => (
                    <div key={s.days} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.5rem',
                        background: user.streak_days >= s.days ? s.color : 'rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        marginBottom: '0.5rem'
                    }}>
                        <span>{s.days} days streak</span>
                        <span>{s.bonus} bonus</span>
                        {user.streak_days >= s.days && <span>✅</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ChallengesPanel() {
    const [challenges, setChallenges] = React.useState([]);
    
    React.useEffect(() => {
        loadChallenges();
    }, []);
    
    async function loadChallenges() {
        const { data } = await supabase
            .from('challenges')
            .select(`
                *,
                user_challenges!left(current_progress, completed)
            `)
            .eq('is_active', true);
        
        setChallenges(data || []);
    }
    
    return (
        <div className="challenges-section">
            <h2>🎯 Active Challenges</h2>
            {challenges.map(c => (
                <div key={c.id} className="challenge-card" style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                }}>
                    <h4>{c.name}</h4>
                    <p>{c.description}</p>
                    <div style={{ marginTop: '0.5rem' }}>
                        <div style={{
                            background: '#e0e0e0',
                            height: '8px',
                            borderRadius: '4px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                background: '#28a745',
                                width: `${(c.user_challenges?.[0]?.current_progress / c.requirement_value) * 100}%`,
                                height: '100%'
                            }} />
                        </div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                            Progress: {c.user_challenges?.[0]?.current_progress || 0} / {c.requirement_value}
                        </div>
                    </div>
                    <div style={{ 
                        marginTop: '1rem',
                        color: '#28a745',
                        fontWeight: '600'
                    }}>
                        Reward: £{c.reward_amount} bonus
                    </div>
                </div>
            ))}
        </div>
    );
}
```

**Update transaction creation to track streaks:**
```javascript
// In webhook-handler.js or when creating transaction
async function updateStreak(userId) {
    const { data: user } = await supabase
        .from('users')
        .select('last_purchase_date, streak_days')
        .eq('id', userId)
        .single();
    
    const today = new Date().toISOString().split('T')[0];
    const lastPurchase = user.last_purchase_date;
    
    let newStreak = user.streak_days;
    
    if (!lastPurchase) {
        newStreak = 1;
    } else {
        const daysDiff = Math.floor((new Date(today) - new Date(lastPurchase)) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
            newStreak += 1; // Consecutive day
        } else if (daysDiff > 1) {
            newStreak = 1; // Streak broken
        }
        // daysDiff === 0 means same day, don't change streak
    }
    
    await supabase
        .from('users')
        .update({
            last_purchase_date: today,
            streak_days: newStreak
        })
        .eq('id', userId);
}
```

**Database Changes:** 3 new tables + 3 columns
**API Calls:** NONE needed ✅
**Difficulty:** 🟠 MODERATE-HIGH (2-3 hours)

---

### **5. AI SHOPPING ASSISTANT** 🤖

**Code Changes Required:** MODERATE

**⚠️ THIS ONE REQUIRES CLAUDE API (COSTS MONEY)**

**Add to dashboard.html or create new page:**
```javascript
function AIAssistant() {
    const [query, setQuery] = React.useState('');
    const [response, setResponse] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    
    async function askAI() {
        setLoading(true);
        
        try {
            // Call your backend API
            const res = await fetch('/api/ai-assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: query,
                    userId: user.id
                })
            });
            
            const data = await res.json();
            setResponse(data.answer);
        } catch (error) {
            alert('AI Assistant error: ' + error.message);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px' }}>
            <h2>🤖 AI Shopping Assistant</h2>
            <p>Ask me anything about cashback, deals, or shopping!</p>
            
            <textarea
                placeholder="e.g., 'Where can I get the best cashback on laptops?'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={3}
                style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                }}
            />
            
            <button onClick={askAI} disabled={loading || !query}>
                {loading ? 'Thinking...' : 'Ask AI'}
            </button>
            
            {response && (
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: '#f0f9ff',
                    borderRadius: '8px'
                }}>
                    {response}
                </div>
            )}
        </div>
    );
}
```

**Backend API (Supabase Edge Function or Vercel):**
```typescript
// /api/ai-assistant.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

export default async function handler(req: Request) {
    const { query, userId } = await req.json();
    
    // Get user's shopping history
    const { data: history } = await supabase
        .from('transactions')
        .select('*, stores(name, category, cashback_rate)')
        .eq('user_id', userId)
        .order('transaction_date', { ascending: false })
        .limit(10);
    
    // Get current store rates
    const { data: stores } = await supabase
        .from('stores')
        .select('name, cashback_rate, category')
        .eq('is_active', true)
        .order('cashback_rate', { ascending: false });
    
    const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
            role: 'user',
            content: `You are a helpful shopping assistant for a cashback platform.
            
User's question: ${query}

User's recent purchases:
${JSON.stringify(history, null, 2)}

Current store cashback rates:
${JSON.stringify(stores, null, 2)}

Provide helpful, specific recommendations based on the data above.`
        }]
    });
    
    return new Response(JSON.stringify({
        answer: message.content[0].text
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}
```

**Database Changes:** NONE needed ✅
**API Calls:** Claude API (COSTS MONEY - see below)
**Difficulty:** 🟡 MODERATE (1 hour)

---

## 💰 CLAUDE API COSTS

### **Claude API Pricing (as of Feb 2024):**

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|----------------------|
| Claude Sonnet 4 | $3.00 | $15.00 |
| Claude Haiku | $0.25 | $1.25 |

**What does this mean in practice?**

**Typical AI Assistant query:**
- Input: ~500 tokens (user question + context)
- Output: ~200 tokens (AI answer)

**Cost per query:**
- Sonnet: $0.0015 + $0.003 = **$0.0045 (~£0.003)**
- Haiku: $0.000125 + $0.00025 = **$0.000375 (~£0.0003)**

**If you have 1,000 users asking 5 questions/month:**
- Sonnet: 5,000 queries × $0.0045 = **$22.50/month (~£18)**
- Haiku: 5,000 queries × $0.000375 = **$1.88/month (~£1.50)**

### **FREE API ALTERNATIVES:**

#### **1. Groq (FREE, Fast)** ✅ RECOMMENDED
```javascript
// Using Groq's free API
const GROQ_API_KEY = 'your_free_key'; // Get from groq.com

async function askGroq(query) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile', // FREE
            messages: [{
                role: 'user',
                content: query
            }]
        })
    });
    
    return await response.json();
}
```

**Groq Benefits:**
- ✅ **Completely FREE** (for now)
- ✅ Very fast (faster than GPT-4)
- ✅ Good quality (Llama 3.3 70B)
- ✅ No credit card required
- ❌ May have rate limits

**Get free API key:** https://console.groq.com

---

#### **2. Hugging Face (FREE)** ✅
```javascript
const HF_API_KEY = 'your_free_key'; // Get from huggingface.co

async function askHuggingFace(query) {
    const response = await fetch(
        'https://api-inference.huggingface.co/models/meta-llama/Llama-3.3-70B-Instruct',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HF_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: query
            })
        }
    );
    
    return await response.json();
}
```

**Hugging Face Benefits:**
- ✅ **Completely FREE**
- ✅ Many models available
- ✅ Easy to use
- ❌ Slower than Groq
- ❌ May have daily rate limits

**Get free API key:** https://huggingface.co/settings/tokens

---

#### **3. Together AI (FREE Tier)** ✅
```javascript
const TOGETHER_API_KEY = 'your_key';

async function askTogetherAI(query) {
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${TOGETHER_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
            messages: [{ role: 'user', content: query }]
        })
    });
    
    return await response.json();
}
```

**Together AI Benefits:**
- ✅ $25 free credits
- ✅ Very fast
- ✅ Good models
- ❌ Need to add payment method (won't be charged until credits run out)

**Get API key:** https://api.together.xyz

---

#### **4. OpenRouter (Multiple Providers)** ✅
```javascript
const OPENROUTER_API_KEY = 'your_key';

async function askOpenRouter(query) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'meta-llama/llama-3.3-70b-instruct:free', // FREE model
            messages: [{ role: 'user', content: query }]
        })
    });
    
    return await response.json();
}
```

**OpenRouter Benefits:**
- ✅ Has FREE models
- ✅ Access to multiple providers
- ✅ Fallback system
- ❌ Free models may be slower

**Get API key:** https://openrouter.ai

---

## 🎯 RECOMMENDED APPROACH (FREE!)

### **Use Groq for AI Assistant** (Best Free Option)

```javascript
// Complete free AI assistant implementation
async function AIAssistant() {
    const GROQ_API_KEY = process.env.GROQ_API_KEY; // FREE from groq.com
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{
                role: 'system',
                content: 'You are a helpful shopping assistant for a cashback platform. Provide concise, actionable advice.'
            }, {
                role: 'user',
                content: `User's question: ${query}
                
Available stores and rates:
${storesData}

Please recommend the best options.`
            }],
            temperature: 0.7,
            max_tokens: 500
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
}
```

---

## 📊 FEATURE IMPLEMENTATION SUMMARY

| Feature | Code Changes | New Tables | API Cost | Time | Difficulty |
|---------|--------------|------------|----------|------|------------|
| Instant Calculator | Minimal | 0 | FREE | 10 min | 🟢 Easy |
| £5 Withdrawal | Tiny | 0 | FREE | 2 min | 🟢 Easy |
| Receipt Upload | Moderate | 1 | FREE* | 30 min | 🟡 Medium |
| Gamification | Significant | 3 | FREE | 2-3 hrs | 🟠 Med-High |
| AI Assistant | Moderate | 0 | FREE** | 1 hr | 🟡 Medium |

*Supabase Storage: Free tier = 1GB
**Using Groq free API

---

## ✅ QUICK START PRIORITY

**Week 1 (FREE, Easy):**
1. Instant cashback calculator → 10 minutes
2. £5 minimum withdrawal → 2 minutes
3. Set up Groq API account → 5 minutes

**Week 2 (FREE, Medium):**
4. Receipt upload system → 30 minutes
5. Basic AI assistant with Groq → 1 hour

**Week 3-4 (FREE, Takes time):**
6. Gamification (streaks/challenges) → 2-3 hours

**Cost so far: £0** ✅

---

## 🚀 BOTTOM LINE

**YES, you need code changes** - but they're all manageable!

**FREE AI Options:**
1. **Groq** - Best choice (fast, free, quality)
2. **Hugging Face** - Backup option
3. **OpenRouter** - Multiple providers

**Claude API:**
- Only needed if you want THE BEST quality
- Cost: ~£18/month for 1,000 users
- Can start FREE with Groq, upgrade later if needed

**My Recommendation:**
Start with FREE Groq API, see if users like it. If they love it and you're making money, upgrade to Claude API for even better quality!

Want me to show you the exact code to implement any specific feature? 🚀
