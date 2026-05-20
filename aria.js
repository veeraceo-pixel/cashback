/* ============================================================
   SmartCash — Aria v5
   Full-page results · Interactive overlay · Voice · Lip-sync
   ============================================================ */
(function(){

/* ─── PRODUCTS ───────────────────────────────────────────── */
const PRODUCTS={
  tshirt:[
    {id:'t1',title:'Classic White Crew Neck Tee',price:12.99,store:'Amazon',rating:4.3,reviews:2841,img:'👕',cashback:4.5,badge:'Best Seller',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'t2',title:'Premium Cotton Polo Shirt',price:18.50,store:'eBay',rating:4.1,reviews:924,img:'👔',cashback:3.2,badge:'',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'t3',title:'Oversized Graphic Tee — Black',price:22.00,store:'Flipkart',rating:4.5,reviews:3120,img:'🖤',cashback:5.0,badge:'Hot 🔥',color:'#f5f0ff',url:'https://flipkart.com'},
    {id:'t4',title:'Slim Fit V-Neck T-Shirt',price:9.99,store:'Amazon',rating:4.0,reviews:1560,img:'👕',cashback:4.5,badge:'',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'t5',title:'Striped Breton Tee',price:24.99,store:'eBay',rating:4.6,reviews:780,img:'👕',cashback:3.2,badge:'Top Rated ⭐',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'t6',title:'Organic Cotton Basic Tee',price:14.00,store:'Flipkart',rating:4.2,reviews:432,img:'🌿',cashback:5.0,badge:'Eco',color:'#f5f0ff',url:'https://flipkart.com'},
    {id:'t7',title:'Pack of 3 Plain Tees',price:19.99,store:'Amazon',rating:4.4,reviews:5200,img:'👕',cashback:4.5,badge:'Value Pack',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'t8',title:'Longline Drop Hem Tee',price:16.50,store:'eBay',rating:3.9,reviews:290,img:'👕',cashback:3.2,badge:'',color:'#f0f8ff',url:'https://ebay.co.uk'},
  ],
  shirt:[
    {id:'s1',title:'Oxford Button-Down Shirt',price:29.99,store:'Amazon',rating:4.4,reviews:1820,img:'👔',cashback:4.5,badge:'Best Seller',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'s2',title:'Slim Fit Checked Shirt',price:34.00,store:'eBay',rating:4.2,reviews:640,img:'🔲',cashback:3.2,badge:'',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'s3',title:'Linen Summer Shirt',price:27.50,store:'Flipkart',rating:4.6,reviews:910,img:'🌿',cashback:5.0,badge:'Summer Pick',color:'#f5f0ff',url:'https://flipkart.com'},
    {id:'s4',title:'Formal White Dress Shirt',price:22.99,store:'Amazon',rating:4.1,reviews:2100,img:'🤵',cashback:4.5,badge:'',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'s5',title:'Flannel Plaid Shirt',price:39.00,store:'eBay',rating:4.5,reviews:380,img:'🟥',cashback:3.2,badge:'Top Rated ⭐',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'s6',title:'Denim Shirt — Indigo',price:31.00,store:'Flipkart',rating:4.3,reviews:560,img:'🔵',cashback:5.0,badge:'',color:'#f5f0ff',url:'https://flipkart.com'},
  ],
  jeans:[
    {id:'j1',title:'Slim Fit Dark Wash Jeans',price:39.99,store:'Amazon',rating:4.3,reviews:3200,img:'👖',cashback:4.5,badge:'Best Seller',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'j2',title:'Straight Leg Classic Jeans',price:45.00,store:'eBay',rating:4.5,reviews:1100,img:'👖',cashback:3.2,badge:'Top Rated ⭐',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'j3',title:'Skinny Stretch Jeans',price:32.00,store:'Flipkart',rating:4.1,reviews:2800,img:'👖',cashback:5.0,badge:'',color:'#f5f0ff',url:'https://flipkart.com'},
    {id:'j4',title:'High Waist Mom Jeans',price:28.00,store:'Flipkart',rating:4.6,reviews:4200,img:'👖',cashback:5.0,badge:'Hot 🔥',color:'#f5f0ff',url:'https://flipkart.com'},
    {id:'j5',title:'Distressed Ripped Jeans',price:37.50,store:'eBay',rating:4.0,reviews:920,img:'✂️',cashback:3.2,badge:'Trending',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'j6',title:'Bootcut Relaxed Fit Jeans',price:49.99,store:'Amazon',rating:4.2,reviews:780,img:'👖',cashback:4.5,badge:'',color:'#fff8f0',url:'https://amazon.co.uk'},
  ],
  headphones:[
    {id:'h1',title:'Sony WH-1000XM5 Wireless',price:279.00,store:'Amazon',rating:4.8,reviews:12400,img:'🎧',cashback:4.5,badge:'Best Overall',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'h2',title:'AirPods Pro (2nd Gen)',price:219.00,store:'eBay',rating:4.7,reviews:9800,img:'🎵',cashback:3.2,badge:'Top Rated ⭐',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'h3',title:'Boat Rockerz 450 Pro',price:29.99,store:'Flipkart',rating:4.1,reviews:45000,img:'🎶',cashback:5.0,badge:'Budget Pick',color:'#f5f0ff',url:'https://flipkart.com'},
    {id:'h4',title:'JBL Tune 510BT',price:44.99,store:'Amazon',rating:4.3,reviews:3200,img:'🎧',cashback:4.5,badge:'',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'h5',title:'Bose QuietComfort 45',price:259.00,store:'eBay',rating:4.6,reviews:4100,img:'🎵',cashback:3.2,badge:'Premium',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'h6',title:'OnePlus Bullets Z2',price:19.99,store:'Flipkart',rating:4.2,reviews:22000,img:'🎶',cashback:5.0,badge:'Value',color:'#f5f0ff',url:'https://flipkart.com'},
  ],
  laptop:[
    {id:'l1',title:'Apple MacBook Air M3',price:1099.00,store:'Amazon',rating:4.9,reviews:3200,img:'💻',cashback:4.5,badge:'Best Overall',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'l2',title:'Dell Inspiron 15 i5',price:599.00,store:'eBay',rating:4.3,reviews:1800,img:'💼',cashback:3.2,badge:'Value Pick',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'l3',title:'HP Pavilion 14',price:449.00,store:'Flipkart',rating:4.1,reviews:8900,img:'💻',cashback:5.0,badge:'Budget',color:'#f5f0ff',url:'https://flipkart.com'},
    {id:'l4',title:'Lenovo IdeaPad 5',price:549.00,store:'Amazon',rating:4.4,reviews:2100,img:'💻',cashback:4.5,badge:'',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'l5',title:'Asus ZenBook 14 OLED',price:799.00,store:'eBay',rating:4.6,reviews:920,img:'✨',cashback:3.2,badge:'Top Rated ⭐',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'l6',title:'Realme Book Slim',price:349.00,store:'Flipkart',rating:4.0,reviews:5400,img:'💻',cashback:5.0,badge:'Slim',color:'#f5f0ff',url:'https://flipkart.com'},
  ],
  shoes:[
    {id:'sh1',title:'Nike Air Max 90',price:89.99,store:'Amazon',rating:4.7,reviews:8200,img:'👟',cashback:4.5,badge:'Best Seller',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'sh2',title:'Adidas Stan Smith',price:75.00,store:'eBay',rating:4.5,reviews:3400,img:'⚪',cashback:3.2,badge:'Classic',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'sh3',title:'Canvas Sneakers',price:29.99,store:'Flipkart',rating:4.2,reviews:1800,img:'👟',cashback:5.0,badge:'Budget Pick',color:'#f5f0ff',url:'https://flipkart.com'},
    {id:'sh4',title:'Leather Oxford Shoes',price:64.99,store:'Amazon',rating:4.4,reviews:920,img:'👞',cashback:4.5,badge:'',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'sh5',title:'Running Trainers Pro',price:55.00,store:'eBay',rating:4.3,reviews:2100,img:'🏃',cashback:3.2,badge:'Top Rated ⭐',color:'#f0f8ff',url:'https://ebay.co.uk'},
  ],
  dress:[
    {id:'d1',title:'Floral Wrap Midi Dress',price:34.99,store:'Amazon',rating:4.4,reviews:2100,img:'👗',cashback:4.5,badge:'Best Seller',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'d2',title:'Bodycon Evening Dress',price:42.00,store:'eBay',rating:4.2,reviews:680,img:'🖤',cashback:3.2,badge:'',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'d3',title:'Summer Sundress Boho',price:22.99,store:'Flipkart',rating:4.5,reviews:3800,img:'🌺',cashback:5.0,badge:'Trending 🔥',color:'#f5f0ff',url:'https://flipkart.com'},
    {id:'d4',title:'Linen Shirt Dress',price:38.00,store:'Amazon',rating:4.3,reviews:940,img:'👗',cashback:4.5,badge:'',color:'#fff8f0',url:'https://amazon.co.uk'},
    {id:'d5',title:'Cocktail Party Dress',price:55.00,store:'eBay',rating:4.6,reviews:420,img:'✨',cashback:3.2,badge:'Top Rated ⭐',color:'#f0f8ff',url:'https://ebay.co.uk'},
    {id:'d6',title:'Casual Cotton Kurti',price:14.99,store:'Flipkart',rating:4.4,reviews:12000,img:'🌸',cashback:5.0,badge:'Value',color:'#f5f0ff',url:'https://flipkart.com'},
  ],
};

const SCOL={Amazon:{bg:'#FFF8EC',border:'#FFD080',text:'#B35F00',icon:'📦',cb:'4.5'},eBay:{bg:'#EEF5FF',border:'#93C5FD',text:'#1D4ED8',icon:'🔵',cb:'3.2'},Flipkart:{bg:'#F0F0FF',border:'#A5B4FC',text:'#4338CA',icon:'🛒',cb:'5.0'}};

const basket=[];

/* ─── VOICE ──────────────────────────────────────────────── */
const SYN=window.speechSynthesis;
let isSpk=false, lipT=null, recog=null, isLsn=false;

function getVoice(){
  const v=SYN.getVoices();
  return v.find(x=>x.name==='Samantha')||v.find(x=>x.name==='Karen')||v.find(x=>x.lang.startsWith('en-')&&/female|woman/i.test(x.name))||v.find(x=>x.lang.startsWith('en'))||v[0];
}
SYN.onvoiceschanged=getVoice;

function speak(txt,cb){
  SYN.cancel();
  const c=txt.replace(/[^\x00-\x7F]/g,'').replace(/\*\*(.*?)\*\*/g,'$1').substring(0,300);
  if(!c.trim()){cb&&cb();return;}
  const u=new SpeechSynthesisUtterance(c);
  u.voice=getVoice();u.rate=1.05;u.pitch=1.12;u.volume=1;
  isSpk=true;lipStart();
  setWave(true);
  setStatus('Aria is speaking…');
  u.onend=u.onerror=()=>{isSpk=false;lipStop();setWave(false);setStatus('Here for you ✨');cb&&cb();};
  SYN.speak(u);
}

function lipStart(){
  const m=document.getElementById('aria-mouth');
  if(!m)return;
  const opens=[2,6,10,14,8,4,12,7,3,11,5];
  let i=0;
  clearInterval(lipT);
  lipT=setInterval(()=>{
    const o=opens[i%opens.length];
    m.setAttribute('d',mPath(o));
    if(i%22===0){const e=document.getElementById('aria-eyes');if(e){e.style.transform='scaleY(0.05)';setTimeout(()=>{if(e)e.style.transform='scaleY(1)';},100);}}
    i++;
  },95);
}
function lipStop(){clearInterval(lipT);const m=document.getElementById('aria-mouth');if(m)m.setAttribute('d',mPath(2));}
function mPath(o){return `M92 ${118} Q110 ${114-o*0.3} 128 ${118} Q110 ${122+o} 92 ${118} Z`;}
function setWave(on){const w=document.getElementById('aria-wave');if(w)w.style.opacity=on?'1':'0';}
function setStatus(t){const el=document.getElementById('aria-status-txt');if(el)el.textContent=t;}

/* ─── INJECT HTML ────────────────────────────────────────── */
document.body.insertAdjacentHTML('beforeend',`

<!-- ══ ARIA ASSISTANT WIDGET ══ -->
<div id="aria-widget">

  <!-- Avatar column (always visible when open) -->
  <div id="aria-col">
    <div id="aria-portrait">
      <div id="aria-glow"></div>
      <svg id="aria-svg" viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="rg-skin" cx="50%" cy="35%" r="60%"><stop offset="0%" stop-color="#FFD5A8"/><stop offset="100%" stop-color="#E8A060"/></radialGradient>
          <radialGradient id="rg-body" cx="50%" cy="0%" r="90%"><stop offset="0%" stop-color="#00D4A0"/><stop offset="100%" stop-color="#008F6C"/></radialGradient>
          <radialGradient id="rg-blush" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FF8888" stop-opacity="0.5"/><stop offset="100%" stop-color="#FF8888" stop-opacity="0"/></radialGradient>
          <filter id="f-shadow"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="rgba(0,0,0,0.4)"/></filter>
        </defs>
        <!-- background glow -->
        <ellipse cx="110" cy="280" rx="80" ry="30" fill="rgba(0,200,150,0.15)"/>
        <!-- body -->
        <path d="M25 300 L30 210 Q38 180 58 168 Q80 157 96 154 L110 172 L124 154 Q140 157 162 168 Q182 180 190 210 L195 300 Z" fill="url(#rg-body)"/>
        <path d="M58 168 Q68 163 80 160 Q70 180 62 202Z" fill="rgba(255,255,255,0.12)"/>
        <path d="M96 154 L110 188 L124 154" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        <text x="110" y="222" text-anchor="middle" font-family="sans-serif" font-size="7" font-weight="bold" fill="rgba(255,255,255,0.25)">SmartCash</text>
        <!-- neck -->
        <rect x="97" y="138" width="26" height="26" rx="9" fill="url(#rg-skin)"/>
        <!-- hair back -->
        <ellipse cx="110" cy="70" rx="56" ry="54" fill="#2C1008"/>
        <path d="M54 85 Q30 145 38 230 Q52 248 66 238 Q56 158 64 104Z" fill="#2C1008"/>
        <path d="M166 85 Q190 145 182 230 Q168 248 154 238 Q164 158 156 104Z" fill="#2C1008"/>
        <path d="M80 28 Q110 20 136 30 Q120 24 110 23Z" fill="#5C3015" opacity="0.6"/>
        <!-- face -->
        <ellipse cx="110" cy="80" rx="52" ry="55" fill="url(#rg-skin)" filter="url(#f-shadow)"/>
        <!-- ears -->
        <ellipse cx="58" cy="88" rx="8" ry="10" fill="url(#rg-skin)"/>
        <ellipse cx="162" cy="88" rx="8" ry="10" fill="url(#rg-skin)"/>
        <!-- earrings -->
        <circle cx="58" cy="100" r="5" fill="none" stroke="rgba(255,210,80,.9)" stroke-width="1.5"/>
        <circle cx="58" cy="107" r="3" fill="rgba(255,210,80,.9)"/>
        <circle cx="162" cy="100" r="5" fill="none" stroke="rgba(255,210,80,.9)" stroke-width="1.5"/>
        <circle cx="162" cy="107" r="3" fill="rgba(255,210,80,.9)"/>
        <!-- blush -->
        <ellipse cx="82" cy="100" rx="14" ry="8" fill="url(#rg-blush)"/>
        <ellipse cx="138" cy="100" rx="14" ry="8" fill="url(#rg-blush)"/>
        <!-- eyebrows -->
        <path d="M84 60 Q96 54 106 57" fill="none" stroke="#2C1008" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M114 57 Q124 54 136 60" fill="none" stroke="#2C1008" stroke-width="2.8" stroke-linecap="round"/>
        <!-- eyes group -->
        <g id="aria-eyes" style="transform-origin:110px 78px;transition:transform .06s ease">
          <ellipse cx="95" cy="79" rx="11" ry="9" fill="white"/>
          <ellipse cx="125" cy="79" rx="11" ry="9" fill="white"/>
          <circle cx="95" cy="79" r="7" fill="#7B4A2A"/>
          <circle cx="125" cy="79" r="7" fill="#7B4A2A"/>
          <circle cx="95" cy="79" r="4" fill="#0D0500"/>
          <circle cx="125" cy="79" r="4" fill="#0D0500"/>
          <circle cx="97" cy="76" r="2.5" fill="white" opacity="0.9"/>
          <circle cx="127" cy="76" r="2.5" fill="white" opacity="0.9"/>
          <path d="M84 74 Q95 68 106 74" fill="none" stroke="#1A0800" stroke-width="2.8" stroke-linecap="round"/>
          <path d="M114 74 Q125 68 136 74" fill="none" stroke="#1A0800" stroke-width="2.8" stroke-linecap="round"/>
          <path d="M84 85 Q95 89 106 85" fill="none" stroke="#2C1008" stroke-width="0.8" opacity="0.3"/>
          <path d="M114 85 Q125 89 136 85" fill="none" stroke="#2C1008" stroke-width="0.8" opacity="0.3"/>
        </g>
        <!-- nose -->
        <path d="M106 94 Q104 104 102 108 Q110 113 118 108 Q116 104 114 94" fill="none" stroke="rgba(160,90,50,.3)" stroke-width="1.3" stroke-linecap="round"/>
        <!-- mouth -->
        <path id="aria-mouth" d="M92 118 Q110 114 128 118 Q110 122 92 118 Z" fill="#C04060"/>
        <path d="M92 118 Q101 113 110 116 Q119 113 128 118 Q119 122 110 121 Q101 122 92 118 Z" fill="#E05878"/>
        <path d="M103 114 Q110 112 117 114" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.2" stroke-linecap="round"/>
        <!-- necklace -->
        <path d="M86 150 Q110 162 134 150" fill="none" stroke="rgba(255,210,80,.7)" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="110" cy="162" r="3" fill="rgba(255,210,80,.85)"/>
      </svg>
      <!-- name + status -->
      <div id="aria-nameplate">
        <div id="aria-name-row">Aria <span id="aria-dot">●</span></div>
        <div id="aria-status-txt">SmartCash Assistant</div>
      </div>
      <!-- wave -->
      <div id="aria-wave">
        <div class="aw"></div><div class="aw"></div><div class="aw"></div><div class="aw"></div><div class="aw"></div>
      </div>
    </div>

    <!-- Aria's chat bubbles (small, below portrait) -->
    <div id="aria-speech-area">
      <div id="aria-latest-msg"></div>
      <div id="aria-qr-row"></div>
    </div>

    <!-- Mic + text input -->
    <div id="aria-input-wrap">
      <button id="aria-mic-btn" onclick="Aria.toggleVoice()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v7a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zM8.5 18.5A7.5 7.5 0 0 0 19.5 12h2a9.5 9.5 0 0 1-9 9.47V23h-1v-1.53A9.5 9.5 0 0 1 2.5 12h2a7.5 7.5 0 0 0 6 7.35V18.5z"/></svg>
      </button>
      <input id="aria-text-input" placeholder="Ask Aria anything…" onkeydown="if(event.key==='Enter')Aria.send()" autocomplete="off">
      <button id="aria-send-btn" onclick="Aria.send()">→</button>
    </div>
  </div>

  <!-- Main results panel -->
  <div id="aria-results-col">
    <div id="aria-results-header">
      <div id="aria-results-title">👋 Hi! I'm Aria</div>
      <div id="aria-results-sub">Tell me what you're looking for — I'll search Amazon, eBay & Flipkart at once</div>
      <button id="aria-widget-close" onclick="Aria.close()">✕ Close</button>
    </div>

    <!-- Filter/sort bar (hidden until results) -->
    <div id="aria-filter-bar" style="display:none">
      <button class="aria-filter active" onclick="Aria.filter('all',this)">All Stores</button>
      <button class="aria-filter" onclick="Aria.filter('Amazon',this)">📦 Amazon</button>
      <button class="aria-filter" onclick="Aria.filter('eBay',this)">🔵 eBay</button>
      <button class="aria-filter" onclick="Aria.filter('Flipkart',this)">🛒 Flipkart</button>
      <button class="aria-filter" onclick="Aria.sortBy('price')">↑ Price</button>
      <button class="aria-filter" onclick="Aria.sortBy('rating')">★ Rating</button>
      <button class="aria-filter" onclick="Aria.sortBy('cashback')">💰 Cashback</button>
      <div id="aria-result-count"></div>
    </div>

    <!-- Store comparison bar (hidden until results) -->
    <div id="aria-store-compare" style="display:none">
      <div class="asc-card" id="asc-Amazon">
        <div class="asc-logo">📦</div>
        <div class="asc-name">Amazon</div>
        <div class="asc-cb">4.5% cashback</div>
        <div class="asc-count" id="asc-count-Amazon">0 results</div>
      </div>
      <div class="asc-card" id="asc-eBay">
        <div class="asc-logo">🔵</div>
        <div class="asc-name">eBay</div>
        <div class="asc-cb">3.2% cashback</div>
        <div class="asc-count" id="asc-count-eBay">0 results</div>
      </div>
      <div class="asc-card" id="asc-Flipkart">
        <div class="asc-logo">🛒</div>
        <div class="asc-name">Flipkart</div>
        <div class="asc-cb">5.0% cashback</div>
        <div class="asc-count" id="asc-count-Flipkart">0 results</div>
      </div>
    </div>

    <!-- Product grid — THE MAIN AREA -->
    <div id="aria-product-grid"></div>

    <!-- Basket summary bar -->
    <div id="aria-basket-bar" style="display:none">
      <div id="aria-basket-info">
        <span id="aria-basket-label">🛒 0 items</span>
        <span id="aria-basket-saving">Saving £0 with cashback</span>
      </div>
      <button id="aria-checkout-btn" onclick="Aria.checkoutAll()">Checkout All Stores →</button>
    </div>
  </div>
</div>

<!-- FAB -->
<button id="aria-fab" onclick="Aria.toggle()">
  <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
    <circle cx="28" cy="28" r="28" fill="#071a0e"/>
    <ellipse cx="28" cy="21" rx="14" ry="15" fill="#FFD5A8"/>
    <ellipse cx="28" cy="13" rx="15" ry="11" fill="#2C1008"/>
    <path d="M14 25 Q12 38 14 50 Q19 52 21 48 Q18 36 20 28Z" fill="#2C1008"/>
    <path d="M42 25 Q44 38 42 50 Q37 52 35 48 Q38 36 36 28Z" fill="#2C1008"/>
    <circle cx="23" cy="21" r="3" fill="#5C2A10"/>
    <circle cx="33" cy="21" r="3" fill="#5C2A10"/>
    <circle cx="23" cy="21" r="1.5" fill="#050100"/>
    <circle cx="33" cy="21" r="1.5" fill="#050100"/>
    <circle cx="24" cy="19.5" r="1" fill="white"/>
    <circle cx="34" cy="19.5" r="1" fill="white"/>
    <path d="M21 18 Q23 15 25 18" fill="none" stroke="#1A0800" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M31 18 Q33 15 35 18" fill="none" stroke="#1A0800" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M22 30 Q28 35 34 30" fill="none" stroke="#E05878" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="20" cy="27" rx="4" ry="2.5" fill="rgba(255,120,120,.4)"/>
    <ellipse cx="36" cy="27" rx="4" ry="2.5" fill="rgba(255,120,120,.4)"/>
    <path d="M8 56 Q10 46 18 43 Q23 41 28 42 Q33 41 38 43 Q46 46 48 56Z" fill="#00C896"/>
    <circle cx="42" cy="13" r="5" fill="#4ade80" stroke="#071a0e" stroke-width="2"/>
  </svg>
  <div id="aria-fab-words">
    <div id="aria-fab-name">Chat with Aria</div>
    <div id="aria-fab-sub">AI Shopping Assistant</div>
  </div>
  <div id="aria-fab-notif" style="display:none">1</div>
</button>

<!-- Voice overlay -->
<div id="aria-voice-ov" style="display:none">
  <div class="av-ripple"></div><div class="av-ripple" style="animation-delay:.4s"></div>
  <div style="font-size:3.5rem;z-index:1;animation:avBob 1s ease-in-out infinite">🎙️</div>
  <div style="color:#FF6B6B;font-weight:700;font-size:1.1rem;z-index:1">Aria is listening…</div>
  <div id="aria-vtranscript" style="color:rgba(255,255,255,.65);font-size:.9rem;text-align:center;max-width:300px;min-height:2rem;font-style:italic;z-index:1"></div>
  <button onclick="Aria.stopVoice()" style="background:rgba(255,107,107,.2);border:1.5px solid rgba(255,107,107,.5);color:#FF6B6B;padding:.6rem 2rem;border-radius:50px;font-weight:700;cursor:pointer;font-family:inherit;z-index:1">Stop</button>
</div>
`);

/* ─── STYLES ──────────────────────────────────────────────── */
const ST=document.createElement('style');
ST.textContent=`
/* ══ WIDGET SHELL ══ */
#aria-widget{
  position:fixed;inset:0;z-index:800;
  display:none;
  background:rgba(5,15,10,.65);
  backdrop-filter:blur(8px);
  animation:ariaFadeIn .3s ease;
}
#aria-widget.open{display:flex;}
@keyframes ariaFadeIn{from{opacity:0}to{opacity:1}}

/* ══ AVATAR COLUMN ══ */
#aria-col{
  width:240px;flex-shrink:0;
  background:linear-gradient(175deg,#071a0e 0%,#030d06 100%);
  display:flex;flex-direction:column;align-items:center;
  padding:1.5rem 1rem 1rem;
  box-shadow:4px 0 32px rgba(0,0,0,.4);
  overflow-y:auto;
}
#aria-portrait{
  position:relative;width:200px;
  flex-shrink:0;display:flex;flex-direction:column;align-items:center;
}
#aria-glow{
  position:absolute;bottom:0;left:50%;transform:translateX(-50%);
  width:160px;height:60px;border-radius:50%;
  background:radial-gradient(ellipse, rgba(0,200,150,.35), transparent 70%);
  pointer-events:none;
}
#aria-svg{
  width:100%;filter:drop-shadow(0 10px 28px rgba(0,0,0,.55));
  animation:ariaBreath 4s ease-in-out infinite;
}
@keyframes ariaBreath{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
#aria-eyes{transform-origin:110px 79px;transition:transform .06s ease;}

#aria-nameplate{text-align:center;margin-top:.5rem;}
#aria-name-row{
  color:#fff;font-weight:800;font-size:1rem;
  display:flex;align-items:center;justify-content:center;gap:.4rem;
  font-family:-apple-system,BlinkMacSystemFont,'Syne',sans-serif;
}
#aria-dot{font-size:.45rem;color:#4ade80;animation:ariaDot 2s infinite;}
@keyframes ariaDot{0%,100%{opacity:1}50%{opacity:.25}}
#aria-status-txt{color:rgba(255,255,255,.4);font-size:.65rem;margin-top:.15rem;text-align:center;}

#aria-wave{
  display:flex;gap:3px;align-items:center;height:20px;margin-top:.6rem;
  opacity:0;transition:opacity .3s;
}
.aw{width:3px;border-radius:2px;background:#00C896;animation:ariaWv .55s ease-in-out infinite alternate;}
.aw:nth-child(1){height:4px;animation-delay:0s}
.aw:nth-child(2){height:12px;animation-delay:.1s}
.aw:nth-child(3){height:18px;animation-delay:.2s}
.aw:nth-child(4){height:12px;animation-delay:.1s}
.aw:nth-child(5){height:4px;animation-delay:0s}
@keyframes ariaWv{0%{height:3px;opacity:.3}100%{height:100%;opacity:1}}

/* speech area */
#aria-speech-area{
  width:100%;margin-top:1rem;flex:1;overflow-y:auto;
  display:flex;flex-direction:column;gap:.5rem;
}
#aria-speech-area::-webkit-scrollbar{width:3px;}
#aria-speech-area::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px;}
#aria-latest-msg{
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);
  border-radius:12px;padding:.7rem .9rem;
  font-size:.78rem;color:#e2e8f0;line-height:1.6;
  display:none;
}
#aria-qr-row{display:flex;flex-direction:column;gap:.28rem;}
.aria-qr{
  background:rgba(0,200,150,.1);border:1px solid rgba(0,200,150,.25);
  color:#4ade80;padding:.32rem .7rem;border-radius:8px;
  font-size:.7rem;font-weight:600;cursor:pointer;text-align:left;
  font-family:inherit;transition:all .2s;
}
.aria-qr:hover{background:rgba(0,200,150,.25);color:#fff;}

/* input */
#aria-input-wrap{
  display:flex;gap:.35rem;width:100%;margin-top:auto;padding-top:.85rem;
  border-top:1px solid rgba(255,255,255,.08);
}
#aria-mic-btn{
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);
  color:rgba(255,255,255,.6);width:36px;height:36px;border-radius:9px;
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  flex-shrink:0;transition:all .25s;
}
#aria-mic-btn:hover,#aria-mic-btn.on{background:rgba(255,107,107,.25);border-color:#FF6B6B;color:#FF6B6B;}
#aria-mic-btn.on{animation:ariaMicP 1s infinite;}
@keyframes ariaMicP{0%,100%{box-shadow:0 0 0 0 rgba(255,107,107,.4)}50%{box-shadow:0 0 0 6px rgba(255,107,107,0)}}
#aria-text-input{
  flex:1;background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.12);
  color:#e2e8f0;padding:.5rem .75rem;border-radius:9px;
  font-size:.78rem;outline:none;font-family:inherit;min-width:0;
  transition:border-color .2s;
}
#aria-text-input:focus{border-color:#00C896;}
#aria-text-input::placeholder{color:rgba(255,255,255,.25);}
#aria-send-btn{
  background:#00C896;border:none;color:#fff;
  width:36px;height:36px;border-radius:9px;cursor:pointer;
  font-size:1rem;font-weight:700;flex-shrink:0;transition:all .2s;
}
#aria-send-btn:hover{background:#00A07A;}

/* ══ RESULTS COLUMN ══ */
#aria-results-col{
  flex:1;background:white;display:flex;flex-direction:column;overflow:hidden;
}
#aria-results-header{
  padding:1.1rem 1.5rem;border-bottom:1px solid #e8ecf0;flex-shrink:0;
  display:flex;align-items:center;gap:1rem;flex-wrap:wrap;
  background:linear-gradient(135deg,#f0fdf9,#faf5ff);
}
#aria-results-title{
  font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:800;color:#0f172a;flex:1;
}
#aria-results-sub{font-size:.82rem;color:#64748b;flex-shrink:0;max-width:400px;}
#aria-widget-close{
  background:#f1f5f9;border:1px solid #e2e8f0;color:#64748b;
  padding:.4rem .9rem;border-radius:8px;cursor:pointer;
  font-size:.78rem;font-weight:600;font-family:inherit;transition:all .2s;flex-shrink:0;
}
#aria-widget-close:hover{background:#fee2e2;border-color:#fca5a5;color:#dc2626;}

/* filter bar */
#aria-filter-bar{
  display:flex;align-items:center;gap:.4rem;padding:.6rem 1.2rem;
  border-bottom:1px solid #e8ecf0;background:#f8fafc;flex-shrink:0;
  overflow-x:auto;flex-wrap:nowrap;
}
#aria-filter-bar::-webkit-scrollbar{display:none;}
.aria-filter{
  flex-shrink:0;padding:.3rem .8rem;border-radius:50px;font-size:.75rem;font-weight:600;
  border:1.5px solid #e2e8f0;background:white;color:#64748b;cursor:pointer;
  font-family:inherit;transition:all .2s;white-space:nowrap;
}
.aria-filter:hover{border-color:#00C896;color:#00C896;}
.aria-filter.active{background:#00C896;border-color:#00C896;color:white;}
#aria-result-count{margin-left:auto;font-size:.75rem;color:#94a3b8;flex-shrink:0;white-space:nowrap;}

/* store compare */
#aria-store-compare{
  display:flex;gap:.75rem;padding:.75rem 1.2rem;
  border-bottom:1px solid #e8ecf0;background:#f8fafc;flex-shrink:0;
}
.asc-card{
  flex:1;background:white;border:1.5px solid #e2e8f0;border-radius:12px;
  padding:.65rem .85rem;display:flex;align-items:center;gap:.6rem;transition:all .2s;cursor:pointer;
}
.asc-card:hover,.asc-card.active{border-color:#00C896;background:rgba(0,200,150,.04);}
.asc-logo{font-size:1.2rem;}
.asc-name{font-weight:700;font-size:.82rem;color:#0f172a;}
.asc-cb{font-size:.68rem;color:#00A07A;font-weight:600;}
.asc-count{font-size:.7rem;color:#94a3b8;margin-left:auto;}

/* ══ PRODUCT GRID ══ */
#aria-product-grid{
  flex:1;overflow-y:auto;padding:1.2rem;
  display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
  gap:1rem;align-content:start;
}
#aria-product-grid::-webkit-scrollbar{width:6px;}
#aria-product-grid::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}

/* welcome state */
.aria-welcome{
  grid-column:1/-1;text-align:center;padding:3rem 2rem;
  display:flex;flex-direction:column;align-items:center;gap:1.5rem;
}
.aria-welcome-icon{font-size:4rem;}
.aria-welcome h3{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:#0f172a;}
.aria-welcome p{color:#64748b;font-size:.9rem;line-height:1.75;max-width:400px;}
.aria-suggest-grid{display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center;}
.aria-suggest-btn{
  background:#f0fdf9;border:1.5px solid rgba(0,200,150,.3);color:#00A07A;
  padding:.45rem 1rem;border-radius:50px;font-size:.82rem;font-weight:600;
  cursor:pointer;font-family:inherit;transition:all .2s;
}
.aria-suggest-btn:hover{background:#00C896;border-color:#00C896;color:white;}

/* loading state */
.aria-loading-grid{
  grid-column:1/-1;display:flex;flex-wrap:wrap;gap:1rem;
}
.aria-skeleton{
  flex:1;min-width:180px;height:240px;background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
  background-size:200%;border-radius:16px;animation:ariaSkel 1.2s infinite;
}
@keyframes ariaSkel{0%{background-position:200%}100%{background-position:-200%}}

/* product card */
.aria-card{
  background:white;border:1.5px solid #e8ecf0;border-radius:16px;
  overflow:hidden;transition:all .25s;cursor:pointer;
  display:flex;flex-direction:column;
  animation:ariaCardIn .3s ease both;
  position:relative;
}
@keyframes ariaCardIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.aria-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.1);border-color:#00C896;}
.aria-card.in-basket{border-color:#00C896;background:rgba(0,200,150,.03);}
.aria-card-badge{
  position:absolute;top:.6rem;left:.6rem;
  font-size:.62rem;font-weight:700;padding:.18rem .55rem;
  border-radius:50px;background:#FF6B6B;color:white;z-index:1;
}
.aria-card-img{
  height:130px;display:flex;align-items:center;justify-content:center;
  font-size:3.5rem;border-bottom:1px solid #f1f5f9;
  position:relative;overflow:hidden;
}
.aria-card-store-tag{
  position:absolute;bottom:.4rem;right:.4rem;
  font-size:.6rem;font-weight:700;padding:.15rem .45rem;
  border-radius:6px;color:white;
}
.aria-card-body{padding:.85rem;flex:1;display:flex;flex-direction:column;}
.aria-card-title{font-size:.82rem;font-weight:700;color:#0f172a;margin-bottom:.4rem;line-height:1.4;}
.aria-card-price{font-family:'Syne',sans-serif;font-size:1.15rem;font-weight:800;color:#0f172a;margin-bottom:.25rem;}
.aria-card-rating{font-size:.7rem;color:#F59E0B;margin-bottom:.3rem;}
.aria-card-cb{
  display:inline-flex;align-items:center;gap:.3rem;
  background:#f0fdf9;border:1px solid rgba(0,200,150,.25);color:#00A07A;
  padding:.2rem .55rem;border-radius:6px;font-size:.7rem;font-weight:700;
  margin-bottom:.65rem;
}
.aria-card-effective{font-size:.68rem;color:#64748b;margin-bottom:.7rem;}
.aria-card-btns{display:flex;gap:.4rem;margin-top:auto;}
.aria-card-add{
  flex:1;padding:.55rem;background:linear-gradient(135deg,#00C896,#00A07A);
  border:none;color:white;border-radius:9px;font-weight:700;font-size:.78rem;
  cursor:pointer;font-family:inherit;transition:all .2s;
}
.aria-card-add:hover{transform:scale(1.02);box-shadow:0 4px 12px rgba(0,200,150,.3);}
.aria-card-add.done{background:#e8f5e9;color:#2e7d32;border:1.5px solid #81c784;}
.aria-card-tryon{
  width:34px;height:34px;background:#f0f4ff;border:1px solid #c7d2fe;
  color:#4f46e5;border-radius:9px;cursor:pointer;font-size:.85rem;
  display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;
}
.aria-card-tryon:hover{background:#e0e7ff;}

/* basket bar */
#aria-basket-bar{
  padding:.85rem 1.5rem;border-top:1.5px solid #e8ecf0;
  background:linear-gradient(135deg,#f0fdf9,white);
  display:flex;align-items:center;justify-content:space-between;flex-shrink:0;flex-wrap:wrap;gap:.75rem;
}
#aria-basket-info{display:flex;flex-direction:column;gap:.15rem;}
#aria-basket-label{font-size:.9rem;font-weight:700;color:#0f172a;}
#aria-basket-saving{font-size:.75rem;color:#00A07A;font-weight:600;}
#aria-checkout-btn{
  background:linear-gradient(135deg,#00C896,#00A07A);
  border:none;color:white;padding:.75rem 1.75rem;border-radius:12px;
  font-size:.88rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;
}
#aria-checkout-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,200,150,.35);}

/* ══ FAB ══ */
#aria-fab{
  position:fixed;bottom:24px;right:24px;z-index:799;
  background:#071a0e;border:2px solid rgba(0,200,150,.45);
  padding:.4rem 1.1rem .4rem .35rem;border-radius:50px;
  cursor:pointer;display:flex;align-items:center;gap:.65rem;
  font-family:inherit;box-shadow:0 8px 32px rgba(0,0,0,.5);
  animation:ariaFabGlow 3s ease-in-out infinite;transition:all .3s;
}
@keyframes ariaFabGlow{0%,100%{box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 0 0 rgba(0,200,150,.2)}50%{box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 0 10px rgba(0,200,150,0)}}
#aria-fab:hover{transform:translateY(-3px);border-color:#00C896;animation:none;box-shadow:0 12px 40px rgba(0,0,0,.5),0 0 28px rgba(0,200,150,.25);}
#aria-fab svg{border-radius:50%;border:2px solid rgba(0,200,150,.4);}
#aria-fab-name{font-size:.85rem;font-weight:800;color:white;}
#aria-fab-sub{font-size:.62rem;color:rgba(255,255,255,.45);}
#aria-fab-notif{
  position:absolute;top:-5px;right:-5px;
  background:#FF6B6B;color:white;width:18px;height:18px;
  border-radius:50%;font-size:.65rem;font-weight:800;
  display:flex;align-items:center;justify-content:center;
  border:2px solid #071a0e;
}

/* ══ VOICE OVERLAY ══ */
#aria-voice-ov{
  position:fixed;inset:0;background:rgba(5,10,18,.97);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;
  z-index:1200;
}
.av-ripple{
  position:absolute;width:200px;height:200px;border-radius:50%;
  border:2px solid rgba(255,107,107,.25);animation:avRipple 2s ease-out infinite;
}
@keyframes avRipple{0%{transform:scale(.5);opacity:1}100%{transform:scale(2.5);opacity:0}}
@keyframes avBob{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}

@media(max-width:768px){
  #aria-col{width:180px;}
  #aria-product-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));}
}
@media(max-width:560px){
  #aria-widget{flex-direction:column;}
  #aria-col{width:100%;flex-direction:row;padding:.75rem;height:auto;}
  #aria-portrait{width:80px;}
  #aria-svg{width:80px;}
  #aria-speech-area{flex:1;}
}
`;
document.head.appendChild(ST);

// init mouth
setTimeout(()=>{const m=document.getElementById('aria-mouth');if(m)m.setAttribute('d',mPath(2));},60);

/* ─── STATE ──────────────────────────────────────────────── */
const S={
  open:false, greeted:false,
  lastProds:[], activeFilter:'all', lastQuery:'',
};

/* ─── PARSE QUERY ────────────────────────────────────────── */
function parseQ(msg){
  const m=msg.toLowerCase();
  let cat=null,maxP=null,minP=null,store=null;
  if(/tshirt|t-shirt|tee\b|t shirt/.test(m)) cat='tshirt';
  else if(/\bshirt\b|polo/.test(m)) cat='shirt';
  else if(/jean|denim|trouser/.test(m)) cat='jeans';
  else if(/shoe|trainer|sneaker/.test(m)) cat='shoes';
  else if(/headphone|earphone|airpod/.test(m)) cat='headphones';
  else if(/laptop|macbook|notebook/.test(m)) cat='laptop';
  else if(/dress|skirt/.test(m)) cat='dress';
  const u=m.match(/(?:under|below|less than|max|within)\s*£?\s*(\d+)/);
  if(u) maxP=parseFloat(u[1]);
  const b=m.match(/between\s*£?\s*(\d+)\s*(?:and|to|-)\s*£?\s*(\d+)/);
  if(b){minP=parseFloat(b[1]);maxP=parseFloat(b[2]);}
  if(/amazon/.test(m)) store='Amazon';
  else if(/ebay/.test(m)) store='eBay';
  else if(/flipkart/.test(m)) store='Flipkart';
  return{cat,maxP,minP,store};
}

/* ─── RENDER ─────────────────────────────────────────────── */
function showWelcome(){
  document.getElementById('aria-product-grid').innerHTML=`
    <div class="aria-welcome">
      <div class="aria-welcome-icon">🛍️</div>
      <h3>What are we shopping for today?</h3>
      <p>I'll search Amazon, eBay and Flipkart at the same time — showing you the best prices and cashback in one place.</p>
      <div class="aria-suggest-grid">
        <button class="aria-suggest-btn" onclick="Aria.ask('t-shirts under £20')">👕 T-shirts under £20</button>
        <button class="aria-suggest-btn" onclick="Aria.ask('headphones under £50')">🎧 Headphones under £50</button>
        <button class="aria-suggest-btn" onclick="Aria.ask('laptops under £600')">💻 Laptops under £600</button>
        <button class="aria-suggest-btn" onclick="Aria.ask('jeans under £40')">👖 Jeans under £40</button>
        <button class="aria-suggest-btn" onclick="Aria.ask('dresses under £35')">👗 Dresses under £35</button>
        <button class="aria-suggest-btn" onclick="Aria.ask('show best deals')">🔥 Best deals today</button>
      </div>
    </div>`;
  document.getElementById('aria-filter-bar').style.display='none';
  document.getElementById('aria-store-compare').style.display='none';
  document.getElementById('aria-basket-bar').style.display='none';
}

function showLoading(){
  document.getElementById('aria-product-grid').innerHTML=`<div class="aria-loading-grid">${Array(6).fill('<div class="aria-skeleton"></div>').join('')}</div>`;
}

function renderProducts(prods){
  if(!prods||!prods.length){
    document.getElementById('aria-product-grid').innerHTML=`<div class="aria-welcome"><div class="aria-welcome-icon">🔍</div><h3>No results found</h3><p>Try a different search or wider budget.</p><div class="aria-suggest-grid"><button class="aria-suggest-btn" onclick="Aria.ask('t-shirts')">👕 T-shirts</button><button class="aria-suggest-btn" onclick="Aria.ask('show best deals')">🔥 Best deals</button></div></div>`;
    return;
  }

  // store counts
  const counts={Amazon:0,eBay:0,Flipkart:0};
  prods.forEach(p=>counts[p.store]=(counts[p.store]||0)+1);
  ['Amazon','eBay','Flipkart'].forEach(s=>{
    const el=document.getElementById(`asc-count-${s}`);
    if(el) el.textContent=counts[s]?`${counts[s]} results`:'No results';
    const card=document.getElementById(`asc-${s}`);
    if(card) card.classList.toggle('active',!!counts[s]);
  });
  document.getElementById('aria-result-count').textContent=`${prods.length} results`;
  document.getElementById('aria-filter-bar').style.display='flex';
  document.getElementById('aria-store-compare').style.display='flex';

  const grid=document.getElementById('aria-product-grid');
  grid.innerHTML='';
  prods.forEach((p,i)=>{
    const sc=SCOL[p.store]||{bg:'#f8fafc',border:'#e2e8f0',text:'#475569',icon:'🏪'};
    const inB=basket.some(b=>b.id===p.id);
    const eff=(p.price*(1-p.cashback/100)).toFixed(2);
    const save=(p.price*p.cashback/100).toFixed(2);
    const storeColors={Amazon:'#FF9900',eBay:'#0064d2',Flipkart:'#2874F0'};
    const card=document.createElement('div');
    card.className='aria-card'+(inB?' in-basket':'');
    card.dataset.pid=p.id;
    card.style.animationDelay=(i*0.04)+'s';
    card.innerHTML=`
      ${p.badge?`<div class="aria-card-badge">${p.badge}</div>`:''}
      <div class="aria-card-img" style="background:${p.color||'#f8fafc'}">
        <span>${p.img}</span>
        <div class="aria-card-store-tag" style="background:${storeColors[p.store]||'#64748b'}">${p.store}</div>
      </div>
      <div class="aria-card-body">
        <div class="aria-card-title">${p.title}</div>
        <div class="aria-card-price">£${p.price.toFixed(2)}</div>
        <div class="aria-card-rating">★ ${p.rating} <span style="color:#94a3b8">(${p.reviews.toLocaleString()} reviews)</span></div>
        <div class="aria-card-cb">💰 ${p.cashback}% cashback · save £${save}</div>
        <div class="aria-card-effective">Effective price: <strong>£${eff}</strong></div>
        <div class="aria-card-btns">
          <button class="aria-card-add${inB?' done':''}" onclick="Aria.addToBasket(${JSON.stringify(p).replace(/"/g,'&quot;')})">
            ${inB?'✓ In basket':'+ Add to basket'}
          </button>
          <button class="aria-card-tryon" onclick="window.location.href='virtual-assistant.html'" title="Virtual try-on">👔</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  updateBasketBar();
}

function updateBasketBar(){
  const n=basket.length;
  if(!n){document.getElementById('aria-basket-bar').style.display='none';return;}
  document.getElementById('aria-basket-bar').style.display='flex';
  const tot=basket.reduce((s,i)=>s+i.price,0);
  const saving=basket.reduce((s,i)=>s+(i.price*i.cashback/100),0);
  document.getElementById('aria-basket-label').textContent=`🛒 ${n} item${n>1?'s':''} · £${tot.toFixed(2)}`;
  document.getElementById('aria-basket-saving').textContent=`You're saving £${saving.toFixed(2)} with cashback!`;
  // sync add buttons
  document.querySelectorAll('.aria-card').forEach(card=>{
    const inB=basket.some(i=>i.id===card.dataset.pid);
    card.classList.toggle('in-basket',inB);
    const btn=card.querySelector('.aria-card-add');
    if(btn){btn.textContent=inB?'✓ In basket':'+ Add to basket';btn.classList.toggle('done',inB);}
  });
}

function setAriaMsg(txt, qrs){
  const el=document.getElementById('aria-latest-msg');
  el.style.display='block';
  el.innerHTML=txt.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
  const qrRow=document.getElementById('aria-qr-row');
  qrRow.innerHTML=(qrs||[]).map(q=>`<button class="aria-qr" onclick="Aria.ask('${q}')">${q}</button>`).join('');
  document.getElementById('aria-results-title').textContent=txt.split('.')[0].substring(0,60)+(txt.length>60?'…':'');
  document.getElementById('aria-results-sub').textContent='Showing results from Amazon, eBay & Flipkart';
}

/* ─── REPLY ENGINE ───────────────────────────────────────── */
function getReply(msg){
  const m=msg.toLowerCase();
  const {cat,maxP,minP,store}=parseQ(msg);
  if(cat){
    let prods=[...(PRODUCTS[cat]||[])];
    if(maxP) prods=prods.filter(p=>p.price<=maxP);
    if(minP) prods=prods.filter(p=>p.price>=minP);
    if(store) prods=prods.filter(p=>p.store===store);
    if(!prods.length) return{text:`I couldn't find anything${maxP?` under £${maxP}`:''}. Let me show everything — you can filter from there!`,prods:[...(PRODUCTS[cat]||[])],qr:['Sort by price','Under £50','Under £100']};
    S.lastProds=prods;S.activeFilter='all';
    const ns=[...new Set(prods.map(p=>p.store))].length;
    const pt=maxP?` under £${maxP}`:'';
    return{text:`Found **${prods.length} results**${pt} across ${ns} stores! Use the filters to narrow down, or add items straight to your basket.`,prods,qr:['Cheapest first','Best rated','Only Amazon','Only eBay','Only Flipkart']};
  }
  if(/hello|hi|hey|namaste/.test(m)) return{text:"Hi there! I'm Aria, your personal shopping guide. Tell me what you're looking for and I'll search Amazon, eBay and Flipkart all at once!",prods:null,qr:['T-shirts under £20','Headphones under £50','Laptops under £600','Show best deals']};
  if(/deal|best|offer|today/.test(m)){const all=Object.values(PRODUCTS).flat().sort(()=>Math.random()-.5).slice(0,12);S.lastProds=all;return{text:`Today's top deals! Flipkart has 5% cashback, Amazon 4.5%, eBay 3.2%. Here are the hottest picks right now:`,prods:all,qr:['Fashion only','Electronics only','Filter by Amazon']};}
  if(/cheapest|price.*low|sort.*price/.test(m)&&S.lastProds.length){const s=[...S.lastProds].sort((a,b)=>a.price-b.price);return{text:`Sorted from lowest price — best value at the top!`,prods:s,qr:['Best rated','Highest cashback','Only Amazon']};}
  if(/best.*rat|top.*rat/.test(m)&&S.lastProds.length){const s=[...S.lastProds].sort((a,b)=>b.rating-a.rating);return{text:`Sorted by highest customer rating — top quality picks!`,prods:s,qr:['Cheapest first','Highest cashback']};}
  if(/only amazon/.test(m)&&S.lastProds.length){const f=S.lastProds.filter(p=>p.store==='Amazon');return{text:f.length?`Amazon results only — with 4.5% cashback!`:`No Amazon results. Showing all stores.`,prods:f.length?f:S.lastProds,qr:['All stores','Only eBay','Only Flipkart']};}
  if(/only ebay/.test(m)&&S.lastProds.length){const f=S.lastProds.filter(p=>p.store==='eBay');return{text:f.length?`eBay results only — with 3.2% cashback!`:`No eBay results.`,prods:f.length?f:S.lastProds,qr:['All stores','Only Amazon','Only Flipkart']};}
  if(/only flipkart/.test(m)&&S.lastProds.length){const f=S.lastProds.filter(p=>p.store==='Flipkart');return{text:f.length?`Flipkart results — 5% cashback today, best rate!`:`No Flipkart results.`,prods:f.length?f:S.lastProds,qr:['All stores','Only Amazon','Only eBay']};}
  if(/basket|cart|checkout/.test(m)){if(!basket.length)return{text:`Your basket is empty! Tell me what you need.`,prods:null,qr:['T-shirts','Headphones','Laptops']};return{text:`You have ${basket.length} item${basket.length>1?'s':''} worth £${basket.reduce((s,i)=>s+i.price,0).toFixed(2)}. Ready to checkout across all stores?`,prods:null,qr:['Checkout all','Keep shopping']};}
  if(/try.?on|virtual/.test(m)){window.location.href='virtual-assistant.html';return{text:`Opening AI virtual try-on now!`,prods:null,qr:[]};}
  if(/squad|couple|partner/.test(m)) return{text:`Squad shopping lets you shop with friends or family in real-time — share baskets, vote on items. Try asking for a product first!`,prods:null,qr:['Start couple squad','T-shirts to vote on','Dresses for us']};
  return{text:`I'm searching for "${msg}" across Amazon, eBay and Flipkart. Try something like "blue t-shirt under £30" or "laptop under £500" for best results!`,prods:null,qr:['T-shirts under £30','Jeans under £50','Headphones under £100','Dresses under £40']};
}

/* ─── MAIN API ───────────────────────────────────────────── */
window.Aria={

  toggle(){S.open?this.close():this.open_();},

  open_(){
    S.open=true;
    document.getElementById('aria-widget').classList.add('open');
    document.body.style.overflow='hidden';
    document.getElementById('aria-fab-notif').style.display='none';
    if(!S.greeted){
      S.greeted=true;
      showWelcome();
      setTimeout(()=>{
        const g="Hi! I'm Aria, your personal shopping assistant. I can search Amazon, eBay and Flipkart all at once and show you everything right here. What are we shopping for today?";
        setAriaMsg(g,['T-shirts under £20','Headphones under £50','Best deals today','Virtual try-on']);
        speak(g);
      },350);
    }
  },

  close(){
    S.open=false;
    document.getElementById('aria-widget').classList.remove('open');
    document.body.style.overflow='';
    SYN.cancel();lipStop();setWave(false);
  },

  ask(query){
    document.getElementById('aria-text-input').value=query;
    this.send();
  },

  async send(){
    const inp=document.getElementById('aria-text-input');
    const msg=inp.value.trim();if(!msg)return;
    inp.value='';S.lastQuery=msg;
    setStatus('Searching…');
    showLoading();
    document.getElementById('aria-results-title').textContent='Searching across all stores…';
    document.getElementById('aria-results-sub').textContent='Amazon · eBay · Flipkart';
    await new Promise(r=>setTimeout(r,600+Math.random()*400));
    const reply=getReply(msg);
    setAriaMsg(reply.text,reply.qr);
    if(reply.prods){renderProducts(reply.prods);}
    else if(S.lastProds.length){renderProducts(S.lastProds);}
    else{showWelcome();}
    speak(reply.text);
  },

  filter(store,btn){
    S.activeFilter=store;
    document.querySelectorAll('.aria-filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const prods=store==='all'?S.lastProds:S.lastProds.filter(p=>p.store===store);
    renderProducts(prods);
  },

  sortBy(key){
    const sorted=[...S.lastProds].sort((a,b)=>
      key==='price'?a.price-b.price:key==='rating'?b.rating-a.rating:b.cashback-a.cashback
    );
    renderProducts(sorted);
    const sortNames={price:'Cheapest first',rating:'Top rated first',cashback:'Highest cashback first'};
    const msg=`Sorted by ${sortNames[key]}!`;
    setAriaMsg(msg,['Reset sort','Only Amazon','Only eBay']);
    speak(msg);
  },

  addToBasket(p){
    if(basket.some(i=>i.id===p.id))return;
    basket.push(p);updateBasketBar();
    const msg=`${p.title} added! That's £${p.price.toFixed(2)} with ${p.cashback}% cashback from ${p.store} — great choice!`;
    setAriaMsg(`✅ **${p.title}** added to basket! ${p.cashback}% cashback from ${p.store}.`,['View basket','Keep shopping','Checkout all']);
    speak(msg);
  },

  checkoutAll(){
    if(!basket.length){speak("Your basket is empty! Let me find you something.");return;}
    const stores=[...new Set(basket.map(i=>i.store))];
    const urls={Amazon:'https://amazon.co.uk',eBay:'https://ebay.co.uk',Flipkart:'https://flipkart.com'};
    const msg=`Opening ${stores.join(' and ')} with your cashback links. Happy shopping!`;
    setAriaMsg(`🚀 Opening ${stores.length} store${stores.length>1?'s':''} with cashback activated!`,[]);
    speak(msg);
    stores.forEach((s,i)=>setTimeout(()=>window.open(urls[s]||'#','_blank'),i*700));
  },

  toggleVoice(){
    if(!recog) recog=initVoice();
    if(!recog){setAriaMsg("Voice needs Chrome or Edge. Just type instead!",['T-shirts','Best deals']);return;}
    if(isLsn){recog.stop();return;}
    recog.start();
  },
  stopVoice(){if(recog&&isLsn)recog.stop();},
};

// expose SCAI alias too for squad modal etc
window.SCAI=window.Aria;

/* voice recognition */
function initVoice(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR)return null;
  const r=new SR();
  r.continuous=false;r.interimResults=true;r.lang='en-GB';
  r.onstart=()=>{isLsn=true;document.getElementById('aria-mic-btn').classList.add('on');document.getElementById('aria-voice-ov').style.display='flex';document.getElementById('aria-vtranscript').textContent='';};
  r.onresult=(e)=>{const t=Array.from(e.results).map(r=>r[0].transcript).join('');document.getElementById('aria-vtranscript').textContent=t;if(e.results[e.results.length-1].isFinal)document.getElementById('aria-text-input').value=t;};
  r.onend=()=>{isLsn=false;document.getElementById('aria-mic-btn').classList.remove('on');document.getElementById('aria-voice-ov').style.display='none';const v=document.getElementById('aria-text-input').value.trim();if(v)Aria.send();};
  r.onerror=()=>{isLsn=false;document.getElementById('aria-mic-btn').classList.remove('on');document.getElementById('aria-voice-ov').style.display='none';};
  return r;
}

/* badge after 4s */
setTimeout(()=>{if(!S.open)document.getElementById('aria-fab-notif').style.display='flex';},4000);
/* Ctrl+/ shortcut */
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='/')Aria.toggle();});

})();
