/* ============================================================
   SmartCash — Living AI Store Assistant v3
   Animated avatar · Voice in/out · Lip-sync · Multi-store search
   One <script src="ai-sidebar.js"> on any page = done.
   ============================================================ */
(function () {

/* ══════════════════════════════════════════════════════════
   PRODUCT DATA
══════════════════════════════════════════════════════════ */
const MOCK_PRODUCTS = {
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
    {id:'j3',title:'Skinny Stretch Jeans',price:32.00,store:'Flipkart',rating:4.1,reviews:2800,img:'👖',cashback:5.0,badge:'',url:'https://flipkart.com'},
    {id:'j4',title:'High Waist Mom Jeans',price:28.00,store:'Flipkart',rating:4.6,reviews:4200,img:'👖',cashback:5.0,badge:'Hot 🔥',url:'https://flipkart.com'},
  ],
  shoes:[
    {id:'sh1',title:'Nike Air Max 90',price:89.99,store:'Amazon',rating:4.7,reviews:8200,img:'👟',cashback:4.5,badge:'Best Seller',url:'https://amazon.co.uk'},
    {id:'sh2',title:'Adidas Stan Smith',price:75.00,store:'eBay',rating:4.5,reviews:3400,img:'⚪',cashback:3.2,badge:'Classic',url:'https://ebay.co.uk'},
    {id:'sh3',title:'Casual Canvas Sneakers',price:29.99,store:'Flipkart',rating:4.2,reviews:1800,img:'👟',cashback:5.0,badge:'Budget Pick',url:'https://flipkart.com'},
  ],
  headphones:[
    {id:'h1',title:'Sony WH-1000XM5 Wireless',price:279.00,store:'Amazon',rating:4.8,reviews:12400,img:'🎧',cashback:4.5,badge:'Best Overall',url:'https://amazon.co.uk'},
    {id:'h2',title:'AirPods Pro (2nd Gen)',price:219.00,store:'eBay',rating:4.7,reviews:9800,img:'🎵',cashback:3.2,badge:'Top Rated ⭐',url:'https://ebay.co.uk'},
    {id:'h3',title:'Boat Rockerz 450 Pro',price:29.99,store:'Flipkart',rating:4.1,reviews:45000,img:'🎶',cashback:5.0,badge:'Budget Pick',url:'https://flipkart.com'},
  ],
  laptop:[
    {id:'l1',title:'Apple MacBook Air M3',price:1099.00,store:'Amazon',rating:4.9,reviews:3200,img:'💻',cashback:4.5,badge:'Best Overall',url:'https://amazon.co.uk'},
    {id:'l2',title:'Dell Inspiron 15 i5',price:599.00,store:'eBay',rating:4.3,reviews:1800,img:'💼',cashback:3.2,badge:'Value Pick',url:'https://ebay.co.uk'},
    {id:'l3',title:'HP Pavilion 14 Laptop',price:449.00,store:'Flipkart',rating:4.1,reviews:8900,img:'💻',cashback:5.0,badge:'Budget',url:'https://flipkart.com'},
  ],
  dress:[
    {id:'d1',title:'Floral Wrap Midi Dress',price:34.99,store:'Amazon',rating:4.4,reviews:2100,img:'👗',cashback:4.5,badge:'Best Seller',url:'https://amazon.co.uk'},
    {id:'d2',title:'Bodycon Evening Dress',price:42.00,store:'eBay',rating:4.2,reviews:680,img:'🖤',cashback:3.2,badge:'',url:'https://ebay.co.uk'},
    {id:'d3',title:'Summer Sundress Boho',price:22.99,store:'Flipkart',rating:4.5,reviews:3800,img:'🌺',cashback:5.0,badge:'Trending 🔥',url:'https://flipkart.com'},
  ],
};

const STORE_COLORS={Amazon:{bg:'rgba(255,153,0,.12)',border:'rgba(255,153,0,.35)',text:'#FF9900'},eBay:{bg:'rgba(0,112,186,.12)',border:'rgba(0,112,186,.35)',text:'#0070BA'},Flipkart:{bg:'rgba(40,116,240,.12)',border:'rgba(40,116,240,.35)',text:'#2874F0'}};

const basket=[];

/* ══════════════════════════════════════════════════════════
   VOICE ENGINE
══════════════════════════════════════════════════════════ */
let synth = window.speechSynthesis;
let voices = [];
let isSpeaking = false;
let recognition = null;
let isListening = false;
let lipSyncInterval = null;

function loadVoices(){
  voices = synth.getVoices();
  // prefer female English voices
  const preferred = voices.find(v=>v.name.includes('Samantha')||v.name.includes('Karen')||v.name.includes('Moira')||v.name.includes('Tessa')||(v.lang.startsWith('en')&&v.name.toLowerCase().includes('female')));
  return preferred || voices.find(v=>v.lang.startsWith('en')) || voices[0];
}
if(synth.onvoiceschanged!==undefined) synth.onvoiceschanged=loadVoices;

function speak(text, onEnd){
  if(!synth) return onEnd&&onEnd();
  synth.cancel();
  const clean = text.replace(/[🛍️📦🎧💻👕👗✅💑👥🔥📊🌺🖤⭐💡🤖🙏🎤]/gu,'').replace(/\*\*(.*?)\*\*/g,'$1').replace(/\*(.*?)\*/g,'$1').replace(/\n/g,' ').substring(0,300);
  const utter = new SpeechSynthesisUtterance(clean);
  utter.voice = loadVoices();
  utter.rate = 1.05;
  utter.pitch = 1.15;
  utter.volume = 1;
  isSpeaking = true;
  startLipSync();
  utter.onend = ()=>{ isSpeaking=false; stopLipSync(); onEnd&&onEnd(); };
  utter.onerror = ()=>{ isSpeaking=false; stopLipSync(); onEnd&&onEnd(); };
  synth.speak(utter);
}

function startLipSync(){
  const mouth = document.getElementById('sc-mouth');
  const eyes  = document.getElementById('sc-eyes-group');
  if(!mouth) return;
  const frames = [
    {ry:3,rx:6}, {ry:6,rx:10}, {ry:2,rx:5},
    {ry:8,rx:12}, {ry:4,rx:7}, {ry:1,rx:4},
  ];
  let f=0;
  clearInterval(lipSyncInterval);
  lipSyncInterval = setInterval(()=>{
    const fr = frames[f%frames.length];
    mouth.setAttribute('ry', fr.ry);
    mouth.setAttribute('rx', fr.rx);
    // blink occasionally
    if(f%18===0 && eyes){
      eyes.style.transform='scaleY(0.1)';
      setTimeout(()=>{ if(eyes) eyes.style.transform='scaleY(1)'; },120);
    }
    f++;
  }, 100);
}

function stopLipSync(){
  clearInterval(lipSyncInterval);
  const mouth = document.getElementById('sc-mouth');
  if(mouth){ mouth.setAttribute('ry','2'); mouth.setAttribute('rx','6'); }
}

/* ══════════════════════════════════════════════════════════
   INJECT HTML
══════════════════════════════════════════════════════════ */
document.body.insertAdjacentHTML('beforeend',`

<!-- LIVING AVATAR SIDEBAR -->
<div id="sc-sidebar">

  <!-- ── AVATAR PANEL ── -->
  <div class="sc-avatar-panel">
    <div class="sc-avatar-bg"></div>

    <!-- SVG Avatar — friendly lifestyle woman -->
    <svg id="sc-avatar-svg" viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="skinGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#FDDBB4"/>
          <stop offset="100%" stop-color="#F5C28A"/>
        </radialGradient>
        <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFAAAA" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#FFAAAA" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="bgAvaGrad" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stop-color="#1a4a3a"/>
          <stop offset="100%" stop-color="#0a1a14"/>
        </radialGradient>
        <filter id="softShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
        <clipPath id="headClip">
          <ellipse cx="100" cy="72" rx="46" ry="50"/>
        </clipPath>
      </defs>

      <!-- Background glow -->
      <ellipse cx="100" cy="200" rx="80" ry="60" fill="rgba(0,200,150,0.07)"/>

      <!-- Hair — back layer -->
      <ellipse cx="100" cy="58" rx="48" ry="44" fill="#2C1810"/>
      <!-- Long hair sides -->
      <path d="M54 75 Q38 130 44 200 Q58 210 66 195 Q60 140 65 90Z" fill="#2C1810"/>
      <path d="M146 75 Q162 130 156 200 Q142 210 134 195 Q140 140 135 90Z" fill="#2C1810"/>
      <!-- Hair highlight -->
      <path d="M78 30 Q100 22 118 32 Q108 26 100 25 Q92 25 78 30Z" fill="#5C3820" opacity="0.6"/>

      <!-- Neck -->
      <rect x="88" y="115" width="24" height="26" rx="8" fill="url(#skinGrad)"/>

      <!-- Body / outfit — smart casual top -->
      <path d="M30 230 Q32 170 50 155 Q72 142 88 140 L100 155 L112 140 Q128 142 150 155 Q168 170 170 230Z" fill="#00C896"/>
      <!-- Collar detail -->
      <path d="M88 140 L100 165 L112 140" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <!-- Top highlight -->
      <path d="M50 165 Q60 158 75 155 Q65 168 58 185Z" fill="rgba(255,255,255,0.08)"/>
      <!-- Necklace -->
      <path d="M82 128 Q100 138 118 128" fill="none" stroke="rgba(255,200,100,0.7)" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="100" cy="138" r="2" fill="rgba(255,200,100,0.8)"/>

      <!-- Face -->
      <ellipse cx="100" cy="72" rx="44" ry="46" fill="url(#skinGrad)" filter="url(#softShadow)"/>

      <!-- Blush -->
      <ellipse cx="76" cy="86" rx="12" ry="7" fill="url(#blushGrad)"/>
      <ellipse cx="124" cy="86" rx="12" ry="7" fill="url(#blushGrad)"/>

      <!-- Eyebrows -->
      <path d="M78 57 Q88 53 96 55" fill="none" stroke="#3D1F0F" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M104 55 Q112 53 122 57" fill="none" stroke="#3D1F0F" stroke-width="2.2" stroke-linecap="round"/>

      <!-- Eyes group (for blink) -->
      <g id="sc-eyes-group" style="transform-origin:100px 70px;transition:transform 0.1s">
        <!-- Eye whites -->
        <ellipse cx="87" cy="70" rx="9" ry="7" fill="white"/>
        <ellipse cx="113" cy="70" rx="9" ry="7" fill="white"/>
        <!-- Irises — warm brown -->
        <circle cx="87" cy="70" r="5.5" fill="#6B3A2A"/>
        <circle cx="113" cy="70" r="5.5" fill="#6B3A2A"/>
        <!-- Pupils -->
        <circle cx="88" cy="70" r="3" fill="#1a0a00"/>
        <circle cx="114" cy="70" r="3" fill="#1a0a00"/>
        <!-- Eye shine -->
        <circle cx="90" cy="67" r="1.5" fill="white" opacity="0.9"/>
        <circle cx="116" cy="67" r="1.5" fill="white" opacity="0.9"/>
        <!-- Lower eyelash -->
        <path d="M78 73 Q87 77 96 73" fill="none" stroke="#2C1810" stroke-width="0.8" opacity="0.4"/>
        <path d="M104 73 Q113 77 122 73" fill="none" stroke="#2C1810" stroke-width="0.8" opacity="0.4"/>
        <!-- Upper eyelash -->
        <path d="M78 66 Q87 62 96 66" fill="none" stroke="#1a0a00" stroke-width="2" stroke-linecap="round"/>
        <path d="M104 66 Q113 62 122 66" fill="none" stroke="#1a0a00" stroke-width="2" stroke-linecap="round"/>
      </g>

      <!-- Nose -->
      <path d="M97 82 Q95 90 93 93 Q100 97 107 93 Q105 90 103 82" fill="none" stroke="rgba(180,100,60,0.35)" stroke-width="1.2" stroke-linecap="round" fill="rgba(200,130,90,0.12)"/>
      <ellipse cx="100" cy="93" rx="4" ry="2" fill="rgba(200,130,90,0.18)"/>

      <!-- Mouth — animated via JS -->
      <g id="sc-mouth-group">
        <!-- Lips -->
        <path d="M86 104 Q100 100 114 104 Q107 108 100 109 Q93 108 86 104Z" fill="#D4617A"/>
        <!-- Animated jaw/open area -->
        <ellipse id="sc-mouth" cx="100" cy="107" rx="6" ry="2" fill="#8B1A2A"/>
        <!-- Upper lip cupid bow -->
        <path d="M86 104 Q93 101 100 103 Q107 101 114 104" fill="#E8728A" stroke="none"/>
        <!-- Smile lines -->
        <path d="M83 103 Q85 108 84 112" fill="none" stroke="rgba(180,100,60,0.2)" stroke-width="1" stroke-linecap="round"/>
        <path d="M117 103 Q115 108 116 112" fill="none" stroke="rgba(180,100,60,0.2)" stroke-width="1" stroke-linecap="round"/>
      </g>

      <!-- Ear rings -->
      <circle cx="56" cy="82" r="4" fill="rgba(255,200,100,0.6)" stroke="rgba(255,200,100,0.9)" stroke-width="1"/>
      <circle cx="144" cy="82" r="4" fill="rgba(255,200,100,0.6)" stroke="rgba(255,200,100,0.9)" stroke-width="1"/>

      <!-- Ear -->
      <ellipse cx="56" cy="78" rx="7" ry="9" fill="url(#skinGrad)"/>
      <ellipse cx="144" cy="78" rx="7" ry="9" fill="url(#skinGrad)"/>

      <!-- Arms suggestion -->
      <path d="M30 230 Q25 200 28 175" fill="none" stroke="#00A07A" stroke-width="22" stroke-linecap="round" opacity="0.6"/>
      <path d="M170 230 Q175 200 172 175" fill="none" stroke="#00A07A" stroke-width="22" stroke-linecap="round" opacity="0.6"/>
    </svg>

    <!-- Name + status bar -->
    <div class="sc-avatar-nameplate">
      <div class="sc-ava-name">Aria <span class="sc-ava-dot" id="sc-ava-dot">●</span></div>
      <div class="sc-ava-title" id="sc-ava-status">SmartCash Assistant</div>
    </div>

    <!-- Speaking wave visualiser -->
    <div class="sc-wave-wrap" id="sc-wave-wrap" style="opacity:0">
      <div class="sc-wave-bar"></div><div class="sc-wave-bar"></div><div class="sc-wave-bar"></div>
      <div class="sc-wave-bar"></div><div class="sc-wave-bar"></div>
    </div>

    <!-- Close button -->
    <button class="sc-close-btn" onclick="SCAI.close()">✕</button>
  </div>

  <!-- ── CONVERSATION PANEL ── -->
  <div class="sc-conv-panel">

    <!-- Mode pills -->
    <div class="sc-mode-bar">
      <button class="sc-mode active" data-mode="shop" onclick="SCAI.setMode('shop',this)">🛍️ Shop</button>
      <button class="sc-mode" data-mode="deals" onclick="SCAI.setMode('deals',this)">🔥 Deals</button>
      <button class="sc-mode" data-mode="squad" onclick="SCAI.setMode('squad',this)">👥 Squad</button>
      <button class="sc-mode" data-mode="price" onclick="SCAI.setMode('price',this)">📊 Price</button>
    </div>

    <!-- Basket bar -->
    <div class="sc-basket-bar" id="sc-basket-bar" style="display:none">
      <span id="sc-basket-label">🛒 0 items · £0.00</span>
      <button class="sc-basket-view-btn" onclick="SCAI.toggleBasket()">View</button>
    </div>

    <!-- Basket panel -->
    <div id="sc-basket-panel" style="display:none">
      <div id="sc-basket-items"></div>
      <button class="sc-checkout-all" onclick="SCAI.checkoutAll()">Checkout All Stores →</button>
    </div>

    <!-- Messages -->
    <div class="sc-msgs" id="sc-msgs"></div>

    <!-- Quick replies -->
    <div class="sc-qr" id="sc-qr"></div>

    <!-- Input row -->
    <div class="sc-input-row">
      <button class="sc-mic-btn" id="sc-mic" onclick="SCAI.toggleVoice()" title="Tap to speak">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v7a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zM8.5 18.5A7.5 7.5 0 0 0 19.5 12h2a9.5 9.5 0 0 1-9 9.47V23h-1v-1.53A9.5 9.5 0 0 1 2.5 12h2a7.5 7.5 0 0 0 6 7.35V18.5z"/></svg>
      </button>
      <input id="sc-input" class="sc-input" type="text"
        placeholder='Say hi or type anything…'
        onkeydown="if(event.key==='Enter')SCAI.send()"
        autocomplete="off">
      <button class="sc-send-btn" onclick="SCAI.send()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  </div>
</div>

<!-- FAB TOGGLE -->
<button id="sc-fab" onclick="SCAI.toggle()">
  <div class="sc-fab-ava">
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <ellipse cx="20" cy="16" rx="9" ry="10" fill="#FDDBB4"/>
      <ellipse cx="20" cy="9" rx="9" ry="6" fill="#2C1810"/>
      <circle cx="17" cy="15" r="2" fill="#6B3A2A"/>
      <circle cx="23" cy="15" r="2" fill="#6B3A2A"/>
      <circle cx="17.5" cy="14" r="1" fill="white"/>
      <circle cx="23.5" cy="14" r="1" fill="white"/>
      <path d="M16 20 Q20 23 24 20" fill="none" stroke="#D4617A" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="16" y="25" width="8" height="12" rx="3" fill="#00C896"/>
    </svg>
  </div>
  <div class="sc-fab-text">
    <span class="sc-fab-name">Aria</span>
    <span class="sc-fab-sub">Ask me anything</span>
  </div>
  <span id="sc-fab-badge" style="display:none" class="sc-fab-badge">1</span>
</button>

<!-- SQUAD MODAL -->
<div id="sc-squad-modal" class="sc-modal-ov" onclick="if(event.target===this)SCAI.closeSquadModal()">
  <div class="sc-modal">
    <div class="sc-modal-head"><h3>👥 Start Squad Shopping</h3><button class="sc-modal-x" onclick="SCAI.closeSquadModal()">✕</button></div>
    <div class="sc-modal-body">
      <p>Shop in real-time with your crew — vote on items, share baskets.</p>
      <div class="sc-squad-types">
        <div class="sc-squad-type active" onclick="SCAI.selectSquadType('couple',this)">💑<br>Couple</div>
        <div class="sc-squad-type" onclick="SCAI.selectSquadType('friends',this)">👯<br>Friends</div>
        <div class="sc-squad-type" onclick="SCAI.selectSquadType('family',this)">👨‍👩‍👧<br>Family</div>
        <div class="sc-squad-type" onclick="SCAI.selectSquadType('occasion',this)">🎉<br>Occasion</div>
      </div>
      <div class="sc-link-row">
        <input id="sc-link-input" class="sc-link-inp" readonly value="">
        <button class="sc-copy-btn" onclick="SCAI.copyLink()">Copy</button>
      </div>
      <button class="sc-start-squad-btn" onclick="SCAI.startSquad()">Start Squad Shopping →</button>
    </div>
  </div>
</div>

<!-- VOICE OVERLAY -->
<div id="sc-voice-overlay" style="display:none">
  <div class="sc-vo-ripple"></div>
  <div class="sc-vo-ripple" style="animation-delay:.35s"></div>
  <div class="sc-vo-icon">🎙️</div>
  <div class="sc-vo-label">Listening…</div>
  <div class="sc-vo-transcript" id="sc-voice-transcript"></div>
  <button class="sc-vo-stop" onclick="SCAI.stopVoice()">Stop</button>
</div>
`);

/* ══════════════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════════════ */
const S=document.createElement('style');
S.textContent=`
/* ─ SIDEBAR SHELL ─ */
#sc-sidebar{
  position:fixed; top:0; right:0; bottom:0;
  width:320px;
  display:flex; flex-direction:column;
  z-index:1000;
  transform:translateX(105%);
  transition:transform .4s cubic-bezier(.4,0,.2,1);
  font-family:-apple-system,BlinkMacSystemFont,'DM Sans',sans-serif;
  box-shadow:-16px 0 60px rgba(0,0,0,.35);
  border-left:1px solid rgba(255,255,255,.06);
}
#sc-sidebar.open{transform:translateX(0);}
body.sc-open{padding-right:320px;transition:padding-right .4s cubic-bezier(.4,0,.2,1);}

/* ─ AVATAR PANEL ─ */
.sc-avatar-panel{
  position:relative;
  height:260px; flex-shrink:0;
  background:linear-gradient(160deg,#0d2a1f 0%,#051208 100%);
  display:flex; flex-direction:column;
  align-items:center; justify-content:flex-end;
  overflow:hidden;
}
.sc-avatar-bg{
  position:absolute; inset:0;
  background:radial-gradient(ellipse at 50% 110%, rgba(0,200,150,.2) 0%, transparent 65%);
  pointer-events:none;
}
/* subtle ambient particles */
.sc-avatar-panel::before{
  content:'';
  position:absolute; inset:0;
  background:
    radial-gradient(2px 2px at 30% 20%, rgba(0,200,150,.3), transparent),
    radial-gradient(2px 2px at 70% 30%, rgba(0,200,150,.2), transparent),
    radial-gradient(2px 2px at 20% 70%, rgba(0,200,150,.15), transparent),
    radial-gradient(2px 2px at 80% 60%, rgba(0,200,150,.2), transparent);
  animation:sc-float 6s ease-in-out infinite alternate;
  pointer-events:none;
}
@keyframes sc-float{0%{opacity:.4;transform:translateY(0)}100%{opacity:1;transform:translateY(-6px)}}

#sc-avatar-svg{
  width:180px; height:auto;
  position:relative; z-index:2;
  filter:drop-shadow(0 8px 24px rgba(0,0,0,.5));
  animation:sc-breathe 4s ease-in-out infinite;
}
@keyframes sc-breathe{
  0%,100%{transform:translateY(0) scale(1);}
  50%{transform:translateY(-4px) scale(1.005);}
}
#sc-eyes-group{
  transform-origin:100px 70px;
  transition:transform .08s;
}

.sc-avatar-nameplate{
  position:relative; z-index:2;
  text-align:center; padding:.6rem .5rem .25rem;
  width:100%;
}
.sc-ava-name{
  color:#fff; font-weight:800; font-size:1rem; letter-spacing:-.3px;
  display:flex; align-items:center; justify-content:center; gap:.4rem;
}
.sc-ava-dot{
  font-size:.45rem; color:#4ade80;
  animation:sc-pulse 2s infinite;
}
@keyframes sc-pulse{0%,100%{opacity:1}50%{opacity:.3}}
.sc-ava-title{
  color:rgba(255,255,255,.45); font-size:.7rem;
  margin-top:.1rem; letter-spacing:.2px;
}

/* wave visualiser */
.sc-wave-wrap{
  position:absolute; bottom:.9rem; left:50%; transform:translateX(-50%);
  display:flex; gap:3px; align-items:center; height:20px;
  transition:opacity .3s; z-index:3;
}
.sc-wave-bar{
  width:3px; height:8px; background:#00C896; border-radius:2px;
  animation:sc-wave .6s ease-in-out infinite alternate;
}
.sc-wave-bar:nth-child(1){animation-delay:0s;height:6px}
.sc-wave-bar:nth-child(2){animation-delay:.1s;height:14px}
.sc-wave-bar:nth-child(3){animation-delay:.2s;height:18px}
.sc-wave-bar:nth-child(4){animation-delay:.1s;height:14px}
.sc-wave-bar:nth-child(5){animation-delay:0s;height:6px}
@keyframes sc-wave{0%{height:4px;opacity:.5}100%{height:100%;opacity:1}}

.sc-close-btn{
  position:absolute; top:.7rem; right:.7rem;
  background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.15);
  color:rgba(255,255,255,.7); width:26px; height:26px;
  border-radius:8px; cursor:pointer; font-size:.75rem;
  display:flex; align-items:center; justify-content:center;
  transition:all .2s; z-index:4;
}
.sc-close-btn:hover{background:rgba(255,255,255,.2);color:#fff;}

/* ─ CONVERSATION PANEL ─ */
.sc-conv-panel{
  flex:1; background:#0d1117;
  display:flex; flex-direction:column; overflow:hidden;
  border-top:1px solid rgba(255,255,255,.06);
}

/* mode bar */
.sc-mode-bar{
  display:flex; gap:.25rem; padding:.55rem .7rem;
  border-bottom:1px solid rgba(255,255,255,.05); flex-shrink:0;
}
.sc-mode{
  flex:1; padding:.32rem .2rem; border-radius:7px;
  font-size:.67rem; font-weight:600; cursor:pointer; font-family:inherit;
  background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.07);
  color:rgba(255,255,255,.45); transition:all .2s;
}
.sc-mode:hover{background:rgba(255,255,255,.1);color:rgba(255,255,255,.8);}
.sc-mode.active{background:#00C896;border-color:#00C896;color:#fff;}

/* basket bar */
.sc-basket-bar{
  display:flex; align-items:center; justify-content:space-between;
  padding:.4rem .8rem; background:rgba(0,200,150,.08);
  border-bottom:1px solid rgba(0,200,150,.15); flex-shrink:0;
  font-size:.73rem; color:#4ade80; font-weight:600;
}
.sc-basket-view-btn{
  background:rgba(0,200,150,.2); border:1px solid rgba(0,200,150,.3);
  color:#00C896; padding:.2rem .6rem; border-radius:6px;
  font-size:.68rem; font-weight:700; cursor:pointer; font-family:inherit;
}
#sc-basket-panel{
  background:#111827; flex-shrink:0;
  border-bottom:1px solid rgba(255,255,255,.06); max-height:180px; overflow-y:auto;
  padding:.5rem;
}
.sc-bi{
  display:flex; align-items:center; gap:.5rem;
  background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.06);
  border-radius:8px; padding:.45rem .6rem; margin-bottom:.3rem;
}
.sc-bi-name{font-size:.73rem;color:#e2e8f0;font-weight:600;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.sc-bi-price{font-size:.75rem;color:#00C896;font-weight:800;flex-shrink:0;}
.sc-bi-rm{background:none;border:none;color:rgba(255,255,255,.3);cursor:pointer;font-size:.75rem;flex-shrink:0;padding:.1rem;}
.sc-bi-rm:hover{color:#FF6B6B;}
.sc-checkout-all{
  display:block;width:calc(100% - 1rem);margin:.4rem .5rem .6rem;
  background:linear-gradient(135deg,#00C896,#00A07A);
  border:none;color:#fff;padding:.65rem;border-radius:9px;
  font-size:.82rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;
}
.sc-checkout-all:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,200,150,.3);}

/* messages */
.sc-msgs{
  flex:1; overflow-y:auto; padding:.75rem;
  display:flex; flex-direction:column; gap:.55rem; scroll-behavior:smooth;
}
.sc-msgs::-webkit-scrollbar{width:3px;}
.sc-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px;}

.sc-msg{display:flex;gap:.35rem;animation:sc-up .2s ease;}
.sc-msg.user{flex-direction:row-reverse;}
@keyframes sc-up{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.sc-bubble{
  max-width:85%; padding:.55rem .8rem; border-radius:12px;
  font-size:.8rem; line-height:1.55; word-break:break-word;
}
.sc-msg:not(.user) .sc-bubble{
  background:#1e2638; color:#e2e8f0;
  border:1px solid rgba(255,255,255,.07); border-radius:12px 12px 12px 3px;
}
.sc-msg.user .sc-bubble{
  background:linear-gradient(135deg,#00C896,#00A07A); color:#fff;
  border-radius:12px 12px 3px 12px;
}
.sc-msg.squad .sc-bubble{
  background:rgba(102,126,234,.2);color:#c4b5fd;
  border:1px solid rgba(102,126,234,.2);border-radius:12px 12px 12px 3px;
}
.sc-typing{
  display:flex;gap:.25rem;align-items:center;
  padding:.45rem .7rem;background:#1e2638;border-radius:10px;
  width:fit-content;border:1px solid rgba(255,255,255,.07);
}
.sc-td{width:5px;height:5px;background:rgba(255,255,255,.35);border-radius:50%;animation:sc-bounce .8s infinite;}
.sc-td:nth-child(2){animation-delay:.15s}.sc-td:nth-child(3){animation-delay:.3s}
@keyframes sc-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}

/* product grid */
.sc-store-section{width:100%;margin-top:.2rem;}
.sc-store-lbl{
  display:flex;align-items:center;gap:.35rem;
  font-size:.67rem;font-weight:700;margin-bottom:.3rem;
  padding:.25rem .55rem;border-radius:5px;border:1px solid;width:fit-content;
}
.sc-prod-grid{display:flex;flex-direction:column;gap:.3rem;margin-bottom:.6rem;}
.sc-prod-row{
  display:flex;align-items:center;gap:.5rem;
  background:#1a2035;border:1px solid rgba(255,255,255,.07);
  border-radius:9px;padding:.5rem .65rem;cursor:pointer;transition:all .2s;
  position:relative;
}
.sc-prod-row:hover{border-color:#00C896;background:rgba(0,200,150,.07);}
.sc-prod-row.in-basket{border-color:rgba(0,200,150,.4);background:rgba(0,200,150,.08);}
.sc-prod-emoji{font-size:1.2rem;flex-shrink:0;width:28px;text-align:center;}
.sc-prod-info{flex:1;min-width:0;}
.sc-prod-title{font-size:.72rem;color:#e2e8f0;font-weight:600;line-height:1.3;}
.sc-prod-meta{display:flex;gap:.35rem;align-items:center;margin-top:.15rem;flex-wrap:wrap;}
.sc-prod-price{font-size:.78rem;color:#00C896;font-weight:800;}
.sc-prod-rating{font-size:.62rem;color:#F59E0B;}
.sc-prod-cash{font-size:.6rem;background:rgba(0,200,150,.15);color:#00C896;padding:.08rem .32rem;border-radius:4px;font-weight:700;}
.sc-prod-badge{font-size:.58rem;background:rgba(255,107,107,.15);color:#FF6B6B;padding:.08rem .32rem;border-radius:4px;font-weight:700;}
.sc-add-btn{
  background:rgba(0,200,150,.15);border:1px solid rgba(0,200,150,.3);
  color:#00C896;padding:.25rem .5rem;border-radius:6px;
  font-size:.65rem;font-weight:700;cursor:pointer;flex-shrink:0;
  transition:all .2s;font-family:inherit;white-space:nowrap;
}
.sc-add-btn:hover,.sc-add-btn.added{background:#00C896;color:#fff;}

/* quick replies */
.sc-qr{
  display:flex;flex-wrap:wrap;gap:.28rem;
  padding:.4rem .7rem;border-top:1px solid rgba(255,255,255,.05);flex-shrink:0;
  min-height:32px;
}
.sc-qr-btn{
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.6);padding:.24rem .6rem;border-radius:50px;
  font-size:.67rem;cursor:pointer;transition:all .2s;
  font-family:inherit;font-weight:500;white-space:nowrap;
}
.sc-qr-btn:hover{background:rgba(0,200,150,.15);border-color:#00C896;color:#00C896;}

/* input row */
.sc-input-row{
  display:flex;gap:.35rem;padding:.65rem .7rem;
  border-top:1px solid rgba(255,255,255,.06);background:#0d1117;flex-shrink:0;
}
.sc-mic-btn{
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.6);width:36px;height:36px;border-radius:9px;
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:all .25s;flex-shrink:0;
}
.sc-mic-btn:hover{background:rgba(255,107,107,.15);border-color:rgba(255,107,107,.4);color:#FF6B6B;}
.sc-mic-btn.listening{background:rgba(255,107,107,.25);border-color:#FF6B6B;color:#FF6B6B;animation:sc-mic-p 1s infinite;}
@keyframes sc-mic-p{0%,100%{box-shadow:0 0 0 0 rgba(255,107,107,.4)}50%{box-shadow:0 0 0 6px rgba(255,107,107,0)}}
.sc-input{
  flex:1;background:#1a2035;border:1.5px solid rgba(255,255,255,.1);
  color:#e2e8f0;padding:.52rem .8rem;border-radius:9px;
  font-size:.8rem;outline:none;font-family:inherit;transition:border-color .2s;
}
.sc-input:focus{border-color:#00C896;}
.sc-input::placeholder{color:rgba(255,255,255,.25);}
.sc-send-btn{
  background:#00C896;border:none;color:#fff;
  width:36px;height:36px;border-radius:9px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;
}
.sc-send-btn:hover{background:#00A07A;}

/* ─ FAB ─ */
#sc-fab{
  position:fixed;bottom:20px;right:20px;
  background:#161b27;border:1.5px solid rgba(0,200,150,.35);
  color:#fff;padding:.45rem .9rem .45rem .5rem;border-radius:50px;
  cursor:pointer;z-index:999;
  display:flex;align-items:center;gap:.55rem;
  font-family:inherit;box-shadow:0 8px 28px rgba(0,0,0,.45);
  transition:all .35s cubic-bezier(.4,0,.2,1);
}
#sc-fab:hover{border-color:#00C896;box-shadow:0 8px 32px rgba(0,200,150,.25);transform:translateY(-2px);}
body.sc-open #sc-fab{right:340px;}
.sc-fab-ava{
  width:38px;height:38px;border-radius:50%;overflow:hidden;
  background:linear-gradient(135deg,#0d2a1f,#051208);
  border:2px solid rgba(0,200,150,.4);flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
}
.sc-fab-text{display:flex;flex-direction:column;line-height:1.2;}
.sc-fab-name{font-size:.82rem;font-weight:800;color:#fff;}
.sc-fab-sub{font-size:.63rem;color:rgba(255,255,255,.45);}
.sc-fab-badge{
  background:#FF6B6B;color:#fff;width:16px;height:16px;
  border-radius:50%;font-size:.6rem;font-weight:800;
  display:flex;align-items:center;justify-content:center;
  position:absolute;top:0;right:0;transform:translate(30%,-30%);
}

/* ─ SQUAD MODAL ─ */
.sc-modal-ov{
  display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);
  z-index:1100;align-items:center;justify-content:center;backdrop-filter:blur(6px);
}
.sc-modal-ov.open{display:flex;}
.sc-modal{
  background:#161b27;border:1px solid rgba(255,255,255,.1);
  border-radius:20px;width:90%;max-width:400px;overflow:hidden;
  box-shadow:0 24px 64px rgba(0,0,0,.5);
}
.sc-modal-head{
  padding:1.1rem 1.4rem;border-bottom:1px solid rgba(255,255,255,.07);
  display:flex;justify-content:space-between;align-items:center;
}
.sc-modal-head h3{color:#e2e8f0;font-size:.95rem;font-weight:700;}
.sc-modal-x{background:rgba(255,255,255,.08);border:none;color:rgba(255,255,255,.5);width:26px;height:26px;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.8rem;}
.sc-modal-body{padding:1.25rem;}
.sc-modal-body p{color:rgba(255,255,255,.5);font-size:.82rem;margin-bottom:1rem;}
.sc-squad-types{display:grid;grid-template-columns:repeat(4,1fr);gap:.5rem;margin-bottom:1rem;}
.sc-squad-type{background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);border-radius:10px;padding:.7rem .4rem;text-align:center;font-size:.72rem;color:rgba(255,255,255,.55);cursor:pointer;transition:all .2s;font-weight:600;line-height:1.6;}
.sc-squad-type.active{background:rgba(102,126,234,.15);border-color:#667eea;color:#a5b4fc;}
.sc-link-row{display:flex;gap:.4rem;margin-bottom:.85rem;}
.sc-link-inp{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:7px;color:#a5b4fc;padding:.5rem .8rem;font-size:.76rem;outline:none;font-family:inherit;}
.sc-copy-btn{background:rgba(102,126,234,.2);border:1px solid rgba(102,126,234,.3);color:#a5b4fc;padding:.45rem .8rem;border-radius:7px;cursor:pointer;font-size:.76rem;font-weight:700;font-family:inherit;transition:all .2s;}
.sc-start-squad-btn{width:100%;background:linear-gradient(135deg,#667eea,#764ba2);border:none;color:#fff;padding:.75rem;border-radius:10px;font-size:.88rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;}
.sc-start-squad-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(102,126,234,.4);}

/* ─ VOICE OVERLAY ─ */
#sc-voice-overlay{
  position:fixed;inset:0;background:rgba(13,17,23,.96);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.85rem;
  z-index:1200;
}
.sc-vo-ripple{
  position:absolute;width:160px;height:160px;border-radius:50%;
  border:2px solid rgba(255,107,107,.3);
  animation:sc-ripple 2s ease-out infinite;
}
@keyframes sc-ripple{0%{transform:scale(.7);opacity:1}100%{transform:scale(2);opacity:0}}
.sc-vo-icon{font-size:3.5rem;position:relative;z-index:1;animation:sc-bob 1s ease-in-out infinite;}
@keyframes sc-bob{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.sc-vo-label{color:#FF6B6B;font-weight:700;font-size:1rem;position:relative;z-index:1;}
.sc-vo-transcript{color:rgba(255,255,255,.65);font-size:.88rem;text-align:center;max-width:260px;min-height:2rem;font-style:italic;position:relative;z-index:1;}
.sc-vo-stop{background:rgba(255,107,107,.2);border:1.5px solid rgba(255,107,107,.4);color:#FF6B6B;padding:.55rem 1.5rem;border-radius:50px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;position:relative;z-index:1;}
.sc-vo-stop:hover{background:rgba(255,107,107,.4);}

@media(max-width:768px){
  #sc-sidebar{width:100%;}
  body.sc-open{padding-right:0;}
  body.sc-open #sc-fab{display:none;}
}
`;
document.head.appendChild(S);

/* ══════════════════════════════════════════════════════════
   QUERY PARSER + REPLY ENGINE
══════════════════════════════════════════════════════════ */
function parseQuery(msg){
  const m=msg.toLowerCase();
  let cat=null,maxP=null,minP=null,store=null;
  if(/tshirt|t-shirt|tee|t shirt/.test(m)) cat='tshirt';
  else if(/shirt|polo/.test(m)) cat='shirt';
  else if(/jean|denim|trouser|pant/.test(m)) cat='jeans';
  else if(/shoe|trainer|sneaker|footwear/.test(m)) cat='shoes';
  else if(/headphone|earphone|earbud|airpod/.test(m)) cat='headphones';
  else if(/laptop|notebook|macbook/.test(m)) cat='laptop';
  else if(/dress|skirt/.test(m)) cat='dress';
  const u=m.match(/(?:under|below|less than|upto|up to|max|within)\s*£?\s*(\d+)/);
  if(u) maxP=parseFloat(u[1]);
  const b=m.match(/between\s*£?\s*(\d+)\s*(?:and|to|-)\s*£?\s*(\d+)/);
  if(b){minP=parseFloat(b[1]);maxP=parseFloat(b[2]);}
  if(/amazon/.test(m)) store='Amazon';
  else if(/ebay/.test(m)) store='eBay';
  else if(/flipkart/.test(m)) store='Flipkart';
  return{cat,maxP,minP,store};
}

function fetchProducts({cat,maxP,minP,store}){
  if(!cat) return null;
  let p=[...(MOCK_PRODUCTS[cat]||[])];
  if(maxP) p=p.filter(x=>x.price<=maxP);
  if(minP) p=p.filter(x=>x.price>=minP);
  if(store) p=p.filter(x=>x.store===store);
  return p;
}

function getReply(msg){
  const m=msg.toLowerCase();
  const parsed=parseQuery(msg);
  if(parsed.cat){
    const prods=fetchProducts(parsed);
    if(!prods||!prods.length) return{text:`I couldn't find anything${parsed.maxP?` under £${parsed.maxP}`:''}. Try a wider budget?`,qr:['Under £50','Under £100','All stores']};
    state.lastProducts=prods;
    const stores=[...new Set(prods.map(p=>p.store))].length;
    return{
      text:`Found ${prods.length} results across ${stores} stores — all with cashback! Tap any to add to basket.`,
      products:prods,
      qr:['Sort by price','Only Amazon','Only eBay','Add cheapest']
    };
  }
  if(/hello|hi|hey|namaste|hiya/.test(m)) return{text:"Lovely to meet you! I'm Aria, your personal shopping guide. Just tell me what you're looking for — or hit the mic and talk to me! I'll search Amazon, eBay and Flipkart all at once.",qr:['T-shirts under £20','Headphones under £50','Laptops under £600','Best deals today']};
  if(/deal|offer|discount|best/.test(m)) return{text:"Today's hottest cashback rates! Flipkart is leading at 5%, Amazon at 4.5%, eBay at 3.2%. What shall we shop for?",qr:['T-shirts','Laptops','Headphones','Shoes']};
  if(/sort.*price|cheapest|lowest/.test(m)&&state.lastProducts){
    const s=[...state.lastProducts].sort((a,b)=>a.price-b.price);
    state.lastProducts=s;
    return{text:"Sorted from lowest price — best value at the top!",products:s,qr:['Only Amazon','Only eBay','Add cheapest']};
  }
  if(/only amazon/.test(m)&&state.lastProducts) return{text:"Showing Amazon only!",products:state.lastProducts.filter(p=>p.store==='Amazon')||state.lastProducts,qr:['All stores','Only eBay','Only Flipkart']};
  if(/only ebay/.test(m)&&state.lastProducts) return{text:"eBay picks — great deals here!",products:state.lastProducts.filter(p=>p.store==='eBay')||state.lastProducts,qr:['All stores','Only Amazon','Only Flipkart']};
  if(/only flipkart/.test(m)&&state.lastProducts) return{text:"Flipkart results — and they have 5% cashback today!",products:state.lastProducts.filter(p=>p.store==='Flipkart')||state.lastProducts,qr:['All stores','Only Amazon','Only eBay']};
  if(/add.*cheapest|cheapest.*add/.test(m)&&state.lastProducts){
    const c=[...state.lastProducts].sort((a,b)=>a.price-b.price)[0];
    if(c){SCAI.addToBasket(c);return{text:`Done! Added the cheapest one — ${c.title} at £${c.price} from ${c.store}. Great value!`,qr:['View basket','Keep shopping','Checkout all']};}
  }
  if(/basket|cart|checkout/.test(m)){
    if(!basket.length) return{text:"Your basket is empty! Tell me what you need and I'll find the best deals across all stores.",qr:['T-shirts','Headphones','Laptops']};
    return{text:`You have ${basket.length} item${basket.length>1?'s':''} in your basket totalling £${basketTotal().toFixed(2)}. Ready to checkout?`,qr:['Checkout all','Keep shopping']};
  }
  if(/squad|couple|partner|friend/.test(m)) return{text:"Squad shopping is so much fun! You can shop in real-time with your partner, friends or family — vote on items and share baskets. Who's joining you today?",qr:['Start couple squad','Friends squad','Family squad']};
  if(/try.?on|virtual|fit/.test(m)) return{text:"Our AI virtual try-on is brilliant! Upload your photo, pick a garment and Claude Vision analyses the fit for you. Want me to take you there?",qr:['Open Try-On','Show me dresses','Show me shirts']};
  if(/open try.?on/.test(m)){window.location.href='virtual-assistant.html';return{text:"Opening virtual try-on for you now!",[]};}
  return{text:`I'm searching for "${msg}" across Amazon, eBay and Flipkart! Try being specific — like "blue t-shirt under £30" or "laptop under £500".`,qr:['T-shirts under £30','Jeans under £50','Headphones under £100']};
}

/* ══════════════════════════════════════════════════════════
   BASKET
══════════════════════════════════════════════════════════ */
function basketTotal(){return basket.reduce((s,i)=>s+i.price,0);}
function updateBasketUI(){
  const n=basket.length,total=basketTotal().toFixed(2);
  const bar=document.getElementById('sc-basket-bar');
  if(n>0){
    bar.style.display='flex';
    document.getElementById('sc-basket-label').textContent=`🛒 ${n} item${n>1?'s':''} · £${total}`;
  } else { bar.style.display='none'; document.getElementById('sc-basket-panel').style.display='none'; }
  document.getElementById('sc-basket-items').innerHTML=basket.map((it,i)=>`
    <div class="sc-bi">
      <span>${it.img}</span>
      <span class="sc-bi-name">${it.title}</span>
      <span class="sc-bi-price">£${it.price.toFixed(2)}</span>
      <button class="sc-bi-rm" onclick="SCAI.removeFromBasket(${i})">✕</button>
    </div>`).join('');
  document.querySelectorAll('.sc-prod-row').forEach(row=>{
    const inB=basket.some(i=>i.id===row.dataset.pid);
    row.classList.toggle('in-basket',inB);
    const btn=row.querySelector('.sc-add-btn');
    if(btn){btn.textContent=inB?'✓ Added':'+ Add';btn.classList.toggle('added',inB);}
  });
}

/* ══════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════ */
const state={
  open:false, mode:'shop', greeted:false,
  squadType:'couple', squadMembers:[], squadActive:false,
  lastProducts:null, basketVisible:false,
};

/* ══════════════════════════════════════════════════════════
   CORE API
══════════════════════════════════════════════════════════ */
window.SCAI={

  toggle(){state.open?this.close():this.open_();},

  open_(){
    state.open=true;
    document.getElementById('sc-sidebar').classList.add('open');
    document.body.classList.add('sc-open');
    if(!state.greeted){
      state.greeted=true;
      setTimeout(()=>{
        const greeting="Hi there! Welcome to SmartCash! I'm Aria, your personal shopping assistant. I can search Amazon, eBay and Flipkart all at once, find you the best cashback deals, and even help you try on clothes virtually. What are we shopping for today?";
        this._addAI(greeting,['T-shirts under £20','Best deals today','Virtual try-on','Start squad shopping']);
        this._setStatus('Greeting you…');
        speak(greeting,()=>this._setStatus('Here for you ✨'));
      },400);
    }
  },

  close(){
    state.open=false;
    document.getElementById('sc-sidebar').classList.remove('open');
    document.body.classList.remove('sc-open');
    synth&&synth.cancel();
    stopLipSync();
    this._setStatus('SmartCash Assistant');
  },

  _setStatus(txt){
    const el=document.getElementById('sc-ava-status');
    if(el) el.textContent=txt;
  },

  setMode(mode,el){
    state.mode=mode;
    document.querySelectorAll('.sc-mode').forEach(b=>b.classList.remove('active'));
    el.classList.add('active');
    const msgs={
      shop:"Shopping mode! Tell me what you need — or tap the mic and just say it!",
      deals:"Today's best cashback: Flipkart 5%, Amazon 4.5%, eBay 3.2%. What shall we find?",
      squad:"Squad mode! Shop with your partner, friends or family in real-time. Who's joining?",
      price:"Price tracker mode! Tell me any product and I'll show you price history plus my AI buy recommendation.",
    };
    const qrs={
      shop:['T-shirts','Jeans','Shoes','Headphones','Laptops'],
      deals:['Amazon deals','eBay deals','Flipkart deals'],
      squad:['Start couple squad','Friends squad','Family squad'],
      price:['Track Sony XM5','Track AirPods','Set price alert'],
    };
    this._addAI(msgs[mode],qrs[mode]);
    speak(msgs[mode]);
  },

  async send(){
    const inp=document.getElementById('sc-input');
    const msg=inp.value.trim();
    if(!msg) return;
    inp.value='';
    this._addUser(msg);
    this._setStatus('Thinking…');
    this._showTyping();
    // show wave while thinking
    const ww=document.getElementById('sc-wave-wrap');
    if(ww) ww.style.opacity='0.5';
    await new Promise(r=>setTimeout(r,500+Math.random()*400));
    this._hideTyping();
    const reply=getReply(msg);
    this._addAI(reply.text,reply.qr,reply.products);
    if(ww) ww.style.opacity='1';
    speak(reply.text,()=>{
      if(ww) ww.style.opacity='0';
      this._setStatus('Here for you ✨');
    });
    this._setStatus('Aria is speaking…');
  },

  _addUser(text){
    const m=document.getElementById('sc-msgs');
    const d=document.createElement('div');
    d.className='sc-msg user';
    d.innerHTML=`<div class="sc-bubble">${text}</div>`;
    m.appendChild(d); m.scrollTop=m.scrollHeight;
  },

  _addAI(text,qrs,products){
    const msgs=document.getElementById('sc-msgs');
    const d=document.createElement('div');
    d.className='sc-msg';
    d.innerHTML=`<div class="sc-bubble">${text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>')}</div>`;
    msgs.appendChild(d);

    if(products&&products.length){
      const groups={};
      products.forEach(p=>{ if(!groups[p.store]) groups[p.store]=[]; groups[p.store].push(p); });
      const wrap=document.createElement('div');
      wrap.style.cssText='width:100%;animation:sc-up .25s ease';
      Object.entries(groups).forEach(([sn,items])=>{
        const sc=STORE_COLORS[sn]||{bg:'rgba(255,255,255,.05)',border:'rgba(255,255,255,.1)',text:'#e2e8f0'};
        const icon=sn==='Amazon'?'📦':sn==='eBay'?'🔵':'🛒';
        const cb=sn==='Amazon'?'4.5':sn==='eBay'?'3.2':'5.0';
        const sec=document.createElement('div');
        sec.innerHTML=`
          <div class="sc-store-lbl" style="background:${sc.bg};border-color:${sc.border};color:${sc.text}">
            ${icon} ${sn} <span style="opacity:.6;font-weight:400">${cb}% cashback</span>
          </div>
          <div class="sc-prod-grid">
            ${items.map(p=>`
              <div class="sc-prod-row${basket.some(b=>b.id===p.id)?' in-basket':''}" data-pid="${p.id}">
                <span class="sc-prod-emoji">${p.img}</span>
                <div class="sc-prod-info">
                  <div class="sc-prod-title">${p.title}</div>
                  <div class="sc-prod-meta">
                    <span class="sc-prod-price">£${p.price.toFixed(2)}</span>
                    <span class="sc-prod-rating">★${p.rating}</span>
                    <span class="sc-prod-cash">${p.cashback}% back</span>
                    ${p.badge?`<span class="sc-prod-badge">${p.badge}</span>`:''}
                  </div>
                </div>
                <button class="sc-add-btn${basket.some(b=>b.id===p.id)?' added':''}"
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
    const qrEl=document.getElementById('sc-qr');
    qrEl.innerHTML='';
    if(qrs&&qrs.length){
      qrs.forEach(q=>{
        const btn=document.createElement('button');
        btn.className='sc-qr-btn'; btn.textContent=q;
        btn.onclick=()=>{document.getElementById('sc-input').value=q;SCAI.send();};
        qrEl.appendChild(btn);
      });
    }
  },

  _addSquad(text){
    const m=document.getElementById('sc-msgs');
    const d=document.createElement('div');
    d.className='sc-msg squad';
    d.innerHTML=`<div class="sc-bubble">${text}</div>`;
    m.appendChild(d); m.scrollTop=m.scrollHeight;
  },

  _showTyping(){
    const m=document.getElementById('sc-msgs');
    const t=document.createElement('div');
    t.id='sc-typing';t.className='sc-msg';
    t.innerHTML='<div class="sc-typing"><div class="sc-td"></div><div class="sc-td"></div><div class="sc-td"></div></div>';
    m.appendChild(t); m.scrollTop=m.scrollHeight;
  },
  _hideTyping(){document.getElementById('sc-typing')?.remove();},

  /* BASKET */
  addToBasket(p){
    if(basket.some(i=>i.id===p.id)) return;
    basket.push(p); updateBasketUI();
    if(!state.basketVisible){
      state.basketVisible=true;
      document.getElementById('sc-basket-panel').style.display='block';
    }
    document.querySelectorAll(`[data-pid="${p.id}"]`).forEach(row=>{
      row.classList.add('in-basket');
      const btn=row.querySelector('.sc-add-btn');
      if(btn){btn.textContent='✓ Added';btn.classList.add('added');}
    });
    const resp=`Added ${p.title} to your basket! It's £${p.price.toFixed(2)} with ${p.cashback}% cashback from ${p.store}. Great choice!`;
    this._addAI(`✅ **${p.title}** added! (${p.cashback}% cashback)`,[]);
    speak(resp);
    this._setStatus('Item added!');
    setTimeout(()=>this._setStatus('Here for you ✨'),3000);
  },

  removeFromBasket(i){basket.splice(i,1);updateBasketUI();},

  toggleBasket(){
    state.basketVisible=!state.basketVisible;
    document.getElementById('sc-basket-panel').style.display=state.basketVisible?'block':'none';
  },

  checkoutAll(){
    if(!basket.length){this._addAI("Your basket is empty — let's find something!",['T-shirts','Headphones']);return;}
    const stores=[...new Set(basket.map(i=>i.store))];
    const urls={Amazon:'https://amazon.co.uk',eBay:'https://ebay.co.uk',Flipkart:'https://flipkart.com'};
    const resp=`Opening ${stores.length} store${stores.length>1?'s':''} now with your cashback links. Happy shopping!`;
    this._addAI(`🚀 Opening ${stores.join(', ')} with cashback active!`,[]);
    speak(resp);
    stores.forEach((s,i)=>setTimeout(()=>window.open(urls[s]||'#','_blank'),i*700));
  },

  /* VOICE */
  toggleVoice(){
    if(!recognition) recognition=initVoice();
    if(!recognition){
      this._addAI("Voice search needs Chrome or Edge on desktop. You can type instead!",['T-shirts','Headphones']);
      speak("Voice search isn't available in this browser. Try typing instead!");
      return;
    }
    if(isListening){recognition.stop();return;}
    recognition.start();
  },
  stopVoice(){if(recognition&&isListening)recognition.stop();},

  /* SQUAD */
  openSquadModal(){document.getElementById('sc-squad-modal').classList.add('open');this._genLink();},
  closeSquadModal(){document.getElementById('sc-squad-modal').classList.remove('open');},
  selectSquadType(t,el){
    state.squadType=t;
    document.querySelectorAll('.sc-squad-type').forEach(e=>e.classList.remove('active'));
    el.classList.add('active');this._genLink();
  },
  _genLink(){
    const c=Math.random().toString(36).substr(2,6).toUpperCase();
    document.getElementById('sc-link-input').value=`smartcash.co.uk/squad/${c}`;
  },
  copyLink(){
    navigator.clipboard?.writeText(document.getElementById('sc-link-input').value).catch(()=>{});
    const b=document.querySelector('.sc-copy-btn');
    b.textContent='Copied!';setTimeout(()=>b.textContent='Copy',2000);
  },
  inviteToSquad(){this.openSquadModal();},
  startSquad(){
    state.squadActive=true;this.closeSquadModal();
    const names={couple:'Partner',friends:'Best Friend',family:'Family Member',occasion:'Guest'};
    state.squadMembers=[{name:'You',online:true},{name:names[state.squadType]||'Friend',online:false}];
    const partner=names[state.squadType];
    if(!state.open) this.open_();
    setTimeout(()=>{
      state.squadMembers[1].online=true;
      this._addSquad(`${partner} just joined your squad! 🎉`);
      speak(`${partner} just joined your squad! You can now shop together.`);
      setTimeout(()=>this._addSquad("Ooh I love those! Can you add the striped one too? 👀"),2200);
    },2000);
  },
};

/* ══════════════════════════════════════════════════════════
   VOICE RECOGNITION INIT
══════════════════════════════════════════════════════════ */
function initVoice(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR) return null;
  const r=new SR();
  r.continuous=false; r.interimResults=true; r.lang='en-GB';
  r.onstart=()=>{
    isListening=true;
    document.getElementById('sc-mic').classList.add('listening');
    document.getElementById('sc-voice-overlay').style.display='flex';
    document.getElementById('sc-voice-transcript').textContent='';
  };
  r.onresult=(e)=>{
    const t=Array.from(e.results).map(r=>r[0].transcript).join('');
    document.getElementById('sc-voice-transcript').textContent=t;
    if(e.results[e.results.length-1].isFinal) document.getElementById('sc-input').value=t;
  };
  r.onend=()=>{
    isListening=false;
    document.getElementById('sc-mic').classList.remove('listening');
    document.getElementById('sc-voice-overlay').style.display='none';
    const v=document.getElementById('sc-input').value.trim();
    if(v) SCAI.send();
  };
  r.onerror=(e)=>{
    isListening=false;
    document.getElementById('sc-mic').classList.remove('listening');
    document.getElementById('sc-voice-overlay').style.display='none';
    if(e.error==='not-allowed') SCAI._addAI('Please allow microphone access in your browser settings.');
  };
  return r;
}

/* auto badge */
setTimeout(()=>{ if(!state.open) document.getElementById('sc-fab-badge').style.display='flex'; },4000);
/* keyboard shortcut */
document.addEventListener('keydown',e=>{ if((e.ctrlKey||e.metaKey)&&e.key==='/') SCAI.toggle(); });
/* wave sync with speaking */
setInterval(()=>{
  const ww=document.getElementById('sc-wave-wrap');
  if(!ww) return;
  ww.style.opacity=isSpeaking?'1':'0';
},200);

})();
