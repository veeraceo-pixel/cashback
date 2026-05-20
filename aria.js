/* ============================================================
   SmartCash — Aria v6
   Sonic avatar · Always-on voice · Full-page results · Squad
   ============================================================ */
(function(){

/* ─── PRODUCTS ─────────────────────────────────────── */
const PRODUCTS={
  tshirt:[
    {id:'t1',title:'Classic White Crew Neck Tee',price:12.99,store:'Amazon',rating:4.3,reviews:2841,img:'👕',cashback:4.5,badge:'Best Seller',url:'https://amazon.co.uk'},
    {id:'t2',title:'Premium Cotton Polo Shirt',price:18.50,store:'eBay',rating:4.1,reviews:924,img:'👔',cashback:3.2,badge:'',url:'https://ebay.co.uk'},
    {id:'t3',title:'Oversized Graphic Tee — Black',price:22.00,store:'Flipkart',rating:4.5,reviews:3120,img:'🖤',cashback:5.0,badge:'Hot 🔥',url:'https://flipkart.com'},
    {id:'t4',title:'Slim Fit V-Neck T-Shirt',price:9.99,store:'Amazon',rating:4.0,reviews:1560,img:'👕',cashback:4.5,badge:'',url:'https://amazon.co.uk'},
    {id:'t5',title:'Striped Breton Tee',price:24.99,store:'eBay',rating:4.6,reviews:780,img:'👕',cashback:3.2,badge:'Top Rated ⭐',url:'https://ebay.co.uk'},
    {id:'t6',title:'Organic Cotton Basic Tee',price:14.00,store:'Flipkart',rating:4.2,reviews:432,img:'🌿',cashback:5.0,badge:'Eco',url:'https://flipkart.com'},
    {id:'t7',title:'Pack of 3 Plain Tees',price:19.99,store:'Amazon',rating:4.4,reviews:5200,img:'👕',cashback:4.5,badge:'Value Pack',url:'https://amazon.co.uk'},
    {id:'t8',title:'Longline Drop Hem Tee',price:16.50,store:'eBay',rating:3.9,reviews:290,img:'👕',cashback:3.2,badge:'',url:'https://ebay.co.uk'},
  ],
  shirt:[
    {id:'s1',title:'Oxford Button-Down Shirt',price:29.99,store:'Amazon',rating:4.4,reviews:1820,img:'👔',cashback:4.5,badge:'Best Seller',url:'https://amazon.co.uk'},
    {id:'s2',title:'Slim Fit Checked Shirt',price:34.00,store:'eBay',rating:4.2,reviews:640,img:'🔲',cashback:3.2,badge:'',url:'https://ebay.co.uk'},
    {id:'s3',title:'Linen Summer Shirt',price:27.50,store:'Flipkart',rating:4.6,reviews:910,img:'🌿',cashback:5.0,badge:'Summer Pick',url:'https://flipkart.com'},
    {id:'s4',title:'Formal White Dress Shirt',price:22.99,store:'Amazon',rating:4.1,reviews:2100,img:'🤵',cashback:4.5,badge:'',url:'https://amazon.co.uk'},
  ],
  jeans:[
    {id:'j1',title:'Slim Fit Dark Wash Jeans',price:39.99,store:'Amazon',rating:4.3,reviews:3200,img:'👖',cashback:4.5,badge:'Best Seller',url:'https://amazon.co.uk'},
    {id:'j2',title:'Straight Leg Classic Jeans',price:45.00,store:'eBay',rating:4.5,reviews:1100,img:'👖',cashback:3.2,badge:'Top Rated ⭐',url:'https://ebay.co.uk'},
    {id:'j3',title:'Skinny Stretch Jeans',price:32.00,store:'Flipkart',rating:4.1,reviews:2800,img:'👖',cashback:5.0,badge:'',url:'https://flipkart.com'},
    {id:'j4',title:'High Waist Mom Jeans',price:28.00,store:'Flipkart',rating:4.6,reviews:4200,img:'👖',cashback:5.0,badge:'Hot 🔥',url:'https://flipkart.com'},
  ],
  headphones:[
    {id:'h1',title:'Sony WH-1000XM5 Wireless',price:279.00,store:'Amazon',rating:4.8,reviews:12400,img:'🎧',cashback:4.5,badge:'Best Overall',url:'https://amazon.co.uk'},
    {id:'h2',title:'AirPods Pro 2nd Gen',price:219.00,store:'eBay',rating:4.7,reviews:9800,img:'🎵',cashback:3.2,badge:'Top Rated ⭐',url:'https://ebay.co.uk'},
    {id:'h3',title:'Boat Rockerz 450 Pro',price:29.99,store:'Flipkart',rating:4.1,reviews:45000,img:'🎶',cashback:5.0,badge:'Budget Pick',url:'https://flipkart.com'},
    {id:'h4',title:'JBL Tune 510BT',price:44.99,store:'Amazon',rating:4.3,reviews:3200,img:'🎧',cashback:4.5,badge:'',url:'https://amazon.co.uk'},
    {id:'h5',title:'Bose QuietComfort 45',price:259.00,store:'eBay',rating:4.6,reviews:4100,img:'🎵',cashback:3.2,badge:'Premium',url:'https://ebay.co.uk'},
  ],
  laptop:[
    {id:'l1',title:'Apple MacBook Air M3',price:1099.00,store:'Amazon',rating:4.9,reviews:3200,img:'💻',cashback:4.5,badge:'Best Overall',url:'https://amazon.co.uk'},
    {id:'l2',title:'Dell Inspiron 15 i5',price:599.00,store:'eBay',rating:4.3,reviews:1800,img:'💼',cashback:3.2,badge:'Value Pick',url:'https://ebay.co.uk'},
    {id:'l3',title:'HP Pavilion 14',price:449.00,store:'Flipkart',rating:4.1,reviews:8900,img:'💻',cashback:5.0,badge:'Budget',url:'https://flipkart.com'},
    {id:'l4',title:'Lenovo IdeaPad 5',price:549.00,store:'Amazon',rating:4.4,reviews:2100,img:'💻',cashback:4.5,badge:'',url:'https://amazon.co.uk'},
    {id:'l5',title:'Asus ZenBook 14 OLED',price:799.00,store:'eBay',rating:4.6,reviews:920,img:'✨',cashback:3.2,badge:'Top Rated ⭐',url:'https://ebay.co.uk'},
  ],
  shoes:[
    {id:'sh1',title:'Nike Air Max 90',price:89.99,store:'Amazon',rating:4.7,reviews:8200,img:'👟',cashback:4.5,badge:'Best Seller',url:'https://amazon.co.uk'},
    {id:'sh2',title:'Adidas Stan Smith',price:75.00,store:'eBay',rating:4.5,reviews:3400,img:'⚪',cashback:3.2,badge:'Classic',url:'https://ebay.co.uk'},
    {id:'sh3',title:'Canvas Sneakers',price:29.99,store:'Flipkart',rating:4.2,reviews:1800,img:'👟',cashback:5.0,badge:'Budget Pick',url:'https://flipkart.com'},
    {id:'sh4',title:'Leather Oxford Shoes',price:64.99,store:'Amazon',rating:4.4,reviews:920,img:'👞',cashback:4.5,badge:'',url:'https://amazon.co.uk'},
  ],
  dress:[
    {id:'d1',title:'Floral Wrap Midi Dress',price:34.99,store:'Amazon',rating:4.4,reviews:2100,img:'👗',cashback:4.5,badge:'Best Seller',url:'https://amazon.co.uk'},
    {id:'d2',title:'Bodycon Evening Dress',price:42.00,store:'eBay',rating:4.2,reviews:680,img:'🖤',cashback:3.2,badge:'',url:'https://ebay.co.uk'},
    {id:'d3',title:'Summer Sundress Boho',price:22.99,store:'Flipkart',rating:4.5,reviews:3800,img:'🌺',cashback:5.0,badge:'Trending 🔥',url:'https://flipkart.com'},
    {id:'d4',title:'Linen Shirt Dress',price:38.00,store:'Amazon',rating:4.3,reviews:940,img:'👗',cashback:4.5,badge:'',url:'https://amazon.co.uk'},
    {id:'d5',title:'Cocktail Party Dress',price:55.00,store:'eBay',rating:4.6,reviews:420,img:'✨',cashback:3.2,badge:'Top Rated ⭐',url:'https://ebay.co.uk'},
  ],
};

const SCOL={Amazon:{bg:'#FFF8EC',border:'#FFD080',storeColor:'#FF9900'},eBay:{bg:'#EEF5FF',border:'#93C5FD',storeColor:'#0064d2'},Flipkart:{bg:'#F0F0FF',border:'#A5B4FC',storeColor:'#2874F0'}};
const basket=[];
let squadMembers=[];
let squadActive=false;

/* ─── VOICE ENGINE ─────────────────────────────────── */
const SYN=window.speechSynthesis;
let isSpk=false, lipT=null;
/* Continuous voice recognition — stays on */
let recog=null, voiceOn=false;

function getVoice(){
  const v=SYN.getVoices();
  return v.find(x=>x.name==='Samantha')||v.find(x=>x.name==='Karen')||v.find(x=>x.lang.startsWith('en-GB'))||v.find(x=>x.lang.startsWith('en'))||v[0];
}
SYN.onvoiceschanged=getVoice;

function speak(txt,cb){
  SYN.cancel();
  const c=txt.replace(/[^\x00-\x7F]/g,'').replace(/\*\*(.*?)\*\*/g,'$1').trim().substring(0,300);
  if(!c){cb&&cb();return;}
  const u=new SpeechSynthesisUtterance(c);
  u.voice=getVoice();u.rate=1.05;u.pitch=1.15;u.volume=1;
  isSpk=true;lipStart();waveOn(true);setStatus('Speaking…');
  u.onend=u.onerror=()=>{isSpk=false;lipStop();waveOn(false);setStatus(voiceOn?'🎤 Listening…':'Here for you ✨');cb&&cb();};
  SYN.speak(u);
}

function lipStart(){
  const m=document.getElementById('sonic-mouth');if(!m)return;
  const frames=[1,4,8,12,9,5,2,7,11,6,3];
  let i=0;clearInterval(lipT);
  lipT=setInterval(()=>{
    m.setAttribute('d',mPath(frames[i%frames.length]));
    /* blink */
    if(i%20===0){const ey=document.getElementById('sonic-eyes');if(ey){ey.style.transform='scaleY(0.05)';setTimeout(()=>{if(ey)ey.style.transform='scaleY(1)';},90);}}
    i++;
  },90);
}
function lipStop(){clearInterval(lipT);const m=document.getElementById('sonic-mouth');if(m)m.setAttribute('d',mPath(1));}
function mPath(o){const y=148,w=16,cx=100;return `M${cx-w} ${y} Q${cx} ${y-3} ${cx+w} ${y} Q${cx} ${y+o*1.1+1} ${cx-w} ${y} Z`;}
function waveOn(on){const w=document.getElementById('sonic-wave');if(w)w.style.opacity=on?'1':'0';}
function setStatus(t){const el=document.getElementById('sonic-status');if(el)el.textContent=t;}

/* ─── CONTINUOUS VOICE RECOGNITION ─────────────────── */
function buildRecognition(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR)return null;
  const r=new SR();
  r.continuous=true;   /* ← stays on always */
  r.interimResults=true;
  r.lang='en-GB';
  let finalBuf='',silenceTimer=null;

  r.onresult=(e)=>{
    let interim='',final='';
    for(let i=e.resultIndex;i<e.results.length;i++){
      if(e.results[i].isFinal) final+=e.results[i][0].transcript;
      else interim+=e.results[i][0].transcript;
    }
    if(final) finalBuf+=final+' ';
    const show=finalBuf+interim;
    /* show in input field live */
    const inp=document.getElementById('aria-text-input');
    if(inp) inp.value=show;
    inp.placeholder='🎤 '+show;
    /* show in mic indicator */
    const ind=document.getElementById('voice-indicator');
    if(ind) ind.textContent=show||'Listening…';
    /* auto-send after 1.5s silence */
    clearTimeout(silenceTimer);
    if(finalBuf.trim()){
      silenceTimer=setTimeout(()=>{
        const q=finalBuf.trim();finalBuf='';
        if(inp){inp.value='';inp.placeholder='Say anything or type…';}
        if(ind) ind.textContent='Listening…';
        if(q) Aria.ask(q);
      },1500);
    }
  };

  r.onend=()=>{
    /* auto-restart if voice mode still on */
    if(voiceOn){
      try{r.start();}catch(e){}
    } else {
      document.getElementById('aria-mic-btn').classList.remove('on');
      setStatus('Here for you ✨');
      const ind=document.getElementById('voice-indicator-wrap');
      if(ind) ind.style.display='none';
    }
  };
  r.onerror=(e)=>{
    if(e.error==='not-allowed'){voiceOn=false;setStatus('Mic blocked');return;}
    if(voiceOn){try{r.start();}catch(er){}}
  };
  return r;
}

/* ─── INJECT HTML ───────────────────────────────────── */
document.body.insertAdjacentHTML('beforeend',`

<div id="aria-widget">

  <!-- ══ LEFT COL — Sonic + chat ══ -->
  <div id="aria-col">

    <!-- Sonic portrait -->
    <div id="sonic-portrait">
      <div id="sonic-glow"></div>

      <!-- SONIC SVG — Blue hedgehog, iconic design -->
      <svg id="sonic-svg" viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sg-blue" cx="50%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#4FC3F7"/>
            <stop offset="50%" stop-color="#1565C0"/>
            <stop offset="100%" stop-color="#0D47A1"/>
          </radialGradient>
          <radialGradient id="sg-skin" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFCC80"/>
            <stop offset="100%" stop-color="#FF8F00"/>
          </radialGradient>
          <radialGradient id="sg-eye-l" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#1DE9B6"/>
            <stop offset="100%" stop-color="#00796B"/>
          </radialGradient>
          <filter id="sg-glow"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#1565C0" flood-opacity="0.6"/></filter>
          <filter id="sg-shadow"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="rgba(0,0,0,0.5)"/></filter>
        </defs>

        <!-- Body glow -->
        <ellipse cx="100" cy="220" rx="70" ry="25" fill="rgba(21,101,192,0.3)"/>

        <!-- ── SPINES ── (iconic sonic spines) -->
        <path d="M60 60 Q20 30 15 5 Q45 25 55 50Z" fill="#1565C0"/>
        <path d="M75 45 Q55 5 60 -10 Q80 15 78 42Z" fill="#1565C0"/>
        <path d="M95 38 Q90 0 100 -8 Q112 12 105 38Z" fill="#1565C0"/>
        <path d="M115 42 Q128 5 138 -5 Q140 20 122 44Z" fill="#1565C0"/>
        <path d="M132 55 Q158 18 172 10 Q165 38 140 58Z" fill="#1565C0"/>

        <!-- ── BODY ── -->
        <ellipse cx="100" cy="185" rx="52" ry="48" fill="url(#sg-blue)" filter="url(#sg-shadow)"/>
        <!-- Belly patch -->
        <ellipse cx="100" cy="192" rx="30" ry="26" fill="url(#sg-skin)"/>
        <!-- Body highlight -->
        <ellipse cx="82" cy="165" rx="14" ry="10" fill="rgba(255,255,255,0.15)" transform="rotate(-20,82,165)"/>

        <!-- ── HEAD ── -->
        <ellipse cx="100" cy="98" rx="58" ry="60" fill="url(#sg-blue)" filter="url(#sg-glow)"/>
        <!-- Head highlight -->
        <ellipse cx="78" cy="72" rx="18" ry="12" fill="rgba(255,255,255,0.12)" transform="rotate(-25,78,72)"/>

        <!-- ── EARS ── -->
        <path d="M48 58 Q30 28 38 18 Q56 30 60 55Z" fill="#1565C0"/>
        <path d="M50 55 Q38 32 44 24 Q56 34 58 53Z" fill="#FF8F00" opacity="0.6"/>
        <path d="M148 58 Q170 28 162 18 Q144 30 140 55Z" fill="#1565C0"/>
        <path d="M146 55 Q158 32 154 24 Q142 34 140 53Z" fill="#FF8F00" opacity="0.6"/>

        <!-- ── FACE SKIN PATCH ── -->
        <ellipse cx="104" cy="108" rx="38" ry="32" fill="url(#sg-skin)"/>

        <!-- ── EYES GROUP ── -->
        <g id="sonic-eyes" style="transform-origin:100px 95px;transition:transform .06s ease">
          <!-- Eye whites (big Sonic eyes) -->
          <ellipse cx="82" cy="90" rx="20" ry="20" fill="white"/>
          <ellipse cx="118" cy="90" rx="20" ry="20" fill="white"/>
          <!-- Upper blue lids — signature Sonic look -->
          <path d="M62 84 Q82 68 102 84" fill="#1565C0"/>
          <path d="M98 84 Q118 68 138 84" fill="#1565C0"/>
          <!-- Irises — teal/green -->
          <circle cx="86" cy="94" r="12" fill="url(#sg-eye-l)"/>
          <circle cx="118" cy="94" r="12" fill="url(#sg-eye-l)"/>
          <!-- Pupils -->
          <circle cx="88" cy="95" r="7" fill="#001A13"/>
          <circle cx="120" cy="95" r="7" fill="#001A13"/>
          <!-- Catch lights -->
          <circle cx="91" cy="90" r="3.5" fill="white" opacity="0.95"/>
          <circle cx="123" cy="90" r="3.5" fill="white" opacity="0.95"/>
          <circle cx="85" cy="98" r="1.5" fill="white" opacity="0.5"/>
          <circle cx="117" cy="98" r="1.5" fill="white" opacity="0.5"/>
          <!-- Eye shine band across top of irises -->
          <path d="M76 88 Q82 82 96 86" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/>
          <path d="M108 86 Q114 82 128 88" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/>
        </g>

        <!-- ── NOSE ── -->
        <ellipse cx="100" cy="118" rx="7" ry="5" fill="#1A0A00" opacity="0.8"/>
        <ellipse cx="98" cy="116" rx="2" ry="1.5" fill="rgba(255,255,255,0.4)"/>

        <!-- ── MOUTH — animated ── -->
        <path id="sonic-mouth" d="M84 148 Q100 145 116 148 Q100 149 84 148 Z" fill="#1A0A00"/>
        <!-- Smile lines -->
        <path d="M82 146 Q83 150 84 154" fill="none" stroke="rgba(255,140,0,.4)" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M118 146 Q117 150 116 154" fill="none" stroke="rgba(255,140,0,.4)" stroke-width="1.2" stroke-linecap="round"/>
        <!-- Teeth when open -->
        <path id="sonic-teeth" d="M88 148 Q100 148 112 148" fill="white" opacity="0"/>

        <!-- ── ARMS ── -->
        <path d="M48 185 Q20 175 12 195 Q18 215 30 208 Q38 192 52 192Z" fill="url(#sg-blue)"/>
        <path d="M152 185 Q180 175 188 195 Q182 215 170 208 Q162 192 148 192Z" fill="url(#sg-blue)"/>
        <!-- Gloves -->
        <circle cx="22" cy="206" r="14" fill="white"/>
        <circle cx="178" cy="206" r="14" fill="white"/>
        <!-- Glove knuckle lines -->
        <path d="M15 202 Q22 198 29 202" fill="none" stroke="#ddd" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M171 202 Q178 198 185 202" fill="none" stroke="#ddd" stroke-width="1.5" stroke-linecap="round"/>

        <!-- ── LEGS ── -->
        <path d="M80 228 Q74 245 70 255 Q80 260 88 255 Q90 242 94 228Z" fill="url(#sg-blue)"/>
        <path d="M120 228 Q126 245 130 255 Q120 260 112 255 Q110 242 106 228Z" fill="url(#sg-blue)"/>
        <!-- Red shoes (iconic!) -->
        <path d="M60 250 Q68 242 88 248 Q90 260 80 264 Q64 264 60 256Z" fill="#E53935"/>
        <path d="M110 248 Q130 242 140 250 Q136 264 120 264 Q110 260 110 248Z" fill="#E53935"/>
        <!-- Shoe buckle/stripe -->
        <rect x="62" y="253" width="22" height="4" rx="2" fill="white" opacity="0.8"/>
        <rect x="116" y="253" width="22" height="4" rx="2" fill="white" opacity="0.8"/>

        <!-- SmartCash badge on chest -->
        <rect x="78" y="178" width="44" height="18" rx="9" fill="rgba(0,200,150,0.25)" stroke="rgba(0,200,150,0.5)" stroke-width="1"/>
        <text x="100" y="191" text-anchor="middle" font-family="sans-serif" font-size="6.5" font-weight="bold" fill="rgba(0,200,150,0.9)">SmartCash</text>
      </svg>

      <!-- Name + status -->
      <div id="sonic-nameplate">
        <div id="sonic-name">Sonic AI <span id="sonic-dot">●</span></div>
        <div id="sonic-status">SmartCash Assistant</div>
      </div>

      <!-- Always-on voice indicator (small, inline, NOT full page) -->
      <div id="voice-indicator-wrap" style="display:none">
        <div id="voice-live-dot"></div>
        <div id="voice-indicator">Listening…</div>
      </div>

      <!-- Wave bars (speaking) -->
      <div id="sonic-wave">
        <div class="sw"></div><div class="sw"></div><div class="sw"></div><div class="sw"></div><div class="sw"></div>
      </div>
    </div>

    <!-- Chat messages from Sonic (below portrait) -->
    <div id="aria-speech-area">
      <div id="aria-latest-msg"></div>
      <div id="aria-qr-row"></div>
    </div>

    <!-- Input row -->
    <div id="aria-input-wrap">
      <button id="aria-mic-btn" onclick="Aria.toggleVoice()" title="Toggle always-on voice">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v7a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zM8.5 18.5A7.5 7.5 0 0 0 19.5 12h2a9.5 9.5 0 0 1-9 9.47V23h-1v-1.53A9.5 9.5 0 0 1 2.5 12h2a7.5 7.5 0 0 0 6 7.35V18.5z"/></svg>
      </button>
      <input id="aria-text-input" placeholder="Say anything or type…" onkeydown="if(event.key==='Enter')Aria.send()" autocomplete="off">
      <button id="aria-send-btn" onclick="Aria.send()">→</button>
    </div>

    <!-- Squad panel (inside left col) -->
    <div id="squad-panel" style="display:none">
      <div id="squad-header">👥 Squad Shopping</div>
      <div id="squad-type-row">
        <div class="sq-t active" onclick="Aria.selectSquadType('couple',this)">💑 Couple</div>
        <div class="sq-t" onclick="Aria.selectSquadType('friends',this)">👯 Friends</div>
        <div class="sq-t" onclick="Aria.selectSquadType('family',this)">👨‍👩‍👧 Family</div>
        <div class="sq-t" onclick="Aria.selectSquadType('occasion',this)">🎉 Event</div>
      </div>
      <div id="squad-link-row">
        <input id="squad-link-input" readonly value="">
        <button onclick="Aria.copySquadLink()">Copy</button>
      </div>
      <button id="squad-start-btn" onclick="Aria.startSquad()">Start Squad →</button>
      <div id="squad-members-row" style="display:none">
        <div id="squad-members-list"></div>
      </div>
      <div id="squad-chat" style="display:none">
        <div id="squad-msgs"></div>
      </div>
    </div>

    <!-- Mode switcher at bottom of left col -->
    <div id="aria-modes">
      <button class="am active" onclick="Aria.setMode('shop',this)">🛍️</button>
      <button class="am" onclick="Aria.setMode('deals',this)">🔥</button>
      <button class="am" onclick="Aria.setMode('squad',this)">👥</button>
      <button class="am" onclick="Aria.setMode('price',this)">📊</button>
    </div>
  </div>

  <!-- ══ RIGHT COL — Full page results ══ -->
  <div id="aria-results-col">
    <div id="aria-results-header">
      <div id="aria-results-title">👋 Hey! I'm Sonic AI</div>
      <div id="aria-results-sub">Tell me what you want — I'll search Amazon, eBay & Flipkart instantly</div>
      <div style="display:flex;gap:.5rem;align-items:center;flex-shrink:0">
        <button id="aria-basket-toggle" onclick="Aria.toggleBasketPanel()" style="display:none">🛒 <span id="basket-count-badge">0</span></button>
        <button id="aria-widget-close" onclick="Aria.close()">✕ Close</button>
      </div>
    </div>

    <!-- Filter bar -->
    <div id="aria-filter-bar" style="display:none">
      <button class="aria-filter active" onclick="Aria.filterStore('all',this)">All Stores</button>
      <button class="aria-filter" onclick="Aria.filterStore('Amazon',this)">📦 Amazon <span class="fc" id="fc-Amazon">0</span></button>
      <button class="aria-filter" onclick="Aria.filterStore('eBay',this)">🔵 eBay <span class="fc" id="fc-eBay">0</span></button>
      <button class="aria-filter" onclick="Aria.filterStore('Flipkart',this)">🛒 Flipkart <span class="fc" id="fc-Flipkart">0</span></button>
      <div style="width:1px;background:#e2e8f0;flex-shrink:0;height:20px"></div>
      <button class="aria-filter" onclick="Aria.sortBy('price')">↑ Price</button>
      <button class="aria-filter" onclick="Aria.sortBy('rating')">★ Rating</button>
      <button class="aria-filter" onclick="Aria.sortBy('cashback')">💰 Cashback</button>
      <span id="aria-result-count" style="margin-left:auto;font-size:.75rem;color:#94a3b8;flex-shrink:0;white-space:nowrap"></span>
    </div>

    <!-- Product grid -->
    <div id="aria-product-grid"></div>

    <!-- Basket panel (slide-in) -->
    <div id="aria-basket-panel" style="display:none">
      <div id="abp-header">🛒 Your Basket <button onclick="Aria.toggleBasketPanel()">✕</button></div>
      <div id="abp-items"></div>
      <div id="abp-summary"></div>
      <button id="abp-checkout" onclick="Aria.checkoutAll()">Checkout All Stores →</button>
    </div>

    <!-- Basket bottom bar -->
    <div id="aria-basket-bar" style="display:none">
      <span id="aria-basket-label">🛒 0 items</span>
      <span id="aria-basket-saving"></span>
      <button onclick="Aria.toggleBasketPanel()">View basket</button>
      <button id="aria-checkout-btn" onclick="Aria.checkoutAll()">Checkout All →</button>
    </div>
  </div>
</div>

<!-- FAB -->
<button id="aria-fab" onclick="Aria.toggle()">
  <!-- Mini Sonic face -->
  <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" width="44" height="44" style="border-radius:50%;border:2px solid rgba(79,195,247,.5)">
    <circle cx="28" cy="28" r="28" fill="#0D47A1"/>
    <!-- spines -->
    <path d="M10 14 Q4 5 8 0 Q16 6 14 14Z" fill="#1565C0"/>
    <path d="M20 8 Q18 0 24 -2 Q28 6 24 10Z" fill="#1565C0"/>
    <path d="M35 6 Q38 -2 44 0 Q42 8 36 10Z" fill="#1565C0"/>
    <path d="M46 12 Q54 4 56 8 Q50 16 44 14Z" fill="#1565C0"/>
    <!-- head -->
    <ellipse cx="28" cy="26" rx="20" ry="20" fill="#1976D2"/>
    <!-- skin patch -->
    <ellipse cx="30" cy="32" rx="14" ry="12" fill="#FF8F00"/>
    <!-- eyes -->
    <ellipse cx="22" cy="22" rx="8" ry="8" fill="white"/>
    <ellipse cx="36" cy="22" rx="8" ry="8" fill="white"/>
    <path d="M14 20 Q22 13 30 20" fill="#0D47A1"/>
    <path d="M26 20 Q34 13 42 20" fill="#0D47A1"/>
    <circle cx="24" cy="25" r="5" fill="#00796B"/>
    <circle cx="36" cy="25" r="5" fill="#00796B"/>
    <circle cx="24" cy="25" r="3" fill="#001A13"/>
    <circle cx="36" cy="25" r="3" fill="#001A13"/>
    <circle cx="25.5" cy="23" r="1.5" fill="white"/>
    <circle cx="37.5" cy="23" r="1.5" fill="white"/>
    <!-- nose -->
    <ellipse cx="28" cy="34" rx="3" ry="2" fill="#1A0A00" opacity="0.7"/>
    <!-- smile -->
    <path d="M20 40 Q28 46 36 40" fill="none" stroke="#1A0A00" stroke-width="1.8" stroke-linecap="round"/>
    <!-- online dot -->
    <circle cx="46" cy="10" r="6" fill="#4ade80" stroke="#0D47A1" stroke-width="2"/>
  </svg>
  <div style="display:flex;flex-direction:column;line-height:1.2">
    <div style="font-size:.85rem;font-weight:800;color:white">Sonic AI</div>
    <div style="font-size:.62rem;color:rgba(255,255,255,.45)">Your shopping assistant</div>
  </div>
  <div id="aria-fab-notif" style="display:none;position:absolute;top:-5px;right:-5px;background:#FF6B6B;color:white;width:18px;height:18px;border-radius:50%;font-size:.65rem;font-weight:800;display:none;align-items:center;justify-content:center;border:2px solid #071a0e">1</div>
</button>
`);

/* ─── STYLES ─────────────────────────────────────────── */
const ST=document.createElement('style');
ST.textContent=`
#aria-widget{
  position:fixed;inset:0;z-index:800;display:none;
  background:rgba(5,10,20,.75);backdrop-filter:blur(10px);
  animation:arFadeIn .3s ease;
  font-family:-apple-system,BlinkMacSystemFont,'DM Sans',sans-serif;
}
#aria-widget.open{display:flex;}
@keyframes arFadeIn{from{opacity:0}to{opacity:1}}

/* LEFT COL */
#aria-col{
  width:230px;flex-shrink:0;
  background:linear-gradient(175deg,#03090E 0%,#071428 100%);
  display:flex;flex-direction:column;align-items:center;
  padding:1rem .85rem .75rem;
  box-shadow:4px 0 40px rgba(0,0,0,.5);
  overflow-y:auto;gap:.6rem;
}
#aria-col::-webkit-scrollbar{width:3px;}
#aria-col::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);}

/* SONIC PORTRAIT */
#sonic-portrait{
  position:relative;width:100%;
  display:flex;flex-direction:column;align-items:center;flex-shrink:0;
}
#sonic-glow{
  position:absolute;bottom:0;left:50%;transform:translateX(-50%);
  width:140px;height:50px;border-radius:50%;
  background:radial-gradient(ellipse,rgba(79,195,247,.4),transparent 70%);
  pointer-events:none;
}
#sonic-svg{
  width:180px;height:auto;
  filter:drop-shadow(0 10px 30px rgba(21,101,192,.6));
  animation:sonicBreath 3.5s ease-in-out infinite;
}
@keyframes sonicBreath{
  0%,100%{transform:translateY(0) rotate(0deg)}
  25%{transform:translateY(-4px) rotate(.5deg)}
  75%{transform:translateY(-2px) rotate(-.5deg)}
}
#sonic-eyes{transform-origin:100px 94px;transition:transform .06s ease;}

#sonic-nameplate{text-align:center;margin-top:.3rem;}
#sonic-name{
  color:white;font-weight:800;font-size:.95rem;
  display:flex;align-items:center;justify-content:center;gap:.4rem;
}
#sonic-dot{font-size:.45rem;color:#4ade80;animation:sdot 2s infinite;}
@keyframes sdot{0%,100%{opacity:1}50%{opacity:.2}}
#sonic-status{color:rgba(255,255,255,.4);font-size:.65rem;margin-top:.1rem;text-align:center;}

/* ALWAYS-ON VOICE INDICATOR — small, not full screen */
#voice-indicator-wrap{
  display:flex;align-items:center;gap:.4rem;
  background:rgba(255,107,107,.15);border:1px solid rgba(255,107,107,.3);
  border-radius:50px;padding:.28rem .7rem;margin-top:.3rem;
  animation:voicePulse 1.5s ease-in-out infinite;
}
@keyframes voicePulse{0%,100%{opacity:1}50%{opacity:.6}}
#voice-live-dot{width:7px;height:7px;background:#FF6B6B;border-radius:50%;flex-shrink:0;animation:vlDot 1s infinite;}
@keyframes vlDot{0%,100%{transform:scale(1)}50%{transform:scale(1.4)}}
#voice-indicator{font-size:.68rem;color:#FF6B6B;font-weight:600;max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}

/* WAVE */
#sonic-wave{
  display:flex;gap:2.5px;align-items:center;height:16px;margin-top:.4rem;
  opacity:0;transition:opacity .3s;
}
.sw{width:3px;border-radius:2px;background:#4FC3F7;animation:swv .5s ease-in-out infinite alternate;}
.sw:nth-child(1){height:4px;animation-delay:0s}
.sw:nth-child(2){height:10px;animation-delay:.1s}
.sw:nth-child(3){height:16px;animation-delay:.2s}
.sw:nth-child(4){height:10px;animation-delay:.1s}
.sw:nth-child(5){height:4px;animation-delay:0s}
@keyframes swv{0%{height:3px;opacity:.3}100%{height:100%;opacity:1}}

/* SPEECH AREA */
#aria-speech-area{width:100%;display:flex;flex-direction:column;gap:.4rem;flex:1;overflow-y:auto;min-height:60px;}
#aria-speech-area::-webkit-scrollbar{width:2px;}
#aria-latest-msg{
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);
  border-radius:10px;padding:.6rem .8rem;
  font-size:.75rem;color:#e2e8f0;line-height:1.55;display:none;
}
#aria-qr-row{display:flex;flex-direction:column;gap:.25rem;}
.aria-qr{
  background:rgba(79,195,247,.1);border:1px solid rgba(79,195,247,.25);
  color:#4FC3F7;padding:.28rem .65rem;border-radius:7px;
  font-size:.68rem;font-weight:600;cursor:pointer;text-align:left;
  font-family:inherit;transition:all .2s;
}
.aria-qr:hover{background:rgba(79,195,247,.25);color:white;}

/* INPUT */
#aria-input-wrap{
  display:flex;gap:.3rem;width:100%;
  border-top:1px solid rgba(255,255,255,.08);padding-top:.65rem;flex-shrink:0;
}
#aria-mic-btn{
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.6);width:34px;height:34px;border-radius:8px;
  cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .25s;
}
#aria-mic-btn.on{background:rgba(255,107,107,.3);border-color:#FF6B6B;color:#FF6B6B;animation:micP 1s infinite;}
@keyframes micP{0%,100%{box-shadow:0 0 0 0 rgba(255,107,107,.4)}50%{box-shadow:0 0 0 6px rgba(255,107,107,0)}}
#aria-text-input{
  flex:1;background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.1);
  color:#e2e8f0;padding:.48rem .7rem;border-radius:8px;
  font-size:.76rem;outline:none;font-family:inherit;min-width:0;transition:border-color .2s;
}
#aria-text-input:focus{border-color:#4FC3F7;}
#aria-text-input::placeholder{color:rgba(255,255,255,.25);}
#aria-send-btn{
  background:#1976D2;border:none;color:white;
  width:34px;height:34px;border-radius:8px;cursor:pointer;font-size:.9rem;font-weight:700;
  flex-shrink:0;transition:all .2s;
}
#aria-send-btn:hover{background:#1565C0;}

/* SQUAD PANEL */
#squad-panel{
  width:100%;background:rgba(102,126,234,.1);border:1px solid rgba(102,126,234,.25);
  border-radius:12px;padding:.75rem;display:flex;flex-direction:column;gap:.5rem;
}
#squad-header{color:#a5b4fc;font-size:.78rem;font-weight:700;}
#squad-type-row{display:grid;grid-template-columns:1fr 1fr;gap:.3rem;}
.sq-t{
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
  border-radius:7px;padding:.35rem .4rem;text-align:center;
  font-size:.65rem;color:rgba(255,255,255,.5);cursor:pointer;transition:all .2s;font-weight:600;
}
.sq-t.active{background:rgba(102,126,234,.2);border-color:#667eea;color:#a5b4fc;}
#squad-link-row{display:flex;gap:.3rem;}
#squad-link-input{
  flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  border-radius:6px;color:#a5b4fc;padding:.4rem .6rem;font-size:.68rem;
  outline:none;font-family:inherit;min-width:0;
}
#squad-link-row button{
  background:rgba(102,126,234,.2);border:1px solid rgba(102,126,234,.3);color:#a5b4fc;
  padding:.38rem .65rem;border-radius:6px;cursor:pointer;font-size:.68rem;font-weight:700;font-family:inherit;
}
#squad-start-btn{
  background:linear-gradient(135deg,#667eea,#764ba2);border:none;color:white;
  padding:.6rem;border-radius:8px;font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit;
}
#squad-members-row{margin-top:.3rem;}
#squad-members-list{display:flex;flex-direction:column;gap:.25rem;}
.squad-member-chip{
  display:flex;align-items:center;gap:.4rem;
  background:rgba(255,255,255,.06);border-radius:6px;padding:.3rem .55rem;font-size:.7rem;color:#e2e8f0;
}
.smc-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
#squad-chat{margin-top:.3rem;border-top:1px solid rgba(255,255,255,.08);padding-top:.4rem;}
#squad-msgs{display:flex;flex-direction:column;gap:.3rem;max-height:80px;overflow-y:auto;}
.squad-msg{font-size:.7rem;color:#c4b5fd;background:rgba(102,126,234,.15);border-radius:6px;padding:.3rem .55rem;}

/* MODES */
#aria-modes{
  display:flex;gap:.3rem;width:100%;flex-shrink:0;
  border-top:1px solid rgba(255,255,255,.07);padding-top:.55rem;margin-top:auto;
}
.am{
  flex:1;padding:.38rem .2rem;border-radius:7px;font-size:.85rem;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);
  cursor:pointer;transition:all .2s;
}
.am:hover{background:rgba(255,255,255,.12);}
.am.active{background:#1976D2;border-color:#1976D2;}

/* RIGHT COL */
#aria-results-col{
  flex:1;background:white;display:flex;flex-direction:column;
  overflow:hidden;position:relative;
}
#aria-results-header{
  padding:1rem 1.4rem;border-bottom:1px solid #e8ecf0;flex-shrink:0;
  display:flex;align-items:center;gap:.85rem;flex-wrap:wrap;
  background:linear-gradient(135deg,#EFF6FF,#F5F3FF);
}
#aria-results-title{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;color:#0f172a;flex:1;min-width:0;}
#aria-results-sub{font-size:.78rem;color:#64748b;flex-shrink:0;}
#aria-basket-toggle{
  background:#f0fdf9;border:1.5px solid rgba(0,200,150,.3);color:#00A07A;
  padding:.35rem .75rem;border-radius:8px;cursor:pointer;font-size:.78rem;font-weight:700;font-family:inherit;
}
#aria-widget-close{
  background:#f1f5f9;border:1px solid #e2e8f0;color:#64748b;
  padding:.35rem .8rem;border-radius:8px;cursor:pointer;font-size:.75rem;font-weight:600;font-family:inherit;transition:all .2s;
}
#aria-widget-close:hover{background:#fee2e2;border-color:#fca5a5;color:#dc2626;}

/* FILTER BAR */
#aria-filter-bar{
  display:flex;align-items:center;gap:.35rem;padding:.55rem 1.1rem;
  border-bottom:1px solid #e8ecf0;background:#f8fafc;flex-shrink:0;overflow-x:auto;
}
#aria-filter-bar::-webkit-scrollbar{display:none;}
.aria-filter{
  flex-shrink:0;padding:.28rem .75rem;border-radius:50px;font-size:.72rem;font-weight:600;
  border:1.5px solid #e2e8f0;background:white;color:#64748b;cursor:pointer;
  font-family:inherit;transition:all .2s;white-space:nowrap;display:flex;align-items:center;gap:.3rem;
}
.aria-filter:hover{border-color:#1976D2;color:#1976D2;}
.aria-filter.active{background:#1976D2;border-color:#1976D2;color:white;}
.fc{
  background:rgba(0,0,0,.08);color:inherit;border-radius:50px;
  padding:.05rem .35rem;font-size:.62rem;font-weight:700;
}
.aria-filter.active .fc{background:rgba(255,255,255,.25);}
#aria-result-count{font-size:.73rem;color:#94a3b8;white-space:nowrap;}

/* PRODUCT GRID */
#aria-product-grid{
  flex:1;overflow-y:auto;padding:1.1rem;
  display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:.9rem;align-content:start;
}
#aria-product-grid::-webkit-scrollbar{width:6px;}
#aria-product-grid::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}

/* WELCOME */
.ar-welcome{
  grid-column:1/-1;text-align:center;padding:2.5rem 1.5rem;
  display:flex;flex-direction:column;align-items:center;gap:1.25rem;
}
.ar-welcome-icon{font-size:4rem;}
.ar-welcome h3{font-family:'Syne',sans-serif;font-size:1.35rem;font-weight:800;color:#0f172a;}
.ar-welcome p{color:#64748b;font-size:.88rem;line-height:1.75;max-width:420px;}
.ar-suggest-wrap{display:flex;gap:.45rem;flex-wrap:wrap;justify-content:center;}
.ar-suggest{
  background:#EFF6FF;border:1.5px solid #BFDBFE;color:#1D4ED8;
  padding:.42rem .9rem;border-radius:50px;font-size:.8rem;font-weight:600;
  cursor:pointer;font-family:inherit;transition:all .2s;
}
.ar-suggest:hover{background:#1976D2;border-color:#1976D2;color:white;}

/* SKELETON */
.ar-skel{
  height:250px;background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
  background-size:200%;border-radius:16px;animation:arSkel 1.2s infinite;
}
@keyframes arSkel{0%{background-position:200%}100%{background-position:-200%}}

/* PRODUCT CARD */
.ar-card{
  background:white;border:1.5px solid #e8ecf0;border-radius:16px;overflow:hidden;
  transition:all .22s;display:flex;flex-direction:column;
  animation:arCardIn .3s ease both;position:relative;
}
@keyframes arCardIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.ar-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.1);border-color:#1976D2;}
.ar-card.in-basket{border-color:#00C896;background:rgba(0,200,150,.02);}
.ar-card-badge{
  position:absolute;top:.55rem;left:.55rem;z-index:1;
  font-size:.6rem;font-weight:700;padding:.16rem .5rem;border-radius:50px;
  background:#FF6B6B;color:white;
}
.ar-card-img{
  height:120px;display:flex;align-items:center;justify-content:center;
  font-size:3.2rem;border-bottom:1px solid #f1f5f9;position:relative;
}
.ar-store-tag{
  position:absolute;bottom:.35rem;right:.35rem;
  font-size:.58rem;font-weight:700;padding:.14rem .42rem;
  border-radius:6px;color:white;
}
.ar-card-body{padding:.8rem;flex:1;display:flex;flex-direction:column;gap:.2rem;}
.ar-card-name{font-size:.8rem;font-weight:700;color:#0f172a;line-height:1.35;}
.ar-card-price{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:800;color:#0f172a;}
.ar-card-rating{font-size:.67rem;color:#F59E0B;}
.ar-card-cb{
  display:inline-flex;align-items:center;gap:.25rem;width:fit-content;
  background:#f0fdf9;border:1px solid rgba(0,200,150,.25);color:#00A07A;
  padding:.18rem .5rem;border-radius:6px;font-size:.67rem;font-weight:700;
}
.ar-card-eff{font-size:.66rem;color:#94a3b8;}
.ar-card-btns{display:flex;gap:.35rem;margin-top:auto;padding-top:.4rem;}
.ar-card-add{
  flex:1;padding:.5rem;
  background:linear-gradient(135deg,#00C896,#00A07A);
  border:none;color:white;border-radius:8px;font-weight:700;font-size:.75rem;
  cursor:pointer;font-family:inherit;transition:all .2s;
}
.ar-card-add:hover{transform:scale(1.02);box-shadow:0 4px 12px rgba(0,200,150,.3);}
.ar-card-add.done{background:#e8f5e9;color:#2e7d32;border:1.5px solid #a5d6a7;}
.ar-card-tryon{
  width:32px;height:32px;background:#EFF6FF;border:1px solid #BFDBFE;
  color:#1D4ED8;border-radius:8px;cursor:pointer;font-size:.8rem;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;
}
.ar-card-tryon:hover{background:#DBEAFE;}

/* BASKET PANEL */
#aria-basket-panel{
  position:absolute;top:0;right:0;bottom:0;width:300px;
  background:white;border-left:1.5px solid #e8ecf0;
  display:flex;flex-direction:column;z-index:10;
  box-shadow:-8px 0 32px rgba(0,0,0,.1);
  animation:bpSlide .25s ease;
}
@keyframes bpSlide{from{transform:translateX(100%)}to{transform:translateX(0)}}
#abp-header{
  display:flex;justify-content:space-between;align-items:center;
  padding:.85rem 1.1rem;border-bottom:1px solid #e8ecf0;
  font-weight:700;font-size:.88rem;color:#0f172a;
}
#abp-header button{background:none;border:none;cursor:pointer;color:#94a3b8;font-size:.85rem;}
#abp-items{flex:1;overflow-y:auto;padding:.6rem;}
.abp-item{
  display:flex;align-items:center;gap:.55rem;
  background:#f8fafc;border:1px solid #e8ecf0;
  border-radius:9px;padding:.5rem .65rem;margin-bottom:.35rem;
}
.abp-emoji{font-size:1.1rem;flex-shrink:0;}
.abp-name{font-size:.75rem;font-weight:600;color:#0f172a;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.abp-price{font-size:.78rem;color:#00A07A;font-weight:800;flex-shrink:0;}
.abp-rm{background:none;border:none;color:#cbd5e0;cursor:pointer;font-size:.8rem;transition:color .2s;}
.abp-rm:hover{color:#ef4444;}
#abp-summary{padding:.75rem 1.1rem;border-top:1px solid #e8ecf0;font-size:.8rem;color:#64748b;}
#abp-checkout{
  margin:.6rem;padding:.75rem;
  background:linear-gradient(135deg,#00C896,#00A07A);
  border:none;color:white;border-radius:10px;font-size:.88rem;font-weight:700;cursor:pointer;font-family:inherit;
}

/* BASKET BOTTOM BAR */
#aria-basket-bar{
  padding:.75rem 1.4rem;border-top:1.5px solid #e8ecf0;
  background:linear-gradient(135deg,#f0fdf9,white);
  display:flex;align-items:center;gap:.75rem;flex-shrink:0;flex-wrap:wrap;
}
#aria-basket-label{font-size:.88rem;font-weight:700;color:#0f172a;}
#aria-basket-saving{font-size:.72rem;color:#00A07A;font-weight:600;}
#aria-basket-bar button{
  background:#f1f5f9;border:1px solid #e2e8f0;color:#64748b;
  padding:.4rem .85rem;border-radius:8px;cursor:pointer;font-size:.75rem;font-weight:600;font-family:inherit;
}
#aria-checkout-btn{
  background:linear-gradient(135deg,#00C896,#00A07A)!important;
  border-color:#00C896!important;color:white!important;margin-left:auto;
}

/* FAB */
#aria-fab{
  position:fixed;bottom:22px;right:22px;z-index:799;
  background:#071428;border:2px solid rgba(79,195,247,.4);
  padding:.38rem 1.1rem .38rem .35rem;border-radius:50px;
  cursor:pointer;display:flex;align-items:center;gap:.6rem;
  font-family:inherit;box-shadow:0 8px 32px rgba(0,0,0,.5);
  animation:fabGlow 3s ease-in-out infinite;transition:all .3s;
}
@keyframes fabGlow{0%,100%{box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 0 0 rgba(79,195,247,.2)}50%{box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 0 10px rgba(79,195,247,0)}}
#aria-fab:hover{transform:translateY(-3px);border-color:#4FC3F7;animation:none;}

@media(max-width:768px){
  #aria-col{width:160px;}
  #aria-product-grid{grid-template-columns:repeat(auto-fill,minmax(145px,1fr));}
  #sonic-svg{width:140px;}
}
@media(max-width:520px){
  #aria-widget{flex-direction:column;}
  #aria-col{width:100%;flex-direction:row;height:auto;padding:.6rem;flex-wrap:wrap;}
  #sonic-portrait{width:70px;flex-shrink:0;}
  #sonic-svg{width:70px;}
  #sonic-nameplate,#sonic-wave,#voice-indicator-wrap{display:none;}
}
`;
document.head.appendChild(ST);

// init Sonic mouth
setTimeout(()=>{const m=document.getElementById('sonic-mouth');if(m)m.setAttribute('d',mPath(1));},50);

/* ─── STATE ──────────────────────────────────────────── */
const S={
  open:false, greeted:false, mode:'shop',
  lastProds:[], activeFilter:'all', squadType:'couple',
  basketPanelOpen:false,
};

/* ─── PARSE QUERY ─────────────────────────────────────── */
function parseQ(msg){
  const m=msg.toLowerCase();
  let cat=null,maxP=null,minP=null,store=null;
  if(/tshirt|t-shirt|\btee\b|t shirt/.test(m)) cat='tshirt';
  else if(/\bshirt\b|\bpolo\b/.test(m)) cat='shirt';
  else if(/jean|denim|trouser/.test(m)) cat='jeans';
  else if(/shoe|trainer|sneaker/.test(m)) cat='shoes';
  else if(/headphone|earphone|airpod/.test(m)) cat='headphones';
  else if(/laptop|macbook|notebook/.test(m)) cat='laptop';
  else if(/\bdress\b|skirt/.test(m)) cat='dress';
  const u=m.match(/(?:under|below|less than|max|within)\s*£?\s*(\d+)/);
  if(u) maxP=parseFloat(u[1]);
  const b=m.match(/between\s*£?\s*(\d+)\s*(?:and|to|-)\s*£?\s*(\d+)/);
  if(b){minP=parseFloat(b[1]);maxP=parseFloat(b[2]);}
  if(/\bamazon\b/.test(m)) store='Amazon';
  else if(/\bebay\b/.test(m)) store='eBay';
  else if(/flipkart/.test(m)) store='Flipkart';
  return{cat,maxP,minP,store};
}

/* ─── RENDER HELPERS ──────────────────────────────────── */
function showWelcome(){
  document.getElementById('aria-product-grid').innerHTML=`
    <div class="ar-welcome">
      <div class="ar-welcome-icon">🛍️</div>
      <h3>What shall we find today?</h3>
      <p>I search Amazon, eBay and Flipkart all at once — showing every result right here with cashback on every item.</p>
      <div class="ar-suggest-wrap">
        <button class="ar-suggest" onclick="Aria.ask('t-shirts under £20')">👕 T-shirts under £20</button>
        <button class="ar-suggest" onclick="Aria.ask('headphones under £50')">🎧 Headphones under £50</button>
        <button class="ar-suggest" onclick="Aria.ask('laptops under £600')">💻 Laptops under £600</button>
        <button class="ar-suggest" onclick="Aria.ask('jeans under £40')">👖 Jeans under £40</button>
        <button class="ar-suggest" onclick="Aria.ask('dresses under £35')">👗 Dresses under £35</button>
        <button class="ar-suggest" onclick="Aria.ask('best deals today')">🔥 Best deals today</button>
      </div>
    </div>`;
  document.getElementById('aria-filter-bar').style.display='none';
}

function showLoading(){
  document.getElementById('aria-product-grid').innerHTML=
    Array(8).fill('<div class="ar-skel"></div>').join('');
}

function renderProducts(prods){
  // update filter counts
  const counts={Amazon:0,eBay:0,Flipkart:0};
  prods.forEach(p=>counts[p.store]=(counts[p.store]||0)+1);
  ['Amazon','eBay','Flipkart'].forEach(s=>{
    const el=document.getElementById(`fc-${s}`);
    if(el) el.textContent=counts[s]||0;
  });
  const rc=document.getElementById('aria-result-count');
  if(rc) rc.textContent=prods.length+' results';
  document.getElementById('aria-filter-bar').style.display='flex';

  if(!prods.length){
    document.getElementById('aria-product-grid').innerHTML=`
      <div class="ar-welcome">
        <div class="ar-welcome-icon">🔍</div>
        <h3>Nothing found</h3>
        <p>Try a wider budget or different category.</p>
        <div class="ar-suggest-wrap">
          <button class="ar-suggest" onclick="Aria.ask('t-shirts')">👕 T-shirts</button>
          <button class="ar-suggest" onclick="Aria.ask('best deals today')">🔥 Best deals</button>
        </div>
      </div>`;
    return;
  }

  const grid=document.getElementById('aria-product-grid');
  grid.innerHTML='';
  prods.forEach((p,i)=>{
    const sc=SCOL[p.store]||{bg:'#f8fafc',border:'#e2e8f0',storeColor:'#64748b'};
    const inB=basket.some(b=>b.id===p.id);
    const eff=(p.price*(1-p.cashback/100)).toFixed(2);
    const save=(p.price*p.cashback/100).toFixed(2);
    const c=document.createElement('div');
    c.className='ar-card'+(inB?' in-basket':'');
    c.dataset.pid=p.id;
    c.style.animationDelay=(i*0.035)+'s';
    c.innerHTML=`
      ${p.badge?`<div class="ar-card-badge">${p.badge}</div>`:''}
      <div class="ar-card-img" style="background:${sc.bg}">
        <span>${p.img}</span>
        <div class="ar-store-tag" style="background:${sc.storeColor}">${p.store}</div>
      </div>
      <div class="ar-card-body">
        <div class="ar-card-name">${p.title}</div>
        <div class="ar-card-price">£${p.price.toFixed(2)}</div>
        <div class="ar-card-rating">★ ${p.rating} <span style="color:#cbd5e0">(${p.reviews.toLocaleString()})</span></div>
        <div class="ar-card-cb">💰 ${p.cashback}% cashback · save £${save}</div>
        <div class="ar-card-eff">Effective: <strong>£${eff}</strong></div>
        <div class="ar-card-btns">
          <button class="ar-card-add${inB?' done':''}" onclick='Aria.addToBasket(${JSON.stringify(p).replace(/"/g,"&quot;")})'>
            ${inB?'✓ In basket':'+ Add to basket'}
          </button>
          <button class="ar-card-tryon" onclick="window.location.href='virtual-assistant.html'" title="Try on">👔</button>
        </div>
      </div>`;
    grid.appendChild(c);
  });
  syncBasketButtons();
}

function syncBasketButtons(){
  document.querySelectorAll('.ar-card').forEach(c=>{
    const inB=basket.some(i=>i.id===c.dataset.pid);
    c.classList.toggle('in-basket',inB);
    const btn=c.querySelector('.ar-card-add');
    if(btn){btn.textContent=inB?'✓ In basket':'+ Add to basket';btn.classList.toggle('done',inB);}
  });
}

function refreshBasketBar(){
  const n=basket.length;
  const btn=document.getElementById('aria-basket-toggle');
  if(btn){btn.style.display=n?'block':'none';const span=btn.querySelector('span');if(span)span.textContent=n;}
  if(!n){
    document.getElementById('aria-basket-bar').style.display='none';
    return;
  }
  document.getElementById('aria-basket-bar').style.display='flex';
  const tot=basket.reduce((s,i)=>s+i.price,0);
  const sav=basket.reduce((s,i)=>s+(i.price*i.cashback/100),0);
  document.getElementById('aria-basket-label').textContent=`🛒 ${n} item${n>1?'s':''} · £${tot.toFixed(2)}`;
  document.getElementById('aria-basket-saving').textContent=`Saving £${sav.toFixed(2)} with cashback!`;
  // basket panel items
  document.getElementById('abp-items').innerHTML=basket.map((it,i)=>`
    <div class="abp-item">
      <span class="abp-emoji">${it.img}</span>
      <span class="abp-name">${it.title}</span>
      <span class="abp-price">£${it.price.toFixed(2)}</span>
      <button class="abp-rm" onclick="Aria.removeFromBasket(${i})">✕</button>
    </div>`).join('');
  const stores=[...new Set(basket.map(i=>i.store))];
  document.getElementById('abp-summary').innerHTML=
    `${n} items from ${stores.join(', ')} · Total: <strong>£${tot.toFixed(2)}</strong><br>
     <span style="color:#00A07A">You save £${sav.toFixed(2)} with cashback</span>`;
}

function setSonicMsg(txt,qrs){
  const el=document.getElementById('aria-latest-msg');
  el.style.display='block';
  el.innerHTML=txt.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
  const qrRow=document.getElementById('aria-qr-row');
  qrRow.innerHTML=(qrs||[]).map(q=>`<button class="aria-qr" onclick="Aria.ask('${q}')">${q}</button>`).join('');
  document.getElementById('aria-results-title').textContent=txt.replace(/\*\*/g,'').split('.')[0].substring(0,55)+'…';
  document.getElementById('aria-results-sub').textContent='Amazon · eBay · Flipkart — all with cashback';
}

/* ─── REPLY ENGINE ────────────────────────────────────── */
function getReply(msg){
  const m=msg.toLowerCase();
  const {cat,maxP,minP,store}=parseQ(msg);
  if(cat){
    let prods=[...(PRODUCTS[cat]||[])];
    if(maxP) prods=prods.filter(p=>p.price<=maxP);
    if(minP) prods=prods.filter(p=>p.price>=minP);
    if(store) prods=prods.filter(p=>p.store===store);
    if(!prods.length) prods=[...(PRODUCTS[cat]||[])];
    S.lastProds=prods;S.activeFilter='all';
    const ns=[...new Set(prods.map(p=>p.store))].length;
    return{
      text:`Found **${prods.length} results**${maxP?` under £${maxP}`:''}  across ${ns} stores! Add any item to your basket.`,
      prods,
      qr:['Cheapest first','Best rated','Highest cashback','Only Amazon','Only eBay','Only Flipkart']
    };
  }
  if(/hello|hi|hey|namaste/.test(m)) return{text:"Hey! I'm Sonic AI — your personal shopping assistant! I search Amazon, eBay and Flipkart all at once.",prods:null,qr:['T-shirts under £20','Headphones under £50','Best deals today','Squad shopping']};
  if(/deal|best|offer|today/.test(m)){
    const all=Object.values(PRODUCTS).flat().sort(()=>Math.random()-.5).slice(0,12);
    S.lastProds=all;
    return{text:`Today's hottest deals! Flipkart 5% · Amazon 4.5% · eBay 3.2% cashback.`,prods:all,qr:['Fashion only','Electronics only','Under £30']};
  }
  if(/cheapest|sort.*price|price.*low/.test(m)&&S.lastProds.length){
    const s=[...S.lastProds].sort((a,b)=>a.price-b.price);
    return{text:`Sorted from lowest price first!`,prods:s,qr:['Best rated','Highest cashback']};
  }
  if(/best.*rat|top.*rat/.test(m)&&S.lastProds.length){
    const s=[...S.lastProds].sort((a,b)=>b.rating-a.rating);
    return{text:`Sorted by highest customer rating!`,prods:s,qr:['Cheapest first','Highest cashback']};
  }
  if(/cashback|highest.*cash/.test(m)&&S.lastProds.length){
    const s=[...S.lastProds].sort((a,b)=>b.cashback-a.cashback);
    return{text:`Sorted by highest cashback — most money back first!`,prods:s,qr:['Cheapest first','Best rated']};
  }
  if(/only amazon/.test(m)&&S.lastProds.length){const f=S.lastProds.filter(p=>p.store==='Amazon');return{text:f.length?`Amazon only — 4.5% cashback!`:'No Amazon results.',prods:f.length?f:S.lastProds,qr:['All stores','Only eBay','Only Flipkart']};}
  if(/only ebay/.test(m)&&S.lastProds.length){const f=S.lastProds.filter(p=>p.store==='eBay');return{text:f.length?`eBay only — 3.2% cashback!`:'No eBay results.',prods:f.length?f:S.lastProds,qr:['All stores','Only Amazon','Only Flipkart']};}
  if(/only flipkart/.test(m)&&S.lastProds.length){const f=S.lastProds.filter(p=>p.store==='Flipkart');return{text:f.length?`Flipkart only — 5% cashback today!`:'No Flipkart results.',prods:f.length?f:S.lastProds,qr:['All stores','Only Amazon','Only eBay']};}
  if(/basket|cart|checkout/.test(m)){
    if(!basket.length)return{text:`Basket is empty! Tell me what you need.`,prods:null,qr:['T-shirts','Headphones','Laptops']};
    return{text:`${basket.length} item${basket.length>1?'s':''} in basket · £${basket.reduce((s,i)=>s+i.price,0).toFixed(2)}. Ready to checkout?`,prods:null,qr:['Checkout all','Keep shopping']};
  }
  if(/squad|couple|partner|friend|family/.test(m)){
    Aria.setMode('squad',document.querySelectorAll('.am')[2]);
    return{text:`Squad mode activated! Shop together in real-time — invite your crew and share your basket.`,prods:null,qr:['Start couple squad','Friends squad','Family squad']};
  }
  if(/try.?on|virtual/.test(m)){window.location.href='virtual-assistant.html';return{text:`Opening AI virtual try-on!`,prods:null,qr:[]};}
  if(/start.*couple|couple.*squad/.test(m)){Aria.selectSquadType('couple',document.querySelector('.sq-t'));Aria.startSquad();return{text:`Starting couple squad! Generating your invite link...`,prods:null,qr:[]};}
  if(/start.*friend|friend.*squad/.test(m)){Aria.selectSquadType('friends',document.querySelectorAll('.sq-t')[1]);Aria.startSquad();return{text:`Friends squad started! Share the link with your crew.`,prods:null,qr:[]};}
  if(/start.*family|family.*squad/.test(m)){Aria.selectSquadType('family',document.querySelectorAll('.sq-t')[2]);Aria.startSquad();return{text:`Family squad started! Everyone can shop and vote together.`,prods:null,qr:[]};}
  return{text:`Searching for "${msg}" across all stores! Try: "t-shirt under £30" or "laptop under £500"`,prods:null,qr:['T-shirts under £30','Jeans under £50','Headphones under £100']};
}

/* ─── MAIN API ────────────────────────────────────────── */
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
      const g="Hey! I'm Sonic AI, your personal shopping assistant. I can search Amazon, eBay and Flipkart all at once. Or hit the mic button and just talk to me! What are we shopping for?";
      setTimeout(()=>{
        setSonicMsg(g,['T-shirts under £20','Headphones under £50','Best deals today','Start squad shopping']);
        speak(g);
      },300);
    }
  },

  close(){
    S.open=false;
    document.getElementById('aria-widget').classList.remove('open');
    document.body.style.overflow='';
    SYN.cancel();lipStop();waveOn(false);
    // stop voice if on
    voiceOn=false;if(recog){try{recog.stop();}catch(e){}}
    document.getElementById('aria-mic-btn').classList.remove('on');
    const viw=document.getElementById('voice-indicator-wrap');if(viw)viw.style.display='none';
  },

  ask(query){
    document.getElementById('aria-text-input').value=query;
    this.send();
  },

  async send(){
    const inp=document.getElementById('aria-text-input');
    const msg=inp.value.trim();if(!msg)return;
    inp.value='';
    setStatus('Thinking…');
    showLoading();
    document.getElementById('aria-results-title').textContent='Searching…';
    document.getElementById('aria-results-sub').textContent='Amazon · eBay · Flipkart';
    await new Promise(r=>setTimeout(r,550+Math.random()*350));
    const reply=getReply(msg);
    setSonicMsg(reply.text,reply.qr);
    if(reply.prods) renderProducts(reply.prods);
    else if(S.lastProds.length) renderProducts(S.lastProds);
    else showWelcome();
    speak(reply.text);
  },

  filterStore(store,btn){
    S.activeFilter=store;
    document.querySelectorAll('.aria-filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=store==='all'?S.lastProds:S.lastProds.filter(p=>p.store===store);
    renderProducts(f);
  },

  sortBy(key){
    document.querySelectorAll('.aria-filter').forEach(b=>b.classList.remove('active'));
    const sorted=[...S.lastProds].sort((a,b)=>
      key==='price'?a.price-b.price:key==='rating'?b.rating-a.rating:b.cashback-a.cashback);
    renderProducts(sorted);
    const n={price:'Cheapest first',rating:'Top rated',cashback:'Highest cashback'};
    const m=n[key]+' — here you go!';
    setSonicMsg(m,['Reset','Only Amazon','Only eBay']);speak(m);
  },

  setMode(mode,btn){
    S.mode=mode;
    document.querySelectorAll('.am').forEach(b=>b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    document.getElementById('squad-panel').style.display=mode==='squad'?'flex':'none';
    if(mode==='squad'){
      this._genSquadLink();
      const m='Squad shopping mode! Choose your squad type and share the invite link.';
      setSonicMsg(m,['Start couple squad','Friends squad','Family squad']);speak(m);
    } else if(mode==='deals'){
      this.ask('best deals today');
    } else if(mode==='price'){
      const m='Price tracker mode! Tell me any product for full price history and AI buy recommendation.';
      setSonicMsg(m,['Track Sony XM5','Track MacBook','Track AirPods']);speak(m);
    } else {
      const m='Shopping mode! Tell me what you need.';
      setSonicMsg(m,['T-shirts','Headphones','Laptops','Shoes']);speak(m);
    }
  },

  addToBasket(p){
    if(basket.some(i=>i.id===p.id))return;
    basket.push(p);refreshBasketBar();syncBasketButtons();
    const m=`${p.title} added to your basket! £${p.price.toFixed(2)} with ${p.cashback}% cashback from ${p.store}.`;
    setSonicMsg(`✅ **${p.title}** added! ${p.cashback}% cashback from ${p.store}.`,['View basket','Keep shopping','Checkout all']);
    speak(m);
  },

  removeFromBasket(i){basket.splice(i,1);refreshBasketBar();syncBasketButtons();},

  toggleBasketPanel(){
    S.basketPanelOpen=!S.basketPanelOpen;
    document.getElementById('aria-basket-panel').style.display=S.basketPanelOpen?'flex':'none';
    if(S.basketPanelOpen) refreshBasketBar();
  },

  checkoutAll(){
    if(!basket.length){const m='Your basket is empty! Let me find something for you.';setSonicMsg(m,['T-shirts','Headphones']);speak(m);return;}
    const stores=[...new Set(basket.map(i=>i.store))];
    const urls={Amazon:'https://amazon.co.uk',eBay:'https://ebay.co.uk',Flipkart:'https://flipkart.com'};
    const m=`Opening ${stores.join(' and ')} with your cashback links now. Happy shopping!`;
    setSonicMsg(`🚀 Opening ${stores.length} store${stores.length>1?'s':''} with cashback!`,[]);
    speak(m);
    stores.forEach((s,i)=>setTimeout(()=>window.open(urls[s]||'#','_blank'),i*700));
  },

  /* VOICE — toggle on/off, stays continuous */
  toggleVoice(){
    if(!recog) recog=buildRecognition();
    if(!recog){
      setSonicMsg('Voice needs Chrome or Edge. Just type instead!',['T-shirts','Deals']);
      speak('Voice search needs Chrome or Edge. Try typing instead!');
      return;
    }
    voiceOn=!voiceOn;
    const btn=document.getElementById('aria-mic-btn');
    const viw=document.getElementById('voice-indicator-wrap');
    if(voiceOn){
      btn.classList.add('on');
      if(viw) viw.style.display='flex';
      setStatus('🎤 Listening…');
      try{recog.start();}catch(e){}
      const m='Voice is now on! Just speak and I\'ll hear you automatically.';
      setSonicMsg(m,['Turn off voice','T-shirts under £20']);
      speak(m);
    } else {
      btn.classList.remove('on');
      if(viw) viw.style.display='none';
      setStatus('Here for you ✨');
      try{recog.stop();}catch(e){}
      speak('Voice turned off. You can type instead.');
    }
  },
  stopVoice(){voiceOn=false;if(recog)try{recog.stop();}catch(e){}},

  /* SQUAD */
  selectSquadType(t,el){
    S.squadType=t;
    document.querySelectorAll('.sq-t').forEach(e=>e.classList.remove('active'));
    if(el) el.classList.add('active');
    this._genSquadLink();
  },
  _genSquadLink(){
    const code=Math.random().toString(36).substr(2,7).toUpperCase();
    const el=document.getElementById('squad-link-input');
    if(el) el.value=`smartcash.co.uk/squad/${code}`;
  },
  copySquadLink(){
    const el=document.getElementById('squad-link-input');
    if(el) navigator.clipboard?.writeText(el.value).catch(()=>{});
    speak('Link copied! Share it with your squad.');
    setSonicMsg('✅ Link copied! Share it with your crew.',[]);
  },
  startSquad(){
    const names={couple:'Your Partner',friends:'Your Best Friend',family:'Family Member',occasion:'Guest'};
    const partner=names[S.squadType]||'Your Friend';
    // show members area
    const mr=document.getElementById('squad-members-row');
    const ml=document.getElementById('squad-members-list');
    const sc=document.getElementById('squad-chat');
    const sm=document.getElementById('squad-msgs');
    if(mr) mr.style.display='block';
    if(sc) sc.style.display='block';
    if(ml) ml.innerHTML=`
      <div class="squad-member-chip"><div class="smc-dot" style="background:#4ade80"></div>You (online)</div>
      <div class="squad-member-chip" id="partner-chip"><div class="smc-dot" style="background:#94a3b8"></div>${partner} (joining…)</div>`;
    squadActive=true;
    const m=`Squad started! Waiting for ${partner} to join…`;
    setSonicMsg(m,[]);speak(m);
    // simulate partner joining
    setTimeout(()=>{
      const chip=document.getElementById('partner-chip');
      if(chip) chip.innerHTML=`<div class="smc-dot" style="background:#4ade80"></div>${partner} (online)`;
      const joinMsg=`${partner} just joined your squad! 🎉`;
      speak(joinMsg);
      setSonicMsg(`${partner} joined your squad! You can now shop together and vote on items.`,['Show t-shirts','Show dresses','Show headphones']);
      if(sm){
        const d=document.createElement('div');d.className='squad-msg';
        d.textContent=`${partner}: Hey! Ready to shop! 😊`;sm.appendChild(d);
      }
      squadMembers=[{name:'You',online:true},{name:partner,online:true}];
      // partner reaction after 3s
      setTimeout(()=>{
        if(sm&&S.lastProds.length){
          const d=document.createElement('div');d.className='squad-msg';
          d.textContent=`${partner}: Ooh I love those options! 😍`;sm.appendChild(d);
          speak(`${partner} says: I love those options!`);
        }
      },3000);
    },2200);
  },
};

// also expose as SCAI for compatibility
window.SCAI=window.Aria;

/* badge after 4s */
setTimeout(()=>{
  if(!S.open){
    const el=document.getElementById('aria-fab-notif');
    if(el){el.style.display='flex';}
  }
},4000);

/* Ctrl+/ shortcut */
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='/')Aria.toggle();});

/* wave sync */
setInterval(()=>waveOn(isSpk),200);

})();
