/* ============================================================
   SmartCash — Aria Living Assistant v4
   Visible avatar · Voice · Lip-sync · Multi-store search
   ============================================================ */
(function () {

/* ─── PRODUCT DATA ───────────────────────────────────────── */
const PRODUCTS = {
  tshirt:[
    {id:'t1',title:'Classic White Crew Neck Tee',price:12.99,store:'Amazon',rating:4.3,reviews:2841,img:'👕',cashback:4.5,badge:'Best Seller',url:'https://amazon.co.uk'},
    {id:'t2',title:'Premium Cotton Polo Shirt',price:18.50,store:'eBay',rating:4.1,reviews:924,img:'👔',cashback:3.2,badge:'',url:'https://ebay.co.uk'},
    {id:'t3',title:'Oversized Graphic Tee — Black',price:22.00,store:'Flipkart',rating:4.5,reviews:3120,img:'🖤',cashback:5.0,badge:'Hot 🔥',url:'https://flipkart.com'},
    {id:'t4',title:'Slim Fit V-Neck T-Shirt',price:9.99,store:'Amazon',rating:4.0,reviews:1560,img:'👕',cashback:4.5,badge:'',url:'https://amazon.co.uk'},
    {id:'t5',title:'Striped Breton Tee',price:24.99,store:'eBay',rating:4.6,reviews:780,img:'👕',cashback:3.2,badge:'Top Rated ⭐',url:'https://ebay.co.uk'},
    {id:'t6',title:'Organic Cotton Basic Tee',price:14.00,store:'Flipkart',rating:4.2,reviews:432,img:'🌿',cashback:5.0,badge:'Eco',url:'https://flipkart.com'},
  ],
  shirt:[
    {id:'s1',title:'Oxford Button-Down Shirt',price:29.99,store:'Amazon',rating:4.4,reviews:1820,img:'👔',cashback:4.5,badge:'Best Seller',url:'https://amazon.co.uk'},
    {id:'s2',title:'Slim Fit Checked Shirt',price:34.00,store:'eBay',rating:4.2,reviews:640,img:'🔲',cashback:3.2,badge:'',url:'https://ebay.co.uk'},
    {id:'s3',title:'Linen Summer Shirt',price:27.50,store:'Flipkart',rating:4.6,reviews:910,img:'🌿',cashback:5.0,badge:'Summer Pick',url:'https://flipkart.com'},
  ],
  jeans:[
    {id:'j1',title:'Slim Fit Dark Wash Jeans',price:39.99,store:'Amazon',rating:4.3,reviews:3200,img:'👖',cashback:4.5,badge:'Best Seller',url:'https://amazon.co.uk'},
    {id:'j2',title:'Straight Leg Classic Jeans',price:45.00,store:'eBay',rating:4.5,reviews:1100,img:'👖',cashback:3.2,badge:'Top Rated ⭐',url:'https://ebay.co.uk'},
    {id:'j3',title:'High Waist Mom Jeans',price:28.00,store:'Flipkart',rating:4.6,reviews:4200,img:'👖',cashback:5.0,badge:'Hot 🔥',url:'https://flipkart.com'},
  ],
  headphones:[
    {id:'h1',title:'Sony WH-1000XM5 Wireless',price:279.00,store:'Amazon',rating:4.8,reviews:12400,img:'🎧',cashback:4.5,badge:'Best Overall',url:'https://amazon.co.uk'},
    {id:'h2',title:'AirPods Pro (2nd Gen)',price:219.00,store:'eBay',rating:4.7,reviews:9800,img:'🎵',cashback:3.2,badge:'Top Rated ⭐',url:'https://ebay.co.uk'},
    {id:'h3',title:'Boat Rockerz 450 Pro',price:29.99,store:'Flipkart',rating:4.1,reviews:45000,img:'🎶',cashback:5.0,badge:'Budget Pick',url:'https://flipkart.com'},
  ],
  laptop:[
    {id:'l1',title:'Apple MacBook Air M3',price:1099.00,store:'Amazon',rating:4.9,reviews:3200,img:'💻',cashback:4.5,badge:'Best Overall',url:'https://amazon.co.uk'},
    {id:'l2',title:'Dell Inspiron 15 i5',price:599.00,store:'eBay',rating:4.3,reviews:1800,img:'💼',cashback:3.2,badge:'Value Pick',url:'https://ebay.co.uk'},
    {id:'l3',title:'HP Pavilion 14',price:449.00,store:'Flipkart',rating:4.1,reviews:8900,img:'💻',cashback:5.0,badge:'Budget',url:'https://flipkart.com'},
  ],
  shoes:[
    {id:'sh1',title:'Nike Air Max 90',price:89.99,store:'Amazon',rating:4.7,reviews:8200,img:'👟',cashback:4.5,badge:'Best Seller',url:'https://amazon.co.uk'},
    {id:'sh2',title:'Adidas Stan Smith',price:75.00,store:'eBay',rating:4.5,reviews:3400,img:'⚪',cashback:3.2,badge:'Classic',url:'https://ebay.co.uk'},
    {id:'sh3',title:'Canvas Sneakers',price:29.99,store:'Flipkart',rating:4.2,reviews:1800,img:'👟',cashback:5.0,badge:'Budget Pick',url:'https://flipkart.com'},
  ],
  dress:[
    {id:'d1',title:'Floral Wrap Midi Dress',price:34.99,store:'Amazon',rating:4.4,reviews:2100,img:'👗',cashback:4.5,badge:'Best Seller',url:'https://amazon.co.uk'},
    {id:'d2',title:'Bodycon Evening Dress',price:42.00,store:'eBay',rating:4.2,reviews:680,img:'🖤',cashback:3.2,badge:'',url:'https://ebay.co.uk'},
    {id:'d3',title:'Summer Sundress Boho',price:22.99,store:'Flipkart',rating:4.5,reviews:3800,img:'🌺',cashback:5.0,badge:'Trending 🔥',url:'https://flipkart.com'},
  ],
};
const SC={Amazon:{bg:'rgba(255,153,0,.12)',border:'rgba(255,153,0,.4)',text:'#FF9900'},eBay:{bg:'rgba(0,112,186,.12)',border:'rgba(0,112,186,.4)',text:'#0070BA'},Flipkart:{bg:'rgba(40,116,240,.12)',border:'rgba(40,116,240,.4)',text:'#2874F0'}};
const basket=[];

/* ─── VOICE ──────────────────────────────────────────────── */
const synth=window.speechSynthesis;
let isSpeak=false, lipTimer=null, recog=null, isListen=false;

function getBestVoice(){
  const v=synth.getVoices();
  return v.find(x=>x.name==='Samantha')||v.find(x=>x.name==='Karen')||v.find(x=>x.name==='Moira')||v.find(x=>x.lang.startsWith('en-')&&x.name.toLowerCase().includes('female'))||v.find(x=>x.lang.startsWith('en'))||v[0];
}
if(synth.onvoiceschanged!==undefined) synth.onvoiceschanged=getBestVoice;

function aria_speak(txt, cb){
  if(!synth){cb&&cb();return;}
  synth.cancel();
  const clean=txt.replace(/[^\x20-\x7E ]/g,'').replace(/\*\*(.*?)\*\*/g,'$1').substring(0,280);
  if(!clean.trim()){cb&&cb();return;}
  const u=new SpeechSynthesisUtterance(clean);
  u.voice=getBestVoice(); u.rate=1.05; u.pitch=1.1; u.volume=1;
  isSpeak=true; lipStart();
  u.onend=u.onerror=()=>{isSpeak=false;lipStop();cb&&cb();};
  synth.speak(u);
}

function lipStart(){
  const m=document.getElementById('aria-mouth');
  if(!m)return;
  const open=[2,5,8,11,7,3,9,6,4];
  let i=0;
  clearInterval(lipTimer);
  lipTimer=setInterval(()=>{
    m.setAttribute('d', lipPath(open[i%open.length]));
    // blink every ~2s
    if(i%20===0){ const ey=document.getElementById('aria-eyes'); if(ey){ey.style.transform='scaleY(0)'; setTimeout(()=>{if(ey)ey.style.transform='scaleY(1)';},100);} }
    i++;
  },110);
}
function lipStop(){
  clearInterval(lipTimer);
  const m=document.getElementById('aria-mouth');
  if(m) m.setAttribute('d', lipPath(2));
}
function lipPath(open){
  // creates a mouth curve: open=0 closed, open=12 wide open
  const y=100, cx=100, w=18;
  const bot=y+open;
  return `M${cx-w} ${y} Q${cx} ${y-4} ${cx+w} ${y} Q${cx} ${bot+2} ${cx-w} ${y} Z`;
}

/* ─── INJECT SIDEBAR HTML ────────────────────────────────── */
document.body.insertAdjacentHTML('beforeend', `

<div id="aria-sidebar">

  <!-- ══ AVATAR SECTION ══ -->
  <div id="aria-avatar-wrap">

    <!-- Background gradient blob -->
    <div id="aria-bg-blob"></div>

    <!-- THE AVATAR — drawn with canvas-quality SVG -->
    <svg id="aria-svg" viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ag-skin" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#FFD5A8"/>
          <stop offset="70%" stop-color="#F5BC82"/>
          <stop offset="100%" stop-color="#E8A870"/>
        </radialGradient>
        <radialGradient id="ag-hair" cx="50%" cy="20%" r="70%">
          <stop offset="0%" stop-color="#3D2010"/>
          <stop offset="100%" stop-color="#1A0A00"/>
        </radialGradient>
        <radialGradient id="ag-body" cx="50%" cy="0%" r="90%">
          <stop offset="0%" stop-color="#00D4A0"/>
          <stop offset="100%" stop-color="#009070"/>
        </radialGradient>
        <radialGradient id="ag-blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FF9999" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#FF9999" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="ag-bg" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stop-color="#0a2a1a"/>
          <stop offset="100%" stop-color="#030d07"/>
        </radialGradient>
        <filter id="ag-glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="ag-shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="rgba(0,0,0,0.4)"/>
        </filter>
      </defs>

      <!-- Room background ambient light -->
      <rect width="220" height="340" fill="url(#ag-bg)"/>
      <ellipse cx="110" cy="320" rx="90" ry="40" fill="rgba(0,200,150,0.12)"/>
      <ellipse cx="110" cy="100" rx="70" ry="50" fill="rgba(0,200,150,0.06)"/>

      <!-- ── BODY / OUTFIT ── -->
      <!-- Main torso — fitted top -->
      <path d="M30 340 L35 230 Q40 195 60 180 Q80 168 95 165 L110 185 L125 165 Q140 168 160 180 Q180 195 185 230 L190 340 Z" fill="url(#ag-body)"/>
      <!-- Top highlight -->
      <path d="M60 180 Q70 175 82 172 Q72 192 65 215 Z" fill="rgba(255,255,255,0.12)"/>
      <path d="M160 180 Q150 175 138 172 Q148 192 155 215 Z" fill="rgba(255,255,255,0.06)"/>
      <!-- V-neck -->
      <path d="M95 165 L110 200 L125 165" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-linejoin="round"/>
      <!-- Arms -->
      <path d="M35 230 Q18 240 14 280 Q16 295 24 290 Q30 260 42 245 Z" fill="url(#ag-body)"/>
      <path d="M185 230 Q202 240 206 280 Q204 295 196 290 Q190 260 178 245 Z" fill="url(#ag-body)"/>
      <!-- Hands -->
      <ellipse cx="19" cy="293" rx="9" ry="11" fill="url(#ag-skin)"/>
      <ellipse cx="201" cy="293" rx="9" ry="11" fill="url(#ag-skin)"/>
      <!-- Necklace -->
      <path d="M84 158 Q110 172 136 158" fill="none" stroke="rgba(255,210,80,0.7)" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="110" cy="172" r="3" fill="rgba(255,210,80,0.85)"/>
      <!-- Logo on shirt -->
      <text x="110" y="230" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="bold" fill="rgba(255,255,255,0.3)">SmartCash</text>

      <!-- ── NECK ── -->
      <rect x="96" y="145" width="28" height="28" rx="10" fill="url(#ag-skin)"/>

      <!-- ── HAIR BACK ── -->
      <ellipse cx="110" cy="75" rx="58" ry="55" fill="url(#ag-hair)"/>
      <!-- Long hair flowing down -->
      <path d="M52 88 Q28 150 36 240 Q50 255 64 245 Q54 165 62 108 Z" fill="url(#ag-hair)" opacity="0.95"/>
      <path d="M168 88 Q192 150 184 240 Q170 255 156 245 Q166 165 158 108 Z" fill="url(#ag-hair)" opacity="0.95"/>
      <!-- Hair highlights -->
      <path d="M80 32 Q110 24 136 34 Q120 28 110 27 Q100 27 80 32 Z" fill="#6B4025" opacity="0.5"/>
      <path d="M75 40 Q78 34 88 30" fill="none" stroke="#7A4A28" stroke-width="2" stroke-linecap="round" opacity="0.4"/>

      <!-- ── FACE ── -->
      <ellipse cx="110" cy="82" rx="52" ry="56" fill="url(#ag-skin)" filter="url(#ag-shadow)"/>

      <!-- ── EARS ── -->
      <ellipse cx="58" cy="90" rx="8" ry="10" fill="url(#ag-skin)"/>
      <ellipse cx="162" cy="90" rx="8" ry="10" fill="url(#ag-skin)"/>
      <!-- Inner ear -->
      <ellipse cx="58" cy="90" rx="4" ry="6" fill="#E8A870" opacity="0.5"/>
      <ellipse cx="162" cy="90" rx="4" ry="6" fill="#E8A870" opacity="0.5"/>
      <!-- Earrings -->
      <circle cx="58" cy="102" r="5" fill="rgba(255,210,80,0.0)" stroke="rgba(255,210,80,0.85)" stroke-width="1.5"/>
      <circle cx="162" cy="102" r="5" fill="rgba(255,210,80,0.0)" stroke="rgba(255,210,80,0.85)" stroke-width="1.5"/>
      <circle cx="58" cy="109" r="2.5" fill="rgba(255,210,80,0.9)"/>
      <circle cx="162" cy="109" r="2.5" fill="rgba(255,210,80,0.9)"/>

      <!-- Blush -->
      <ellipse cx="82" cy="102" rx="14" ry="9" fill="url(#ag-blush)"/>
      <ellipse cx="138" cy="102" rx="14" ry="9" fill="url(#ag-blush)"/>

      <!-- Eyebrows — expressive arched -->
      <path d="M84 62 Q96 56 106 59" fill="none" stroke="#2C1008" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M114 59 Q124 56 136 62" fill="none" stroke="#2C1008" stroke-width="2.8" stroke-linecap="round"/>

      <!-- ── EYES GROUP ── -->
      <g id="aria-eyes" style="transform-origin:110px 80px;transition:transform 0.06s ease">
        <!-- eye whites -->
        <ellipse cx="95" cy="82" rx="11" ry="9" fill="white" filter="url(#ag-glow)"/>
        <ellipse cx="125" cy="82" rx="11" ry="9" fill="white" filter="url(#ag-glow)"/>
        <!-- shadow top -->
        <path d="M84 77 Q95 72 106 77" fill="rgba(200,160,120,0.2)"/>
        <path d="M114 77 Q125 72 136 77" fill="rgba(200,160,120,0.2)"/>
        <!-- irises — warm hazel -->
        <circle cx="95" cy="82" r="7" fill="#7B4A2A"/>
        <circle cx="125" cy="82" r="7" fill="#7B4A2A"/>
        <!-- limbal ring -->
        <circle cx="95" cy="82" r="7" fill="none" stroke="#3D1A0A" stroke-width="1"/>
        <circle cx="125" cy="82" r="7" fill="none" stroke="#3D1A0A" stroke-width="1"/>
        <!-- pupils -->
        <circle cx="96" cy="82" r="4" fill="#0D0500"/>
        <circle cx="126" cy="82" r="4" fill="#0D0500"/>
        <!-- catch light -->
        <circle cx="98" cy="79" r="2.5" fill="white" opacity="0.9"/>
        <circle cx="128" cy="79" r="2.5" fill="white" opacity="0.9"/>
        <circle cx="93" cy="84" r="1" fill="white" opacity="0.4"/>
        <circle cx="123" cy="84" r="1" fill="white" opacity="0.4"/>
        <!-- upper lash -->
        <path d="M84 76 Q95 70 106 76" fill="none" stroke="#1A0800" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M114 76 Q125 70 136 76" fill="none" stroke="#1A0800" stroke-width="2.8" stroke-linecap="round"/>
        <!-- lower lash subtle -->
        <path d="M84 87 Q95 91 106 87" fill="none" stroke="#2C1008" stroke-width="0.8" opacity="0.35"/>
        <path d="M114 87 Q125 91 136 87" fill="none" stroke="#2C1008" stroke-width="0.8" opacity="0.35"/>
      </g>

      <!-- ── NOSE ── -->
      <path d="M106 96 Q104 106 102 110 Q110 115 118 110 Q116 106 114 96" fill="none" stroke="rgba(160,90,50,0.3)" stroke-width="1.3" stroke-linecap="round"/>
      <ellipse cx="104" cy="111" rx="3.5" ry="2" fill="rgba(180,110,70,0.2)"/>
      <ellipse cx="116" cy="111" rx="3.5" ry="2" fill="rgba(180,110,70,0.2)"/>

      <!-- ── MOUTH — fully animated ── -->
      <path id="aria-mouth" d="" fill="#C04060"/>
      <!-- upper lip -->
      <path d="M92 118 Q101 113 110 116 Q119 113 128 118 Q119 122 110 121 Q101 122 92 118 Z" fill="#E05878"/>
      <!-- lip shine -->
      <path d="M103 114 Q110 112 117 114" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.2" stroke-linecap="round"/>

      <!-- smile dimples -->
      <path d="M89 118 Q87 122 88 128" fill="none" stroke="rgba(160,90,50,0.2)" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M131 118 Q133 122 132 128" fill="none" stroke="rgba(160,90,50,0.2)" stroke-width="1.2" stroke-linecap="round"/>

    </svg>

    <!-- Status nameplate -->
    <div id="aria-nameplate">
      <div id="aria-name">Aria <span id="aria-online-dot">●</span></div>
      <div id="aria-status">SmartCash Assistant · Always here</div>
    </div>

    <!-- Speaking wave bars -->
    <div id="aria-wave">
      <div class="aria-bar"></div>
      <div class="aria-bar"></div>
      <div class="aria-bar"></div>
      <div class="aria-bar"></div>
      <div class="aria-bar"></div>
    </div>

    <!-- Close X -->
    <button id="aria-close" onclick="SCAI.close()">✕</button>
  </div>

  <!-- ══ CHAT SECTION ══ -->
  <div id="aria-chat">

    <!-- Mode bar -->
    <div id="aria-modes">
      <button class="aria-mode active" onclick="SCAI.setMode('shop',this)">🛍️ Shop</button>
      <button class="aria-mode" onclick="SCAI.setMode('deals',this)">🔥 Deals</button>
      <button class="aria-mode" onclick="SCAI.setMode('squad',this)">👥 Squad</button>
      <button class="aria-mode" onclick="SCAI.setMode('price',this)">📊 Price</button>
    </div>

    <!-- Basket strip -->
    <div id="aria-basket-strip" style="display:none">
      <span id="aria-basket-label">🛒 0 items</span>
      <button onclick="SCAI.toggleBasket()">View basket</button>
    </div>
    <div id="aria-basket-body" style="display:none">
      <div id="aria-basket-items"></div>
      <button id="aria-checkout-btn" onclick="SCAI.checkoutAll()">Checkout All Stores →</button>
    </div>

    <!-- Messages -->
    <div id="aria-msgs"></div>

    <!-- Quick replies -->
    <div id="aria-qr"></div>

    <!-- Input -->
    <div id="aria-input-row">
      <button id="aria-mic" onclick="SCAI.toggleVoice()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v7a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zM8.5 18.5A7.5 7.5 0 0 0 19.5 12h2a9.5 9.5 0 0 1-9 9.47V23h-1v-1.53A9.5 9.5 0 0 1 2.5 12h2a7.5 7.5 0 0 0 6 7.35V18.5z"/></svg>
      </button>
      <input id="aria-input" placeholder='Try: "t-shirt under £25"' onkeydown="if(event.key==='Enter')SCAI.send()" autocomplete="off">
      <button id="aria-send" onclick="SCAI.send()">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  </div>
</div>

<!-- ══ FAB BUTTON ══ -->
<button id="aria-fab" onclick="SCAI.toggle()">
  <div id="aria-fab-portrait">
    <!-- Tiny inline Aria portrait -->
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
      <circle cx="30" cy="30" r="30" fill="#0a2a1a"/>
      <!-- hair -->
      <ellipse cx="30" cy="22" rx="16" ry="15" fill="#2C1008"/>
      <path d="M14 26 Q10 40 12 54 Q17 56 19 52 Q16 40 18 30 Z" fill="#2C1008"/>
      <path d="M46 26 Q50 40 48 54 Q43 56 41 52 Q44 40 42 30 Z" fill="#2C1008"/>
      <!-- face -->
      <ellipse cx="30" cy="26" rx="14" ry="15" fill="#FFD5A8"/>
      <!-- eyes -->
      <circle cx="25" cy="24" r="3" fill="#5C2A10"/>
      <circle cx="35" cy="24" r="3" fill="#5C2A10"/>
      <circle cx="25" cy="24" r="1.5" fill="#0D0500"/>
      <circle cx="35" cy="24" r="1.5" fill="#0D0500"/>
      <circle cx="26" cy="22.5" r="1" fill="white" opacity="0.9"/>
      <circle cx="36" cy="22.5" r="1" fill="white" opacity="0.9"/>
      <!-- lashes -->
      <path d="M22 21 Q25 18 28 21" fill="none" stroke="#1A0800" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M32 21 Q35 18 38 21" fill="none" stroke="#1A0800" stroke-width="1.5" stroke-linecap="round"/>
      <!-- mouth smile -->
      <path d="M24 32 Q30 37 36 32" fill="none" stroke="#E05878" stroke-width="2" stroke-linecap="round"/>
      <!-- blush -->
      <ellipse cx="21" cy="29" rx="4" ry="2.5" fill="rgba(255,120,120,0.35)"/>
      <ellipse cx="39" cy="29" rx="4" ry="2.5" fill="rgba(255,120,120,0.35)"/>
      <!-- body / green top -->
      <path d="M10 60 Q12 50 18 47 Q24 44 30 46 Q36 44 42 47 Q48 50 50 60 Z" fill="#00C896"/>
      <!-- green dot online indicator -->
      <circle cx="46" cy="14" r="5" fill="#4ade80" stroke="#0a2a1a" stroke-width="2"/>
    </svg>
  </div>
  <div id="aria-fab-text">
    <div id="aria-fab-name">Aria</div>
    <div id="aria-fab-sub">Your shopping assistant</div>
  </div>
  <div id="aria-fab-badge" style="display:none">1</div>
</button>

<!-- ══ VOICE OVERLAY ══ -->
<div id="aria-voice-overlay" style="display:none">
  <div class="aria-ripple"></div>
  <div class="aria-ripple" style="animation-delay:.4s"></div>
  <div style="font-size:3rem;position:relative;z-index:1;animation:ariaBob 1s ease-in-out infinite">🎙️</div>
  <div style="color:#FF6B6B;font-weight:700;font-size:1.1rem;position:relative;z-index:1">Aria is listening…</div>
  <div id="aria-transcript" style="color:rgba(255,255,255,.65);font-size:.9rem;text-align:center;max-width:260px;min-height:2rem;font-style:italic;position:relative;z-index:1"></div>
  <button onclick="SCAI.stopVoice()" style="background:rgba(255,107,107,.2);border:1.5px solid rgba(255,107,107,.4);color:#FF6B6B;padding:.6rem 2rem;border-radius:50px;font-weight:700;cursor:pointer;position:relative;z-index:1;font-family:inherit">Stop</button>
</div>

<!-- ══ SQUAD MODAL ══ -->
<div id="aria-squad-modal" onclick="if(event.target===this)SCAI.closeSquadModal()" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:1100;align-items:center;justify-content:center;backdrop-filter:blur(6px)">
  <div style="background:#161b27;border:1px solid rgba(255,255,255,.1);border-radius:20px;width:90%;max-width:400px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.5)">
    <div style="padding:1.1rem 1.4rem;border-bottom:1px solid rgba(255,255,255,.07);display:flex;justify-content:space-between;align-items:center">
      <h3 style="color:#e2e8f0;font-size:.95rem;font-weight:700">👥 Start Squad Shopping</h3>
      <button onclick="SCAI.closeSquadModal()" style="background:rgba(255,255,255,.08);border:none;color:rgba(255,255,255,.5);width:26px;height:26px;border-radius:7px;cursor:pointer">✕</button>
    </div>
    <div style="padding:1.25rem">
      <p style="color:rgba(255,255,255,.5);font-size:.82rem;margin-bottom:1rem">Shop in real-time — share baskets, vote on items.</p>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.5rem;margin-bottom:1rem">
        <div class="sq-type active" onclick="SCAI.selectSquadType('couple',this)">💑<br>Couple</div>
        <div class="sq-type" onclick="SCAI.selectSquadType('friends',this)">👯<br>Friends</div>
        <div class="sq-type" onclick="SCAI.selectSquadType('family',this)">👨‍👩‍👧<br>Family</div>
        <div class="sq-type" onclick="SCAI.selectSquadType('occasion',this)">🎉<br>Event</div>
      </div>
      <div style="display:flex;gap:.4rem;margin-bottom:.85rem">
        <input id="sq-link" readonly style="flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:7px;color:#a5b4fc;padding:.5rem .8rem;font-size:.76rem;outline:none;font-family:inherit" value="">
        <button onclick="SCAI.copyLink()" style="background:rgba(102,126,234,.2);border:1px solid rgba(102,126,234,.3);color:#a5b4fc;padding:.45rem .8rem;border-radius:7px;cursor:pointer;font-size:.76rem;font-weight:700;font-family:inherit">Copy</button>
      </div>
      <button onclick="SCAI.startSquad()" style="width:100%;background:linear-gradient(135deg,#667eea,#764ba2);border:none;color:#fff;padding:.75rem;border-radius:10px;font-size:.88rem;font-weight:700;cursor:pointer;font-family:inherit">Start Squad →</button>
    </div>
  </div>
</div>
`);

/* ─── STYLES ──────────────────────────────────────────────── */
const ST=document.createElement('style');
ST.textContent=`
/* ═ SIDEBAR ═ */
#aria-sidebar{
  position:fixed;top:0;right:0;bottom:0;width:310px;
  display:flex;flex-direction:column;z-index:1000;
  transform:translateX(110%);
  transition:transform .38s cubic-bezier(.4,0,.2,1);
  font-family:-apple-system,BlinkMacSystemFont,'DM Sans',sans-serif;
  box-shadow:-20px 0 60px rgba(0,0,0,.5);
}
#aria-sidebar.open{transform:translateX(0);}
body.aria-open{padding-right:310px;transition:padding-right .38s cubic-bezier(.4,0,.2,1);}

/* ═ AVATAR WRAP ═ */
#aria-avatar-wrap{
  position:relative;height:290px;flex-shrink:0;
  background:linear-gradient(175deg,#071a0e 0%,#030d06 100%);
  display:flex;flex-direction:column;
  align-items:center;justify-content:flex-end;
  overflow:hidden;
}
#aria-bg-blob{
  position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 60% 50% at 50% 95%, rgba(0,200,150,.18) 0%, transparent 70%),
    radial-gradient(ellipse 30% 25% at 25% 20%, rgba(0,200,150,.07) 0%, transparent 70%),
    radial-gradient(ellipse 30% 25% at 75% 25%, rgba(0,200,150,.07) 0%, transparent 70%);
}
#aria-svg{
  width:200px;height:auto;
  position:relative;z-index:2;
  filter:drop-shadow(0 12px 28px rgba(0,0,0,.55));
  animation:ariaBreath 4s ease-in-out infinite;
  margin-bottom:-12px;
}
@keyframes ariaBreath{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-5px);}
}
#aria-eyes{transform-origin:110px 82px;transition:transform .06s ease;}

#aria-nameplate{
  position:relative;z-index:3;
  text-align:center;padding:.55rem .5rem .15rem;width:100%;
  background:linear-gradient(to top, rgba(3,13,6,0.95) 0%, transparent 100%);
}
#aria-name{
  color:#fff;font-weight:800;font-size:.95rem;
  display:flex;align-items:center;justify-content:center;gap:.4rem;
}
#aria-online-dot{font-size:.5rem;color:#4ade80;animation:ariaPulse 2s infinite;}
@keyframes ariaPulse{0%,100%{opacity:1}50%{opacity:.3}}
#aria-status{color:rgba(255,255,255,.4);font-size:.65rem;margin-top:.08rem;}

#aria-wave{
  display:flex;gap:3px;align-items:center;height:18px;
  position:absolute;bottom:.7rem;left:50%;transform:translateX(-50%);
  opacity:0;transition:opacity .3s;z-index:3;
}
.aria-bar{
  width:3px;border-radius:2px;background:#00C896;
  animation:ariaWave .55s ease-in-out infinite alternate;
}
.aria-bar:nth-child(1){height:5px;animation-delay:0s}
.aria-bar:nth-child(2){height:12px;animation-delay:.1s}
.aria-bar:nth-child(3){height:18px;animation-delay:.2s}
.aria-bar:nth-child(4){height:12px;animation-delay:.1s}
.aria-bar:nth-child(5){height:5px;animation-delay:0s}
@keyframes ariaWave{0%{height:3px;opacity:.4}100%{height:100%;opacity:1}}
#aria-wave.speaking{opacity:1;}

#aria-close{
  position:absolute;top:.6rem;right:.6rem;z-index:4;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);
  color:rgba(255,255,255,.7);width:28px;height:28px;border-radius:8px;
  cursor:pointer;font-size:.8rem;display:flex;align-items:center;justify-content:center;
  transition:all .2s;
}
#aria-close:hover{background:rgba(255,255,255,.2);color:#fff;}

/* ═ CHAT SECTION ═ */
#aria-chat{
  flex:1;background:#0b0f18;display:flex;
  flex-direction:column;overflow:hidden;
  border-top:1px solid rgba(255,255,255,.07);
}
#aria-modes{
  display:flex;gap:.25rem;padding:.55rem .65rem;
  border-bottom:1px solid rgba(255,255,255,.05);flex-shrink:0;
}
.aria-mode{
  flex:1;padding:.32rem .2rem;border-radius:7px;
  font-size:.66rem;font-weight:600;cursor:pointer;font-family:inherit;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);
  color:rgba(255,255,255,.45);transition:all .2s;
}
.aria-mode:hover{background:rgba(255,255,255,.1);color:rgba(255,255,255,.8);}
.aria-mode.active{background:#00C896;border-color:#00C896;color:#fff;}

#aria-basket-strip{
  display:flex;align-items:center;justify-content:space-between;
  padding:.38rem .8rem;background:rgba(0,200,150,.09);
  border-bottom:1px solid rgba(0,200,150,.15);flex-shrink:0;
  font-size:.72rem;color:#4ade80;font-weight:600;
}
#aria-basket-strip button{
  background:rgba(0,200,150,.2);border:1px solid rgba(0,200,150,.3);
  color:#00C896;padding:.2rem .55rem;border-radius:6px;
  font-size:.67rem;font-weight:700;cursor:pointer;font-family:inherit;
}
#aria-basket-body{
  background:#0f1520;flex-shrink:0;
  border-bottom:1px solid rgba(255,255,255,.06);
  max-height:170px;overflow-y:auto;padding:.45rem;
}
.ab-item{
  display:flex;align-items:center;gap:.45rem;
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);
  border-radius:8px;padding:.42rem .58rem;margin-bottom:.28rem;
}
.ab-name{font-size:.72rem;color:#e2e8f0;font-weight:600;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.ab-price{font-size:.74rem;color:#00C896;font-weight:800;flex-shrink:0;}
.ab-rm{background:none;border:none;color:rgba(255,255,255,.3);cursor:pointer;font-size:.75rem;flex-shrink:0;padding:.1rem;transition:color .2s;}
.ab-rm:hover{color:#FF6B6B;}
#aria-checkout-btn{
  display:block;width:calc(100% - .9rem);margin:.4rem .45rem .55rem;
  background:linear-gradient(135deg,#00C896,#00A07A);
  border:none;color:#fff;padding:.62rem;border-radius:9px;
  font-size:.82rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;
}
#aria-checkout-btn:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,200,150,.3);}

/* MESSAGES */
#aria-msgs{
  flex:1;overflow-y:auto;padding:.7rem;
  display:flex;flex-direction:column;gap:.5rem;scroll-behavior:smooth;
}
#aria-msgs::-webkit-scrollbar{width:3px;}
#aria-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px;}
.aria-msg{display:flex;gap:.35rem;animation:ariaUp .2s ease;}
.aria-msg.user{flex-direction:row-reverse;}
@keyframes ariaUp{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.aria-bubble{
  max-width:86%;padding:.52rem .8rem;border-radius:12px;
  font-size:.79rem;line-height:1.55;word-break:break-word;
}
.aria-msg:not(.user) .aria-bubble{
  background:#1c2540;color:#e2e8f0;
  border:1px solid rgba(255,255,255,.07);border-radius:12px 12px 12px 3px;
}
.aria-msg.user .aria-bubble{
  background:linear-gradient(135deg,#00C896,#00A07A);color:#fff;
  border-radius:12px 12px 3px 12px;
}
.aria-msg.squad .aria-bubble{
  background:rgba(102,126,234,.2);color:#c4b5fd;
  border:1px solid rgba(102,126,234,.2);border-radius:12px 12px 12px 3px;
}
.aria-typing{
  display:flex;gap:.25rem;align-items:center;
  padding:.42rem .7rem;background:#1c2540;border-radius:10px;
  width:fit-content;border:1px solid rgba(255,255,255,.07);
}
.at-d{width:5px;height:5px;background:rgba(255,255,255,.35);border-radius:50%;animation:ariaBounce .8s infinite;}
.at-d:nth-child(2){animation-delay:.15s}.at-d:nth-child(3){animation-delay:.3s}
@keyframes ariaBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}

/* PRODUCT ROWS */
.aria-store-tag{
  display:inline-flex;align-items:center;gap:.35rem;
  font-size:.66rem;font-weight:700;padding:.22rem .55rem;border-radius:5px;border:1px solid;
  margin-bottom:.3rem;
}
.aria-prod-list{display:flex;flex-direction:column;gap:.28rem;margin-bottom:.6rem;}
.aria-prod{
  display:flex;align-items:center;gap:.45rem;
  background:#172030;border:1px solid rgba(255,255,255,.07);
  border-radius:9px;padding:.48rem .6rem;cursor:pointer;transition:all .2s;
}
.aria-prod:hover{border-color:#00C896;background:rgba(0,200,150,.07);}
.aria-prod.in-basket{border-color:rgba(0,200,150,.4);background:rgba(0,200,150,.08);}
.ap-emoji{font-size:1.1rem;flex-shrink:0;width:26px;text-align:center;}
.ap-info{flex:1;min-width:0;}
.ap-title{font-size:.71rem;color:#e2e8f0;font-weight:600;line-height:1.3;}
.ap-meta{display:flex;gap:.3rem;align-items:center;margin-top:.14rem;flex-wrap:wrap;}
.ap-price{font-size:.77rem;color:#00C896;font-weight:800;}
.ap-rating{font-size:.6rem;color:#F59E0B;}
.ap-cash{font-size:.58rem;background:rgba(0,200,150,.15);color:#00C896;padding:.07rem .3rem;border-radius:4px;font-weight:700;}
.ap-badge{font-size:.57rem;background:rgba(255,107,107,.15);color:#FF6B6B;padding:.07rem .3rem;border-radius:4px;font-weight:700;}
.ap-add{
  background:rgba(0,200,150,.15);border:1px solid rgba(0,200,150,.3);
  color:#00C896;padding:.22rem .48rem;border-radius:6px;
  font-size:.64rem;font-weight:700;cursor:pointer;flex-shrink:0;
  transition:all .2s;font-family:inherit;white-space:nowrap;
}
.ap-add:hover,.ap-add.added{background:#00C896;color:#fff;}

/* QUICK REPLIES */
#aria-qr{
  display:flex;flex-wrap:wrap;gap:.26rem;
  padding:.38rem .65rem;border-top:1px solid rgba(255,255,255,.05);flex-shrink:0;min-height:30px;
}
.aria-qr-btn{
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.6);padding:.22rem .58rem;border-radius:50px;
  font-size:.66rem;cursor:pointer;transition:all .2s;
  font-family:inherit;font-weight:500;white-space:nowrap;
}
.aria-qr-btn:hover{background:rgba(0,200,150,.15);border-color:#00C896;color:#00C896;}

/* INPUT */
#aria-input-row{
  display:flex;gap:.32rem;padding:.62rem .65rem;
  border-top:1px solid rgba(255,255,255,.06);background:#0b0f18;flex-shrink:0;
}
#aria-mic{
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.6);width:36px;height:36px;border-radius:9px;
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:all .25s;flex-shrink:0;
}
#aria-mic:hover{background:rgba(255,107,107,.15);border-color:rgba(255,107,107,.4);color:#FF6B6B;}
#aria-mic.listening{background:rgba(255,107,107,.25);border-color:#FF6B6B;color:#FF6B6B;animation:ariaMicP 1s infinite;}
@keyframes ariaMicP{0%,100%{box-shadow:0 0 0 0 rgba(255,107,107,.4)}50%{box-shadow:0 0 0 6px rgba(255,107,107,0)}}
#aria-input{
  flex:1;background:#18213a;border:1.5px solid rgba(255,255,255,.1);
  color:#e2e8f0;padding:.52rem .8rem;border-radius:9px;
  font-size:.79rem;outline:none;font-family:inherit;transition:border-color .2s;
}
#aria-input:focus{border-color:#00C896;}
#aria-input::placeholder{color:rgba(255,255,255,.25);}
#aria-send{
  background:#00C896;border:none;color:#fff;
  width:36px;height:36px;border-radius:9px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;
}
#aria-send:hover{background:#00A07A;}

/* ═ FAB ═ */
#aria-fab{
  position:fixed;bottom:20px;right:20px;z-index:999;
  background:#101820;border:2px solid rgba(0,200,150,.4);
  color:#fff;padding:.4rem 1rem .4rem .4rem;border-radius:50px;
  cursor:pointer;display:flex;align-items:center;gap:.6rem;
  font-family:inherit;box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 0 0 rgba(0,200,150,.3);
  transition:all .35s cubic-bezier(.4,0,.2,1);
  animation:ariaFabPulse 3s ease-in-out infinite;
}
@keyframes ariaFabPulse{
  0%,100%{box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 0 0 rgba(0,200,150,.2);}
  50%{box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 0 8px rgba(0,200,150,0);}
}
#aria-fab:hover{
  border-color:#00C896;transform:translateY(-2px);
  box-shadow:0 12px 40px rgba(0,0,0,.5),0 0 24px rgba(0,200,150,.2);
  animation:none;
}
body.aria-open #aria-fab{right:330px;}
#aria-fab-portrait{
  width:44px;height:44px;border-radius:50%;overflow:hidden;
  border:2px solid rgba(0,200,150,.5);flex-shrink:0;
}
#aria-fab-text{display:flex;flex-direction:column;line-height:1.2;}
#aria-fab-name{font-size:.85rem;font-weight:800;color:#fff;}
#aria-fab-sub{font-size:.62rem;color:rgba(255,255,255,.45);}
#aria-fab-badge{
  position:absolute;top:-4px;right:-4px;
  background:#FF6B6B;color:#fff;width:18px;height:18px;
  border-radius:50%;font-size:.65rem;font-weight:800;
  display:flex;align-items:center;justify-content:center;
  border:2px solid #101820;
}

/* ═ VOICE OVERLAY ═ */
#aria-voice-overlay{
  position:fixed;inset:0;background:rgba(5,10,18,.97);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.9rem;
  z-index:1200;
}
.aria-ripple{
  position:absolute;width:180px;height:180px;border-radius:50%;
  border:2px solid rgba(255,107,107,.25);animation:ariaRipple 2s ease-out infinite;
}
@keyframes ariaRipple{0%{transform:scale(.6);opacity:1}100%{transform:scale(2.2);opacity:0}}
@keyframes ariaBob{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}

/* SQUAD TYPE */
.sq-type{
  background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);
  border-radius:10px;padding:.7rem .4rem;text-align:center;
  font-size:.72rem;color:rgba(255,255,255,.55);cursor:pointer;transition:all .2s;font-weight:600;line-height:1.6;
}
.sq-type.active{background:rgba(102,126,234,.15);border-color:#667eea;color:#a5b4fc;}

@media(max-width:768px){
  #aria-sidebar{width:100%;}
  body.aria-open{padding-right:0;}
  body.aria-open #aria-fab{display:none;}
}
`;
document.head.appendChild(ST);

/* initialise mouth to smile closed */
setTimeout(()=>{
  const m=document.getElementById('aria-mouth');
  if(m) m.setAttribute('d', lipPath(2));
},50);

/* ─── PARSE + REPLY ──────────────────────────────────────── */
function parseQ(msg){
  const m=msg.toLowerCase();
  let cat=null,maxP=null;
  if(/tshirt|t-shirt|tee|t shirt/.test(m)) cat='tshirt';
  else if(/shirt|polo/.test(m)) cat='shirt';
  else if(/jean|denim|trouser/.test(m)) cat='jeans';
  else if(/shoe|trainer|sneaker/.test(m)) cat='shoes';
  else if(/headphone|earphone|airpod/.test(m)) cat='headphones';
  else if(/laptop|macbook|notebook/.test(m)) cat='laptop';
  else if(/dress|skirt/.test(m)) cat='dress';
  const u=m.match(/(?:under|below|less than|max|within)\s*£?\s*(\d+)/);
  if(u) maxP=parseFloat(u[1]);
  const b=m.match(/between\s*£?\s*(\d+)\s*(?:and|to|-)\s*£?\s*(\d+)/);
  let minP=null; if(b){minP=parseFloat(b[1]);maxP=parseFloat(b[2]);}
  let store=null;
  if(/amazon/.test(m)) store='Amazon';
  else if(/ebay/.test(m)) store='eBay';
  else if(/flipkart/.test(m)) store='Flipkart';
  return{cat,maxP,minP,store};
}

function getReply(msg){
  const m=msg.toLowerCase();
  const {cat,maxP,minP,store}=parseQ(msg);
  if(cat){
    let prods=[...(PRODUCTS[cat]||[])];
    if(maxP) prods=prods.filter(p=>p.price<=maxP);
    if(minP) prods=prods.filter(p=>p.price>=minP);
    if(store) prods=prods.filter(p=>p.store===store);
    if(!prods.length) return{text:`I couldn't find anything${maxP?` under £${maxP}`:''}. Want to try a wider budget?`,qr:['Under £50','Under £100','All stores']};
    state.lastProds=prods;
    const stores=[...new Set(prods.map(p=>p.store))];
    return{text:`Found ${prods.length} results across ${stores.length} store${stores.length>1?'s':''} — all with cashback! Tap any item to add to your basket.`,prods,qr:['Cheapest first','Only Amazon','Only eBay','Only Flipkart']};
  }
  if(/hello|hi|hey|namaste|hiya|yo/.test(m)) return{text:"Hi there! So lovely to meet you! I'm Aria, your personal shopping guide at SmartCash. I can search Amazon, eBay and Flipkart at the same time and find you the best cashback deals. What are we shopping for today?",qr:['T-shirts under £20','Headphones under £50','Laptops under £600','Show me best deals']};
  if(/deal|offer|best|today|discount/.test(m)) return{text:"Today's top cashback rates: Flipkart is leading at 5%, then Amazon at 4.5%, eBay at 3.2%. Every purchase earns you real money back! What shall we find?",qr:['T-shirts','Laptops','Headphones','Shoes','Dresses']};
  if(/cheapest|sort.*price|lowest price/.test(m)&&state.lastProds){const s=[...state.lastProds].sort((a,b)=>a.price-b.price);state.lastProds=s;return{text:"Sorted from lowest price — best value at the top!",prods:s,qr:['Only Amazon','Only eBay','Only Flipkart']};}
  if(/only amazon/.test(m)&&state.lastProds){const f=state.lastProds.filter(p=>p.store==='Amazon');return{text:f.length?`Amazon only — ${f.length} results:`:"No Amazon results — showing all.",prods:f.length?f:state.lastProds,qr:['All stores','Only eBay','Only Flipkart']};}
  if(/only ebay/.test(m)&&state.lastProds){const f=state.lastProds.filter(p=>p.store==='eBay');return{text:f.length?`eBay only — great deals here!`:"No eBay results.",prods:f.length?f:state.lastProds,qr:['All stores','Only Amazon','Only Flipkart']};}
  if(/only flipkart/.test(m)&&state.lastProds){const f=state.lastProds.filter(p=>p.store==='Flipkart');return{text:f.length?`Flipkart — and they have 5% cashback today!`:"No Flipkart results.",prods:f.length?f:state.lastProds,qr:['All stores','Only Amazon','Only eBay']};}
  if(/basket|cart|checkout|my items/.test(m)){if(!basket.length)return{text:"Your basket is empty! Tell me what you need and I'll find the best deals across all stores.",qr:['T-shirts','Headphones','Laptops']};return{text:`You have ${basket.length} item${basket.length>1?'s':''} worth £${bTotal().toFixed(2)}. Ready to checkout?`,qr:['Checkout all','Keep shopping']};}
  if(/squad|couple|partner|friend|family/.test(m)) return{text:"Squad shopping is so fun! Shop in real-time with your partner, friends or family — share baskets and vote on items. Who's joining you?",qr:['Start couple squad','Friends squad','Family squad']};
  if(/try.?on|virtual|fit/.test(m)) return{text:"Our AI try-on lets you upload your photo and see how any garment fits — powered by Claude Vision. Want to try it?",qr:['Open Try-On →','Show me dresses','Show me shirts']};
  if(/open try.?on/i.test(m)){window.location.href='virtual-assistant.html';return{text:"Opening virtual try-on!",qr:[]};}
  return{text:`I'm on it! Try something like "blue t-shirt under £30" or "laptop under £500" and I'll search Amazon, eBay and Flipkart all at once.`,qr:['T-shirts under £30','Jeans under £50','Headphones under £100','Dresses under £40']};
}

/* ─── BASKET ─────────────────────────────────────────────── */
function bTotal(){return basket.reduce((s,i)=>s+i.price,0);}
function renderBasket(){
  const n=basket.length,tot=bTotal().toFixed(2);
  const strip=document.getElementById('aria-basket-strip');
  if(n>0){
    strip.style.display='flex';
    document.getElementById('aria-basket-label').textContent=`🛒 ${n} item${n>1?'s':''} · £${tot}`;
  }else{strip.style.display='none';document.getElementById('aria-basket-body').style.display='none';}
  document.getElementById('aria-basket-items').innerHTML=basket.map((it,i)=>`
    <div class="ab-item">
      <span>${it.img}</span>
      <span class="ab-name">${it.title}</span>
      <span class="ab-price">£${it.price.toFixed(2)}</span>
      <button class="ab-rm" onclick="SCAI.removeFromBasket(${i})">✕</button>
    </div>`).join('');
  // sync add buttons
  document.querySelectorAll('.aria-prod').forEach(row=>{
    const inB=basket.some(i=>i.id===row.dataset.pid);
    row.classList.toggle('in-basket',inB);
    const btn=row.querySelector('.ap-add');
    if(btn){btn.textContent=inB?'✓ Added':'+ Add';btn.classList.toggle('added',inB);}
  });
}

/* ─── STATE ──────────────────────────────────────────────── */
const state={open:false,mode:'shop',greeted:false,squadType:'couple',lastProds:null,bVisible:false};

/* ─── MAIN API ───────────────────────────────────────────── */
window.SCAI={

  toggle(){state.open?this.close():this.open_();},

  open_(){
    state.open=true;
    document.getElementById('aria-sidebar').classList.add('open');
    document.body.classList.add('aria-open');
    document.getElementById('aria-fab-badge').style.display='none';
    if(!state.greeted){
      state.greeted=true;
      const g="Hi! I'm Aria, your SmartCash assistant! I can search Amazon, eBay and Flipkart all at once, or tap the mic and just tell me what you need. What are we shopping for today?";
      setTimeout(()=>{
        this._addAI(g,['T-shirts under £20','Best deals today','Virtual try-on','Squad shopping']);
        this._setStatus('Greeting you…');
        aria_speak(g,()=>this._setStatus('Here for you ✨'));
        document.getElementById('aria-wave').classList.add('speaking');
        setTimeout(()=>document.getElementById('aria-wave').classList.remove('speaking'),5000);
      },300);
    }
  },

  close(){
    state.open=false;
    document.getElementById('aria-sidebar').classList.remove('open');
    document.body.classList.remove('aria-open');
    synth&&synth.cancel(); lipStop();
  },

  _setStatus(t){
    const el=document.getElementById('aria-status');
    if(el) el.textContent=t;
  },

  setMode(mode,el){
    state.mode=mode;
    document.querySelectorAll('.aria-mode').forEach(b=>b.classList.remove('active'));
    el.classList.add('active');
    const m={shop:"Shopping mode! Tell me what you need.",deals:"Today's best cashback: Flipkart 5%, Amazon 4.5%, eBay 3.2%!",squad:"Squad mode! Shop together with your crew in real-time.",price:"Price tracker! Tell me any product for price history + AI recommendation."};
    const q={shop:['T-shirts','Jeans','Shoes','Headphones','Laptops'],deals:['Amazon deals','eBay deals','Flipkart deals'],squad:['Start couple squad','Friends squad','Family squad'],price:['Track Sony XM5','Track AirPods','Set price alert']};
    this._addAI(m[mode],q[mode]);
    aria_speak(m[mode]);
    this._wavePulse();
  },

  _wavePulse(ms=3000){
    const w=document.getElementById('aria-wave');
    if(w){w.classList.add('speaking');setTimeout(()=>w.classList.remove('speaking'),ms);}
  },

  async send(){
    const inp=document.getElementById('aria-input');
    const msg=inp.value.trim(); if(!msg)return;
    inp.value='';
    this._addUser(msg);
    this._setStatus('Thinking…');
    this._showTyping();
    await new Promise(r=>setTimeout(r,480+Math.random()*350));
    this._hideTyping();
    const reply=getReply(msg);
    this._addAI(reply.text,reply.qr,reply.prods);
    this._wavePulse(reply.text.length*60);
    aria_speak(reply.text,()=>this._setStatus('Here for you ✨'));
    this._setStatus('Aria is speaking…');
  },

  _addUser(t){
    const el=document.getElementById('aria-msgs');
    const d=document.createElement('div');
    d.className='aria-msg user';
    d.innerHTML=`<div class="aria-bubble">${t}</div>`;
    el.appendChild(d);el.scrollTop=el.scrollHeight;
  },

  _addAI(text,qrs,prods){
    const msgs=document.getElementById('aria-msgs');
    const d=document.createElement('div');
    d.className='aria-msg';
    d.innerHTML=`<div class="aria-bubble">${text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>')}</div>`;
    msgs.appendChild(d);

    if(prods&&prods.length){
      const groups={};
      prods.forEach(p=>{if(!groups[p.store])groups[p.store]=[];groups[p.store].push(p);});
      const wrap=document.createElement('div');
      wrap.style.cssText='width:100%;animation:ariaUp .25s ease';
      Object.entries(groups).forEach(([sn,items])=>{
        const sc=SC[sn]||{bg:'rgba(255,255,255,.05)',border:'rgba(255,255,255,.1)',text:'#e2e8f0'};
        const icon=sn==='Amazon'?'📦':sn==='eBay'?'🔵':'🛒';
        const cb=sn==='Amazon'?'4.5':sn==='eBay'?'3.2':'5.0';
        const sec=document.createElement('div');
        sec.innerHTML=`
          <div class="aria-store-tag" style="background:${sc.bg};border-color:${sc.border};color:${sc.text}">
            ${icon} ${sn} <span style="opacity:.6;font-weight:400">${cb}% cashback</span>
          </div>
          <div class="aria-prod-list">
            ${items.map(p=>`
              <div class="aria-prod${basket.some(b=>b.id===p.id)?' in-basket':''}" data-pid="${p.id}">
                <span class="ap-emoji">${p.img}</span>
                <div class="ap-info">
                  <div class="ap-title">${p.title}</div>
                  <div class="ap-meta">
                    <span class="ap-price">£${p.price.toFixed(2)}</span>
                    <span class="ap-rating">★${p.rating}</span>
                    <span class="ap-cash">${p.cashback}% back</span>
                    ${p.badge?`<span class="ap-badge">${p.badge}</span>`:''}
                  </div>
                </div>
                <button class="ap-add${basket.some(b=>b.id===p.id)?' added':''}"
                  onclick='SCAI.addToBasket(${JSON.stringify(p).replace(/'/g,"&#39;")})'>
                  ${basket.some(b=>b.id===p.id)?'✓ Added':'+ Add'}
                </button>
              </div>`).join('')}
          </div>`;
        wrap.appendChild(sec);
      });
      msgs.appendChild(wrap);
    }

    msgs.scrollTop=msgs.scrollHeight;
    const qrEl=document.getElementById('aria-qr');
    qrEl.innerHTML='';
    (qrs||[]).forEach(q=>{
      const btn=document.createElement('button');
      btn.className='aria-qr-btn';btn.textContent=q;
      btn.onclick=()=>{document.getElementById('aria-input').value=q;SCAI.send();};
      qrEl.appendChild(btn);
    });
  },

  _addSquad(t){
    const el=document.getElementById('aria-msgs');
    const d=document.createElement('div');
    d.className='aria-msg squad';
    d.innerHTML=`<div class="aria-bubble">${t}</div>`;
    el.appendChild(d);el.scrollTop=el.scrollHeight;
  },

  _showTyping(){
    const el=document.getElementById('aria-msgs');
    const d=document.createElement('div');
    d.id='aria-typing';d.className='aria-msg';
    d.innerHTML='<div class="aria-typing"><div class="at-d"></div><div class="at-d"></div><div class="at-d"></div></div>';
    el.appendChild(d);el.scrollTop=el.scrollHeight;
  },
  _hideTyping(){document.getElementById('aria-typing')?.remove();},

  addToBasket(p){
    if(basket.some(i=>i.id===p.id))return;
    basket.push(p);renderBasket();
    if(!state.bVisible){state.bVisible=true;document.getElementById('aria-basket-body').style.display='block';}
    document.querySelectorAll(`[data-pid="${p.id}"]`).forEach(row=>{
      row.classList.add('in-basket');
      const btn=row.querySelector('.ap-add');
      if(btn){btn.textContent='✓ Added';btn.classList.add('added');}
    });
    const msg=`${p.title} added! That's £${p.price.toFixed(2)} with ${p.cashback}% cashback from ${p.store}. Great pick!`;
    this._addAI(`✅ **${p.title}** added to basket! (${p.cashback}% cashback)`,[]);
    aria_speak(msg); this._wavePulse(3500);
    this._setStatus('Item added! 🛒');
    setTimeout(()=>this._setStatus('Here for you ✨'),3200);
  },

  removeFromBasket(i){basket.splice(i,1);renderBasket();},

  toggleBasket(){
    state.bVisible=!state.bVisible;
    document.getElementById('aria-basket-body').style.display=state.bVisible?'block':'none';
  },

  checkoutAll(){
    if(!basket.length){this._addAI("Your basket is empty — let's find something great!",['T-shirts','Headphones']);return;}
    const stores=[...new Set(basket.map(i=>i.store))];
    const urls={Amazon:'https://amazon.co.uk',eBay:'https://ebay.co.uk',Flipkart:'https://flipkart.com'};
    const msg=`Opening ${stores.join(' and ')} with your cashback links. Happy shopping!`;
    this._addAI(`🚀 Opening ${stores.length} store${stores.length>1?'s':''} with cashback activated!`,[]);
    aria_speak(msg); this._wavePulse(4000);
    stores.forEach((s,i)=>setTimeout(()=>window.open(urls[s]||'#','_blank'),i*700));
  },

  toggleVoice(){
    if(!recog) recog=initVoice();
    if(!recog){this._addAI("Voice needs Chrome or Edge desktop. Just type instead!",['T-shirts','Deals']);aria_speak("Voice search needs Chrome or Edge. Try typing!");return;}
    if(isListen){recog.stop();return;}
    recog.start();
  },
  stopVoice(){if(recog&&isListen)recog.stop();},

  openSquadModal(){document.getElementById('aria-squad-modal').style.display='flex';this._genLink();},
  closeSquadModal(){document.getElementById('aria-squad-modal').style.display='none';},
  selectSquadType(t,el){state.squadType=t;document.querySelectorAll('.sq-type').forEach(e=>e.classList.remove('active'));el.classList.add('active');this._genLink();},
  _genLink(){document.getElementById('sq-link').value=`smartcash.co.uk/squad/${Math.random().toString(36).substr(2,6).toUpperCase()}`;},
  copyLink(){navigator.clipboard?.writeText(document.getElementById('sq-link').value).catch(()=>{});const b=document.querySelector('[onclick="SCAI.copyLink()"]');if(b){b.textContent='Copied!';setTimeout(()=>b.textContent='Copy',2000);}},
  startSquad(){
    this.closeSquadModal();
    const names={couple:'Partner',friends:'Best Friend',family:'Family Member',occasion:'Guest'};
    const partner=names[state.squadType]||'Friend';
    if(!state.open) this.open_();
    setTimeout(()=>{
      this._addSquad(`${partner} just joined your squad! 🎉`);
      aria_speak(`${partner} just joined your squad! You can now shop together.`);
      setTimeout(()=>this._addSquad("Ooh I love those picks! Add the second one too? 👀"),2200);
    },1800);
  },
};

/* ─── VOICE RECOGNITION ──────────────────────────────────── */
function initVoice(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR)return null;
  const r=new SR();
  r.continuous=false;r.interimResults=true;r.lang='en-GB';
  r.onstart=()=>{isListen=true;document.getElementById('aria-mic').classList.add('listening');document.getElementById('aria-voice-overlay').style.display='flex';document.getElementById('aria-transcript').textContent='';};
  r.onresult=(e)=>{const t=Array.from(e.results).map(r=>r[0].transcript).join('');document.getElementById('aria-transcript').textContent=t;if(e.results[e.results.length-1].isFinal)document.getElementById('aria-input').value=t;};
  r.onend=()=>{isListen=false;document.getElementById('aria-mic').classList.remove('listening');document.getElementById('aria-voice-overlay').style.display='none';const v=document.getElementById('aria-input').value.trim();if(v)SCAI.send();};
  r.onerror=()=>{isListen=false;document.getElementById('aria-mic').classList.remove('listening');document.getElementById('aria-voice-overlay').style.display='none';};
  return r;
}

/* ─── STARTUP ────────────────────────────────────────────── */
// Show badge after 4s if sidebar not opened
setTimeout(()=>{if(!state.open)document.getElementById('aria-fab-badge').style.display='flex';},4000);
// Keyboard shortcut
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='/')SCAI.toggle();});
// Sync wave with speaking
setInterval(()=>{
  const w=document.getElementById('aria-wave');
  if(w) w.classList.toggle('speaking',isSpeak);
},200);
// Auto-open after 6s on first visit (comment out if too aggressive)
// setTimeout(()=>{if(!state.open&&!sessionStorage.getItem('aria_seen')){sessionStorage.setItem('aria_seen','1');SCAI.open_();}},6000);

})();
