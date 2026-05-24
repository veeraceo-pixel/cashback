/* ============================================================
   SmartCash — Lucky v8
   • Appears on EVERY page
   • Claude AI product search → real Amazon affiliate links
   • Squad: free WebRTC voice chat between friends
   • No dummy data. No eBay/Flipkart.
   ============================================================ */
(function(){
'use strict';

/* ─── CONFIG ──────────────────────────────────────────── */
const AMAZON_TAG = (typeof AMAZON_CONFIG!=='undefined' && AMAZON_CONFIG.associateId)
  ? AMAZON_CONFIG.associateId : 'veeraseo-21';
const AWIN_ID = (typeof AWIN_CONFIG!=='undefined' && AWIN_CONFIG.publisherId)
  ? AWIN_CONFIG.publisherId : 'YOUR_AWIN_ID';
const ANTHROPIC_KEY = (typeof AI_CONFIG!=='undefined' && AI_CONFIG.apiKey)
  ? AI_CONFIG.apiKey : '';

const STORES = [
  { name:'Amazon UK', cashback:4.5, color:'#FF9900',
    url: q=>`https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=${AMAZON_TAG}` },
  { name:'ASOS',      cashback:6.0, color:'#667eea',
    url: q=>`https://www.asos.com/search/?q=${encodeURIComponent(q)}` },
  { name:'Boots',     cashback:4.0, color:'#0099cc',
    url: q=>`https://www.boots.com/search?q=${encodeURIComponent(q)}` },
];

/* ─── STATE ──────────────────────────────────────────── */
let panelOpen=false, squadOpen=false;
let squadRoom=null, squadPeer=null, localStream=null;
let peerConnections={};   // peerId → RTCPeerConnection
let squadMicOn=true;

/* ─── CSS ─────────────────────────────────────────────── */
const S=document.createElement('style');
S.textContent=`
/* ── Lucky button ── */
#lk-btn{
  position:fixed;bottom:1.5rem;right:1.5rem;z-index:10000;
  background:#1a1f2e;border:2px solid rgba(255,255,255,.13);
  border-radius:16px;padding:.55rem 1rem;
  display:flex;align-items:center;gap:.6rem;cursor:pointer;
  box-shadow:0 8px 32px rgba(0,0,0,.35);transition:all .25s;
  font-family:'Plus Jakarta Sans',-apple-system,sans-serif;user-select:none;
}
#lk-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.4);}
#lk-ava{font-size:1.45rem;line-height:1;}
#lk-lbl{color:#fff;font-size:.78rem;font-weight:700;line-height:1.25;}
#lk-lbl span{display:block;color:rgba(255,255,255,.45);font-size:.65rem;font-weight:400;}
#lk-squad-dot{width:8px;height:8px;background:#4ade80;border-radius:50%;
  margin-left:auto;animation:lkblink 2s infinite;flex-shrink:0;}
@keyframes lkblink{0%,100%{opacity:1}50%{opacity:.3}}

/* ── Main panel ── */
#lk-panel{
  position:fixed;bottom:5.2rem;right:1.5rem;z-index:9999;
  width:400px;max-height:80vh;background:#fff;border-radius:20px;
  box-shadow:0 20px 60px rgba(0,0,0,.18);border:1px solid #e5e7eb;
  display:none;flex-direction:column;overflow:hidden;
  font-family:'Plus Jakarta Sans',-apple-system,sans-serif;
}
#lk-panel.open{display:flex;}

/* Head */
#lk-head{
  background:linear-gradient(135deg,#1a1f2e,#2d3748);
  padding:.9rem 1.15rem;display:flex;align-items:center;gap:.7rem;flex-shrink:0;
}
#lk-head h4{color:#fff;font-size:.9rem;font-weight:700;margin:0;}
#lk-head p{color:rgba(255,255,255,.5);font-size:.68rem;margin:0;}
#lk-close{
  margin-left:auto;background:rgba(255,255,255,.1);border:none;
  color:#fff;width:26px;height:26px;border-radius:7px;
  cursor:pointer;font-size:.9rem;display:flex;align-items:center;justify-content:center;
}
#lk-close:hover{background:rgba(255,255,255,.22);}

/* Tabs */
#lk-tabs{display:flex;border-bottom:1px solid #f3f4f6;flex-shrink:0;}
.lk-tab{
  flex:1;padding:.6rem;text-align:center;font-size:.78rem;font-weight:700;
  color:#9ca3af;cursor:pointer;border:none;background:none;
  border-bottom:2px solid transparent;transition:all .2s;font-family:inherit;
}
.lk-tab.active{color:#FF5C00;border-bottom-color:#FF5C00;}
.lk-tab-panel{display:none;flex:1;flex-direction:column;overflow:hidden;}
.lk-tab-panel.active{display:flex;}

/* ── SEARCH TAB ── */
#lk-chips{
  padding:.65rem .9rem .45rem;display:flex;gap:.35rem;flex-wrap:wrap;
  border-bottom:1px solid #f9fafb;flex-shrink:0;
}
.lk-chip{
  padding:.24rem .65rem;border-radius:50px;font-size:.72rem;font-weight:600;
  background:#f3f4f6;color:#374151;border:none;cursor:pointer;
  transition:all .18s;font-family:inherit;
}
.lk-chip:hover{background:#FF5C00;color:#fff;}
#lk-body{
  flex:1;overflow-y:auto;padding:.85rem;
  display:flex;flex-direction:column;gap:.65rem;
}
#lk-body::-webkit-scrollbar{width:3px;}
#lk-body::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:2px;}

/* Messages */
.lmsg{display:flex;gap:.45rem;align-items:flex-start;}
.lmsg.user{flex-direction:row-reverse;}
.lbubble{
  max-width:85%;padding:.55rem .8rem;border-radius:12px;
  font-size:.81rem;line-height:1.55;
}
.lmsg:not(.user) .lbubble{background:#f9fafb;color:#111827;border:1px solid #e5e7eb;}
.lmsg.user .lbubble{background:linear-gradient(135deg,#FF5C00,#ff7c30);color:#fff;}
.lava{font-size:1rem;flex-shrink:0;margin-top:.15rem;}

/* Loading */
.ldots{display:flex;gap:4px;align-items:center;padding:.45rem .8rem;}
.ldot{width:6px;height:6px;background:#d1d5db;border-radius:50%;animation:lb .8s infinite;}
.ldot:nth-child(2){animation-delay:.15s;}
.ldot:nth-child(3){animation-delay:.3s;}
@keyframes lb{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}

/* Product cards */
.lk-grid{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;}
.lk-card{
  border:1.5px solid #e5e7eb;border-radius:11px;overflow:hidden;
  transition:all .2s;background:#fff;cursor:pointer;
  text-decoration:none;display:block;
}
.lk-card:hover{border-color:#FF5C00;transform:translateY(-2px);box-shadow:0 4px 14px rgba(0,0,0,.1);}
.lk-card-img{
  height:80px;background:#f9fafb;
  display:flex;align-items:center;justify-content:center;position:relative;
}
.lk-card-img .emoji{font-size:2.25rem;}
.lk-store-tag{
  position:absolute;bottom:.28rem;right:.28rem;
  font-size:.58rem;font-weight:700;padding:.08rem .35rem;
  border-radius:50px;color:#fff;background:#FF9900;
}
.lk-card-body{padding:.5rem .6rem;}
.lk-card-title{font-size:.75rem;font-weight:700;color:#111827;margin-bottom:.2rem;line-height:1.3;}
.lk-card-price{font-size:.7rem;color:#6b7280;margin-bottom:.22rem;}
.lk-card-cb{
  font-size:.68rem;font-weight:700;color:#00a07a;
  background:rgba(0,200,150,.1);padding:.08rem .32rem;border-radius:50px;
  display:inline-block;margin-bottom:.3rem;
}
.lk-card-btn{
  width:100%;padding:.38rem;border:none;border-radius:6px;
  background:#FF5C00;color:#fff;font-size:.72rem;font-weight:700;
  cursor:pointer;font-family:inherit;transition:all .2s;display:block;text-align:center;
}
.lk-card-btn:hover{background:#e04e00;}

/* Store search buttons */
.lk-store-btns{display:flex;flex-direction:column;gap:.4rem;margin-top:.25rem;}
.lk-store-btn{
  display:flex;align-items:center;gap:.6rem;padding:.6rem .8rem;
  border-radius:9px;border:1.5px solid #e5e7eb;background:#fff;
  cursor:pointer;text-decoration:none;transition:all .18s;
}
.lk-store-btn:hover{border-color:#FF5C00;background:#fff9f7;}
.lk-store-name{font-size:.81rem;font-weight:700;color:#111827;}
.lk-store-cb{font-size:.69rem;color:#00a07a;font-weight:600;}

/* Input */
#lk-input-wrap{
  padding:.65rem .9rem;border-top:1px solid #e5e7eb;
  display:flex;gap:.45rem;flex-shrink:0;background:#fff;
}
#lk-input{
  flex:1;padding:.52rem .85rem;border:1.5px solid #e5e7eb;
  border-radius:50px;font-size:.83rem;outline:none;font-family:inherit;
  transition:border-color .2s;
}
#lk-input:focus{border-color:#FF5C00;}
#lk-send{
  background:#FF5C00;color:#fff;border:none;
  padding:.52rem .95rem;border-radius:50px;
  cursor:pointer;font-size:.83rem;font-weight:700;
  font-family:inherit;white-space:nowrap;transition:all .2s;
}
#lk-send:hover{background:#e04e00;}

/* ── SQUAD TAB ── */
#lk-squad{
  flex:1;overflow-y:auto;padding:1rem;
  display:flex;flex-direction:column;gap:.85rem;
}

.squad-hero{
  background:linear-gradient(135deg,#667eea,#764ba2);
  border-radius:14px;padding:1.25rem;color:#fff;text-align:center;
}
.squad-hero h3{font-size:.95rem;font-weight:800;margin-bottom:.35rem;}
.squad-hero p{font-size:.78rem;color:rgba(255,255,255,.75);line-height:1.55;margin-bottom:.85rem;}

.squad-actions{display:flex;gap:.5rem;}
.squad-btn{
  flex:1;padding:.65rem;border:none;border-radius:9px;
  font-size:.82rem;font-weight:700;cursor:pointer;
  font-family:inherit;transition:all .2s;
}
.squad-btn.primary{background:#fff;color:#6c63ff;}
.squad-btn.primary:hover{background:#f5f3ff;}
.squad-btn.secondary{background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);}
.squad-btn.secondary:hover{background:rgba(255,255,255,.25);}

/* Room UI */
.squad-room{
  background:#f9fafb;border:1.5px solid #e5e7eb;
  border-radius:14px;padding:1rem;display:flex;flex-direction:column;gap:.75rem;
}
.squad-room-head{
  display:flex;align-items:center;justify-content:space-between;
}
.squad-room-head h4{font-size:.87rem;font-weight:700;color:#111827;}
.squad-room-code{
  background:#fff;border:1.5px solid #e5e7eb;border-radius:8px;
  padding:.45rem .75rem;font-size:.78rem;text-align:center;
}
.squad-room-code span{
  font-family:monospace;font-size:1.1rem;font-weight:800;
  color:#FF5C00;letter-spacing:2px;
}
.squad-room-code small{display:block;color:#9ca3af;font-size:.68rem;margin-top:.15rem;}

/* Voice members */
.squad-members{display:flex;flex-direction:column;gap:.45rem;}
.squad-member{
  display:flex;align-items:center;gap:.65rem;
  background:#fff;border:1px solid #e5e7eb;border-radius:9px;padding:.55rem .75rem;
}
.squad-member-ava{
  width:30px;height:30px;border-radius:50%;
  background:linear-gradient(135deg,#667eea,#764ba2);
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:.85rem;font-weight:800;flex-shrink:0;
}
.squad-member-ava.speaking{
  background:linear-gradient(135deg,#4ade80,#22c55e);
  animation:lkpulse .8s infinite;
}
@keyframes lkpulse{0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,.4)}50%{box-shadow:0 0 0 6px rgba(74,222,128,0)}}
.squad-member-name{font-size:.81rem;font-weight:600;color:#111827;flex:1;}
.squad-member-status{font-size:.68rem;color:#9ca3af;}

/* Voice controls */
.squad-controls{display:flex;gap:.5rem;}
.squad-ctrl-btn{
  flex:1;padding:.55rem;border-radius:9px;font-size:.78rem;
  font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;
  border:1.5px solid #e5e7eb;background:#fff;color:#374151;
}
.squad-ctrl-btn:hover{border-color:#FF5C00;color:#FF5C00;}
.squad-ctrl-btn.active{background:#FF5C00;border-color:#FF5C00;color:#fff;}
.squad-ctrl-btn.danger{border-color:#ef4444;color:#ef4444;}
.squad-ctrl-btn.danger:hover{background:#ef4444;color:#fff;}

/* Join form */
.squad-join-form{display:flex;flex-direction:column;gap:.55rem;}
.squad-join-form input{
  padding:.6rem .85rem;border:1.5px solid #e5e7eb;border-radius:9px;
  font-size:.85rem;outline:none;font-family:inherit;
}
.squad-join-form input:focus{border-color:#667eea;}

/* Info boxes */
.lk-info{
  background:#eff6ff;border:1px solid #bfdbfe;border-radius:9px;
  padding:.65rem;font-size:.76rem;color:#1e40af;line-height:1.5;
}
.lk-tip{
  background:#fffbeb;border:1px solid #fde68a;border-radius:9px;
  padding:.65rem;font-size:.76rem;color:#92400e;line-height:1.5;
}

@media(max-width:480px){
  #lk-panel{width:calc(100vw - 2rem);right:1rem;max-height:75vh;}
}
`;
document.head.appendChild(S);

/* ─── BUILD UI ─────────────────────────────────────────── */
// Floating button
const btn=document.createElement('div');
btn.id='lk-btn';
btn.setAttribute('role','button');
btn.setAttribute('aria-label','Open Lucky AI Shopping Assistant');
btn.innerHTML=`
  <div id="lk-ava">🤖</div>
  <div id="lk-lbl">Lucky<span>AI · Shop Together</span></div>
  <div id="lk-squad-dot" title="Squad available"></div>
`;
btn.onclick=togglePanel;
document.body.appendChild(btn);

// Main panel
const panel=document.createElement('div');
panel.id='lk-panel';
panel.innerHTML=`
<div id="lk-head">
  <div style="font-size:1.5rem">🤖</div>
  <div>
    <h4>Lucky — SmartCash AI</h4>
    <p>Search Amazon with cashback · Shop Together with friends</p>
  </div>
  <button id="lk-close" onclick="LUCKY.close()" aria-label="Close Lucky">✕</button>
</div>

<div id="lk-tabs">
  <button class="lk-tab active" onclick="LUCKY.switchTab('search',this)" aria-label="Search tab">🔍 Search</button>
  <button class="lk-tab" onclick="LUCKY.switchTab('squad',this)" aria-label="Squad tab">👥 Shop Together</button>
</div>

<!-- SEARCH TAB -->
<div class="lk-tab-panel active" id="lk-tab-search" style="overflow:hidden;">
  <div id="lk-chips">
    <button class="lk-chip" onclick="LUCKY.ask('Headphones under £50')">🎧 Headphones</button>
    <button class="lk-chip" onclick="LUCKY.ask('Laptops under £600')">💻 Laptops</button>
    <button class="lk-chip" onclick="LUCKY.ask('Women dresses under £40')">👗 Dresses</button>
    <button class="lk-chip" onclick="LUCKY.ask('Mens trainers')">👟 Trainers</button>
    <button class="lk-chip" onclick="LUCKY.ask('Smart home devices')">🏠 Smart Home</button>
  </div>
  <div id="lk-body">
    <div class="lmsg">
      <div class="lava">🤖</div>
      <div class="lbubble">Hi! I'm Lucky 👋 Tell me what you're shopping for and I'll find the best options on <strong>Amazon UK with 4.5% cashback</strong>. What are you looking for?</div>
    </div>
  </div>
  <div id="lk-input-wrap">
    <input id="lk-input" type="text" placeholder="Search Amazon with cashback…" aria-label="Search products">
    <button id="lk-send" onclick="LUCKY.sendMsg()">Go →</button>
  </div>
</div>

<!-- SQUAD TAB -->
<div class="lk-tab-panel" id="lk-tab-squad">
  <div id="lk-squad">
    <div id="sq-landing">
      <div class="squad-hero">
        <h3>👥 Shop Together — Free</h3>
        <p>Start a voice room, share the code with friends. Browse products together, vote on items, and talk in real-time. Completely free — no app needed.</p>
        <div class="squad-actions">
          <button class="squad-btn primary" onclick="LUCKY.squadCreate()">🎙️ Create Room</button>
          <button class="squad-btn secondary" onclick="LUCKY.squadShowJoin()">🔗 Join Room</button>
        </div>
      </div>
      <div class="lk-info">
        ℹ️ <strong>How it works:</strong> Voice chat uses your browser's built-in WebRTC technology — completely free, no servers, peer-to-peer. Share the room code with friends and browse SmartCash together.
      </div>
    </div>

    <div id="sq-join-form" style="display:none">
      <div class="squad-join-form">
        <input id="sq-name-input" type="text" placeholder="Your name (e.g. Sarah)" maxlength="20">
        <input id="sq-code-input" type="text" placeholder="Room code (e.g. SHOP-4821)" maxlength="12" style="font-family:monospace;letter-spacing:2px;text-transform:uppercase">
        <button class="squad-btn primary" style="background:#667eea;color:#fff;border:none;padding:.7rem;border-radius:9px;font-size:.85rem" onclick="LUCKY.squadJoin()">Join Voice Room →</button>
        <button style="background:none;border:none;color:#9ca3af;font-size:.78rem;cursor:pointer;font-family:inherit" onclick="LUCKY.squadShowLanding()">← Back</button>
      </div>
    </div>

    <div id="sq-room-ui" style="display:none">
      <div class="squad-room">
        <div class="squad-room-head">
          <h4>🎙️ Live Voice Room</h4>
          <span id="sq-conn-badge" style="font-size:.68rem;background:#dcfce7;color:#166534;padding:.15rem .5rem;border-radius:50px;font-weight:700">🟢 Connected</span>
        </div>
        <div class="squad-room-code">
          <div style="font-size:.68rem;color:#9ca3af;margin-bottom:.2rem">Share this code with friends</div>
          <span id="sq-room-code-display">SHOP-0000</span>
          <button onclick="LUCKY.copyCode()" style="display:block;margin:.35rem auto 0;background:none;border:none;color:#FF5C00;font-size:.7rem;cursor:pointer;font-family:inherit;font-weight:700">📋 Copy Code</button>
        </div>
        <div id="sq-members" class="squad-members">
          <!-- members injected here -->
        </div>
        <div class="squad-controls">
          <button class="squad-ctrl-btn active" id="sq-mic-btn" onclick="LUCKY.squadToggleMic()">🎙️ Mic On</button>
          <button class="squad-ctrl-btn" onclick="LUCKY.squadShareProduct()">🔗 Share Product</button>
          <button class="squad-ctrl-btn danger" onclick="LUCKY.squadLeave()">📵 Leave</button>
        </div>
      </div>
      <div id="sq-shared-product" style="display:none" class="lk-info">
        <strong>Shared product:</strong> <span id="sq-product-name">—</span><br>
        <a id="sq-product-link" href="#" target="_blank" style="color:#FF5C00;font-weight:700;font-size:.8rem">View on Amazon →</a>
      </div>
      <div class="lk-tip">💡 <strong>Tip:</strong> Open SmartCash on any page — Lucky stays open. Your whole squad can browse and voice chat while shopping together!</div>
    </div>
  </div>
</div>
`;
document.body.appendChild(panel);

// Keyboard shortcut
panel.querySelector('#lk-input').addEventListener('keydown',e=>{if(e.key==='Enter')LUCKY.sendMsg();});

/* ─── PANEL TOGGLE ─────────────────────────────────────── */
function togglePanel(){
  panelOpen=!panelOpen;
  panel.classList.toggle('open',panelOpen);
  if(panelOpen) setTimeout(()=>panel.querySelector('#lk-input').focus(),100);
}

/* ─── AI SEARCH ────────────────────────────────────────── */
function addMsg(html,isUser=false){
  const body=document.getElementById('lk-body');
  const d=document.createElement('div');
  d.className='lmsg'+(isUser?' user':'');
  d.innerHTML=isUser
    ?`<div class="lava">👤</div><div class="lbubble">${html}</div>`
    :`<div class="lava">🤖</div><div class="lbubble">${html}</div>`;
  body.appendChild(d);
  body.scrollTop=body.scrollHeight;
  return d;
}

function addLoading(){
  const body=document.getElementById('lk-body');
  const d=document.createElement('div');
  d.className='lmsg';
  d.innerHTML=`<div class="lava">🤖</div><div class="ldots"><div class="ldot"></div><div class="ldot"></div><div class="ldot"></div></div>`;
  body.appendChild(d);
  body.scrollTop=body.scrollHeight;
  return d;
}

async function searchWithClaude(query){
  const loading=addLoading();
  try{
    const headers={'Content-Type':'application/json'};
    if(ANTHROPIC_KEY) headers['x-api-key']=ANTHROPIC_KEY;

    const resp=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',headers,
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:700,
        messages:[{role:'user',content:`You are Lucky, a UK cashback shopping AI for SmartCash.
User wants: "${query}"
Generate 4 realistic Amazon UK product suggestions.
Respond ONLY with valid JSON:
{"intent":"what user wants","keyword":"3-4 word Amazon search term","products":[{"title":"Product name","price":"£XX.XX","dept":"Electronics","emoji":"emoji","why":"one line reason"}],"tip":"one shopping tip"}`}]
      })
    });

    loading.remove();
    if(!resp.ok) throw new Error(resp.status);
    const data=await resp.json();
    const result=JSON.parse(data.content[0].text.replace(/```json|```/g,'').trim());
    renderResults(result,query);
  }catch(err){
    loading.remove();
    showFallback(query);
  }
}

function renderResults(result,query){
  const body=document.getElementById('lk-body');
  addMsg(`Found options for <strong>${result.intent||query}</strong>. All link to Amazon UK with <strong>4.5% cashback</strong>.`);

  const grid=document.createElement('div');
  grid.className='lk-grid';
  (result.products||[]).forEach(p=>{
    const url=`https://www.amazon.co.uk/s?k=${encodeURIComponent(p.title)}&tag=${AMAZON_TAG}`;
    const a=document.createElement('a');
    a.className='lk-card';a.href=url;a.target='_blank';a.rel='noopener noreferrer';
    a.innerHTML=`
      <div class="lk-card-img">
        <div class="emoji">${p.emoji||'📦'}</div>
        <div class="lk-store-tag">Amazon UK</div>
      </div>
      <div class="lk-card-body">
        <div class="lk-card-title">${p.title}</div>
        <div class="lk-card-price">${p.price||''}</div>
        <div class="lk-card-cb">💰 4.5% cashback</div>
        <div style="font-size:.68rem;color:#9ca3af;margin-bottom:.28rem">${p.why||''}</div>
        <div class="lk-card-btn">Shop on Amazon →</div>
      </div>`;
    grid.appendChild(a);
  });
  body.appendChild(grid);

  const storeWrap=document.createElement('div');
  storeWrap.innerHTML='<div style="font-size:.73rem;color:#6b7280;margin:.3rem 0 .4rem">Also search our partner stores:</div>';
  const sb=document.createElement('div');
  sb.className='lk-store-btns';
  STORES.forEach(st=>{
    const a=document.createElement('a');
    a.className='lk-store-btn';a.href=st.url(result.keyword||query);a.target='_blank';a.rel='noopener noreferrer';
    a.innerHTML=`<div style="font-size:1rem">🔍</div><div style="flex:1"><div class="lk-store-name">${st.name}</div><div class="lk-store-cb">${st.cashback}% cashback</div></div><div style="color:#9ca3af">›</div>`;
    sb.appendChild(a);
  });
  storeWrap.appendChild(sb);body.appendChild(storeWrap);

  if(result.tip){
    const t=document.createElement('div');
    t.className='lk-tip';t.innerHTML=`💡 <strong>Tip:</strong> ${result.tip}`;
    body.appendChild(t);
  }
  body.scrollTop=body.scrollHeight;
}

function showFallback(query){
  addMsg(`Searching for <strong>"${query}"</strong> across partner stores with cashback:`);
  const body=document.getElementById('lk-body');
  const sb=document.createElement('div');sb.className='lk-store-btns';
  STORES.forEach(st=>{
    const a=document.createElement('a');
    a.className='lk-store-btn';a.href=st.url(query);a.target='_blank';a.rel='noopener noreferrer';
    a.style.cssText=st.name.includes('Amazon')?'border-color:#FF9900;background:#fff8f0;':'';
    a.innerHTML=`<div style="font-size:1rem">${st.name.includes('Amazon')?'📦':st.name.includes('ASOS')?'👗':'💄'}</div><div style="flex:1"><div class="lk-store-name">Search ${st.name}</div><div class="lk-store-cb">${st.cashback}% cashback on every purchase</div></div><div style="color:#9ca3af">→</div>`;
    sb.appendChild(a);
  });
  body.appendChild(sb);
  body.scrollTop=body.scrollHeight;
}

/* ─── SQUAD / VOICE CHAT (WebRTC, free, peer-to-peer) ──── */
/* Uses a free public signaling server approach via BroadcastChannel
   (same-browser) + simple WebRTC for cross-device (requires signaling).
   For a truly free cross-device solution we use PeerJS which has a
   free public STUN/TURN server built in. */

function loadPeerJS(cb){
  if(window.Peer){cb();return;}
  const s=document.createElement('script');
  s.src='https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js';
  s.onload=cb;s.onerror=()=>alert('Could not load voice chat library. Check your connection.');
  document.head.appendChild(s);
}

function genRoomCode(){
  return 'SHOP-'+Math.floor(1000+Math.random()*9000);
}

let myName='Me';
let myPeerId=null;
let hostPeerId=null;
let squadRoomCode=null;
let squadPeers={};   // peerId→{conn,call,name}
let memberEls={};
let isHost=false;
let lastSharedUrl=null;

function squadShowLanding(){
  document.getElementById('sq-landing').style.display='block';
  document.getElementById('sq-join-form').style.display='none';
  document.getElementById('sq-room-ui').style.display='none';
}
function squadShowJoin(){
  document.getElementById('sq-landing').style.display='none';
  document.getElementById('sq-join-form').style.display='block';
  document.getElementById('sq-code-input').value='';
  document.getElementById('sq-name-input').value='';
  document.getElementById('sq-name-input').focus();
}

async function squadCreate(){
  const nameEl=document.getElementById('sq-name-input');
  // Show quick name prompt inside landing
  document.getElementById('sq-landing').innerHTML=`
    <div class="squad-join-form">
      <div style="font-size:.85rem;font-weight:700;color:#111827;margin-bottom:.35rem">Your name in the room:</div>
      <input id="sq-creator-name" type="text" placeholder="Your name" maxlength="20" value="">
      <button class="squad-btn primary" style="background:#667eea;color:#fff;border:none;padding:.7rem;border-radius:9px;font-size:.85rem" onclick="LUCKY.squadCreateFinal()">🎙️ Create Room →</button>
    </div>`;
  setTimeout(()=>document.getElementById('sq-creator-name').focus(),50);
}

window.LUCKY = window.LUCKY || {};

async function squadCreateFinal(){
  const nameInput=document.getElementById('sq-creator-name');
  myName=(nameInput?nameInput.value.trim():'')||'Host';
  isHost=true;
  squadRoomCode=genRoomCode();
  await startVoiceSession(squadRoomCode.replace('SHOP-','sc-host-'));
}

async function squadJoin(){
  const nameEl=document.getElementById('sq-name-input');
  const codeEl=document.getElementById('sq-code-input');
  myName=(nameEl?nameEl.value.trim():'')||'Guest';
  const code=(codeEl?codeEl.value.trim().toUpperCase():'');
  if(!code){alert('Please enter a room code.');return;}
  squadRoomCode=code;
  isHost=false;
  hostPeerId='sc-host-'+code.replace('SHOP-','');
  await startVoiceSession(null);
}

async function startVoiceSession(peerId){
  try{
    localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:false});
  }catch(e){
    alert('Microphone access is needed for voice chat. Please allow it in your browser settings.');
    squadShowLanding();return;
  }

  loadPeerJS(()=>{
    squadPeer=peerId
      ? new Peer(peerId,{debug:0})
      : new Peer({debug:0});

    squadPeer.on('open',id=>{
      myPeerId=id;
      if(!peerId) squadRoomCode=squadRoomCode||('SHOP-'+id.slice(-4).toUpperCase());
      showRoomUI();
      if(!isHost && hostPeerId){
        // Connect to host
        connectToPeer(hostPeerId);
      }
    });

    squadPeer.on('connection',conn=>{
      conn.on('open',()=>{
        // Send our name
        conn.send({type:'hello',name:myName,peerId:myPeerId});
        conn.on('data',d=>handleSquadData(d,conn));
        conn.on('close',()=>removeMember(conn.peer));
      });
    });

    squadPeer.on('call',call=>{
      call.answer(localStream);
      call.on('stream',remoteStream=>{
        playRemoteAudio(remoteStream,call.peer);
      });
      if(squadPeers[call.peer]) squadPeers[call.peer].call=call;
    });

    squadPeer.on('error',e=>{
      console.warn('PeerJS error:',e);
      document.getElementById('sq-conn-badge').textContent='🔴 Reconnecting…';
      document.getElementById('sq-conn-badge').style.background='#fee2e2';
      document.getElementById('sq-conn-badge').style.color='#991b1b';
    });
  });
}

function connectToPeer(peerId){
  const conn=squadPeer.connect(peerId,{reliable:true});
  conn.on('open',()=>{
    conn.send({type:'hello',name:myName,peerId:myPeerId});
    conn.on('data',d=>handleSquadData(d,conn));
    conn.on('close',()=>removeMember(peerId));
    if(!squadPeers[peerId]) squadPeers[peerId]={};
    squadPeers[peerId].conn=conn;
    // Start voice call
    const call=squadPeer.call(peerId,localStream);
    call.on('stream',remoteStream=>{playRemoteAudio(remoteStream,peerId);});
    squadPeers[peerId].call=call;
  });
}

function handleSquadData(data,conn){
  if(data.type==='hello'){
    const peerId=data.peerId||conn.peer;
    if(!squadPeers[peerId]) squadPeers[peerId]={};
    squadPeers[peerId].conn=conn;
    squadPeers[peerId].name=data.name||'Friend';
    addMemberUI(peerId,data.name||'Friend');
    // If host, forward new member to all others
    if(isHost){
      Object.keys(squadPeers).forEach(pid=>{
        if(pid!==peerId && squadPeers[pid].conn)
          squadPeers[pid].conn.send({type:'newPeer',peerId,name:data.name});
      });
    }
  }
  if(data.type==='newPeer'){
    // Connect to new peer introduced by host
    if(data.peerId!==myPeerId && !squadPeers[data.peerId])
      connectToPeer(data.peerId);
  }
  if(data.type==='product'){
    showSharedProduct(data.url,data.title);
  }
}

function addMemberUI(peerId,name){
  const members=document.getElementById('sq-members');
  if(document.getElementById('sqm-'+CSS.escape(peerId))) return;
  const d=document.createElement('div');
  d.className='squad-member';d.id='sqm-'+peerId;
  const initials=(name||'?').slice(0,2).toUpperCase();
  d.innerHTML=`
    <div class="squad-member-ava" id="sqava-${peerId}">${initials}</div>
    <div class="squad-member-name">${name}</div>
    <div class="squad-member-status">🎙️ live</div>`;
  members.appendChild(d);
}

function removeMember(peerId){
  const el=document.getElementById('sqm-'+peerId);
  if(el) el.remove();
  delete squadPeers[peerId];
}

function playRemoteAudio(stream,peerId){
  let audio=document.getElementById('sqaudio-'+peerId);
  if(!audio){
    audio=document.createElement('audio');
    audio.id='sqaudio-'+peerId;
    audio.autoplay=true;
    document.body.appendChild(audio);
  }
  audio.srcObject=stream;
}

function showRoomUI(){
  document.getElementById('sq-landing').style.display='none';
  document.getElementById('sq-join-form').style.display='none';
  document.getElementById('sq-room-ui').style.display='block';
  document.getElementById('sq-room-code-display').textContent=squadRoomCode||'SHOP-????';
  // Add self
  const members=document.getElementById('sq-members');
  members.innerHTML='';
  const self=document.createElement('div');
  self.className='squad-member';
  self.innerHTML=`
    <div class="squad-member-ava" style="background:linear-gradient(135deg,#FF5C00,#ff7c30)">${myName.slice(0,2).toUpperCase()}</div>
    <div class="squad-member-name">${myName} (You)</div>
    <div class="squad-member-status">🎙️ live</div>`;
  members.appendChild(self);
}

function showSharedProduct(url,title){
  const el=document.getElementById('sq-shared-product');
  el.style.display='block';
  document.getElementById('sq-product-name').textContent=title||'Product';
  const link=document.getElementById('sq-product-link');
  link.href=url||'#';
}

/* ─── SQUAD CONTROLS ───────────────────────────────────── */
function squadToggleMic(){
  if(!localStream)return;
  squadMicOn=!squadMicOn;
  localStream.getAudioTracks().forEach(t=>t.enabled=squadMicOn);
  const btn=document.getElementById('sq-mic-btn');
  if(btn){btn.textContent=squadMicOn?'🎙️ Mic On':'🔇 Mic Off';btn.classList.toggle('active',squadMicOn);}
}

function squadShareProduct(){
  // Share the current page's product or search result
  const title=document.title||'Product';
  const url=window.location.href;
  const msg={type:'product',url,title};
  Object.values(squadPeers).forEach(p=>{if(p.conn)p.conn.send(msg);});
  showSharedProduct(url,title);
  alert('Current page shared with your squad!');
}

function squadLeave(){
  if(localStream) localStream.getTracks().forEach(t=>t.stop());
  if(squadPeer) squadPeer.destroy();
  document.querySelectorAll('[id^=sqaudio-]').forEach(el=>el.remove());
  squadPeers={};localStream=null;squadPeer=null;isHost=false;
  // Reset landing
  document.getElementById('sq-room-ui').style.display='none';
  document.getElementById('sq-landing').style.display='block';
  document.getElementById('sq-landing').innerHTML=`
    <div class="squad-hero">
      <h3>👥 Shop Together — Free</h3>
      <p>Start a voice room, share the code with friends. Browse products together, vote on items, and talk in real-time.</p>
      <div class="squad-actions">
        <button class="squad-btn primary" onclick="LUCKY.squadCreate()">🎙️ Create Room</button>
        <button class="squad-btn secondary" onclick="LUCKY.squadShowJoin()">🔗 Join Room</button>
      </div>
    </div>
    <div class="lk-info">ℹ️ <strong>How it works:</strong> Free peer-to-peer voice chat via WebRTC. Share the room code with friends — no app or account needed.</div>`;
}

function copyCode(){
  const code=document.getElementById('sq-room-code-display').textContent;
  navigator.clipboard.writeText(code).then(()=>alert('Room code copied: '+code))
    .catch(()=>prompt('Copy this room code:',code));
}

/* ─── PUBLIC API ───────────────────────────────────────── */
window.LUCKY={
  open_:()=>{panelOpen=false;togglePanel();},
  close:()=>{panelOpen=true;togglePanel();},
  switchTab:(tab,el)=>{
    document.querySelectorAll('.lk-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.lk-tab-panel').forEach(t=>t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('lk-tab-'+tab).classList.add('active');
  },
  ask:(q)=>{
    if(!panelOpen){panelOpen=false;togglePanel();}
    const input=document.getElementById('lk-input');
    input.value=q;LUCKY.sendMsg();
  },
  sendMsg:()=>{
    const input=document.getElementById('lk-input');
    const q=input.value.trim();
    if(!q)return;
    input.value='';
    addMsg(q,true);
    searchWithClaude(q);
  },
  squadCreate,
  squadCreateFinal,
  squadShowJoin,
  squadShowLanding,
  squadJoin,
  squadToggleMic,
  squadShareProduct,
  squadLeave,
  copyCode,
};

})();
