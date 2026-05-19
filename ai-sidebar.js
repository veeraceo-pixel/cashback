/* ============================================================
   SmartCash — AI Sidebar v2
   Voice-powered · Multi-store search · Unified basket
   One <script src="ai-sidebar.js"> on any page = done.
   ============================================================ */
(function () {

/* ══════════════════════════════════════════════════════════
   MOCK PRODUCT DATABASE
   In production: replace fetchProducts() with real API calls
   Amazon PA API / eBay Browse API / Flipkart Affiliate API
══════════════════════════════════════════════════════════ */
const MOCK_PRODUCTS = {
  tshirt: [
    { id:'t1', title:'Classic White Crew Neck Tee', price:12.99, store:'Amazon', rating:4.3, reviews:2841, img:'👕', cashback:4.5, badge:'Best Seller', url:'https://amazon.co.uk' },
    { id:'t2', title:'Premium Cotton Polo Shirt', price:18.50, store:'eBay', rating:4.1, reviews:924, img:'👔', cashback:3.2, badge:'', url:'https://ebay.co.uk' },
    { id:'t3', title:'Oversized Graphic Tee — Black', price:22.00, store:'Flipkart', rating:4.5, reviews:3120, img:'🖤', cashback:5.0, badge:'Hot 🔥', url:'https://flipkart.com' },
    { id:'t4', title:'Slim Fit V-Neck T-Shirt', price:9.99, store:'Amazon', rating:4.0, reviews:1560, img:'👕', cashback:4.5, badge:'', url:'https://amazon.co.uk' },
    { id:'t5', title:'Striped Breton Tee', price:24.99, store:'eBay', rating:4.6, reviews:780, img:'👕', cashback:3.2, badge:'Top Rated ⭐', url:'https://ebay.co.uk' },
    { id:'t6', title:'Organic Cotton Basic Tee', price:14.00, store:'Flipkart', rating:4.2, reviews:432, img:'🌿', cashback:5.0, badge:'Eco', url:'https://flipkart.com' },
    { id:'t7', title:'Pack of 3 Plain Tees', price:19.99, store:'Amazon', rating:4.4, reviews:5200, img:'👕', cashback:4.5, badge:'Value Pack', url:'https://amazon.co.uk' },
    { id:'t8', title:'Longline Drop Hem T-Shirt', price:16.50, store:'eBay', rating:3.9, reviews:290, img:'👕', cashback:3.2, badge:'', url:'https://ebay.co.uk' },
  ],
  shirt: [
    { id:'s1', title:'Oxford Button-Down Shirt', price:29.99, store:'Amazon', rating:4.4, reviews:1820, img:'👔', cashback:4.5, badge:'Best Seller', url:'https://amazon.co.uk' },
    { id:'s2', title:'Slim Fit Checked Shirt', price:34.00, store:'eBay', rating:4.2, reviews:640, img:'🔲', cashback:3.2, badge:'', url:'https://ebay.co.uk' },
    { id:'s3', title:'Linen Summer Shirt', price:27.50, store:'Flipkart', rating:4.6, reviews:910, img:'🌿', cashback:5.0, badge:'Summer Pick', url:'https://flipkart.com' },
    { id:'s4', title:'Formal White Dress Shirt', price:22.99, store:'Amazon', rating:4.1, reviews:2100, img:'🤵', cashback:4.5, badge:'', url:'https://amazon.co.uk' },
    { id:'s5', title:'Flannel Plaid Shirt', price:39.00, store:'eBay', rating:4.5, reviews:380, img:'🟥', cashback:3.2, badge:'Top Rated ⭐', url:'https://ebay.co.uk' },
    { id:'s6', title:'Denim Shirt — Indigo', price:31.00, store:'Flipkart', rating:4.3, reviews:560, img:'🔵', cashback:5.0, badge:'', url:'https://flipkart.com' },
  ],
  jeans: [
    { id:'j1', title:'Slim Fit Dark Wash Jeans', price:39.99, store:'Amazon', rating:4.3, reviews:3200, img:'👖', cashback:4.5, badge:'Best Seller', url:'https://amazon.co.uk' },
    { id:'j2', title:'Straight Leg Classic Jeans', price:45.00, store:'eBay', rating:4.5, reviews:1100, img:'👖', cashback:3.2, badge:'Top Rated ⭐', url:'https://ebay.co.uk' },
    { id:'j3', title:'Skinny Stretch Jeans', price:32.00, store:'Flipkart', rating:4.1, reviews:2800, img:'👖', cashback:5.0, badge:'', url:'https://flipkart.com' },
    { id:'j4', title:'Bootcut Relaxed Fit Jeans', price:49.99, store:'Amazon', rating:4.2, reviews:780, img:'👖', cashback:4.5, badge:'', url:'https://amazon.co.uk' },
    { id:'j5', title:'Distressed Ripped Jeans', price:37.50, store:'eBay', rating:4.0, reviews:920, img:'✂️', cashback:3.2, badge:'Trending 🔥', url:'https://ebay.co.uk' },
    { id:'j6', title:'High Waist Mom Jeans', price:28.00, store:'Flipkart', rating:4.6, reviews:4200, img:'👖', cashback:5.0, badge:'Hot 🔥', url:'https://flipkart.com' },
  ],
  shoes: [
    { id:'sh1', title:'Nike Air Max 90', price:89.99, store:'Amazon', rating:4.7, reviews:8200, img:'👟', cashback:4.5, badge:'Best Seller', url:'https://amazon.co.uk' },
    { id:'sh2', title:'Adidas Stan Smith', price:75.00, store:'eBay', rating:4.5, reviews:3400, img:'⚪', cashback:3.2, badge:'Classic', url:'https://ebay.co.uk' },
    { id:'sh3', title:'Casual Canvas Sneakers', price:29.99, store:'Flipkart', rating:4.2, reviews:1800, img:'👟', cashback:5.0, badge:'Budget Pick', url:'https://flipkart.com' },
    { id:'sh4', title:'Leather Oxford Shoes', price:64.99, store:'Amazon', rating:4.4, reviews:920, img:'👞', cashback:4.5, badge:'', url:'https://amazon.co.uk' },
    { id:'sh5', title:'Running Trainers Pro', price:55.00, store:'eBay', rating:4.3, reviews:2100, img:'🏃', cashback:3.2, badge:'Top Rated ⭐', url:'https://ebay.co.uk' },
    { id:'sh6', title:'Flip Flops Summer Set', price:12.99, store:'Flipkart', rating:4.0, reviews:5600, img:'🩴', cashback:5.0, badge:'', url:'https://flipkart.com' },
  ],
  headphones: [
    { id:'h1', title:'Sony WH-1000XM5 Wireless', price:279.00, store:'Amazon', rating:4.8, reviews:12400, img:'🎧', cashback:4.5, badge:'Best Overall', url:'https://amazon.co.uk' },
    { id:'h2', title:'AirPods Pro (2nd Gen)', price:219.00, store:'eBay', rating:4.7, reviews:9800, img:'🎵', cashback:3.2, badge:'Top Rated ⭐', url:'https://ebay.co.uk' },
    { id:'h3', title:'Boat Rockerz 450 Pro', price:29.99, store:'Flipkart', rating:4.1, reviews:45000, img:'🎶', cashback:5.0, badge:'Budget Pick', url:'https://flipkart.com' },
    { id:'h4', title:'JBL Tune 510BT', price:44.99, store:'Amazon', rating:4.3, reviews:3200, img:'🎧', cashback:4.5, badge:'', url:'https://amazon.co.uk' },
    { id:'h5', title:'Bose QuietComfort 45', price:259.00, store:'eBay', rating:4.6, reviews:4100, img:'🎵', cashback:3.2, badge:'Premium', url:'https://ebay.co.uk' },
    { id:'h6', title:'OnePlus Bullets Z2', price:19.99, store:'Flipkart', rating:4.2, reviews:22000, img:'🎶', cashback:5.0, badge:'Value', url:'https://flipkart.com' },
  ],
  laptop: [
    { id:'l1', title:'Apple MacBook Air M3', price:1099.00, store:'Amazon', rating:4.9, reviews:3200, img:'💻', cashback:4.5, badge:'Best Overall', url:'https://amazon.co.uk' },
    { id:'l2', title:'Dell Inspiron 15 i5', price:599.00, store:'eBay', rating:4.3, reviews:1800, img:'💼', cashback:3.2, badge:'Value Pick', url:'https://ebay.co.uk' },
    { id:'l3', title:'HP Pavilion 14 Laptop', price:449.00, store:'Flipkart', rating:4.1, reviews:8900, img:'💻', cashback:5.0, badge:'Budget', url:'https://flipkart.com' },
    { id:'l4', title:'Lenovo IdeaPad 5', price:549.00, store:'Amazon', rating:4.4, reviews:2100, img:'📱', cashback:4.5, badge:'', url:'https://amazon.co.uk' },
    { id:'l5', title:'Asus ZenBook 14 OLED', price:799.00, store:'eBay', rating:4.6, reviews:920, img:'✨', cashback:3.2, badge:'Top Rated ⭐', url:'https://ebay.co.uk' },
    { id:'l6', title:'Realme Book Slim', price:349.00, store:'Flipkart', rating:4.0, reviews:5400, img:'💻', cashback:5.0, badge:'Slim', url:'https://flipkart.com' },
  ],
  dress: [
    { id:'d1', title:'Floral Wrap Midi Dress', price:34.99, store:'Amazon', rating:4.4, reviews:2100, img:'👗', cashback:4.5, badge:'Best Seller', url:'https://amazon.co.uk' },
    { id:'d2', title:'Bodycon Evening Dress', price:42.00, store:'eBay', rating:4.2, reviews:680, img:'🖤', cashback:3.2, badge:'', url:'https://ebay.co.uk' },
    { id:'d3', title:'Summer Sundress Boho', price:22.99, store:'Flipkart', rating:4.5, reviews:3800, img:'🌺', cashback:5.0, badge:'Trending 🔥', url:'https://flipkart.com' },
    { id:'d4', title:'Linen Shirt Dress', price:38.00, store:'Amazon', rating:4.3, reviews:940, img:'👗', cashback:4.5, badge:'', url:'https://amazon.co.uk' },
    { id:'d5', title:'Cocktail Party Dress', price:55.00, store:'eBay', rating:4.6, reviews:420, img:'✨', cashback:3.2, badge:'Top Rated ⭐', url:'https://ebay.co.uk' },
    { id:'d6', title:'Casual Cotton Kurti', price:14.99, store:'Flipkart', rating:4.4, reviews:12000, img:'🌸', cashback:5.0, badge:'Value', url:'https://flipkart.com' },
  ],
};

const STORE_COLORS = {
  Amazon:  { bg:'rgba(255,153,0,.12)',  border:'rgba(255,153,0,.35)',  text:'#FF9900' },
  eBay:    { bg:'rgba(0,112,186,.12)',   border:'rgba(0,112,186,.35)',   text:'#0070BA' },
  Flipkart:{ bg:'rgba(40,116,240,.12)', border:'rgba(40,116,240,.35)', text:'#2874F0' },
};

/* ── basket state ── */
const basket = [];

/* ══════════════════════════════════════════════════════════
   INJECT HTML
══════════════════════════════════════════════════════════ */
document.body.insertAdjacentHTML('beforeend', `
<div id="sc-sidebar" aria-label="SmartCash AI Assistant">

  <!-- HEAD -->
  <div class="sc-sb-head">
    <div class="sc-sb-avatar">
      <span>🤖</span>
      <div class="sc-online-dot"></div>
    </div>
    <div style="flex:1;min-width:0">
      <div class="sc-sb-name">SmartCash AI</div>
      <div class="sc-sb-status" id="sc-status-txt">● Voice ready · 500+ stores</div>
    </div>
    <button class="sc-icon-btn" id="sc-basket-btn" onclick="SCAI.toggleBasket()" title="Your basket">
      🛒<span id="sc-basket-count" style="display:none">0</span>
    </button>
    <button class="sc-sb-close" onclick="SCAI.close()">✕</button>
  </div>

  <!-- MODE BAR -->
  <div class="sc-mode-bar">
    <button class="sc-mode active" data-mode="shop" onclick="SCAI.setMode('shop',this)">🛍️ Shop</button>
    <button class="sc-mode" data-mode="deals"  onclick="SCAI.setMode('deals',this)">🔥 Deals</button>
    <button class="sc-mode" data-mode="squad"  onclick="SCAI.setMode('squad',this)">👥 Squad</button>
    <button class="sc-mode" data-mode="price"  onclick="SCAI.setMode('price',this)">📊 Price</button>
  </div>

  <!-- SQUAD BAR -->
  <div class="sc-squad-bar" id="sc-squad-bar" style="display:none">
    <div class="sc-squad-members" id="sc-squad-members"></div>
    <button class="sc-invite-btn" onclick="SCAI.inviteToSquad()">+ Invite</button>
  </div>

  <!-- BASKET PANEL -->
  <div id="sc-basket-panel" style="display:none">
    <div class="sc-basket-head">
      <span>🛒 Your Basket</span>
      <span id="sc-basket-total">£0.00</span>
    </div>
    <div id="sc-basket-items"></div>
    <div class="sc-basket-stores" id="sc-basket-stores"></div>
    <button class="sc-checkout-all" onclick="SCAI.checkoutAll()">
      Checkout All Stores →
    </button>
    <div style="font-size:.68rem;color:rgba(255,255,255,.3);text-align:center;margin-top:.5rem">
      Each store opens with your cashback link pre-attached
    </div>
  </div>

  <!-- CHAT MESSAGES -->
  <div class="sc-msgs" id="sc-msgs"></div>

  <!-- QUICK REPLIES -->
  <div class="sc-quick-replies" id="sc-qr"></div>

  <!-- INPUT ROW -->
  <div class="sc-input-row">
    <button class="sc-mic-btn" id="sc-mic" onclick="SCAI.toggleVoice()" title="Hold to speak">
      <svg id="sc-mic-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v7a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zM8.5 18.5A7.5 7.5 0 0 0 19.5 12h2a9.5 9.5 0 0 1-9 9.47V23h-1v-1.53A9.5 9.5 0 0 1 2.5 12h2a7.5 7.5 0 0 0 6 7.35V18.5z"/></svg>
    </button>
    <input id="sc-input" class="sc-input" type="text"
      placeholder='Try: "blue tshirt under £20"'
      onkeydown="if(event.key==='Enter')SCAI.send()"
      autocomplete="off">
    <button class="sc-send" onclick="SCAI.send()">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
    </button>
  </div>

  <!-- VOICE OVERLAY -->
  <div id="sc-voice-overlay" style="display:none">
    <div class="sc-voice-ripple"></div>
    <div class="sc-voice-ripple" style="animation-delay:.3s"></div>
    <div class="sc-voice-ripple" style="animation-delay:.6s"></div>
    <div class="sc-voice-mic">🎙️</div>
    <div class="sc-voice-label" id="sc-voice-label">Listening…</div>
    <div class="sc-voice-transcript" id="sc-voice-transcript"></div>
    <button class="sc-voice-stop" onclick="SCAI.stopVoice()">Stop</button>
  </div>
</div>

<!-- TOGGLE FAB -->
<button id="sc-fab" onclick="SCAI.toggle()">
  <span id="sc-fab-icon">🤖</span>
  <span id="sc-fab-label">Ask AI</span>
  <span id="sc-fab-badge" class="sc-fab-badge" style="display:none">1</span>
</button>

<!-- SQUAD MODAL -->
<div id="sc-squad-modal" class="sc-modal-ov" onclick="if(event.target===this)SCAI.closeSquadModal()">
  <div class="sc-modal">
    <div class="sc-modal-head">
      <h3>👥 Start Squad Shopping</h3>
      <button class="sc-modal-close" onclick="SCAI.closeSquadModal()">✕</button>
    </div>
    <div class="sc-modal-body">
      <p style="color:rgba(255,255,255,.5);font-size:.85rem;margin-bottom:1.25rem">Shop in real-time with your crew. Vote on items, share baskets.</p>
      <div class="sc-squad-types">
        <div class="sc-squad-type active" onclick="SCAI.selectSquadType('couple',this)">💑<br>Couple</div>
        <div class="sc-squad-type" onclick="SCAI.selectSquadType('friends',this)">👯<br>Friends</div>
        <div class="sc-squad-type" onclick="SCAI.selectSquadType('family',this)">👨‍👩‍👧<br>Family</div>
        <div class="sc-squad-type" onclick="SCAI.selectSquadType('occasion',this)">🎉<br>Occasion</div>
      </div>
      <div class="sc-invite-link-box">
        <input id="sc-link-input" class="sc-link-input" readonly value="">
        <button class="sc-copy-btn" onclick="SCAI.copyLink()">Copy</button>
      </div>
      <button class="sc-start-btn" onclick="SCAI.startSquad()">Start Squad Shopping →</button>
    </div>
  </div>
</div>
`);

/* ══════════════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════════════ */
const style = document.createElement('style');
style.textContent = `
#sc-sidebar {
  position:fixed; top:0; right:0; bottom:0; width:380px;
  background:#0d1117; border-left:1px solid rgba(255,255,255,.07);
  display:flex; flex-direction:column; z-index:1000;
  transform:translateX(100%);
  transition:transform .35s cubic-bezier(.4,0,.2,1);
  font-family:-apple-system,BlinkMacSystemFont,'DM Sans',sans-serif;
  box-shadow:-12px 0 48px rgba(0,0,0,.4);
}
#sc-sidebar.open { transform:translateX(0); }
body.sc-open { padding-right:380px; transition:padding-right .35s cubic-bezier(.4,0,.2,1); }

/* HEAD */
.sc-sb-head {
  display:flex; align-items:center; gap:.6rem;
  padding:.9rem 1rem; background:#161b27;
  border-bottom:1px solid rgba(255,255,255,.07); flex-shrink:0;
}
.sc-sb-avatar {
  width:38px; height:38px;
  background:linear-gradient(135deg,#00C896,#00A07A);
  border-radius:10px; display:flex; align-items:center; justify-content:center;
  font-size:1.1rem; flex-shrink:0; position:relative;
}
.sc-online-dot {
  position:absolute; bottom:-2px; right:-2px;
  width:9px; height:9px; background:#4ade80;
  border-radius:50%; border:2px solid #161b27;
  animation:sc-pulse 2s infinite;
}
@keyframes sc-pulse{0%,100%{opacity:1}50%{opacity:.4}}
.sc-sb-name { color:#fff; font-weight:700; font-size:.88rem; }
.sc-sb-status { color:#4ade80; font-size:.67rem; margin-top:.1rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.sc-sb-close {
  background:rgba(255,255,255,.08); border:none; color:rgba(255,255,255,.5);
  width:26px; height:26px; border-radius:7px; cursor:pointer;
  display:flex; align-items:center; justify-content:center; font-size:.8rem;
  transition:all .2s; flex-shrink:0;
}
.sc-sb-close:hover { background:rgba(255,255,255,.15); color:#fff; }
.sc-icon-btn {
  background:rgba(255,255,255,.08); border:none; color:#fff;
  padding:.3rem .55rem; border-radius:7px; cursor:pointer;
  font-size:.85rem; position:relative; transition:all .2s; flex-shrink:0;
  display:flex; align-items:center; gap:.2rem;
}
.sc-icon-btn:hover { background:rgba(0,200,150,.2); }
#sc-basket-count {
  background:#00C896; color:#fff; font-size:.6rem; font-weight:800;
  width:14px; height:14px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
}

/* MODES */
.sc-mode-bar {
  display:flex; gap:.3rem; padding:.6rem .85rem;
  background:#0d1117; border-bottom:1px solid rgba(255,255,255,.05); flex-shrink:0;
}
.sc-mode {
  flex:1; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.07);
  color:rgba(255,255,255,.45); padding:.38rem .25rem; border-radius:7px;
  font-size:.68rem; font-weight:600; cursor:pointer; transition:all .2s; font-family:inherit;
}
.sc-mode:hover { background:rgba(255,255,255,.1); color:rgba(255,255,255,.8); }
.sc-mode.active { background:#00C896; border-color:#00C896; color:#fff; }

/* SQUAD BAR */
.sc-squad-bar {
  padding:.55rem .85rem; background:rgba(102,126,234,.08);
  border-bottom:1px solid rgba(102,126,234,.18);
  display:flex; align-items:center; gap:.5rem; flex-shrink:0;
}
.sc-squad-members { display:flex; gap:.3rem; flex:1; flex-wrap:wrap; }
.sc-squad-member {
  display:flex; align-items:center; gap:.3rem;
  background:rgba(255,255,255,.07); border-radius:50px;
  padding:.18rem .55rem; font-size:.68rem; color:#e2e8f0;
}
.sc-member-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
.sc-invite-btn {
  background:rgba(102,126,234,.25); border:1px solid rgba(102,126,234,.35);
  color:#a5b4fc; padding:.22rem .6rem; border-radius:6px;
  font-size:.68rem; cursor:pointer; font-weight:600; font-family:inherit;
  transition:all .2s; flex-shrink:0;
}
.sc-invite-btn:hover { background:rgba(102,126,234,.45); }

/* BASKET PANEL */
#sc-basket-panel {
  background:#111827; border-bottom:1px solid rgba(255,255,255,.08);
  flex-shrink:0; max-height:300px; overflow-y:auto;
}
.sc-basket-head {
  display:flex; justify-content:space-between; align-items:center;
  padding:.75rem 1rem; border-bottom:1px solid rgba(255,255,255,.06);
  font-size:.82rem; font-weight:700; color:#e2e8f0;
}
#sc-basket-items { padding:.5rem; }
.sc-basket-item {
  display:flex; align-items:center; gap:.6rem;
  padding:.5rem .6rem; border-radius:8px;
  background:rgba(255,255,255,.04); margin-bottom:.35rem;
  border:1px solid rgba(255,255,255,.06);
}
.sc-bi-emoji { font-size:1.1rem; flex-shrink:0; }
.sc-bi-name { font-size:.75rem; color:#e2e8f0; font-weight:600; flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.sc-bi-price { font-size:.78rem; color:#00C896; font-weight:700; flex-shrink:0; }
.sc-bi-remove {
  background:none; border:none; color:rgba(255,255,255,.3);
  cursor:pointer; font-size:.8rem; padding:.1rem; flex-shrink:0;
  transition:color .2s;
}
.sc-bi-remove:hover { color:#FF6B6B; }
.sc-basket-stores {
  padding:.5rem 1rem .25rem;
  display:flex; gap:.4rem; flex-wrap:wrap;
}
.sc-store-chip {
  font-size:.68rem; font-weight:700; padding:.22rem .6rem;
  border-radius:50px; border:1px solid;
}
.sc-checkout-all {
  display:block; width:calc(100% - 2rem); margin:.5rem 1rem .75rem;
  background:linear-gradient(135deg,#00C896,#00A07A);
  border:none; color:#fff; padding:.75rem; border-radius:10px;
  font-weight:700; font-size:.9rem; cursor:pointer; transition:all .2s;
  font-family:inherit;
}
.sc-checkout-all:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(0,200,150,.3); }

/* MESSAGES */
.sc-msgs {
  flex:1; overflow-y:auto; padding:.85rem;
  display:flex; flex-direction:column; gap:.65rem; scroll-behavior:smooth;
}
.sc-msgs::-webkit-scrollbar { width:3px; }
.sc-msgs::-webkit-scrollbar-thumb { background:rgba(255,255,255,.1); border-radius:3px; }

.sc-msg { display:flex; gap:.4rem; animation:sc-up .22s ease; }
.sc-msg.user { flex-direction:row-reverse; }
@keyframes sc-up{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}

.sc-bubble {
  max-width:84%; padding:.6rem .85rem; border-radius:13px;
  font-size:.82rem; line-height:1.55; word-break:break-word;
}
.sc-msg:not(.user) .sc-bubble {
  background:#1e2638; color:#e2e8f0;
  border:1px solid rgba(255,255,255,.07); border-radius:13px 13px 13px 4px;
}
.sc-msg.user .sc-bubble {
  background:linear-gradient(135deg,#00C896,#00A07A); color:#fff;
  border-radius:13px 13px 4px 13px;
}
.sc-msg.squad .sc-bubble {
  background:rgba(102,126,234,.2); color:#c4b5fd;
  border:1px solid rgba(102,126,234,.2); border-radius:13px 13px 13px 4px;
}
.sc-typing {
  display:flex; gap:.28rem; align-items:center;
  padding:.5rem .75rem; background:#1e2638; border-radius:10px;
  width:fit-content; border:1px solid rgba(255,255,255,.07);
}
.sc-t-dot {
  width:5px; height:5px; background:rgba(255,255,255,.35);
  border-radius:50%; animation:sc-bounce .8s infinite;
}
.sc-t-dot:nth-child(2){animation-delay:.15s}
.sc-t-dot:nth-child(3){animation-delay:.3s}
@keyframes sc-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}

/* PRODUCT GRID IN CHAT */
.sc-store-section { width:100%; margin-top:.25rem; }
.sc-store-label {
  display:flex; align-items:center; gap:.4rem;
  font-size:.7rem; font-weight:700; margin-bottom:.4rem;
  padding:.3rem .6rem; border-radius:6px; border:1px solid;
  width:fit-content;
}
.sc-prod-grid { display:flex; flex-direction:column; gap:.35rem; margin-bottom:.75rem; }
.sc-prod-row {
  display:flex; align-items:center; gap:.6rem;
  background:#1a2035; border:1px solid rgba(255,255,255,.07);
  border-radius:10px; padding:.6rem .75rem; cursor:pointer; transition:all .2s;
  position:relative;
}
.sc-prod-row:hover { border-color:#00C896; background:rgba(0,200,150,.07); }
.sc-prod-row.in-basket { border-color:rgba(0,200,150,.5); background:rgba(0,200,150,.1); }
.sc-prod-emoji { font-size:1.3rem; flex-shrink:0; width:32px; text-align:center; }
.sc-prod-info { flex:1; min-width:0; }
.sc-prod-title { font-size:.75rem; color:#e2e8f0; font-weight:600; line-height:1.3; }
.sc-prod-meta { display:flex; gap:.4rem; align-items:center; margin-top:.2rem; flex-wrap:wrap; }
.sc-prod-price { font-size:.82rem; color:#00C896; font-weight:800; }
.sc-prod-rating { font-size:.65rem; color:#F59E0B; }
.sc-prod-cash { font-size:.63rem; background:rgba(0,200,150,.15); color:#00C896; padding:.1rem .35rem; border-radius:4px; font-weight:700; }
.sc-prod-badge { font-size:.6rem; background:rgba(255,107,107,.15); color:#FF6B6B; padding:.1rem .35rem; border-radius:4px; font-weight:700; }
.sc-add-btn {
  background:rgba(0,200,150,.15); border:1px solid rgba(0,200,150,.3);
  color:#00C896; padding:.3rem .55rem; border-radius:7px;
  font-size:.68rem; font-weight:700; cursor:pointer; flex-shrink:0;
  transition:all .2s; font-family:inherit; white-space:nowrap;
}
.sc-add-btn:hover { background:#00C896; color:#fff; }
.sc-add-btn.added { background:#00C896; color:#fff; }

/* FILTER BAR */
.sc-filter-bar {
  display:flex; gap:.35rem; padding:.5rem .85rem;
  border-bottom:1px solid rgba(255,255,255,.05);
  overflow-x:auto; flex-shrink:0;
}
.sc-filter-bar::-webkit-scrollbar { display:none; }
.sc-filter-chip {
  flex-shrink:0; padding:.25rem .65rem; border-radius:50px;
  font-size:.68rem; font-weight:600; border:1px solid rgba(255,255,255,.12);
  color:rgba(255,255,255,.5); background:rgba(255,255,255,.04);
  cursor:pointer; transition:all .2s; font-family:inherit; white-space:nowrap;
}
.sc-filter-chip:hover { border-color:rgba(255,255,255,.25); color:rgba(255,255,255,.8); }
.sc-filter-chip.active { background:#00C896; border-color:#00C896; color:#fff; }

/* QUICK REPLIES */
.sc-quick-replies {
  display:flex; flex-wrap:wrap; gap:.3rem;
  padding:.45rem .85rem; border-top:1px solid rgba(255,255,255,.05); flex-shrink:0;
  min-height:36px;
}
.sc-qr-btn {
  background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.65); padding:.28rem .65rem; border-radius:50px;
  font-size:.7rem; cursor:pointer; transition:all .2s;
  font-family:inherit; font-weight:500; white-space:nowrap;
}
.sc-qr-btn:hover { background:rgba(0,200,150,.15); border-color:#00C896; color:#00C896; }

/* INPUT ROW */
.sc-input-row {
  display:flex; gap:.4rem; padding:.75rem .85rem;
  border-top:1px solid rgba(255,255,255,.06); background:#0d1117; flex-shrink:0;
}
.sc-mic-btn {
  background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.6); width:38px; height:38px; border-radius:10px;
  cursor:pointer; display:flex; align-items:center; justify-content:center;
  transition:all .25s; flex-shrink:0;
}
.sc-mic-btn:hover { background:rgba(255,107,107,.15); border-color:rgba(255,107,107,.4); color:#FF6B6B; }
.sc-mic-btn.listening { background:rgba(255,107,107,.25); border-color:#FF6B6B; color:#FF6B6B; animation:sc-mic-pulse 1s infinite; }
@keyframes sc-mic-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,107,107,.4)} 50%{box-shadow:0 0 0 6px rgba(255,107,107,0)} }
.sc-input {
  flex:1; background:#1a2035; border:1.5px solid rgba(255,255,255,.1);
  color:#e2e8f0; padding:.58rem .85rem; border-radius:10px;
  font-size:.83rem; outline:none; font-family:inherit; transition:border-color .2s;
}
.sc-input:focus { border-color:#00C896; }
.sc-input::placeholder { color:rgba(255,255,255,.28); }
.sc-send {
  background:#00C896; border:none; color:#fff;
  width:38px; height:38px; border-radius:10px; cursor:pointer;
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
  transition:all .2s;
}
.sc-send:hover { background:#00A07A; }

/* VOICE OVERLAY */
#sc-voice-overlay {
  position:absolute; inset:0; background:rgba(13,17,23,.96);
  display:flex; flex-direction:column; align-items:center;
  justify-content:center; gap:1rem; z-index:10;
}
.sc-voice-ripple {
  position:absolute; width:140px; height:140px; border-radius:50%;
  border:2px solid rgba(255,107,107,.3);
  animation:sc-ripple 2s ease-out infinite;
}
@keyframes sc-ripple { 0%{transform:scale(.8);opacity:1} 100%{transform:scale(2);opacity:0} }
.sc-voice-mic { font-size:3rem; animation:sc-mic-bob 1s ease-in-out infinite; }
@keyframes sc-mic-bob { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
.sc-voice-label { color:#FF6B6B; font-weight:700; font-size:1rem; }
.sc-voice-transcript {
  color:rgba(255,255,255,.7); font-size:.88rem; text-align:center;
  max-width:240px; min-height:2rem; font-style:italic;
}
.sc-voice-stop {
  background:rgba(255,107,107,.2); border:1.5px solid rgba(255,107,107,.4);
  color:#FF6B6B; padding:.55rem 1.5rem; border-radius:50px;
  font-weight:700; cursor:pointer; font-family:inherit; transition:all .2s;
}
.sc-voice-stop:hover { background:rgba(255,107,107,.4); }

/* FAB */
#sc-fab {
  position:fixed; bottom:24px; right:24px;
  background:#161b27; border:1.5px solid rgba(0,200,150,.3);
  color:#fff; padding:.58rem 1rem; border-radius:50px;
  cursor:pointer; z-index:999;
  display:flex; align-items:center; gap:.4rem;
  font-size:.83rem; font-weight:700; font-family:inherit;
  box-shadow:0 8px 24px rgba(0,0,0,.4); transition:all .3s;
}
#sc-fab:hover { border-color:#00C896; box-shadow:0 8px 32px rgba(0,200,150,.2); transform:translateY(-2px); }
body.sc-open #sc-fab { right:404px; }
.sc-fab-badge {
  background:#FF6B6B; color:#fff; width:15px; height:15px;
  border-radius:50%; font-size:.6rem; font-weight:800;
  display:flex; align-items:center; justify-content:center;
}

/* SQUAD MODAL */
.sc-modal-ov {
  display:none; position:fixed; inset:0; background:rgba(0,0,0,.65);
  z-index:1100; align-items:center; justify-content:center; backdrop-filter:blur(6px);
}
.sc-modal-ov.open { display:flex; }
.sc-modal {
  background:#161b27; border:1px solid rgba(255,255,255,.1);
  border-radius:20px; width:90%; max-width:420px;
  box-shadow:0 24px 64px rgba(0,0,0,.5); overflow:hidden;
}
.sc-modal-head {
  padding:1.1rem 1.4rem; border-bottom:1px solid rgba(255,255,255,.07);
  display:flex; justify-content:space-between; align-items:center;
}
.sc-modal-head h3 { color:#e2e8f0; font-size:.95rem; font-weight:700; }
.sc-modal-close {
  background:rgba(255,255,255,.08); border:none; color:rgba(255,255,255,.5);
  width:26px; height:26px; border-radius:7px; cursor:pointer;
  display:flex; align-items:center; justify-content:center; font-size:.8rem; transition:all .2s;
}
.sc-modal-body { padding:1.25rem; }
.sc-squad-types { display:grid; grid-template-columns:repeat(4,1fr); gap:.5rem; margin-bottom:1.1rem; }
.sc-squad-type {
  background:rgba(255,255,255,.05); border:1.5px solid rgba(255,255,255,.1);
  border-radius:10px; padding:.75rem .4rem; text-align:center;
  font-size:.72rem; color:rgba(255,255,255,.55); cursor:pointer; transition:all .2s; font-weight:600; line-height:1.6;
}
.sc-squad-type.active { background:rgba(102,126,234,.15); border-color:#667eea; color:#a5b4fc; }
.sc-invite-link-box { display:flex; gap:.4rem; margin-bottom:.85rem; }
.sc-link-input {
  flex:1; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
  border-radius:7px; color:#a5b4fc; padding:.5rem .8rem; font-size:.76rem;
  outline:none; font-family:inherit;
}
.sc-copy-btn {
  background:rgba(102,126,234,.2); border:1px solid rgba(102,126,234,.3);
  color:#a5b4fc; padding:.45rem .8rem; border-radius:7px;
  cursor:pointer; font-size:.76rem; font-weight:700; font-family:inherit; transition:all .2s;
}
.sc-start-btn {
  width:100%; background:linear-gradient(135deg,#667eea,#764ba2);
  border:none; color:#fff; padding:.75rem; border-radius:10px;
  font-size:.88rem; font-weight:700; cursor:pointer; font-family:inherit; transition:all .2s;
}
.sc-start-btn:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(102,126,234,.4); }

@media(max-width:768px){
  #sc-sidebar { width:100%; }
  body.sc-open { padding-right:0; }
  #sc-fab { bottom:16px; right:16px; }
  body.sc-open #sc-fab { display:none; }
}
`;
document.head.appendChild(style);

/* ══════════════════════════════════════════════════════════
   PARSE USER QUERY
══════════════════════════════════════════════════════════ */
function parseQuery(msg) {
  const m = msg.toLowerCase();
  let category = null;
  let maxPrice = null;
  let minPrice = null;
  let store = null; // null = all stores

  // category detection
  if (/tshirt|t-shirt|tee|t shirt/.test(m)) category = 'tshirt';
  else if (/shirt|polo/.test(m)) category = 'shirt';
  else if (/jean|denim|trouser|pant/.test(m)) category = 'jeans';
  else if (/shoe|trainer|sneaker|footwear|boot/.test(m)) category = 'shoes';
  else if (/headphone|earphone|earbud|airpod|earbuds/.test(m)) category = 'headphones';
  else if (/laptop|notebook|macbook|computer/.test(m)) category = 'laptop';
  else if (/dress|skirt|kurti/.test(m)) category = 'dress';

  // price range: "under £30", "below 50", "less than 25", "under 20 pounds"
  const underMatch = m.match(/(?:under|below|less than|upto|up to|max|within)\s*£?\s*(\d+)/);
  if (underMatch) maxPrice = parseFloat(underMatch[1]);

  // "between £20 and £50"
  const betweenMatch = m.match(/between\s*£?\s*(\d+)\s*(?:and|to|-)\s*£?\s*(\d+)/);
  if (betweenMatch) { minPrice = parseFloat(betweenMatch[1]); maxPrice = parseFloat(betweenMatch[2]); }

  // store filter
  if (/amazon/.test(m)) store = 'Amazon';
  else if (/ebay/.test(m)) store = 'eBay';
  else if (/flipkart/.test(m)) store = 'Flipkart';

  return { category, maxPrice, minPrice, store };
}

function fetchProducts({ category, maxPrice, minPrice, store }) {
  if (!category) return null;
  let products = [...(MOCK_PRODUCTS[category] || [])];
  if (maxPrice) products = products.filter(p => p.price <= maxPrice);
  if (minPrice) products = products.filter(p => p.price >= minPrice);
  if (store) products = products.filter(p => p.store === store);
  return products;
}

function groupByStore(products) {
  const groups = {};
  products.forEach(p => {
    if (!groups[p.store]) groups[p.store] = [];
    groups[p.store].push(p);
  });
  return groups;
}

/* ══════════════════════════════════════════════════════════
   VOICE RECOGNITION
══════════════════════════════════════════════════════════ */
let recognition = null;
let isListening = false;

function initVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  const r = new SpeechRecognition();
  r.continuous = false;
  r.interimResults = true;
  r.lang = 'en-GB';

  r.onstart = () => {
    isListening = true;
    document.getElementById('sc-mic').classList.add('listening');
    document.getElementById('sc-voice-overlay').style.display = 'flex';
    document.getElementById('sc-voice-label').textContent = 'Listening…';
    document.getElementById('sc-voice-transcript').textContent = '';
  };

  r.onresult = (e) => {
    const interim = Array.from(e.results).map(r => r[0].transcript).join('');
    document.getElementById('sc-voice-transcript').textContent = interim;
    if (e.results[e.results.length - 1].isFinal) {
      document.getElementById('sc-input').value = interim;
    }
  };

  r.onend = () => {
    isListening = false;
    document.getElementById('sc-mic').classList.remove('listening');
    document.getElementById('sc-voice-overlay').style.display = 'none';
    const val = document.getElementById('sc-input').value.trim();
    if (val) SCAI.send();
  };

  r.onerror = (e) => {
    isListening = false;
    document.getElementById('sc-mic').classList.remove('listening');
    document.getElementById('sc-voice-overlay').style.display = 'none';
    if (e.error === 'not-allowed') {
      SCAI._addAI('🎤 Microphone access was denied. Please allow mic access in your browser settings, then try again.');
    } else if (e.error === 'no-speech') {
      SCAI._addAI('🎤 I didn\'t catch that. Try again — say something like "blue t-shirt under 30 pounds"');
    }
  };

  return r;
}

/* ══════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════ */
const state = {
  open: false, mode: 'shop', squadType: 'couple',
  squadMembers: [], squadActive: false,
  greeted: false, basketVisible: false,
  lastProducts: null,
};

/* ══════════════════════════════════════════════════════════
   REPLY ENGINE
══════════════════════════════════════════════════════════ */
function getReply(msg) {
  const m = msg.toLowerCase();
  const parsed = parseQuery(msg);

  // found a product category
  if (parsed.category) {
    const products = fetchProducts(parsed);
    if (!products || products.length === 0) {
      return {
        text: `Hmm, no results found${parsed.maxPrice ? ` under £${parsed.maxPrice}` : ''} for that. Try a higher budget or different category?`,
        qr: ['Remove price filter','Try under £50','Try under £100']
      };
    }
    state.lastProducts = products;
    const storeCount = [...new Set(products.map(p => p.store))].length;
    const priceText = parsed.maxPrice ? ` under £${parsed.maxPrice}` : '';
    const storeText = parsed.store ? ` on ${parsed.store}` : ` across ${storeCount} stores`;
    return {
      text: `Found **${products.length} results**${priceText}${storeText} 🛍️ Add to basket and checkout all at once!`,
      products,
      qr: ['Sort by price','Only Amazon','Only eBay','Only Flipkart','Add all cheapest']
    };
  }

  if (/hello|hi|hey|namaste/.test(m)) {
    return { text: 'Namaste! 🙏 I\'m your SmartCash AI. Just tell me what you need — or tap 🎤 to speak! Try: "men\'s t-shirt under £25"', qr:['T-shirts under £20','Headphones under £50','Laptops under £600','Best deals today'] };
  }
  if (/deal|offer|discount|best|top/.test(m)) {
    return { text: '🔥 Today\'s top cashback:\n\n• **Flipkart** — 5% 🥇\n• **Amazon** — 4.5%\n• **eBay** — 3.2%\n\nWhat do you want to shop for?', qr:['T-shirts','Laptops','Headphones','Shoes'] };
  }
  if (/sort.*price|cheap|lowest/.test(m) && state.lastProducts) {
    const sorted = [...state.lastProducts].sort((a,b)=>a.price-b.price);
    state.lastProducts = sorted;
    return { text: '↑ Sorted by lowest price first:', products: sorted, qr:['Sort by rating','Only Amazon','Add cheapest one'] };
  }
  if (/only amazon/.test(m) && state.lastProducts) {
    const f = state.lastProducts.filter(p=>p.store==='Amazon');
    return { text: `📦 Amazon only — ${f.length} results:`, products: f.length ? f : state.lastProducts, qr:['All stores','Only eBay','Only Flipkart'] };
  }
  if (/only ebay/.test(m) && state.lastProducts) {
    const f = state.lastProducts.filter(p=>p.store==='eBay');
    return { text: `🔵 eBay only — ${f.length} results:`, products: f.length ? f : state.lastProducts, qr:['All stores','Only Amazon','Only Flipkart'] };
  }
  if (/only flipkart/.test(m) && state.lastProducts) {
    const f = state.lastProducts.filter(p=>p.store==='Flipkart');
    return { text: `🛒 Flipkart only — ${f.length} results:`, products: f.length ? f : state.lastProducts, qr:['All stores','Only Amazon','Only eBay'] };
  }
  if (/add.*cheapest|cheapest.*add/.test(m) && state.lastProducts) {
    const cheapest = [...state.lastProducts].sort((a,b)=>a.price-b.price)[0];
    if (cheapest) { SCAI.addToBasket(cheapest); return { text: `✅ Added the cheapest: **${cheapest.title}** (£${cheapest.price}) from ${cheapest.store}!`, qr:['View basket','Continue shopping','Checkout all'] }; }
  }
  if (/basket|cart|checkout|order/.test(m)) {
    if (basket.length === 0) return { text: 'Your basket is empty! Tell me what you\'re looking for and I\'ll find the best deals.', qr:['T-shirts','Headphones','Laptops','Shoes'] };
    return { text: `You have **${basket.length} items** in your basket totalling **£${basketTotal().toFixed(2)}**. Ready to checkout?`, qr:['Checkout all','Remove items','Keep shopping'] };
  }
  if (/squad|couple|partner|friend|family/.test(m)) {
    return { text: '👥 Squad mode! Shop together in real time — share your basket, vote on items. Who are you shopping with?', qr:['Start couple squad','Friends squad','Family squad'] };
  }

  return { text: `Got it! I'm searching for "${msg}" across Amazon, eBay & Flipkart with the best cashback. Try being more specific — e.g. "blue t-shirt under £30" or "laptop under £500"`, qr:['T-shirts under £30','Jeans under £50','Headphones under £100','Shoes under £60'] };
}

/* ══════════════════════════════════════════════════════════
   BASKET
══════════════════════════════════════════════════════════ */
function basketTotal() { return basket.reduce((s,i) => s + i.price, 0); }
function updateBasketUI() {
  const count = basket.length;
  const countEl = document.getElementById('sc-basket-count');
  countEl.textContent = count;
  countEl.style.display = count > 0 ? 'flex' : 'none';

  const total = basketTotal();
  document.getElementById('sc-basket-total').textContent = '£' + total.toFixed(2);

  const itemsEl = document.getElementById('sc-basket-items');
  if (basket.length === 0) {
    itemsEl.innerHTML = '<div style="padding:.75rem;text-align:center;color:rgba(255,255,255,.3);font-size:.78rem">Basket is empty</div>';
  } else {
    itemsEl.innerHTML = basket.map((item,i) => `
      <div class="sc-basket-item">
        <span class="sc-bi-emoji">${item.img}</span>
        <span class="sc-bi-name">${item.title}</span>
        <span class="sc-bi-price">£${item.price.toFixed(2)}</span>
        <button class="sc-bi-remove" onclick="SCAI.removeFromBasket(${i})">✕</button>
      </div>`).join('');
  }

  // store breakdown
  const stores = [...new Set(basket.map(i=>i.store))];
  const sc = STORE_COLORS;
  document.getElementById('sc-basket-stores').innerHTML = stores.map(s => `
    <span class="sc-store-chip" style="background:${(sc[s]||{bg:'rgba(255,255,255,.08)'}).bg};border-color:${(sc[s]||{border:'rgba(255,255,255,.15)'}).border};color:${(sc[s]||{text:'#e2e8f0'}).text}">
      ${s} (${basket.filter(i=>i.store===s).length})
    </span>`).join('');

  // sync add buttons
  document.querySelectorAll('.sc-prod-row').forEach(row => {
    const id = row.dataset.pid;
    const inBag = basket.some(i => i.id === id);
    row.classList.toggle('in-basket', inBag);
    const btn = row.querySelector('.sc-add-btn');
    if (btn) { btn.textContent = inBag ? '✓ Added' : '+ Add'; btn.classList.toggle('added', inBag); }
  });
}

/* ══════════════════════════════════════════════════════════
   MAIN API
══════════════════════════════════════════════════════════ */
window.SCAI = {

  toggle() { state.open ? this.close() : this.open_(); },

  open_() {
    state.open = true;
    document.getElementById('sc-sidebar').classList.add('open');
    document.body.classList.add('sc-open');
    document.getElementById('sc-fab-label').textContent = 'Close';
    document.getElementById('sc-fab-badge').style.display = 'none';
    if (!state.greeted) {
      state.greeted = true;
      setTimeout(() => this._addAI(
        'Namaste! 🙏 I\'m your SmartCash AI. I can search **Amazon, eBay & Flipkart** at the same time.\n\n🎤 Tap the mic and say what you need — or type below!\n\nTry: *"men\'s t-shirt under £25"*',
        ['T-shirts under £20','Jeans under £50','Laptops under £600','Headphones under £100']
      ), 350);
    }
  },

  close() {
    state.open = false;
    document.getElementById('sc-sidebar').classList.remove('open');
    document.body.classList.remove('sc-open');
    document.getElementById('sc-fab-label').textContent = 'Ask AI';
  },

  toggleBasket() {
    state.basketVisible = !state.basketVisible;
    document.getElementById('sc-basket-panel').style.display = state.basketVisible ? 'block' : 'none';
    updateBasketUI();
  },

  setMode(mode, el) {
    state.mode = mode;
    document.querySelectorAll('.sc-mode').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    const msgs = {
      shop: 'Shopping mode 🛍️ — speak or type what you need!',
      deals: '🔥 Today\'s cashback rates:\n• **Flipkart 5%** 🥇\n• **Amazon 4.5%**\n• **eBay 3.2%**',
      squad: '👥 Squad mode! Shop together with your partner, friends or family. Who\'s joining?',
      price: '📊 Price tracker mode — paste any URL or product name for price history + AI prediction.',
    };
    const qrs = {
      shop: ['T-shirts','Jeans','Shoes','Headphones','Laptops'],
      deals: ['Amazon deals','eBay deals','Flipkart deals'],
      squad: ['Start couple squad','Friends squad','Family squad'],
      price: ['Track Sony XM5','Track AirPods','Set price alert'],
    };
    this._addAI(msgs[mode], qrs[mode]);
  },

  async send() {
    const input = document.getElementById('sc-input');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    this._addUser(msg);
    this._showTyping();
    await new Promise(r => setTimeout(r, 500 + Math.random()*400));
    this._hideTyping();
    const reply = getReply(msg);
    this._addAI(reply.text, reply.qr, reply.products);
  },

  _addUser(text) {
    const msgs = document.getElementById('sc-msgs');
    const div = document.createElement('div');
    div.className = 'sc-msg user';
    div.innerHTML = `<div class="sc-bubble">${text}</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  },

  _addAI(text, qrs, products) {
    const msgs = document.getElementById('sc-msgs');

    // text bubble
    const div = document.createElement('div');
    div.className = 'sc-msg';
    div.innerHTML = `<div class="sc-bubble">${text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*(.*?)\*/g,'<em>$1</em>').replace(/\n/g,'<br>')}</div>`;
    msgs.appendChild(div);

    // products grouped by store
    if (products && products.length > 0) {
      const groups = groupByStore(products);
      const wrap = document.createElement('div');
      wrap.style.cssText = 'width:100%;display:flex;flex-direction:column;gap:.5rem;animation:sc-up .25s ease';

      Object.entries(groups).forEach(([storeName, items]) => {
        const sc = STORE_COLORS[storeName] || { bg:'rgba(255,255,255,.05)', border:'rgba(255,255,255,.1)', text:'#e2e8f0' };
        const sec = document.createElement('div');
        sec.innerHTML = `
          <div class="sc-store-label" style="background:${sc.bg};border-color:${sc.border};color:${sc.text}">
            ${storeName === 'Amazon' ? '📦' : storeName === 'eBay' ? '🔵' : '🛒'} ${storeName}
            <span style="opacity:.6;font-weight:400">${items.length} results · ${storeName === 'Amazon' ? '4.5' : storeName === 'eBay' ? '3.2' : '5.0'}% cashback</span>
          </div>
          <div class="sc-prod-grid">
            ${items.map(p => `
              <div class="sc-prod-row${basket.some(b=>b.id===p.id)?' in-basket':''}" data-pid="${p.id}">
                <span class="sc-prod-emoji">${p.img}</span>
                <div class="sc-prod-info">
                  <div class="sc-prod-title">${p.title}</div>
                  <div class="sc-prod-meta">
                    <span class="sc-prod-price">£${p.price.toFixed(2)}</span>
                    <span class="sc-prod-rating">★ ${p.rating} (${p.reviews.toLocaleString()})</span>
                    <span class="sc-prod-cash">${p.cashback}% back</span>
                    ${p.badge ? `<span class="sc-prod-badge">${p.badge}</span>` : ''}
                  </div>
                </div>
                <button class="sc-add-btn${basket.some(b=>b.id===p.id)?' added':''}"
                  onclick="SCAI.addToBasket(${JSON.stringify(p).replace(/"/g,'&quot;')})">
                  ${basket.some(b=>b.id===p.id)?'✓ Added':'+ Add'}
                </button>
              </div>`).join('')}
          </div>`;
        wrap.appendChild(sec);
      });

      msgs.appendChild(wrap);
    }

    msgs.scrollTop = msgs.scrollHeight;

    // quick replies
    const qrEl = document.getElementById('sc-qr');
    qrEl.innerHTML = '';
    if (qrs && qrs.length) {
      qrs.forEach(q => {
        const btn = document.createElement('button');
        btn.className = 'sc-qr-btn';
        btn.textContent = q;
        btn.onclick = () => { document.getElementById('sc-input').value = q; SCAI.send(); };
        qrEl.appendChild(btn);
      });
    }
  },

  _addSquad(text) {
    const msgs = document.getElementById('sc-msgs');
    const div = document.createElement('div');
    div.className = 'sc-msg squad';
    div.innerHTML = `<div class="sc-bubble">${text}</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  },

  _showTyping() {
    const msgs = document.getElementById('sc-msgs');
    const t = document.createElement('div');
    t.className = 'sc-msg'; t.id = 'sc-typing';
    t.innerHTML = `<div class="sc-typing"><div class="sc-t-dot"></div><div class="sc-t-dot"></div><div class="sc-t-dot"></div></div>`;
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
  },
  _hideTyping() { document.getElementById('sc-typing')?.remove(); },

  /* BASKET */
  addToBasket(product) {
    if (basket.some(i => i.id === product.id)) return;
    basket.push(product);
    updateBasketUI();
    // open basket if not open
    if (!state.basketVisible) {
      state.basketVisible = true;
      document.getElementById('sc-basket-panel').style.display = 'block';
    }
    // update all buttons
    document.querySelectorAll(`[data-pid="${product.id}"]`).forEach(row => {
      row.classList.add('in-basket');
      const btn = row.querySelector('.sc-add-btn');
      if (btn) { btn.textContent = '✓ Added'; btn.classList.add('added'); }
    });
    // quick confirm
    const msgs = document.getElementById('sc-msgs');
    const tip = document.createElement('div');
    tip.className = 'sc-msg';
    tip.innerHTML = `<div class="sc-bubble" style="background:rgba(0,200,150,.12);border:1px solid rgba(0,200,150,.25);color:#4ade80">✅ <strong>${product.title}</strong> added! (${product.cashback}% cashback from ${product.store})</div>`;
    msgs.appendChild(tip);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => tip.remove(), 3000);
  },

  removeFromBasket(idx) {
    basket.splice(idx, 1);
    updateBasketUI();
  },

  checkoutAll() {
    if (basket.length === 0) { this._addAI('Your basket is empty — find some products first!'); return; }
    const stores = [...new Set(basket.map(i => i.store))];
    const storeUrls = { Amazon:'https://amazon.co.uk', eBay:'https://ebay.co.uk', Flipkart:'https://flipkart.com' };
    this._addAI(`🚀 Opening **${stores.length} store${stores.length>1?'s':''}** now with your cashback links! Each will open in a new tab.\n\n${stores.map(s=>`• ${s}`).join('\n')}`);
    stores.forEach((s, i) => setTimeout(() => window.open(storeUrls[s] || '#', '_blank'), i * 600));
  },

  /* VOICE */
  toggleVoice() {
    if (!recognition) recognition = initVoice();
    if (!recognition) {
      this._addAI('🎤 Voice search isn\'t supported in this browser. Try Chrome or Edge on desktop, or just type your query!');
      return;
    }
    if (isListening) { recognition.stop(); return; }
    document.getElementById('sc-status-txt').textContent = '🎤 Listening…';
    recognition.start();
    setTimeout(() => { document.getElementById('sc-status-txt').textContent = '● Voice ready · 500+ stores'; }, 8000);
  },

  stopVoice() { if (recognition && isListening) recognition.stop(); },

  /* SQUAD */
  openSquadModal() { document.getElementById('sc-squad-modal').classList.add('open'); this._genLink(); },
  closeSquadModal() { document.getElementById('sc-squad-modal').classList.remove('open'); },
  selectSquadType(type, el) {
    state.squadType = type;
    document.querySelectorAll('.sc-squad-type').forEach(e=>e.classList.remove('active'));
    el.classList.add('active');
    this._genLink();
  },
  _genLink() {
    const code = Math.random().toString(36).substr(2,6).toUpperCase();
    document.getElementById('sc-link-input').value = `smartcash.co.uk/squad/${code}`;
  },
  copyLink() {
    navigator.clipboard?.writeText(document.getElementById('sc-link-input').value).catch(()=>{});
    const btn = document.querySelector('.sc-copy-btn');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 2000);
  },
  inviteToSquad() { this.openSquadModal(); },
  startSquad() {
    state.squadActive = true;
    this.closeSquadModal();
    const names = { couple:'Partner', friends:'Best Friend', family:'Family Member', occasion:'Guest' };
    state.squadMembers = [{ name:'You', online:true }, { name: names[state.squadType]||'Friend', online:false }];
    this._renderSquad();
    document.getElementById('sc-squad-bar').style.display = 'flex';
    if (!state.open) this.open_();
    const partner = names[state.squadType];
    setTimeout(() => {
      state.squadMembers[1].online = true;
      this._renderSquad();
      this._addSquad(`${partner} just joined your squad! 🎉 They can see your basket.`);
      setTimeout(() => this._addSquad('Ooh love those picks! Can you add the striped one too? 👀'), 2200);
    }, 2000);
  },
  _renderSquad() {
    document.getElementById('sc-squad-members').innerHTML = state.squadMembers.map(m =>
      `<div class="sc-squad-member"><div class="sc-member-dot" style="background:${m.online?'#4ade80':'#718096'}"></div>${m.name}</div>`
    ).join('');
  },
};

/* auto badge */
setTimeout(() => { if (!state.open) document.getElementById('sc-fab-badge').style.display = 'flex'; }, 5000);

/* keyboard shortcut */
document.addEventListener('keydown', e => { if ((e.ctrlKey||e.metaKey) && e.key==='/') SCAI.toggle(); });

})();
