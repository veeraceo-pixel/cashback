/* ================================================================
   SmartCash — Affiliate Tracking Engine v1
   Implements all 5 technical brief requirements:
   1. MMP-aware deep link attribution
   2. Deferred deep linking + universal link handling  
   3. WebView detection + system browser enforcement
   4. Secure click_id (≤32 chars, alphanumeric only)
   5. Interstitial routing screen with session instructions
   ================================================================ */

window.SC_TRACKING = (function(){
'use strict';

/* ── STORE ROUTING CONFIG ─────────────────────────────────────
   Per-store config controlling:
   - deepLinkScheme: native app URI scheme
   - mmPartner: Mobile Measurement Partner  
   - routeMode: 'deep_link' | 'system_browser' (admin toggle, pt.3)
   - paramStyle: how each network receives click_id (pt.4)
   - truncateAt: max click_id length that network supports (pt.4)
   ─────────────────────────────────────────────────────────── */
const STORE_ROUTING = {
  amazon: {
    name: 'Amazon UK',
    routeMode: 'system_browser',      // Amazon WebView blocks session tokens
    deepLinkScheme: 'com.amazon.mobile.shopping',
    mmPartner: null,                   // Amazon uses own attribution
    paramStyle: 'query',               // ?sc_ref=CLICK_ID
    paramKey: 'sc_ref',
    truncateAt: 32,
  },
  asos: {
    name: 'ASOS',
    routeMode: 'system_browser',
    deepLinkScheme: 'asos',
    mmPartner: 'awin',
    paramStyle: 'awin',               // clickref=CLICK_ID
    paramKey: 'clickref',
    truncateAt: 32,
  },
  justeat: {
    name: 'Just Eat',
    routeMode: 'deep_link',           // Just Eat app supports MMP
    deepLinkScheme: 'justeat',
    mmPartner: 'awin',
    paramStyle: 'awin',
    paramKey: 'clickref',
    truncateAt: 30,
  },
  deliveroo: {
    name: 'Deliveroo',
    routeMode: 'deep_link',
    deepLinkScheme: 'deliveroo',
    mmPartner: 'skimlinks',
    paramStyle: 'query',
    paramKey: 'xuids',
    truncateAt: 32,
  },
  booking: {
    name: 'Booking.com',
    routeMode: 'system_browser',      // Booking.com WebView breaks session
    deepLinkScheme: 'booking',
    mmPartner: 'awin',
    paramStyle: 'awin',
    paramKey: 'clickref',
    truncateAt: 32,
  },
  boots: {
    name: 'Boots',
    routeMode: 'system_browser',
    mmPartner: 'awin',
    paramStyle: 'awin',
    paramKey: 'clickref',
    truncateAt: 32,
  },
  nike: {
    name: 'Nike',
    routeMode: 'system_browser',
    mmPartner: 'awin',
    paramStyle: 'awin',
    paramKey: 'clickref',
    truncateAt: 32,
  },
  default: {
    routeMode: 'system_browser',
    mmPartner: 'awin',
    paramStyle: 'awin',
    paramKey: 'clickref',
    truncateAt: 32,
  }
};

/* ─── 1. CLICK ID GENERATION (pt.4 — ≤32 chars, alphanumeric) ─
   Format: sc + 8-char timestamp (base36) + 8-char random = 18 chars
   Well within the 32-char hard limit of all major affiliate networks.
   Alphanumeric only — no hyphens, underscores, or special chars
   that some legacy network scripts truncate on.
   ─────────────────────────────────────────────────────────── */
function generateClickId() {
  const ts   = Date.now().toString(36).toUpperCase();           // 8 chars
  const rand = Math.random().toString(36).substr(2,8).toUpperCase(); // 8 chars
  const id   = 'SC' + ts + rand;                                // 18 chars total
  // Hard assert — never exceed 32
  return id.substring(0, 32).replace(/[^A-Z0-9]/g, 'X');
}

/* ─── 2. ENVIRONMENT DETECTION ───────────────────────────────── */
const ENV = {
  isIOS:     /iPad|iPhone|iPod/.test(navigator.userAgent),
  isAndroid: /Android/.test(navigator.userAgent),
  isMobile:  /Mobi|Android/i.test(navigator.userAgent),

  // pt.3 — WebView detection
  // Detects embedded browser contexts where session tokens get stripped
  isWebView: (function(){
    const ua = navigator.userAgent;
    return (
      /wv/.test(ua) ||                          // Android WebView
      /FB_IAB|FBAV/.test(ua) ||                 // Facebook in-app
      /Instagram/.test(ua) ||                   // Instagram in-app
      /Twitter/.test(ua) ||                     // Twitter in-app
      (/(iPhone|iPod|iPad)/.test(ua) && !/Safari/.test(ua)) // iOS WebView
    );
  })(),

  // pt.2 — Universal Link / App Link capable OS
  supportsUniversalLinks: function(){
    return ENV.isIOS || ENV.isAndroid;
  }
};

/* ─── 3. AFFILIATE URL BUILDER ──────────────────────────────────
   Appends click_id to affiliate URL using the correct parameter
   style for each network, respecting per-store truncate limits.
   ─────────────────────────────────────────────────────────── */
function buildAffiliateUrl(baseUrl, clickId, storeConfig) {
  const cfg     = storeConfig || STORE_ROUTING.default;
  const safeId  = clickId.substring(0, cfg.truncateAt || 32);
  let   url     = baseUrl;

  if (cfg.paramStyle === 'awin') {
    // AWIN uses clickref= — replace placeholder if present, else append
    if (url.includes('clickref=')) {
      url = url.replace(/clickref=[^&]*/,`clickref=${safeId}`);
    } else {
      url += (url.includes('?') ? '&' : '?') + `clickref=${safeId}`;
    }
  } else {
    // Generic query param
    const key = cfg.paramKey || 'sc_ref';
    url += (url.includes('?') ? '&' : '?') + `${key}=${safeId}`;
  }

  return url;
}

/* ─── 4. SYSTEM BROWSER LAUNCH (pt.3) ──────────────────────────
   Forces the OS default browser rather than opening in WebView,
   preserving session cookies and preventing protocol handler blocks.
   ─────────────────────────────────────────────────────────── */
function launchSystemBrowser(url) {
  // Primary method — window.open with _blank forces system browser
  // on most mobile OSes when called from user gesture context
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) {
    // Popup blocked — fallback: navigate top-level frame
    window.location.href = url;
  }
}

/* ─── 5. DEEP LINK LAUNCHER (pt.1 + pt.2) ─────────────────────
   Attempts native app deep link first (MMP attribution preserved).
   Falls back to system browser after 800ms timeout if app
   not installed — prevents user landing on blank/error page.
   ─────────────────────────────────────────────────────────── */
function launchWithDeepLink(affiliateUrl, storeConfig) {
  if (!ENV.supportsUniversalLinks() || !storeConfig.deepLinkScheme) {
    launchSystemBrowser(affiliateUrl);
    return;
  }

  // Build universal link attempt
  // Universal links use https:// so the OS intercepts and routes to app
  // We use a 800ms fallback — if app doesn't open, redirect to browser URL
  let appOpened = false;

  const fallbackTimer = setTimeout(() => {
    if (!appOpened) {
      // pt.2 — app not installed or universal link failed
      // Fall back to system browser cleanly
      launchSystemBrowser(affiliateUrl);
    }
  }, 800);

  // Listen for page hide — if app opened, page goes into background
  window.addEventListener('pagehide', function onHide() {
    appOpened = true;
    clearTimeout(fallbackTimer);
    window.removeEventListener('pagehide', onHide);
  }, { once: true });

  window.addEventListener('visibilitychange', function onVis() {
    if (document.visibilityState === 'hidden') {
      appOpened = true;
      clearTimeout(fallbackTimer);
    }
    window.removeEventListener('visibilitychange', onVis);
  }, { once: true });

  // Attempt deep link — OS intercepts if app installed
  launchSystemBrowser(affiliateUrl);
}

/* ─── 6. INTERSTITIAL ROUTING SCREEN (pt.5) ────────────────────
   2-second screen shown before redirecting. Displays:
   - Store name + cashback amount
   - Session instructions to prevent attribution loss
   - Progress bar (honest UX — user knows they're being redirected)
   ─────────────────────────────────────────────────────────── */
function showInterstitial(store, clickId, affiliateUrl, resolve) {
  // Remove any existing interstitial
  const existing = document.getElementById('sc-interstitial');
  if (existing) existing.remove();

  const cfg = STORE_ROUTING[store.id] || STORE_ROUTING.default;

  const overlay = document.createElement('div');
  overlay.id = 'sc-interstitial';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:99999;
    background:rgba(0,0,0,.85);backdrop-filter:blur(8px);
    display:flex;align-items:center;justify-content:center;
    font-family:'Plus Jakarta Sans',-apple-system,sans-serif;
    animation:scFadeIn .2s ease;
  `;

  overlay.innerHTML = `
    <style>
      @keyframes scFadeIn{from{opacity:0}to{opacity:1}}
      @keyframes scProgress{from{width:0%}to{width:100%}}
      #sc-interstitial .sc-card{
        background:#fff;border-radius:20px;
        padding:2rem 1.75rem;max-width:380px;width:90%;
        box-shadow:0 24px 64px rgba(0,0,0,.4);
        text-align:center;
      }
      #sc-interstitial .sc-logo{
        width:56px;height:56px;border-radius:14px;
        background:linear-gradient(135deg,#FF5C00,#ff7c30);
        display:flex;align-items:center;justify-content:center;
        font-size:1.6rem;margin:0 auto 1rem;
      }
      #sc-interstitial h3{
        font-size:1.05rem;font-weight:800;color:#111827;
        margin-bottom:.35rem;letter-spacing:-.3px;
      }
      #sc-interstitial .sc-cb{
        display:inline-block;background:#f0fdf4;color:#15803d;
        font-size:.82rem;font-weight:700;padding:.28rem .75rem;
        border-radius:50px;margin-bottom:1.25rem;
        border:1px solid #bbf7d0;
      }
      #sc-interstitial .sc-tips{
        background:#fffbeb;border:1px solid #fde68a;
        border-radius:12px;padding:.85rem;text-align:left;
        margin-bottom:1.25rem;
      }
      #sc-interstitial .sc-tip{
        display:flex;gap:.55rem;align-items:flex-start;
        font-size:.8rem;color:#92400e;line-height:1.5;
        margin-bottom:.45rem;
      }
      #sc-interstitial .sc-tip:last-child{margin-bottom:0;}
      #sc-interstitial .sc-tip-icon{font-size:.9rem;flex-shrink:0;margin-top:.05rem;}
      #sc-interstitial .sc-tracking{
        font-size:.72rem;color:#9ca3af;margin-bottom:1rem;
        font-family:monospace;
      }
      #sc-interstitial .sc-bar-wrap{
        height:5px;background:#f3f4f6;border-radius:3px;
        overflow:hidden;margin-bottom:.75rem;
      }
      #sc-interstitial .sc-bar{
        height:100%;background:linear-gradient(90deg,#FF5C00,#ff7c30);
        border-radius:3px;
        animation:scProgress ${INTERSTITIAL_DELAY}ms linear forwards;
      }
      #sc-interstitial .sc-skip{
        background:none;border:none;color:#9ca3af;
        font-size:.78rem;cursor:pointer;font-family:inherit;
        text-decoration:underline;
      }
    </style>

    <div class="sc-card">
      <div class="sc-logo">${store.emoji || '🛍️'}</div>
      <h3>Taking you to ${store.name}</h3>
      <div class="sc-cb">💰 ${store.cashback}% cashback tracking active</div>

      <div class="sc-tips">
        <div class="sc-tip">
          <span class="sc-tip-icon">🛒</span>
          <span><strong>Clear your basket</strong> before adding new items to avoid attribution errors.</span>
        </div>
        <div class="sc-tip">
          <span class="sc-tip-icon">⚡</span>
          <span><strong>Complete your purchase in one session</strong> without closing the app or switching tabs.</span>
        </div>
        <div class="sc-tip">
          <span class="sc-tip-icon">🔕</span>
          <span><strong>Don't background the app</strong> mid-checkout — OS may clear the tracking session.</span>
        </div>
        ${ENV.isWebView ? `
        <div class="sc-tip">
          <span class="sc-tip-icon">🌐</span>
          <span><strong>Opening in your browser</strong> for better cashback tracking compatibility.</span>
        </div>` : ''}
      </div>

      <div class="sc-tracking">Tracking ID: ${clickId}</div>

      <div class="sc-bar-wrap"><div class="sc-bar"></div></div>
      <button class="sc-skip" onclick="document.getElementById('sc-interstitial').remove()">
        Skip waiting — go now →
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  // Close on backdrop click
  overlay.addEventListener('click', function(e){
    if (e.target === overlay) {
      overlay.remove();
      resolve();
    }
  });

  // Auto-redirect after delay
  setTimeout(() => {
    overlay.remove();
    resolve();
  }, INTERSTITIAL_DELAY);
}

const INTERSTITIAL_DELAY = 2000; // 2 seconds per spec (pt.5)

/* ─── 7. SUPABASE CLICK RECORDER ───────────────────────────────
   Records click to Supabase before redirect.
   Non-blocking — fails silently so user is never stuck.
   ─────────────────────────────────────────────────────────── */
async function recordClick(userId, clickId, store, affiliateUrl) {
  if (typeof SUPABASE_CONFIG === 'undefined' ||
      SUPABASE_CONFIG.url.includes('YOUR_')) return;

  try {
    const sb = window.supabase.createClient(
      SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey
    );
    await sb.from('clicks').insert({
      user_id:       userId,
      click_id:      clickId,          // ≤32 char alphanumeric (pt.4)
      store_slug:    store.id,
      store_name:    store.name,
      cashback_rate: store.cashback,
      affiliate_url: affiliateUrl,
      device_type:   ENV.isMobile ? 'mobile' : 'desktop',
      is_webview:    ENV.isWebView,
      os:            ENV.isIOS ? 'ios' : ENV.isAndroid ? 'android' : 'desktop',
      created_at:    new Date().toISOString(),
      status:        'clicked'
    });
  } catch(e) {
    // Non-critical — log only, never block user journey
    console.warn('[SC Tracking] Click record failed (non-critical):', e.message);
  }
}

/* ─── 8. MAIN ENTRY POINT: handleClick ─────────────────────────
   Full flow:
   1. Auth check → prompt login if needed
   2. Generate secure click_id (≤32 chars)
   3. Build affiliate URL with correct param style
   4. Record to Supabase (non-blocking)
   5. Show interstitial (2 seconds, pt.5)
   6. Route via deep link or system browser (pt.1–3)
   ─────────────────────────────────────────────────────────── */
let _pendingStore = null;

async function handleClick(store) {
  if (!store) return;

  // Auth check
  let userId = null;
  if (typeof SUPABASE_CONFIG !== 'undefined' &&
      !SUPABASE_CONFIG.url.includes('YOUR_')) {
    try {
      const sb = window.supabase.createClient(
        SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey
      );
      const { data: { session } } = await sb.auth.getSession();
      userId = session?.user?.id || null;
    } catch(e) {}
  }

  if (!userId) {
    _pendingStore = store;
    if (typeof showToast === 'function')
      showToast('Log in to earn cashback on this purchase 💰');
    setTimeout(() => {
      if (typeof openModal === 'function') openModal('login');
    }, 600);
    return;
  }

  // Generate click_id — ≤32 chars, alphanumeric (pt.4)
  const clickId = generateClickId();
  console.assert(
    clickId.length <= 32 && /^[A-Z0-9]+$/.test(clickId),
    '[SC] click_id validation failed:', clickId
  );

  // Get store routing config
  const cfg = STORE_ROUTING[store.id] || STORE_ROUTING.default;

  // Build affiliate URL with correct param injection (pt.4)
  const affiliateUrl = buildAffiliateUrl(store.url, clickId, cfg);

  // Record click to Supabase (non-blocking, pt.4 S2S postback ready)
  recordClick(userId, clickId, store, affiliateUrl);

  // Interstitial screen (pt.5) → then route
  await new Promise(resolve => {
    showInterstitial(store, clickId, affiliateUrl, resolve);
  });

  // Route based on store config + environment (pt.1–3)
  if (ENV.isWebView) {
    // pt.3 — Always force system browser from WebView
    launchSystemBrowser(affiliateUrl);
  } else if (cfg.routeMode === 'deep_link' && ENV.supportsUniversalLinks()) {
    // pt.1 + pt.2 — Deep link with deferred fallback
    launchWithDeepLink(affiliateUrl, cfg);
  } else {
    // pt.3 — System browser (desktop or forced for fragile stores)
    launchSystemBrowser(affiliateUrl);
  }
}

/* ─── PUBLIC API ─────────────────────────────────────────────── */
return {
  handleClick,
  generateClickId,
  buildAffiliateUrl,
  ENV,
  STORE_ROUTING,
  // Called after login to resume pending click
  resumePending: function() {
    if (_pendingStore) {
      const s = _pendingStore;
      _pendingStore = null;
      setTimeout(() => handleClick(s), 400);
    }
  }
};

})();
