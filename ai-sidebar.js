/* ============================================================
   SmartCash — Universal AI Sidebar
   Inject this script at the bottom of EVERY page body.
   It self-renders the sidebar HTML and wires all logic.
   ============================================================ */

(function () {
  /* ─── CONFIG ───────────────────────────────────────────── */
  const USE_REAL_AI = typeof ANTHROPIC_KEY !== 'undefined'; // set window.ANTHROPIC_KEY to enable

  /* ─── INJECT HTML ──────────────────────────────────────── */
  document.body.insertAdjacentHTML('beforeend', `
  <!-- AI SIDEBAR -->
  <div id="sc-sidebar" aria-label="SmartCash AI Assistant">
    <div class="sc-sb-head">
      <div class="sc-sb-avatar">
        <span>🤖</span>
        <div class="sc-online-dot"></div>
      </div>
      <div>
        <div class="sc-sb-name">SmartCash AI</div>
        <div class="sc-sb-status">● Online — always ready</div>
      </div>
      <button class="sc-sb-close" onclick="SCAI.close()" aria-label="Close">✕</button>
    </div>

    <div class="sc-mode-bar">
      <button class="sc-mode active" data-mode="shop" onclick="SCAI.setMode('shop',this)">🛍️ Shop</button>
      <button class="sc-mode" data-mode="deals" onclick="SCAI.setMode('deals',this)">🔥 Deals</button>
      <button class="sc-mode" data-mode="squad" onclick="SCAI.setMode('squad',this)">👥 Squad</button>
      <button class="sc-mode" data-mode="price" onclick="SCAI.setMode('price',this)">📊 Price</button>
    </div>

    <div class="sc-squad-bar" id="sc-squad-bar" style="display:none">
      <div class="sc-squad-members" id="sc-squad-members"></div>
      <button class="sc-invite-btn" onclick="SCAI.inviteToSquad()">+ Invite</button>
    </div>

    <div class="sc-msgs" id="sc-msgs"></div>

    <div class="sc-quick-replies" id="sc-qr"></div>

    <div class="sc-input-row">
      <input id="sc-input" class="sc-input" type="text"
        placeholder="Ask me anything…"
        onkeydown="if(event.key==='Enter')SCAI.send()"
        autocomplete="off">
      <button class="sc-send" onclick="SCAI.send()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  </div>

  <!-- TOGGLE FAB -->
  <button id="sc-fab" onclick="SCAI.toggle()" aria-label="Open AI Assistant">
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
        <p style="color:var(--muted);font-size:.88rem;margin-bottom:1.25rem">Shop together in real-time. Vote on items, compare styles, find matching outfits.</p>
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

  /* ─── INJECT STYLES ────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
  /* === AI SIDEBAR CORE === */
  #sc-sidebar {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 360px;
    background: #0f1117;
    border-left: 1px solid rgba(255,255,255,0.08);
    display: flex;
    flex-direction: column;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    font-family: -apple-system, BlinkMacSystemFont, 'DM Sans', sans-serif;
    box-shadow: -8px 0 40px rgba(0,0,0,0.3);
  }
  #sc-sidebar.open { transform: translateX(0); }
  body.sc-open { padding-right: 360px; transition: padding-right 0.35s cubic-bezier(0.4,0,0.2,1); }

  /* HEAD */
  .sc-sb-head {
    display: flex;
    align-items: center;
    gap: .75rem;
    padding: 1.1rem 1.25rem;
    background: linear-gradient(135deg, #1a1f2e, #12161f);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    flex-shrink: 0;
  }
  .sc-sb-avatar {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, #00C896, #00A07A);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
    position: relative;
  }
  .sc-online-dot {
    position: absolute; bottom: -2px; right: -2px;
    width: 10px; height: 10px;
    background: #4ade80;
    border-radius: 50%;
    border: 2px solid #0f1117;
    animation: sc-pulse 2s infinite;
  }
  @keyframes sc-pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
  .sc-sb-name { color: #fff; font-weight: 700; font-size: .9rem; }
  .sc-sb-status { color: #4ade80; font-size: .7rem; margin-top: .1rem; }
  .sc-sb-close {
    margin-left: auto;
    background: rgba(255,255,255,.08);
    border: none; color: rgba(255,255,255,.6);
    width: 28px; height: 28px;
    border-radius: 8px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: .85rem;
    transition: all .2s;
  }
  .sc-sb-close:hover { background: rgba(255,255,255,.15); color: #fff; }

  /* MODE BAR */
  .sc-mode-bar {
    display: flex;
    gap: .35rem;
    padding: .75rem 1rem;
    background: #0f1117;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .sc-mode {
    flex: 1;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.08);
    color: rgba(255,255,255,.5);
    padding: .4rem .3rem;
    border-radius: 8px;
    font-size: .72rem;
    font-weight: 600;
    cursor: pointer;
    transition: all .2s;
    font-family: inherit;
  }
  .sc-mode:hover { background: rgba(255,255,255,.1); color: rgba(255,255,255,.8); }
  .sc-mode.active { background: #00C896; border-color: #00C896; color: #fff; }

  /* SQUAD BAR */
  .sc-squad-bar {
    padding: .6rem 1rem;
    background: linear-gradient(135deg, rgba(102,126,234,.1), rgba(124,58,237,.1));
    border-bottom: 1px solid rgba(102,126,234,.2);
    display: flex;
    align-items: center;
    gap: .5rem;
    flex-shrink: 0;
  }
  .sc-squad-members { display: flex; gap: .3rem; flex: 1; flex-wrap: wrap; }
  .sc-squad-member {
    display: flex; align-items: center; gap: .3rem;
    background: rgba(255,255,255,.08);
    border-radius: 50px;
    padding: .2rem .6rem;
    font-size: .7rem;
    color: #e2e8f0;
  }
  .sc-member-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
  }
  .sc-invite-btn {
    background: rgba(102,126,234,.3);
    border: 1px solid rgba(102,126,234,.4);
    color: #a5b4fc;
    padding: .25rem .65rem;
    border-radius: 6px;
    font-size: .7rem;
    cursor: pointer;
    font-weight: 600;
    font-family: inherit;
    transition: all .2s;
    flex-shrink: 0;
  }
  .sc-invite-btn:hover { background: rgba(102,126,234,.5); }

  /* MESSAGES */
  .sc-msgs {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: .75rem;
    scroll-behavior: smooth;
  }
  .sc-msgs::-webkit-scrollbar { width: 4px; }
  .sc-msgs::-webkit-scrollbar-track { background: transparent; }
  .sc-msgs::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 4px; }

  .sc-msg { display: flex; gap: .5rem; animation: sc-fadeup .25s ease; }
  .sc-msg.user { flex-direction: row-reverse; }
  @keyframes sc-fadeup { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

  .sc-bubble {
    max-width: 82%;
    padding: .65rem .9rem;
    border-radius: 14px;
    font-size: .83rem;
    line-height: 1.55;
    word-break: break-word;
  }
  .sc-msg:not(.user) .sc-bubble {
    background: #1e2535;
    color: #e2e8f0;
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 14px 14px 14px 4px;
  }
  .sc-msg.user .sc-bubble {
    background: linear-gradient(135deg, #00C896, #00A07A);
    color: #fff;
    border-radius: 14px 14px 4px 14px;
  }
  .sc-msg.squad .sc-bubble {
    background: linear-gradient(135deg, rgba(102,126,234,.25), rgba(124,58,237,.2));
    color: #c4b5fd;
    border: 1px solid rgba(102,126,234,.2);
    border-radius: 14px 14px 14px 4px;
  }

  /* TYPING */
  .sc-typing {
    display: flex; gap: .3rem; align-items: center;
    padding: .55rem .8rem;
    background: #1e2535;
    border-radius: 10px;
    width: fit-content;
    border: 1px solid rgba(255,255,255,.07);
  }
  .sc-t-dot {
    width: 5px; height: 5px;
    background: rgba(255,255,255,.4);
    border-radius: 50%;
    animation: sc-bounce .8s infinite;
  }
  .sc-t-dot:nth-child(2) { animation-delay: .15s; }
  .sc-t-dot:nth-child(3) { animation-delay: .3s; }
  @keyframes sc-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }

  /* PRODUCTS IN CHAT */
  .sc-products {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .5rem;
    margin-top: .25rem;
  }
  .sc-prod-card {
    background: #1e2535;
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 10px;
    padding: .65rem;
    cursor: pointer;
    transition: all .2s;
  }
  .sc-prod-card:hover { border-color: #00C896; background: rgba(0,200,150,.08); }
  .sc-prod-emoji { font-size: 1.4rem; margin-bottom: .3rem; }
  .sc-prod-name { font-size: .75rem; color: #e2e8f0; font-weight: 600; margin-bottom: .15rem; }
  .sc-prod-store { font-size: .68rem; color: #718096; }
  .sc-prod-cash { font-size: .78rem; color: #00C896; font-weight: 700; margin-top: .3rem; }

  /* VOTE WIDGET */
  .sc-vote-widget {
    background: #1e2535;
    border: 1px solid rgba(102,126,234,.25);
    border-radius: 12px;
    padding: .85rem;
    margin-top: .25rem;
  }
  .sc-vote-title { font-size: .78rem; color: #a5b4fc; font-weight: 700; margin-bottom: .6rem; }
  .sc-vote-opt { display: flex; align-items: center; gap: .5rem; margin-bottom: .4rem; cursor: pointer; }
  .sc-vote-label { font-size: .75rem; color: #e2e8f0; flex: 1; }
  .sc-vote-bar-wrap { flex: 2; height: 6px; background: rgba(255,255,255,.08); border-radius: 3px; overflow: hidden; }
  .sc-vote-bar { height: 100%; background: #667eea; border-radius: 3px; transition: width .5s ease; }
  .sc-vote-pct { font-size: .7rem; color: #718096; width: 28px; text-align: right; }
  .sc-vote-btn {
    width: 100%; margin-top: .65rem;
    background: rgba(102,126,234,.2);
    border: 1px solid rgba(102,126,234,.3);
    color: #a5b4fc;
    padding: .45rem;
    border-radius: 8px;
    font-size: .75rem;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s;
    font-family: inherit;
  }
  .sc-vote-btn:hover { background: rgba(102,126,234,.4); }

  /* QUICK REPLIES */
  .sc-quick-replies {
    display: flex;
    flex-wrap: wrap;
    gap: .35rem;
    padding: .5rem 1rem;
    border-top: 1px solid rgba(255,255,255,.06);
    flex-shrink: 0;
  }
  .sc-qr-btn {
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.1);
    color: rgba(255,255,255,.7);
    padding: .3rem .7rem;
    border-radius: 50px;
    font-size: .72rem;
    cursor: pointer;
    transition: all .2s;
    font-family: inherit;
    font-weight: 500;
    white-space: nowrap;
  }
  .sc-qr-btn:hover { background: rgba(0,200,150,.15); border-color: #00C896; color: #00C896; }

  /* INPUT */
  .sc-input-row {
    display: flex;
    gap: .5rem;
    padding: .85rem 1rem;
    border-top: 1px solid rgba(255,255,255,.07);
    background: #0f1117;
    flex-shrink: 0;
  }
  .sc-input {
    flex: 1;
    background: #1e2535;
    border: 1.5px solid rgba(255,255,255,.1);
    color: #e2e8f0;
    padding: .6rem .9rem;
    border-radius: 10px;
    font-size: .85rem;
    outline: none;
    font-family: inherit;
    transition: border-color .2s;
  }
  .sc-input:focus { border-color: #00C896; }
  .sc-input::placeholder { color: rgba(255,255,255,.3); }
  .sc-send {
    background: #00C896;
    border: none;
    color: #fff;
    width: 38px; height: 38px;
    border-radius: 10px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: all .2s;
  }
  .sc-send:hover { background: #00A07A; transform: scale(1.05); }

  /* FAB TOGGLE */
  #sc-fab {
    position: fixed;
    bottom: 24px; right: 24px;
    background: linear-gradient(135deg, #1a1f2e, #12161f);
    border: 1.5px solid rgba(0,200,150,.3);
    color: #fff;
    padding: .6rem 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    z-index: 999;
    display: flex;
    align-items: center;
    gap: .45rem;
    font-size: .85rem;
    font-weight: 700;
    font-family: inherit;
    box-shadow: 0 8px 24px rgba(0,0,0,.4);
    transition: all .3s cubic-bezier(0.4,0,0.2,1);
  }
  #sc-fab:hover { border-color: #00C896; box-shadow: 0 8px 32px rgba(0,200,150,.25); transform: translateY(-2px); }
  body.sc-open #sc-fab { right: 384px; }
  .sc-fab-badge {
    background: #FF6B6B;
    color: #fff;
    width: 16px; height: 16px;
    border-radius: 50%;
    font-size: .65rem;
    font-weight: 800;
    display: flex; align-items: center; justify-content: center;
  }

  /* SQUAD MODAL */
  .sc-modal-ov {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,.6);
    z-index: 1100;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(6px);
  }
  .sc-modal-ov.open { display: flex; }
  .sc-modal {
    background: #1a1f2e;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 20px;
    width: 90%;
    max-width: 440px;
    box-shadow: 0 24px 64px rgba(0,0,0,.5);
    overflow: hidden;
  }
  .sc-modal-head {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,.08);
    display: flex; justify-content: space-between; align-items: center;
  }
  .sc-modal-head h3 { color: #e2e8f0; font-size: 1rem; font-weight: 700; }
  .sc-modal-close {
    background: rgba(255,255,255,.08); border: none; color: rgba(255,255,255,.5);
    width: 28px; height: 28px; border-radius: 8px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; font-size: .85rem;
    transition: all .2s;
  }
  .sc-modal-close:hover { background: rgba(255,255,255,.15); color: #fff; }
  .sc-modal-body { padding: 1.5rem; }
  .sc-squad-types { display: grid; grid-template-columns: repeat(4,1fr); gap: .6rem; margin-bottom: 1.25rem; }
  .sc-squad-type {
    background: rgba(255,255,255,.05);
    border: 1.5px solid rgba(255,255,255,.1);
    border-radius: 12px;
    padding: .85rem .5rem;
    text-align: center;
    font-size: .75rem;
    color: rgba(255,255,255,.6);
    cursor: pointer;
    transition: all .2s;
    font-weight: 600;
    line-height: 1.6;
  }
  .sc-squad-type:hover { border-color: #667eea; color: #a5b4fc; }
  .sc-squad-type.active { background: rgba(102,126,234,.15); border-color: #667eea; color: #a5b4fc; }
  .sc-invite-link-box { display: flex; gap: .5rem; margin-bottom: 1rem; }
  .sc-link-input {
    flex: 1;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 8px;
    color: #a5b4fc;
    padding: .55rem .85rem;
    font-size: .78rem;
    outline: none;
    font-family: inherit;
  }
  .sc-copy-btn {
    background: rgba(102,126,234,.2);
    border: 1px solid rgba(102,126,234,.3);
    color: #a5b4fc;
    padding: .5rem .85rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: .78rem;
    font-weight: 700;
    font-family: inherit;
    transition: all .2s;
  }
  .sc-copy-btn:hover { background: rgba(102,126,234,.4); }
  .sc-start-btn {
    width: 100%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: none;
    color: #fff;
    padding: .8rem;
    border-radius: 10px;
    font-size: .9rem;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: all .2s;
  }
  .sc-start-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(102,126,234,.4); }

  /* RESPONSIVE */
  @media(max-width:768px) {
    #sc-sidebar { width: 100%; }
    body.sc-open { padding-right: 0; }
    #sc-fab { bottom: 16px; right: 16px; }
    body.sc-open #sc-fab { display: none; }
  }
  `;
  document.head.appendChild(style);

  /* ─── KNOWLEDGE BASE ───────────────────────────────────── */
  const STORES = [
    { name:'Amazon UK', emoji:'📦', cashback:'4.5%', cat:'electronics' },
    { name:'ASOS', emoji:'👗', cashback:'6%', cat:'fashion' },
    { name:'Booking.com', emoji:'🏨', cashback:'5%', cat:'travel' },
    { name:'Nike', emoji:'👟', cashback:'3.5%', cat:'sports' },
    { name:'Currys', emoji:'📺', cashback:'2.5%', cat:'electronics' },
    { name:'Boots', emoji:'💄', cashback:'4%', cat:'beauty' },
    { name:'John Lewis', emoji:'🏡', cashback:'3%', cat:'home' },
    { name:'Expedia', emoji:'✈️', cashback:'4.5%', cat:'travel' },
    { name:'NEXT', emoji:'👔', cashback:'4%', cat:'fashion' },
    { name:'Argos', emoji:'🛒', cashback:'2%', cat:'home' },
  ];

  const PRODUCTS = {
    fashion: [
      { emoji:'👕', name:'Linen Shirt', store:'ASOS', cash:'6%' },
      { emoji:'👖', name:'Slim Chinos', store:'NEXT', cash:'4%' },
      { emoji:'👗', name:'Midi Dress', store:'ASOS', cash:'6%' },
      { emoji:'👟', name:'Air Max 90', store:'Nike', cash:'3.5%' },
    ],
    electronics: [
      { emoji:'🎧', name:'Sony XM5', store:'Amazon UK', cash:'4.5%' },
      { emoji:'💻', name:'MacBook Air M3', store:'Currys', cash:'2.5%' },
      { emoji:'📱', name:'iPhone 15 Pro', store:'Amazon UK', cash:'4.5%' },
      { emoji:'⌚', name:'Apple Watch S9', store:'John Lewis', cash:'3%' },
    ],
    travel: [
      { emoji:'🏖️', name:'Tenerife 7 nights', store:'Booking.com', cash:'5%' },
      { emoji:'✈️', name:'Flights to NYC', store:'Expedia', cash:'4.5%' },
      { emoji:'🏨', name:'London Hotel', store:'Booking.com', cash:'5%' },
      { emoji:'🚗', name:'Car Hire Greece', store:'Expedia', cash:'4.5%' },
    ],
    beauty: [
      { emoji:'💄', name:'No7 Set', store:'Boots', cash:'4%' },
      { emoji:'🧴', name:'CeraVe Bundle', store:'Boots', cash:'4%' },
      { emoji:'💅', name:'OPI Nail Kit', store:'Boots', cash:'4%' },
      { emoji:'🌸', name:'Perfume Gift Set', store:'Boots', cash:'4%' },
    ],
    couple: [
      { emoji:'💑', name:'Matching Trainers', store:'Nike', cash:'3.5%' },
      { emoji:'🌹', name:'Hotel Spa Weekend', store:'Booking.com', cash:'5%' },
      { emoji:'💍', name:'Jewellery Set', store:'John Lewis', cash:'3%' },
      { emoji:'🧳', name:'Twin Luggage Set', store:'Amazon UK', cash:'4.5%' },
    ],
  };

  const GREETINGS = [
    'Namaste! 🙏 I\'m your personal SmartCash AI. Tell me what you\'re shopping for and I\'ll find the best cashback deals for you!',
    'Hey there! 👋 Ready to save big? I can find deals, compare cashback rates, or help you shop as a squad. What\'s on your list?',
    'Hi! Welcome to SmartCash AI 🤖 I can help you find the best cashback, track prices, or start a squad shopping session. What do you need?',
  ];

  /* ─── RESPONSE ENGINE ──────────────────────────────────── */
  function getLocalReply(msg) {
    const m = msg.toLowerCase();

    if (/hello|hi|hey|namaste|howdy|sup|yo/.test(m)) {
      return { text: GREETINGS[Math.floor(Math.random()*GREETINGS.length)], qr:['Men\'s clothes','Women\'s fashion','Electronics','Travel deals','Squad mode'] };
    }
    if (/men.*(cloth|shirt|wear|outfit|fashion|tshirt|t-shirt)|shirt.*men|men.*shop/.test(m)) {
      return { text: '👕 Great choice! Here are top picks for men with the best cashback right now:', products: PRODUCTS.fashion, qr:['Show trainers','Women\'s too','Budget under £50','Squad mode'] };
    }
    if (/women|ladies|girl|female|dress|skirt/.test(m)) {
      return { text: '👗 Gorgeous picks coming up! Best cashback on women\'s fashion right now:', products: PRODUCTS.fashion, qr:['Add accessories','Matching couple outfits','Beauty deals'] };
    }
    if (/trainer|shoe|sneaker|footwear|nike/.test(m)) {
      return { text: '👟 Nike has **3.5% cashback** right now — one of their best rates! Here are trending picks:', products: PRODUCTS.fashion.filter(p=>p.emoji==='👟'), qr:['More Nike deals','Men\'s fashion','ASOS deals'] };
    }
    if (/electronic|laptop|phone|headphone|tech|gadget|tv|computer/.test(m)) {
      return { text: '💻 Top tech deals with cashback — Amazon UK is at 4.5% today:', products: PRODUCTS.electronics, qr:['Price history','Set price alert','Best laptop deals'] };
    }
    if (/travel|holiday|hotel|flight|barcelona|ibiza|maldives/.test(m)) {
      return { text: '✈️ Amazing! Booking.com has **5% cashback** and Expedia **4.5%** right now. Here are top picks:', products: PRODUCTS.travel, qr:['Couple travel','Family holidays','Compare hotels'] };
    }
    if (/couple|partner|boyfriend|girlfriend|together|date|romantic/.test(m)) {
      return { text: '💑 Squad mode activated for couples! 🎉 Here are items your both might love — vote on your favourites:', products: PRODUCTS.couple, vote: { title:'Which holiday? Vote now 🗳️', opts:[{label:'Tenerife Spa 🌴',pct:0},{label:'Paris Romantic 🗼',pct:0},{label:'Maldives Luxury 🏝️',pct:0}] }, qr:['Start couple squad','Matching outfits','Gift ideas'] };
    }
    if (/friend|bestie|squad|group|team/.test(m)) {
      return { text: '👯 Squad mode is perfect for this! Invite your friends and shop together in real time — vote on items, split wishlist. Want me to create a squad link?', qr:['Start squad','Show squad features','Friends fashion'] };
    }
    if (/family|kids|child|baby|parent/.test(m)) {
      return { text: '👨‍👩‍👧 Family squad mode! Great for coordinating purchases. Here are family-friendly deals with the best cashback:', products: PRODUCTS.fashion, qr:['Start family squad','Kids clothes','Family holidays'] };
    }
    if (/beauty|makeup|skincare|boots|cosmetics/.test(m)) {
      return { text: '💄 Boots has **4% cashback** — one of the best rates for beauty! Here\'s what\'s trending:', products: PRODUCTS.beauty, qr:['Gift sets','Skincare routines','Compare beauty stores'] };
    }
    if (/deal|offer|discount|sale|cheap|bargain|best/.test(m)) {
      return { text: '🔥 Today\'s hottest cashback rates:\n\n• **ASOS** — 6% 🥇\n• **Booking.com** — 5%\n• **Amazon UK** — 4.5%\n• **Expedia** — 4.5%\n• **Boots** — 4%\n\nClick any store to start earning!', qr:['ASOS deals','Amazon deals','Travel deals','Beauty deals'] };
    }
    if (/price|track|alert|history|buy now|wait|should i/.test(m)) {
      return { text: '📊 I can track any product\'s price history and tell you the best time to buy. Paste a product URL or name below and I\'ll check the AI price prediction for you!', qr:['Track Sony XM5','Track iPhone','Track MacBook','Set price alert'] };
    }
    if (/amazon/.test(m)) {
      return { text: '📦 Amazon UK is at **4.5% cashback** today! That\'s £4.50 back per £100 spent. Want me to find specific products, or track a current listing?', qr:['Find electronics','Find fashion','Set price alert','Connect Amazon account'] };
    }
    if (/asos/.test(m)) {
      return { text: '👗 ASOS is at **6% cashback** — their best rate in weeks! Free delivery and returns too. What styles are you looking for?', qr:['Men\'s ASOS','Women\'s ASOS','Sale items','Compare with NEXT'] };
    }
    if (/squad|multiplayer|shop together/.test(m)) {
      return { text: '👥 Squad shopping is one of our most fun features! You can shop with a partner, friends, or family — see each other\'s baskets, vote on items, and coordinate outfits. Ready to start?', qr:['Couple squad','Friends squad','Family squad','How does it work?'] };
    }
    if (/withdraw|pay|money|earn|cashback|balance/.test(m)) {
      return { text: '💷 Your cashback is paid within **24 hours** from just **£10** minimum — lowest in the UK! You can withdraw to bank, PayPal or Amazon gift card. Sign up free to start earning!', qr:['Create account','Browse stores','Top earners this week'] };
    }
    if (/budget|under|cheap|less than|£/.test(m)) {
      const budget = msg.match(/£?(\d+)/)?.[1];
      return { text: `💰 Finding great picks ${budget ? `under £${budget}` : 'on a budget'} with the best cashback. Check these out at ASOS (6% back) and Amazon (4.5% back):`, products: PRODUCTS.fashion, qr:['Under £30','Under £100','Clearance sale'] };
    }

    // fallback
    return { text: `Great question about "${msg}"! I'm scanning our 500+ stores for the best cashback deals on that. For AI-powered personalised answers, check out our full dashboard. Meanwhile — here are today's top cashback rates:\n\n• ASOS 6% • Booking.com 5% • Amazon 4.5%`, qr:['Browse all stores','Top deals today','Start earning free'] };
  }

  /* ─── REAL AI (if API key provided) ────────────────────── */
  async function getRealAIReply(msg, history) {
    const messages = [...history.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: msg }];
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: 'You are the SmartCash AI, a friendly UK cashback shopping assistant. Be helpful, concise, and always mention relevant cashback rates. Top stores: Amazon UK 4.5%, ASOS 6%, Booking.com 5%, Nike 3.5%, Boots 4%. Keep replies under 3 sentences unless listing products.',
        messages
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text || 'Sorry, I had trouble with that. Try again?';
  }

  /* ─── STATE ────────────────────────────────────────────── */
  const state = {
    open: false,
    mode: 'shop',
    squadType: 'couple',
    squadMembers: [],
    squadActive: false,
    chatHistory: [],
    greeted: false,
  };

  /* ─── CORE FUNCTIONS ───────────────────────────────────── */
  window.SCAI = {

    toggle() {
      state.open ? this.close() : this.open_();
    },

    open_() {
      state.open = true;
      document.getElementById('sc-sidebar').classList.add('open');
      document.body.classList.add('sc-open');
      document.getElementById('sc-fab-label').textContent = 'Close';
      document.getElementById('sc-fab-badge').style.display = 'none';
      if (!state.greeted) {
        state.greeted = true;
        setTimeout(() => this._addAI(GREETINGS[0], ['Men\'s clothes','Women\'s fashion','Electronics','Travel','Squad mode']), 400);
      }
    },

    close() {
      state.open = false;
      document.getElementById('sc-sidebar').classList.remove('open');
      document.body.classList.remove('sc-open');
      document.getElementById('sc-fab-label').textContent = 'Ask AI';
    },

    setMode(mode, el) {
      state.mode = mode;
      document.querySelectorAll('.sc-mode').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      const msgs = {
        shop: 'Shopping mode 🛍️ — Tell me what you\'re looking for!',
        deals: '🔥 Today\'s best cashback rates:\n\n• ASOS 6% 🥇\n• Booking.com 5%\n• Amazon 4.5%\n• Expedia 4.5%\n• Boots 4%',
        squad: '👥 Squad mode! Shopping is more fun together. Who are you shopping with today?',
        price: '📊 Price tracker mode! Paste any product URL or name and I\'ll show you price history + AI prediction.',
      };
      const qrs = {
        shop: ['Men\'s fashion','Women\'s fashion','Electronics','Beauty','Travel'],
        deals: ['ASOS deals','Amazon deals','Travel deals','Beauty deals'],
        squad: ['Start couple squad','Friends squad','Family squad','How does squad work?'],
        price: ['Track Sony XM5','Track AirPods','Track MacBook','Set custom alert'],
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
      state.chatHistory.push({ role: 'user', content: msg });
      await new Promise(r => setTimeout(r, 600 + Math.random() * 600));
      this._hideTyping();
      if (USE_REAL_AI) {
        const text = await getRealAIReply(msg, state.chatHistory.slice(-6));
        this._addAI(text);
        state.chatHistory.push({ role: 'assistant', content: text });
      } else {
        const reply = getLocalReply(msg);
        this._addAI(reply.text, reply.qr, reply.products, reply.vote);
        state.chatHistory.push({ role: 'assistant', content: reply.text });
      }
    },

    _addUser(text) {
      const msgs = document.getElementById('sc-msgs');
      const div = document.createElement('div');
      div.className = 'sc-msg user';
      div.innerHTML = `<div class="sc-bubble">${text}</div>`;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    },

    _addAI(text, qrs, products, vote) {
      const msgs = document.getElementById('sc-msgs');
      const div = document.createElement('div');
      div.className = 'sc-msg';
      div.innerHTML = `<div class="sc-bubble">${text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>')}</div>`;
      msgs.appendChild(div);

      if (products && products.length) {
        const grid = document.createElement('div');
        grid.className = 'sc-msg';
        grid.innerHTML = `<div style="width:100%"><div class="sc-products">${products.map(p=>`
          <div class="sc-prod-card" onclick="SCAI._prodClick('${p.name}','${p.store}')">
            <div class="sc-prod-emoji">${p.emoji}</div>
            <div class="sc-prod-name">${p.name}</div>
            <div class="sc-prod-store">${p.store}</div>
            <div class="sc-prod-cash">${p.cash} cashback</div>
          </div>`).join('')}</div></div>`;
        msgs.appendChild(grid);
      }

      if (vote) {
        const voteEl = document.createElement('div');
        voteEl.className = 'sc-msg';
        voteEl.innerHTML = `<div class="sc-vote-widget" style="width:100%">
          <div class="sc-vote-title">${vote.title}</div>
          ${vote.opts.map((o,i)=>`
            <div class="sc-vote-opt" onclick="SCAI._castVote(${i},this.closest('.sc-vote-widget'))">
              <span class="sc-vote-label">${o.label}</span>
              <div class="sc-vote-bar-wrap"><div class="sc-vote-bar" style="width:0%"></div></div>
              <span class="sc-vote-pct">0%</span>
            </div>`).join('')}
          <button class="sc-vote-btn">Cast Your Vote →</button>
        </div>`;
        msgs.appendChild(voteEl);
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
          btn.onclick = () => {
            document.getElementById('sc-input').value = q;
            SCAI.send();
          };
          qrEl.appendChild(btn);
        });
      }
    },

    _showTyping() {
      const msgs = document.getElementById('sc-msgs');
      const t = document.createElement('div');
      t.className = 'sc-msg'; t.id = 'sc-typing';
      t.innerHTML = `<div class="sc-typing"><div class="sc-t-dot"></div><div class="sc-t-dot"></div><div class="sc-t-dot"></div></div>`;
      msgs.appendChild(t);
      msgs.scrollTop = msgs.scrollHeight;
    },
    _hideTyping() {
      document.getElementById('sc-typing')?.remove();
    },

    _prodClick(name, store) {
      document.getElementById('sc-input').value = `Tell me more about ${name} at ${store}`;
      this.send();
    },

    _castVote(idx, widget) {
      const bars = widget.querySelectorAll('.sc-vote-bar');
      const pcts = widget.querySelectorAll('.sc-vote-pct');
      const votes = [0,0,0].map((_,i)=> i===idx ? 2 : Math.floor(Math.random()*2));
      const total = votes.reduce((a,b)=>a+b,1);
      const myVotes = votes.map(v => Math.round(v/total*100));
      myVotes[idx] = Math.max(myVotes[idx], 34);
      bars.forEach((b,i) => b.style.width = myVotes[i]+'%');
      pcts.forEach((p,i) => p.textContent = myVotes[i]+'%');
      widget.querySelector('.sc-vote-btn').textContent = '✓ Vote cast!';
      if (state.squadActive) {
        setTimeout(() => this._addSquad('Alex voted too! 🗳️ Tenerife is winning the squad vote 🌴'), 1200);
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

    /* SQUAD */
    openSquadModal() {
      document.getElementById('sc-squad-modal').classList.add('open');
      this._genLink();
    },
    closeSquadModal() {
      document.getElementById('sc-squad-modal').classList.remove('open');
    },
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
      const val = document.getElementById('sc-link-input').value;
      navigator.clipboard?.writeText(val).catch(()=>{});
      const btn = document.querySelector('.sc-copy-btn');
      btn.textContent = 'Copied!';
      setTimeout(()=>btn.textContent='Copy', 2000);
    },
    inviteToSquad() { this.openSquadModal(); },
    startSquad() {
      state.squadActive = true;
      this.closeSquadModal();
      const names = { couple:'Partner',friends:'Best Friend',family:'Family Member',occasion:'Guest' };
      state.squadMembers = [{ name:'You',online:true },{ name:names[state.squadType]||'Friend',online:false }];
      this._renderSquad();
      document.getElementById('sc-squad-bar').style.display = 'flex';
      if (!state.open) this.open_();
      const partner = names[state.squadType];
      setTimeout(()=>{
        state.squadMembers[1].online = true;
        this._renderSquad();
        this._addSquad(`${partner} just joined your squad! 🎉`);
        setTimeout(()=>this._addSquad('I love it! Shall we look at matching outfits? 👯'),2000);
      }, 2000);
    },
    _renderSquad() {
      document.getElementById('sc-squad-members').innerHTML = state.squadMembers.map(m=>`
        <div class="sc-squad-member">
          <div class="sc-member-dot" style="background:${m.online?'#4ade80':'#718096'}"></div>
          ${m.name}
        </div>`).join('');
    },
  };

  /* ─── AUTO BADGE AFTER DELAY ───────────────────────────── */
  setTimeout(() => {
    if (!state.open) {
      document.getElementById('sc-fab-badge').style.display = 'flex';
    }
  }, 5000);

  /* ─── KEYBOARD SHORTCUT ────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === '/') SCAI.toggle();
  });

})();
