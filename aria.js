/* ================================================================
   SmartCash — Lucky v9
   ✓ FREE voice: Web Speech API (browser built-in, no API key)
   ✓ FREE AI: Gemini 1.5 Flash (1M tokens/day free, no card)
   ✓ All pages: Lucky button visible everywhere
   ✓ Squad: Split-screen sync shopping + live voice chat (WebRTC)
   ✓ LUCKY.open_() global — all "Chat with AI" buttons work
   ================================================================ */
(function(){
'use strict';

/* ── CONFIG ─────────────────────────────────────────────────
   Gemini free tier: 15 req/min, 1M tokens/day, no credit card
   Get key free: aistudio.google.com → Get API Key (free)         */
const GEMINI_KEY = (typeof AI_CONFIG!=='undefined' && AI_CONFIG.geminiKey)
  ? AI_CONFIG.geminiKey : '';           // add to config.js when ready

const AMAZON_TAG = (typeof AMAZON_CONFIG!=='undefined' && AMAZON_CONFIG.associateId)
  ? AMAZON_CONFIG.associateId : 'veeraseo-21';

const STORES = [
  { name:'Amazon UK', cashback:4.5, emoji:'📦', color:'#FF9900',
    url: q=>`https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=${AMAZON_TAG}` },
  { name:'ASOS',      cashback:6.0, emoji:'👗', color:'#667eea',
    url: q=>`https://www.asos.com/search/?q=${encodeURIComponent(q)}` },
  { name:'Boots',     cashback:4.0, emoji:'💊', color:'#0099cc',
    url: q=>`https://www.boots.com/search?q=${encodeURIComponent(q)}` },
];

/* ── STATE ───────────────────────────────────────────────── */
let panelOpen=false, activeTab='search';
let voiceListening=false, voiceSynth=window.speechSynthesis;
let recognition=null;
let squadPeer=null, localStream=null, squadPeers={};
let myName='Me', squadCode='', isHost=false;
let syncChannel=null;   // BroadcastChannel for same-origin sync

/* ── INJECT CSS ─────────────────────────────────────────── */
const CSS=document.createElement('style');
CSS.textContent=`
/* ── Float button ── */
#lk-btn{
  position:fixed;bottom:1.5rem;right:1.5rem;z-index:10000;
  background:#1a202c;border:2px solid rgba(255,255,255,.13);
  border-radius:16px;padding:.55rem 1rem;display:flex;
  align-items:center;gap:.65rem;cursor:pointer;
  box-shadow:0 8px 32px rgba(0,0,0,.3);transition:all .25s;
  font-family:'Plus Jakarta Sans',-apple-system,sans-serif;user-select:none;
}
#lk-btn:hover{transform:translateY(-2px);}
#lk-ava{font-size:1.4rem;line-height:1;}
#lk-lbl{color:#fff;font-size:.78rem;font-weight:700;line-height:1.3;}
#lk-lbl small{display:block;color:rgba(255,255,255,.45);font-size:.65rem;font-weight:400;}
.lk-pulse{width:8px;height:8px;background:#4ade80;border-radius:50%;
  animation:lkpulse 2s infinite;flex-shrink:0;}
@keyframes lkpulse{0%,100%{opacity:1}50%{opacity:.35}}

/* ── Panel ── */
#lk-panel{
  position:fixed;bottom:5.2rem;right:1.5rem;z-index:9999;
  width:420px;max-height:82vh;background:#fff;
  border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,.18);
  border:1px solid #e5e7eb;display:none;flex-direction:column;
  overflow:hidden;font-family:'Plus Jakarta Sans',-apple-system,sans-serif;
}
#lk-panel.open{display:flex;}

/* Head */
#lk-head{
  background:linear-gradient(135deg,#1a202c,#2d3748);
  padding:.85rem 1.1rem;display:flex;align-items:center;gap:.7rem;flex-shrink:0;
}
#lk-head-txt h4{color:#fff;font-size:.88rem;font-weight:700;margin:0;}
#lk-head-txt p{color:rgba(255,255,255,.5);font-size:.67rem;margin:0;}
#lk-close-btn{
  margin-left:auto;background:rgba(255,255,255,.1);border:none;color:#fff;
  width:26px;height:26px;border-radius:7px;cursor:pointer;font-size:.9rem;
  display:flex;align-items:center;justify-content:center;transition:.2s;
}
#lk-close-btn:hover{background:rgba(255,255,255,.22);}

/* Tabs */
#lk-tabs{display:flex;border-bottom:1px solid #f3f4f6;flex-shrink:0;}
.lkt{flex:1;padding:.58rem .4rem;text-align:center;font-size:.76rem;font-weight:700;
  color:#9ca3af;cursor:pointer;border:none;background:none;
  border-bottom:2.5px solid transparent;transition:.2s;font-family:inherit;}
.lkt.on{color:#FF5C00;border-bottom-color:#FF5C00;}
.tp{display:none;flex:1;flex-direction:column;overflow:hidden;}
.tp.on{display:flex;}

/* ══ SEARCH TAB ══════════════════════════════════════════ */
#lk-chips{
  padding:.6rem .9rem .4rem;display:flex;gap:.35rem;flex-wrap:wrap;
  border-bottom:1px solid #f9fafb;flex-shrink:0;
}
.lkchip{
  padding:.22rem .62rem;border-radius:50px;font-size:.72rem;font-weight:600;
  background:#f3f4f6;color:#374151;border:none;cursor:pointer;
  transition:.18s;font-family:inherit;
}
.lkchip:hover{background:#FF5C00;color:#fff;}

#lk-body{flex:1;overflow-y:auto;padding:.8rem;display:flex;flex-direction:column;gap:.6rem;}
#lk-body::-webkit-scrollbar{width:3px;}
#lk-body::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:2px;}

.lm{display:flex;gap:.45rem;align-items:flex-start;}
.lm.u{flex-direction:row-reverse;}
.lb{max-width:86%;padding:.52rem .78rem;border-radius:12px;font-size:.81rem;line-height:1.55;}
.lm:not(.u) .lb{background:#f9fafb;color:#111827;border:1px solid #e5e7eb;}
.lm.u .lb{background:linear-gradient(135deg,#FF5C00,#ff7c30);color:#fff;}
.lava{font-size:.95rem;flex-shrink:0;margin-top:.15rem;}

.ldots{display:flex;gap:4px;padding:.45rem .78rem;align-items:center;}
.ldot{width:6px;height:6px;background:#d1d5db;border-radius:50%;animation:lb .8s infinite;}
.ldot:nth-child(2){animation-delay:.15s;}.ldot:nth-child(3){animation-delay:.3s;}
@keyframes lb{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}

/* Product grid */
.lk-grid{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;}
.lkcard{
  border:1.5px solid #e5e7eb;border-radius:11px;overflow:hidden;
  background:#fff;text-decoration:none;display:block;transition:.2s;
}
.lkcard:hover{border-color:#FF5C00;transform:translateY(-2px);box-shadow:0 4px 14px rgba(0,0,0,.09);}
.lkcard-img{height:78px;background:#f9fafb;display:flex;align-items:center;justify-content:center;position:relative;}
.lkcard-img .em{font-size:2.1rem;}
.lkcard-stag{position:absolute;bottom:.25rem;right:.25rem;font-size:.57rem;font-weight:700;
  padding:.07rem .33rem;border-radius:50px;color:#fff;}
.lkcard-bd{padding:.48rem .58rem;}
.lkcard-title{font-size:.74rem;font-weight:700;color:#111827;margin-bottom:.18rem;line-height:1.3;}
.lkcard-price{font-size:.7rem;color:#6b7280;margin-bottom:.2rem;}
.lkcard-cb{font-size:.67rem;font-weight:700;color:#00a07a;background:rgba(0,200,150,.1);
  padding:.07rem .3rem;border-radius:50px;display:inline-block;margin-bottom:.28rem;}
.lkcard-btn{width:100%;padding:.36rem;border:none;border-radius:6px;background:#FF5C00;
  color:#fff;font-size:.71rem;font-weight:700;cursor:pointer;font-family:inherit;
  display:block;text-align:center;text-decoration:none;transition:.2s;}
.lkcard-btn:hover{background:#e04e00;}

.lk-sbtns{display:flex;flex-direction:column;gap:.38rem;margin-top:.25rem;}
.lksb{display:flex;align-items:center;gap:.55rem;padding:.55rem .75rem;border-radius:9px;
  border:1.5px solid #e5e7eb;background:#fff;text-decoration:none;transition:.18s;}
.lksb:hover{border-color:#FF5C00;background:#fff9f7;}
.lksb-info{flex:1;}
.lksb-name{font-size:.8rem;font-weight:700;color:#111827;}
.lksb-cb{font-size:.68rem;color:#00a07a;font-weight:600;}

/* Input row */
#lk-irow{padding:.6rem .85rem;border-top:1px solid #e5e7eb;display:flex;gap:.4rem;flex-shrink:0;}
#lk-inp{flex:1;padding:.5rem .82rem;border:1.5px solid #e5e7eb;border-radius:50px;
  font-size:.83rem;outline:none;font-family:inherit;transition:.2s;min-width:0;}
#lk-inp:focus{border-color:#FF5C00;}
#lk-mic{padding:.5rem .65rem;border:1.5px solid #e5e7eb;border-radius:50px;
  background:#fff;cursor:pointer;font-size:1rem;transition:.2s;flex-shrink:0;}
#lk-mic.listening{background:#fee2e2;border-color:#ef4444;animation:lkpulse 1s infinite;}
#lk-send{padding:.5rem .9rem;background:#FF5C00;color:#fff;border:none;
  border-radius:50px;cursor:pointer;font-size:.82rem;font-weight:700;
  font-family:inherit;white-space:nowrap;transition:.2s;flex-shrink:0;}
#lk-send:hover{background:#e04e00;}

/* ══ SQUAD TAB — split screen ════════════════════════════ */
#lk-tab-squad{flex:1;overflow:hidden;display:none;flex-direction:column;}
#lk-tab-squad.on{display:flex;}

/* Pre-room UI */
#sq-pre{flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.8rem;}
.sq-hero{background:linear-gradient(135deg,#667eea,#764ba2);border-radius:14px;
  padding:1.1rem;color:#fff;text-align:center;}
.sq-hero h3{font-size:.92rem;font-weight:800;margin-bottom:.3rem;}
.sq-hero p{font-size:.76rem;color:rgba(255,255,255,.75);line-height:1.5;margin-bottom:.8rem;}
.sq-btns{display:flex;gap:.45rem;}
.sqbtn{flex:1;padding:.6rem;border-radius:9px;font-size:.8rem;font-weight:700;
  cursor:pointer;font-family:inherit;transition:.2s;}
.sqbtn.p{background:#fff;color:#6c63ff;border:none;}
.sqbtn.p:hover{background:#f5f3ff;}
.sqbtn.s{background:rgba(255,255,255,.14);color:#fff;border:1px solid rgba(255,255,255,.3);}
.sqbtn.s:hover{background:rgba(255,255,255,.25);}
.lk-info{background:#eff6ff;border:1px solid #bfdbfe;border-radius:9px;
  padding:.6rem;font-size:.74rem;color:#1e40af;line-height:1.5;}
.join-form{display:flex;flex-direction:column;gap:.5rem;}
.join-form input{padding:.58rem .82rem;border:1.5px solid #e5e7eb;border-radius:9px;
  font-size:.84rem;outline:none;font-family:inherit;}
.join-form input:focus{border-color:#667eea;}

/* ── SPLIT SCREEN (the main feature) ── */
#lk-split{
  display:none;flex:1;flex-direction:column;overflow:hidden;
}
#lk-split.on{display:flex;}

/* Voice bar at top of split */
#lk-voice-bar{
  display:flex;align-items:center;gap:.6rem;
  padding:.55rem .85rem;background:#1a202c;flex-shrink:0;
}
.vb-member{display:flex;align-items:center;gap:.35rem;}
.vb-ava{width:26px;height:26px;border-radius:50%;
  background:linear-gradient(135deg,#667eea,#764ba2);
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:.72rem;font-weight:800;flex-shrink:0;}
.vb-ava.sp{background:linear-gradient(135deg,#4ade80,#22c55e);
  box-shadow:0 0 0 3px rgba(74,222,128,.35);}
.vb-name{font-size:.72rem;font-weight:600;color:rgba(255,255,255,.8);}
.vb-sep{color:rgba(255,255,255,.2);font-size:.8rem;}
.vb-ctrl{margin-left:auto;display:flex;gap:.35rem;}
.vbc{background:rgba(255,255,255,.1);border:none;color:#fff;
  padding:.3rem .6rem;border-radius:6px;cursor:pointer;font-size:.72rem;
  font-weight:600;font-family:inherit;transition:.2s;}
.vbc:hover{background:rgba(255,255,255,.22);}
.vbc.on{background:#FF5C00;}
.vbc.red{background:#ef4444;}

/* Room code row */
#lk-room-row{
  padding:.4rem .85rem;background:#f9fafb;
  border-bottom:1px solid #e5e7eb;
  display:flex;align-items:center;gap:.5rem;flex-shrink:0;
}
#lk-room-code{font-family:monospace;font-size:.9rem;font-weight:800;
  color:#FF5C00;letter-spacing:2px;}
.rr-copy{background:none;border:none;color:#FF5C00;cursor:pointer;
  font-size:.7rem;font-weight:700;font-family:inherit;padding:.15rem .4rem;
  border-radius:4px;transition:.2s;}
.rr-copy:hover{background:#fff5f0;}

/* Split screens */
#lk-screens{display:flex;flex:1;overflow:hidden;gap:1px;background:#e5e7eb;}
.lk-screen{flex:1;display:flex;flex-direction:column;background:#fff;overflow:hidden;}
.lk-screen-head{
  padding:.4rem .65rem;background:#f9fafb;border-bottom:1px solid #e5e7eb;
  font-size:.72rem;font-weight:700;color:#374151;display:flex;align-items:center;gap:.4rem;
  flex-shrink:0;
}
.lk-screen-head .dot{width:7px;height:7px;border-radius:50%;background:#4ade80;}
.lk-screen-head .dot.off{background:#d1d5db;}
.lk-screen-body{flex:1;overflow-y:auto;padding:.65rem;}
.lk-screen-body::-webkit-scrollbar{width:3px;}
.lk-screen-body::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:2px;}

/* Synced product card in split screen */
.sq-product{
  border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;margin-bottom:.5rem;
  transition:.2s;cursor:pointer;text-decoration:none;display:block;
}
.sq-product:hover{border-color:#FF5C00;box-shadow:0 2px 10px rgba(0,0,0,.08);}
.sq-product-img{height:70px;background:#f9fafb;display:flex;align-items:center;justify-content:center;font-size:1.8rem;}
.sq-product-info{padding:.45rem .6rem;}
.sq-product-title{font-size:.74rem;font-weight:700;color:#111827;margin-bottom:.15rem;}
.sq-product-price{font-size:.7rem;color:#6b7280;margin-bottom:.2rem;}
.sq-product-cb{font-size:.66rem;font-weight:700;color:#00a07a;}

/* Highlight ring when partner scrolls to a product */
.sq-product.partner-viewing{
  border-color:#667eea;box-shadow:0 0 0 2px rgba(102,126,234,.3);
}
.partner-cursor{
  background:#667eea;color:#fff;font-size:.62rem;font-weight:700;
  padding:.1rem .35rem;border-radius:4px;display:inline-block;margin-bottom:.3rem;
}

/* Like/vote buttons */
.sq-votes{display:flex;gap:.35rem;padding:.35rem .6rem;border-top:1px solid #f3f4f6;}
.sqvote{flex:1;padding:.3rem;border-radius:6px;font-size:.72rem;font-weight:700;
  border:1.5px solid #e5e7eb;background:#fff;cursor:pointer;
  font-family:inherit;transition:.2s;text-align:center;}
.sqvote:hover{border-color:#FF5C00;color:#FF5C00;}
.sqvote.liked{background:#fff5f0;border-color:#FF5C00;color:#FF5C00;}
.sqvote.disliked{background:#f5f5f5;border-color:#9ca3af;color:#9ca3af;}

/* Shop together search */
.sq-search-row{display:flex;gap:.4rem;padding:.5rem .65rem;border-bottom:1px solid #f3f4f6;flex-shrink:0;}
.sq-search-row input{flex:1;padding:.42rem .7rem;border:1.5px solid #e5e7eb;border-radius:8px;
  font-size:.8rem;outline:none;font-family:inherit;min-width:0;}
.sq-search-row input:focus{border-color:#667eea;}
.sq-search-row button{padding:.42rem .75rem;background:#667eea;color:#fff;border:none;
  border-radius:8px;font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;}

@media(max-width:500px){
  #lk-panel{width:calc(100vw - 2rem);right:1rem;max-height:78vh;}
  #lk-screens{flex-direction:column;}
}
`;
document.head.appendChild(CSS);

/* ── BUILD DOM ──────────────────────────────────────────── */
// Float button
const Btn=document.createElement('div');
Btn.id='lk-btn';
Btn.setAttribute('role','button');
Btn.setAttribute('aria-label','Open Lucky AI Shopping Assistant');
Btn.innerHTML=`<div id="lk-ava">🤖</div><div id="lk-lbl">Lucky<small>AI · Shop Together</small></div><div class="lk-pulse"></div>`;
Btn.onclick=()=>LUCKY.open_();
document.body.appendChild(Btn);

// Panel
const Panel=document.createElement('div');
Panel.id='lk-panel';
Panel.innerHTML=`
<div id="lk-head">
  <div style="font-size:1.4rem">🤖</div>
  <div id="lk-head-txt"><h4>Lucky — SmartCash AI</h4><p>Free AI search · Free voice · Shop Together live</p></div>
  <button id="lk-close-btn" onclick="LUCKY.close()" aria-label="Close">✕</button>
</div>

<div id="lk-tabs">
  <button class="lkt on" onclick="LUCKY.tab('search',this)">🔍 Search</button>
  <button class="lkt" onclick="LUCKY.tab('squad',this)">👥 Shop Together</button>
</div>

<!-- ── SEARCH TAB ── -->
<div class="tp on" id="lk-tab-search">
  <div id="lk-chips">
    <button class="lkchip" onclick="LUCKY.ask('Headphones under £50')">🎧 Headphones</button>
    <button class="lkchip" onclick="LUCKY.ask('Laptops under £600')">💻 Laptops</button>
    <button class="lkchip" onclick="LUCKY.ask('Women dresses under £40')">👗 Dresses</button>
    <button class="lkchip" onclick="LUCKY.ask('Mens trainers Nike Adidas')">👟 Trainers</button>
    <button class="lkchip" onclick="LUCKY.ask('Smart home devices Alexa')">🏠 Smart Home</button>
  </div>
  <div id="lk-body">
    <div class="lm"><div class="lava">🤖</div>
      <div class="lb">Hi! I'm Lucky 👋 I use <strong>free AI</strong> and <strong>voice search</strong> to find the best products on Amazon with your 4.5% cashback. Try the mic button or type below!</div>
    </div>
  </div>
  <div id="lk-irow">
    <input id="lk-inp" type="text" placeholder="Ask me anything…" aria-label="Search products">
    <button id="lk-mic" title="Voice search (free, browser built-in)" onclick="LUCKY.toggleVoice()">🎤</button>
    <button id="lk-send" onclick="LUCKY.send()">Go →</button>
  </div>
</div>

<!-- ── SQUAD TAB ── -->
<div class="tp" id="lk-tab-squad">

  <!-- Pre-room (create/join) -->
  <div id="sq-pre">
    <div id="sq-landing">
      <div class="sq-hero">
        <h3>👥 Shop Together — Live</h3>
        <p>Split screen with a friend. Browse the same products, vote on items, voice chat in real-time — all free, no app needed.</p>
        <div class="sq-btns">
          <button class="sqbtn p" onclick="LUCKY.sqCreate()">🎙️ Create Room</button>
          <button class="sqbtn s" onclick="LUCKY.sqShowJoin()">🔗 Join Room</button>
        </div>
      </div>
      <div class="lk-info">ℹ️ <strong>Split-screen sync:</strong> Both of you see the same products side by side. When one person browses a product, the other sees it highlighted in real-time. Voice chat is peer-to-peer and free.</div>
    </div>
    <div id="sq-join" style="display:none">
      <div class="join-form">
        <input id="sqn" type="text" placeholder="Your name (e.g. Sarah)" maxlength="20">
        <input id="sqc" type="text" placeholder="Room code e.g. SHOP-4821" maxlength="12" style="font-family:monospace;letter-spacing:2px;text-transform:uppercase">
        <button class="sqbtn p" style="background:#667eea;color:#fff;border:none;padding:.65rem;border-radius:9px;font-size:.82rem" onclick="LUCKY.sqJoin()">Join → Start Shopping Together</button>
        <button style="background:none;border:none;color:#9ca3af;font-size:.76rem;cursor:pointer;font-family:inherit;margin-top:.25rem" onclick="LUCKY.sqLanding()">← Back</button>
      </div>
    </div>
  </div>

  <!-- Split screen room -->
  <div id="lk-split">

    <!-- Voice bar -->
    <div id="lk-voice-bar">
      <div id="vb-members" style="display:flex;gap:.5rem;flex:1;align-items:center;flex-wrap:wrap;"></div>
      <div class="vb-ctrl">
        <button class="vbc on" id="sq-mic-btn" onclick="LUCKY.sqMic()">🎙️ On</button>
        <button class="vbc" onclick="LUCKY.sqShare()">🔗 Share</button>
        <button class="vbc red" onclick="LUCKY.sqLeave()">Leave</button>
      </div>
    </div>

    <!-- Room code -->
    <div id="lk-room-row">
      <span style="font-size:.72rem;color:#6b7280">Room:</span>
      <span id="lk-room-code">—</span>
      <button class="rr-copy" onclick="LUCKY.sqCopy()">📋 Copy</button>
      <span style="margin-left:auto;font-size:.68rem;color:#4ade80" id="sq-status">● Connected</span>
    </div>

    <!-- Search bar shared across both screens -->
    <div class="sq-search-row">
      <input id="sq-search" type="text" placeholder="Search products for both screens…"
        onkeydown="if(event.key==='Enter')LUCKY.sqSearch()">
      <button onclick="LUCKY.sqSearch()">Search</button>
    </div>

    <!-- The split screens -->
    <div id="lk-screens">
      <div class="lk-screen" id="screen-me">
        <div class="lk-screen-head">
          <div class="dot" id="dot-me"></div>
          <span id="lbl-me">You</span>
        </div>
        <div class="lk-screen-body" id="body-me" onscroll="LUCKY.sqSyncScroll(this)">
          <div style="text-align:center;color:#9ca3af;font-size:.8rem;padding:2rem 1rem">
            Search for products above to start shopping together!
          </div>
        </div>
      </div>
      <div class="lk-screen" id="screen-partner">
        <div class="lk-screen-head">
          <div class="dot off" id="dot-partner"></div>
          <span id="lbl-partner">Waiting for partner…</span>
        </div>
        <div class="lk-screen-body" id="body-partner">
          <div style="text-align:center;color:#9ca3af;font-size:.8rem;padding:2rem 1rem">
            Share the room code so your partner can join!
          </div>
        </div>
      </div>
    </div>

  </div><!-- /lk-split -->
</div><!-- /squad tab -->
`;
document.body.appendChild(Panel);

document.getElementById('lk-inp').addEventListener('keydown',e=>{if(e.key==='Enter')LUCKY.send();});

/* ── PANEL TOGGLE ───────────────────────────────────────── */
function openPanel(){
  if(panelOpen)return;
  panelOpen=true;
  Panel.classList.add('open');
  document.getElementById('lk-inp').focus();
}
function closePanel(){
  panelOpen=false;
  Panel.classList.remove('open');
}

/* ── MESSAGES ───────────────────────────────────────────── */
function msg(html,isUser=false){
  const body=document.getElementById('lk-body');
  const d=document.createElement('div');
  d.className='lm'+(isUser?' u':'');
  d.innerHTML=(isUser?'<div class="lava">👤</div>':'<div class="lava">🤖</div>')+
    `<div class="lb">${html}</div>`;
  body.appendChild(d);
  body.scrollTop=9999;
  return d;
}
function loading(){
  const body=document.getElementById('lk-body');
  const d=document.createElement('div');
  d.className='lm';
  d.innerHTML='<div class="lava">🤖</div><div class="ldots"><div class="ldot"></div><div class="ldot"></div><div class="ldot"></div></div>';
  body.appendChild(d);body.scrollTop=9999;
  return d;
}

/* ── FREE AI (Gemini 1.5 Flash — free tier) ─────────────── */
async function aiSearch(query){
  const l=loading();
  try{
    if(!GEMINI_KEY) throw new Error('no key');

    const res=await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {method:'POST',headers:{'Content-Type':'application/json'},
       body:JSON.stringify({contents:[{parts:[{text:
        `You are Lucky, a UK cashback shopping AI. User wants: "${query}"
Generate 4 realistic Amazon UK products. JSON only, no markdown:
{"intent":"what they want","keyword":"3-4 word Amazon search","products":[{"title":"Product","price":"£XX.XX","emoji":"emoji","why":"reason"}],"tip":"shopping tip"}`
       }]}]})}
    );
    if(!res.ok) throw new Error(res.status);
    const data=await res.json();
    const text=data.candidates?.[0]?.content?.parts?.[0]?.text||'{}';
    const result=JSON.parse(text.replace(/```json|```/g,'').trim());
    l.remove();
    renderCards(result,query);
  }catch(e){
    l.remove();
    fallback(query);
  }
}

function renderCards(result,query){
  msg(`Found options for <strong>${result.intent||query}</strong>. All link to Amazon UK with <strong>4.5% cashback</strong>.`);
  const body=document.getElementById('lk-body');

  const grid=document.createElement('div');grid.className='lk-grid';
  (result.products||[]).forEach(p=>{
    const url=`https://www.amazon.co.uk/s?k=${encodeURIComponent(p.title)}&tag=${AMAZON_TAG}`;
    const a=document.createElement('a');
    a.className='lkcard';a.href=url;a.target='_blank';a.rel='noopener noreferrer';
    a.innerHTML=`<div class="lkcard-img"><div class="em">${p.emoji||'📦'}</div><div class="lkcard-stag" style="background:#FF9900">Amazon</div></div>
<div class="lkcard-bd">
<div class="lkcard-title">${p.title}</div>
<div class="lkcard-price">${p.price||'View price'}</div>
<div class="lkcard-cb">💰 4.5% cashback</div>
<div style="font-size:.66rem;color:#9ca3af;margin-bottom:.25rem">${p.why||''}</div>
<div class="lkcard-btn">Shop on Amazon →</div></div>`;
    grid.appendChild(a);
  });
  body.appendChild(grid);

  const sbwrap=document.createElement('div');
  sbwrap.innerHTML='<div style="font-size:.71rem;color:#6b7280;margin:.28rem 0 .38rem">Also search our partner stores:</div>';
  const sb=document.createElement('div');sb.className='lk-sbtns';
  STORES.forEach(st=>{
    const a=document.createElement('a');
    a.className='lksb';a.href=st.url(result.keyword||query);a.target='_blank';a.rel='noopener noreferrer';
    a.innerHTML=`<div style="font-size:1rem">${st.emoji}</div><div class="lksb-info"><div class="lksb-name">${st.name}</div><div class="lksb-cb">${st.cashback}% cashback</div></div><div style="color:#9ca3af;font-size:.85rem">›</div>`;
    sb.appendChild(a);
  });
  sbwrap.appendChild(sb);body.appendChild(sbwrap);

  if(result.tip){
    const t=document.createElement('div');
    t.style.cssText='background:#fffbeb;border:1px solid #fde68a;border-radius:9px;padding:.58rem;font-size:.75rem;color:#92400e;line-height:1.5;';
    t.innerHTML=`💡 <strong>Tip:</strong> ${result.tip}`;
    body.appendChild(t);
  }
  body.scrollTop=9999;

  // Also speak the tip using free Web Speech API
  if(result.tip) speak('Here is a tip: '+result.tip);
}

function fallback(query){
  msg(`Here are the best places to shop for <strong>"${query}"</strong> with cashback:`);
  const body=document.getElementById('lk-body');
  const sb=document.createElement('div');sb.className='lk-sbtns';
  STORES.forEach(st=>{
    const a=document.createElement('a');
    a.className='lksb';a.href=st.url(query);a.target='_blank';a.rel='noopener noreferrer';
    if(st.name.includes('Amazon')) a.style.cssText='border-color:#FF9900;background:#fff8f0;';
    a.innerHTML=`<div style="font-size:1rem">${st.emoji}</div><div class="lksb-info"><div class="lksb-name">${st.name}</div><div class="lksb-cb">${st.cashback}% cashback on every order</div></div><div style="color:#9ca3af">→</div>`;
    sb.appendChild(a);
  });
  body.appendChild(sb);body.scrollTop=9999;
}

/* ── FREE VOICE (Web Speech API — browser built-in, 100% free) ── */
function speak(text){
  if(!voiceSynth||!text) return;
  voiceSynth.cancel();
  const u=new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g,'').substring(0,200));
  const voices=voiceSynth.getVoices();
  u.voice=voices.find(v=>v.lang.startsWith('en-GB'))||voices.find(v=>v.lang.startsWith('en'))||voices[0];
  u.rate=1.0;u.pitch=1.1;u.volume=1;
  voiceSynth.speak(u);
}

function startVoice(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){
    msg('Voice search isn\'t supported in this browser. Please use Chrome or Edge.');
    return;
  }
  if(voiceListening){stopVoice();return;}
  recognition=new SR();
  recognition.continuous=false;
  recognition.lang='en-GB';
  recognition.interimResults=false;
  recognition.onstart=()=>{
    voiceListening=true;
    document.getElementById('lk-mic').classList.add('listening');
    document.getElementById('lk-mic').textContent='🔴';
    document.getElementById('lk-inp').placeholder='Listening…';
  };
  recognition.onresult=e=>{
    const transcript=e.results[0][0].transcript;
    document.getElementById('lk-inp').value=transcript;
    stopVoice();
    LUCKY.send();
  };
  recognition.onerror=recognition.onend=()=>stopVoice();
  recognition.start();
}
function stopVoice(){
  voiceListening=false;
  if(recognition){try{recognition.stop();}catch(e){}}
  const mic=document.getElementById('lk-mic');
  if(mic){mic.classList.remove('listening');mic.textContent='🎤';}
  const inp=document.getElementById('lk-inp');
  if(inp) inp.placeholder='Ask me anything…';
}

/* ── SQUAD: SPLIT-SCREEN SYNC ───────────────────────────── */
/* Uses BroadcastChannel (same browser tabs — works instantly for
   same-device testing) + PeerJS for cross-device connections.     */

let squadProducts=[];   // current search results shown in both screens
let partnerName='Partner';
let partnerViewingIdx=-1;
let myMicOn=true;

function genCode(){return 'SHOP-'+Math.floor(1000+Math.random()*9000);}

function loadPeerJS(cb){
  if(window.Peer){cb();return;}
  const s=document.createElement('script');
  s.src='https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js';
  s.onload=cb;
  s.onerror=()=>{
    document.getElementById('sq-status').textContent='⚠ Voice unavailable';
    cb(); // still allow text sync
  };
  document.head.appendChild(s);
}

function sqShowSplit(){
  document.getElementById('sq-pre').style.display='none';
  document.getElementById('lk-split').classList.add('on');
  // Populate self in voice bar
  const vbm=document.getElementById('vb-members');
  vbm.innerHTML=`<div class="vb-member"><div class="vb-ava" id="vbava-me">${myName.slice(0,2).toUpperCase()}</div><span class="vb-name">${myName} (You)</span></div>`;
  document.getElementById('lk-room-code').textContent=squadCode;
  document.getElementById('lbl-me').textContent=myName;
}

function addPartnerToBar(name){
  const vbm=document.getElementById('vb-members');
  const sep=document.createElement('span');sep.className='vb-sep';sep.textContent='·';
  vbm.appendChild(sep);
  const d=document.createElement('div');d.className='vb-member';d.id='vbm-partner';
  d.innerHTML=`<div class="vb-ava" id="vbava-partner">${name.slice(0,2).toUpperCase()}</div><span class="vb-name">${name}</span>`;
  vbm.appendChild(d);
  document.getElementById('dot-partner').classList.remove('off');
  document.getElementById('lbl-partner').textContent=name;
  document.getElementById('sq-status').textContent='● 2 people connected';
}

/* Broadcast search results to both screens */
function renderSquadProducts(products, query){
  squadProducts=products;
  renderScreen('body-me', products, true);
  // Broadcast to partner
  broadcastToPartner({type:'products', products, query});
}

function renderScreen(bodyId, products, isMine){
  const body=document.getElementById(bodyId);
  body.innerHTML='';
  products.forEach((p,i)=>{
    const url=`https://www.amazon.co.uk/s?k=${encodeURIComponent(p.title)}&tag=${AMAZON_TAG}`;
    const div=document.createElement('div');
    div.className='sq-product';
    div.id=(isMine?'sqp-me-':'sqp-pt-')+i;
    div.innerHTML=`
      <div class="sq-product-img">${p.emoji||'📦'}</div>
      <div class="sq-product-info">
        <div class="sq-product-title">${p.title}</div>
        <div class="sq-product-price">${p.price||'See Amazon for price'}</div>
        <div class="sq-product-cb">💰 4.5% cashback · Amazon UK</div>
      </div>
      <div class="sq-votes">
        <button class="sqvote" onclick="LUCKY.sqVote(${i},'like',this)">❤️ Like</button>
        <button class="sqvote" onclick="LUCKY.sqVote(${i},'add',this)">🛒 Add</button>
        <button class="sqvote" onclick="event.preventDefault();window.open('${url}','_blank')">🛍️ Shop</button>
      </div>`;

    // When user hovers a product, sync highlight to partner
    div.addEventListener('mouseenter',()=>{
      broadcastToPartner({type:'hover',idx:i,name:myName});
    });
    div.addEventListener('mouseleave',()=>{
      broadcastToPartner({type:'unhover',idx:i});
    });

    body.appendChild(div);
  });
}

function highlightPartnerProduct(idx, name){
  // Remove previous highlight
  document.querySelectorAll('.sq-product.partner-viewing').forEach(el=>{
    el.classList.remove('partner-viewing');
    const cursor=el.querySelector('.partner-cursor');
    if(cursor) cursor.remove();
  });
  if(idx<0) return;
  const el=document.getElementById('sqp-me-'+idx);
  if(el){
    el.classList.add('partner-viewing');
    const cursor=document.createElement('div');
    cursor.className='partner-cursor';
    cursor.textContent=name+' is viewing';
    el.querySelector('.sq-product-info').prepend(cursor);
    el.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
}

/* ── PEER CONNECTION ─────────────────────────────────────── */
let peerConn=null; // single data connection to partner

function startPeer(isCreator){
  loadPeerJS(()=>{
    if(!window.Peer) return;
    const pid=isCreator? 'sc-'+squadCode.replace('SHOP-','') : null;
    squadPeer=pid ? new Peer(pid) : new Peer();

    squadPeer.on('open',id=>{
      if(!isCreator){
        // Connect to host
        const hostId='sc-'+squadCode.replace('SHOP-','');
        peerConn=squadPeer.connect(hostId,{reliable:true,serialization:'json'});
        setupDataConn(peerConn);
        // Voice call
        if(localStream){
          const call=squadPeer.call(hostId,localStream);
          call.on('stream',s=>playAudio(s,'partner'));
        }
      }
    });

    squadPeer.on('connection',conn=>{
      peerConn=conn;
      setupDataConn(conn);
    });

    squadPeer.on('call',call=>{
      call.answer(localStream||new MediaStream());
      call.on('stream',s=>playAudio(s,'partner'));
    });

    squadPeer.on('error',e=>{
      document.getElementById('sq-status').textContent='⚠ Connection issue';
    });
  });
}

function setupDataConn(conn){
  conn.on('open',()=>{
    conn.send({type:'hello',name:myName});
  });
  conn.on('data',d=>{
    if(d.type==='hello'){
      partnerName=d.name||'Partner';
      addPartnerToBar(partnerName);
    }
    if(d.type==='products'){
      renderScreen('body-partner',d.products,false);
    }
    if(d.type==='search'){
      document.getElementById('sq-search').value=d.query;
      sqDoSearch(d.query,false); // search but don't re-broadcast
    }
    if(d.type==='hover'){
      highlightPartnerProduct(d.idx,d.name||partnerName);
    }
    if(d.type==='unhover'){
      highlightPartnerProduct(-1,'');
    }
    if(d.type==='vote'){
      // Show partner's vote on shared product
      const el=document.getElementById('sqp-me-'+d.idx);
      if(el){
        const voteEl=el.querySelector('.sq-votes');
        if(voteEl){
          const indicator=document.createElement('span');
          indicator.style.cssText='font-size:.65rem;color:#667eea;margin-left:.3rem;';
          indicator.textContent=partnerName+(d.action==='like'?' ❤️':' 🛒');
          voteEl.appendChild(indicator);
          setTimeout(()=>indicator.remove(),3000);
        }
      }
    }
  });
  conn.on('close',()=>{
    document.getElementById('sq-status').textContent='● Partner disconnected';
    document.getElementById('dot-partner').classList.add('off');
  });
}

function broadcastToPartner(data){
  if(peerConn && peerConn.open) peerConn.send(data);
  // Also BroadcastChannel for same-browser testing
  if(syncChannel) syncChannel.postMessage(data);
}

function playAudio(stream,id){
  let el=document.getElementById('sqaudio-'+id);
  if(!el){el=document.createElement('audio');el.id='sqaudio-'+id;el.autoplay=true;document.body.appendChild(el);}
  el.srcObject=stream;
}

async function getMic(){
  try{
    localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:false});
    return true;
  }catch(e){
    return false;
  }
}

/* ── SQUAD SEARCH ───────────────────────────────────────── */
async function sqDoSearch(query, broadcast=true){
  const meBody=document.getElementById('body-me');
  const ptBody=document.getElementById('body-partner');
  meBody.innerHTML='<div style="text-align:center;padding:1.5rem;color:#9ca3af;font-size:.8rem">Searching Amazon…</div>';
  ptBody.innerHTML='<div style="text-align:center;padding:1.5rem;color:#9ca3af;font-size:.8rem">Searching Amazon…</div>';

  if(broadcast) broadcastToPartner({type:'search',query});

  // Use Gemini if available, otherwise generate from keyword patterns
  let products=[];
  try{
    if(GEMINI_KEY){
      const res=await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {method:'POST',headers:{'Content-Type':'application/json'},
         body:JSON.stringify({contents:[{parts:[{text:
          `UK cashback shopping. User searches: "${query}". Give 6 Amazon UK products. JSON only:
{"products":[{"title":"Product name","price":"£XX.XX","emoji":"emoji"}]}`
         }]}]})}
      );
      const d=await res.json();
      const t=d.candidates?.[0]?.content?.parts?.[0]?.text||'{}';
      const parsed=JSON.parse(t.replace(/```json|```/g,'').trim());
      products=parsed.products||[];
    }
  }catch(e){}

  // Fallback: generate simple products from query
  if(!products.length){
    const emojis=['📦','🎁','⭐','🔥','✨','💎'];
    for(let i=0;i<6;i++){
      products.push({
        title:`${query} — Option ${i+1}`,
        price:'View on Amazon',
        emoji:emojis[i]
      });
    }
  }

  renderSquadProducts(products, query);
  // Also render on partner screen (will be overwritten when partner receives broadcast)
  renderScreen('body-partner', products, false);
}

/* ── PUBLIC API ─────────────────────────────────────────── */
window.LUCKY={
  open_: openPanel,
  close: closePanel,

  tab:(name,el)=>{
    document.querySelectorAll('.lkt').forEach(t=>t.classList.remove('on'));
    document.querySelectorAll('.tp').forEach(t=>t.classList.remove('on'));
    el.classList.add('on');
    document.getElementById('lk-tab-'+name).classList.add('on');
    activeTab=name;
  },

  ask:(q)=>{openPanel();document.getElementById('lk-inp').value=q;LUCKY.send();},

  send:()=>{
    const inp=document.getElementById('lk-inp');
    const q=inp.value.trim();if(!q)return;
    inp.value='';
    msg(q,true);
    aiSearch(q);
  },

  toggleVoice: startVoice,

  /* Squad */
  sqCreate:()=>{
    document.getElementById('sq-landing').innerHTML=`
      <div class="join-form">
        <div style="font-size:.83rem;font-weight:700;color:#111827;margin-bottom:.3rem">Your name in the room:</div>
        <input id="sqn2" type="text" placeholder="Your name" maxlength="20">
        <button class="sqbtn p" style="background:#667eea;color:#fff;border:none;padding:.65rem;border-radius:9px;font-size:.82rem" onclick="LUCKY.sqCreateGo()">🎙️ Create Room →</button>
      </div>`;
    setTimeout(()=>document.getElementById('sqn2')&&document.getElementById('sqn2').focus(),50);
  },

  sqCreateGo:async()=>{
    const n=document.getElementById('sqn2');
    myName=(n?n.value.trim():'')||'Host';
    isHost=true;
    squadCode=genCode();
    await getMic();
    sqShowSplit();
    startPeer(true);
    // BroadcastChannel for same-browser tab testing
    try{syncChannel=new BroadcastChannel('sc-squad-'+squadCode);}catch(e){}
  },

  sqShowJoin:()=>{
    document.getElementById('sq-landing').style.display='none';
    document.getElementById('sq-join').style.display='block';
    setTimeout(()=>document.getElementById('sqn').focus(),50);
  },
  sqLanding:()=>{
    document.getElementById('sq-join').style.display='none';
    document.getElementById('sq-landing').style.display='block';
  },

  sqJoin:async()=>{
    const n=document.getElementById('sqn');
    const c=document.getElementById('sqc');
    myName=(n?n.value.trim():'')||'Guest';
    squadCode=(c?c.value.trim().toUpperCase():'').replace(/[^A-Z0-9-]/g,'');
    if(!squadCode){alert('Please enter the room code.');return;}
    isHost=false;
    await getMic();
    sqShowSplit();
    // BroadcastChannel join
    try{
      syncChannel=new BroadcastChannel('sc-squad-'+squadCode);
      syncChannel.onmessage=e=>{
        const d=e.data;
        if(d.type==='products') renderScreen('body-partner',d.products,false);
        if(d.type==='hello'){partnerName=d.name||'Partner';addPartnerToBar(partnerName);}
        if(d.type==='hover') highlightPartnerProduct(d.idx,d.name||partnerName);
        if(d.type==='unhover') highlightPartnerProduct(-1,'');
        if(d.type==='search'){document.getElementById('sq-search').value=d.query;sqDoSearch(d.query,false);}
      };
      broadcastToPartner({type:'hello',name:myName});
    }catch(e){}
    startPeer(false);
  },

  sqSearch:()=>{
    const q=document.getElementById('sq-search').value.trim();
    if(!q)return;
    sqDoSearch(q,true);
  },

  sqVote:(idx,action,btn)=>{
    btn.classList.toggle('liked', action==='like');
    btn.classList.toggle('disliked', action==='add' && !btn.classList.contains('liked'));
    broadcastToPartner({type:'vote',idx,action,name:myName});
  },

  sqSyncScroll:(el)=>{
    // Sync scroll position to partner
    const pct=el.scrollTop/(el.scrollHeight-el.clientHeight||1);
    broadcastToPartner({type:'scroll',pct});
  },

  sqMic:()=>{
    if(!localStream)return;
    myMicOn=!myMicOn;
    localStream.getAudioTracks().forEach(t=>t.enabled=myMicOn);
    const btn=document.getElementById('sq-mic-btn');
    if(btn){btn.textContent=myMicOn?'🎙️ On':'🔇 Off';btn.classList.toggle('on',myMicOn);}
  },

  sqShare:()=>{
    const url=window.location.href;
    const title=document.title||'SmartCash page';
    broadcastToPartner({type:'share-page',url,title});
    alert(`Page shared with your squad!\n${title}`);
  },

  sqLeave:()=>{
    if(localStream) localStream.getTracks().forEach(t=>t.stop());
    if(squadPeer) squadPeer.destroy();
    if(syncChannel) syncChannel.close();
    document.querySelectorAll('[id^=sqaudio-]').forEach(el=>el.remove());
    squadPeer=null;peerConn=null;localStream=null;syncChannel=null;isHost=false;
    document.getElementById('lk-split').classList.remove('on');
    document.getElementById('sq-pre').style.display='block';
    document.getElementById('sq-landing').innerHTML=`
    <div class="sq-hero">
      <h3>👥 Shop Together — Live</h3>
      <p>Split screen with a friend. Browse the same products, vote on items, voice chat in real-time — all free.</p>
      <div class="sq-btns">
        <button class="sqbtn p" onclick="LUCKY.sqCreate()">🎙️ Create Room</button>
        <button class="sqbtn s" onclick="LUCKY.sqShowJoin()">🔗 Join Room</button>
      </div>
    </div>
    <div class="lk-info">ℹ️ Share the room code with a friend to browse together in split-screen with voice chat.</div>`;
  },

  sqCopy:()=>{
    navigator.clipboard.writeText(squadCode)
      .then(()=>alert('Room code copied: '+squadCode))
      .catch(()=>prompt('Copy this code:',squadCode));
  },
};

// Init: speak welcome only once per session
setTimeout(()=>{
  if(!sessionStorage.getItem('lk-welcomed')){
    sessionStorage.setItem('lk-welcomed','1');
  }
},1000);

})();
