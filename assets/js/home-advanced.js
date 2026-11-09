/*! WINEMI CAPITAL — Homepage advanced layer
 * Continue session, market pulse, command launcher, session ETAs, study digest.
 * Educational navigation only.
 */
(function () {
  'use strict';

  var NAMES = {
    'TVC:US10Y': 'US 10Y', 'TVC:DXY': 'DXY', 'TVC:GOLD': 'Gold', 'TVC:VIX': 'VIX',
    'FOREXCOM:SPXUSD': 'S&P 500', 'TVC:USOIL': 'WTI', 'FX:EURUSD': 'EUR/USD',
    'BINANCE:BTCUSDT': 'BTC', 'TVC:SILVER': 'Silver', 'FX:USDJPY': 'USD/JPY'
  };

  function loadJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) { return fallback; }
  }

  function injectStyles() {
    if (document.getElementById('home-adv-style')) return;
    var s = document.createElement('style');
    s.id = 'home-adv-style';
    s.textContent = [
      '.home-sess .hs-eta{opacity:.7;margin-left:.25rem;font-weight:500}',
      '.home-continue{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.75rem;margin:0 0 1.25rem;padding:.85rem 1.1rem;border-radius:12px;border:1px solid rgba(184,149,106,.3);background:linear-gradient(135deg,rgba(184,149,106,.1),rgba(20,20,22,.9))}',
      'html[data-theme=light] .home-continue{background:linear-gradient(135deg,rgba(122,95,50,.08),#fff);border-color:rgba(122,95,50,.28)}',
      '.home-continue .hc-copy{margin:0;font-size:.85rem;line-height:1.4;color:rgba(247,245,240,.8);max-width:36rem}',
      'html[data-theme=light] .home-continue .hc-copy{color:rgba(12,12,14,.75)}',
      '.home-continue .hc-copy strong{color:#e0c49a}',
      'html[data-theme=light] .home-continue .hc-copy strong{color:#7a5f32}',
      '.home-continue .hc-actions{display:flex;flex-wrap:wrap;gap:.4rem}',
      '.home-pulse{display:grid;grid-template-columns:repeat(6,1fr);gap:.55rem;margin:0 0 1.5rem}',
      '@media (max-width:900px){.home-pulse{grid-template-columns:repeat(3,1fr)}}',
      '@media (max-width:520px){.home-pulse{grid-template-columns:repeat(2,1fr)}}',
      '.pulse-card{display:flex;flex-direction:column;gap:.2rem;padding:.75rem .85rem;border-radius:10px;border:1px solid rgba(184,149,106,.22);background:#141416;text-decoration:none;cursor:pointer;transition:border-color .15s,transform .15s,background .15s}',
      '.pulse-card:hover{border-color:rgba(184,149,106,.55);background:rgba(184,149,106,.08);transform:translateY(-2px)}',
      'html[data-theme=light] .pulse-card{background:#fff;border-color:rgba(122,95,50,.22)}',
      '.pulse-card .pc-sym{font-size:.72rem;font-weight:700;letter-spacing:.05em;color:#e0c49a}',
      'html[data-theme=light] .pulse-card .pc-sym{color:#7a5f32}',
      '.pulse-card .pc-name{font-size:.7rem;color:rgba(247,245,240,.55)}',
      'html[data-theme=light] .pulse-card .pc-name{color:rgba(12,12,14,.55)}',
      '.pulse-card .pc-tag{font-size:.62rem;letter-spacing:.04em;text-transform:uppercase;opacity:.65;margin-top:.15rem}',
      '.home-digest{display:grid;grid-template-columns:1.2fr 1fr;gap:.85rem;margin:0 0 1.5rem}',
      '@media (max-width:800px){.home-digest{grid-template-columns:1fr}}',
      '.digest-panel{border:1px solid rgba(184,149,106,.22);border-radius:12px;padding:1rem 1.1rem;background:#141416}',
      'html[data-theme=light] .digest-panel{background:#fff;border-color:rgba(122,95,50,.22)}',
      '.digest-panel h3{margin:0 0 .35rem;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:#c9a87c}',
      'html[data-theme=light] .digest-panel h3{color:#7a5f32}',
      '.digest-panel p{margin:0 0 .55rem;font-size:.82rem;line-height:1.45;color:rgba(247,245,240,.72)}',
      'html[data-theme=light] .digest-panel p{color:rgba(12,12,14,.72)}',
      '.digest-bar{height:4px;border-radius:99px;background:rgba(184,149,106,.15);overflow:hidden;margin:.4rem 0 .35rem}',
      '.digest-bar > span{display:block;height:100%;width:0;background:linear-gradient(90deg,#8a6a3a,#c9a87c);transition:width .3s ease}',
      '.digest-chips{display:flex;flex-wrap:wrap;gap:.3rem}',
      '.digest-chip{padding:.28rem .55rem;border-radius:6px;font-size:.68rem;border:1px solid rgba(184,149,106,.22);background:rgba(184,149,106,.06);color:rgba(247,245,240,.75);text-decoration:none}',
      '.digest-chip:hover{border-color:rgba(184,149,106,.5);color:#c9a87c}',
      'html[data-theme=light] .digest-chip{color:rgba(12,12,14,.7);border-color:rgba(122,95,50,.22);background:rgba(122,95,50,.05)}',
      '.home-cmd-btn{padding:.4rem .75rem;border-radius:999px;cursor:pointer;border:1px solid rgba(184,149,106,.35);background:rgba(184,149,106,.1);color:#c9a87c;font-size:.7rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase}',
      '.home-cmd-btn:hover{border-color:rgba(184,149,106,.6);background:rgba(184,149,106,.16)}',
      '.home-cmd-backdrop{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.55);display:none;align-items:flex-start;justify-content:center;padding:12vh 1rem 1rem}',
      '.home-cmd-backdrop.is-open{display:flex}',
      '.home-cmd{width:min(480px,100%);background:#161618;border:1px solid rgba(184,149,106,.4);border-radius:14px;box-shadow:0 24px 64px rgba(0,0,0,.55);overflow:hidden}',
      'html[data-theme=light] .home-cmd{background:#fff;border-color:rgba(122,95,50,.35)}',
      '.home-cmd input{width:100%;border:0;border-bottom:1px solid rgba(184,149,106,.2);background:transparent;color:rgba(247,245,240,.95);padding:.9rem 1rem;font:inherit;font-size:.95rem;outline:none}',
      'html[data-theme=light] .home-cmd input{color:#0c0c0e}',
      '.home-cmd-list{max-height:300px;overflow:auto}',
      '.home-cmd-item{display:flex;justify-content:space-between;gap:.75rem;width:100%;text-align:left;padding:.65rem 1rem;border:0;background:transparent;color:rgba(247,245,240,.85);font:inherit;font-size:.85rem;cursor:pointer}',
      '.home-cmd-item:hover,.home-cmd-item.is-active{background:rgba(184,149,106,.12)}',
      '.home-cmd-item kbd{font-size:.68rem;opacity:.55}',
      'html[data-theme=light] .home-cmd-item{color:#0c0c0e}',
      '.home-toast{position:fixed;bottom:1.25rem;right:1.25rem;z-index:180;padding:.65rem 1rem;border-radius:10px;background:#1a1a1c;border:1px solid rgba(184,149,106,.4);color:rgba(247,245,240,.92);font-size:.8rem;box-shadow:0 12px 32px rgba(0,0,0,.4);opacity:0;transform:translateY(8px);transition:opacity .2s,transform .2s;pointer-events:none}',
      '.home-toast.is-show{opacity:1;transform:translateY(0)}',
      'html[data-theme=light] .home-toast{background:#fff;color:#0c0c0e;border-color:rgba(122,95,50,.35)}'
    ].join('');
    document.head.appendChild(s);
  }

  function toast(msg) {
    var el = document.getElementById('home-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'home-toast';
      el.className = 'home-toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('is-show'); }, 2000);
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function enhanceSessions() {
    var now = new Date();
    var h = now.getUTCHours();
    var m = now.getUTCMinutes();
    var el = document.getElementById('home-clock-utc');
    if (el) el.textContent = pad(h) + ':' + pad(m);

    function eta(openH, closeH) {
      var open = h >= openH && h < closeH;
      if (open) {
        var left = closeH - h;
        return { open: true, label: left <= 1 ? 'closes soon' : left + 'h left' };
      }
      var hours = openH > h ? openH - h : (24 - h + openH);
      return { open: false, label: 'in ' + hours + 'h' };
    }

    function setS(id, openH, closeH) {
      var node = document.getElementById(id);
      if (!node) return;
      var info = eta(openH, closeH);
      var st = node.querySelector('.hs-state');
      if (st) st.textContent = info.open ? 'Open' : 'Closed';
      node.classList.toggle('is-open', info.open);
      var e = node.querySelector('.hs-eta');
      if (!e) {
        e = document.createElement('span');
        e.className = 'hs-eta';
        node.appendChild(e);
      }
      e.textContent = ' · ' + info.label;
    }
    setS('home-sess-asia', 0, 9);
    setS('home-sess-london', 7, 16);
    setS('home-sess-ny', 13, 21);
  }

  function mountContinue(container) {
    var history = loadJSON('winemi-macro-history', []);
    var watchlist = loadJSON('winemi-macro-watchlist', []);
    var layout = '';
    try { layout = localStorage.getItem('winemi-macro-layout') || ''; } catch (e) {}
    var last = history[0];
    if (!last && !watchlist.length) return;

    var bar = document.createElement('div');
    bar.className = 'home-continue';
    bar.id = 'home-continue';
    var label = last ? (NAMES[last] || last) : (NAMES[watchlist[0]] || watchlist[0] || 'desk');
    var copy = document.createElement('p');
    copy.className = 'hc-copy';
    copy.innerHTML = last
      ? 'Continue study — last focus <strong>' + label + '</strong>' + (layout && layout !== 'full' ? ' · layout ' + layout : '')
      : 'Resume your watchlist on the macro desk';
    var actions = document.createElement('div');
    actions.className = 'hc-actions';
    var a1 = document.createElement('a');
    a1.className = 'btn btn-primary';
    a1.href = 'pages/education-macro.html';
    a1.textContent = 'Open desk';
    var a2 = document.createElement('a');
    a2.className = 'btn btn-secondary';
    a2.href = 'pages/education-macro.html#focus';
    a2.textContent = 'Jump to focus';
    actions.appendChild(a1);
    actions.appendChild(a2);
    bar.appendChild(copy);
    bar.appendChild(actions);
    container.insertBefore(bar, container.firstChild);
  }

  function mountPulse(container) {
    var pulse = [
      { s: 'TVC:DXY', tag: 'Dollar' },
      { s: 'TVC:US10Y', tag: 'Yields' },
      { s: 'FOREXCOM:SPXUSD', tag: 'Risk' },
      { s: 'TVC:GOLD', tag: 'Hedge' },
      { s: 'TVC:VIX', tag: 'Vol' },
      { s: 'TVC:USOIL', tag: 'Growth' }
    ];
    var wrap = document.createElement('div');
    wrap.className = 'home-pulse';
    wrap.setAttribute('aria-label', 'Market pulse');
    pulse.forEach(function (p) {
      var a = document.createElement('a');
      a.className = 'pulse-card';
      a.href = 'pages/education-macro.html#focus';
      a.innerHTML =
        '<span class="pc-sym">' + (NAMES[p.s] || p.s) + '</span>' +
        '<span class="pc-name">' + p.s + '</span>' +
        '<span class="pc-tag">' + p.tag + '</span>';
      a.addEventListener('click', function () {
        try { localStorage.setItem('winemi-macro-history', JSON.stringify([p.s].concat(loadJSON('winemi-macro-history', []).filter(function (x) { return x !== p.s; })).slice(0, 8))); } catch (e) {}
      });
      wrap.appendChild(a);
    });
    var regime = container.querySelector('.home-regime');
    if (regime && regime.parentNode) {
      var label = document.createElement('p');
      label.className = 'label section-label';
      label.style.marginTop = '0.25rem';
      label.textContent = 'Market pulse';
      regime.parentNode.insertBefore(label, regime.nextSibling);
      regime.parentNode.insertBefore(wrap, label.nextSibling);
    } else {
      container.appendChild(wrap);
    }
  }

  function mountDigest(container) {
    var workflow = loadJSON('winemi-macro-workflow', {});
    var history = loadJSON('winemi-macro-history', []);
    var watchlist = loadJSON('winemi-macro-watchlist', []);
    var steps = ['calendar', 'backdrop', 'structure', 'invalidation'];
    var done = steps.filter(function (s) { return !!workflow[s]; }).length;

    var grid = document.createElement('div');
    grid.className = 'home-digest';
    grid.id = 'home-digest';

    var left = document.createElement('div');
    left.className = 'digest-panel';
    left.innerHTML =
      '<h3>Study workflow</h3>' +
      '<p>Structure-first checklist progress from the macro desk (saved in this browser).</p>' +
      '<div class="digest-bar"><span style="width:' + (done / steps.length * 100) + '%"></span></div>' +
      '<p style="margin:0;font-size:.75rem;opacity:.75">' + done + ' / ' + steps.length + ' steps complete</p>';

    var right = document.createElement('div');
    right.className = 'digest-panel';
    var chips = (history.length ? history : watchlist).slice(0, 6);
    var chipHtml = chips.length
      ? chips.map(function (s) {
          return '<a class="digest-chip" href="pages/education-macro.html#focus">' + (NAMES[s] || s) + '</a>';
        }).join('')
      : '<span class="digest-chip">No recent focus yet</span>';
    right.innerHTML =
      '<h3>Recent focus</h3>' +
      '<p>Symbols you studied on the desk — click to reopen the workspace.</p>' +
      '<div class="digest-chips">' + chipHtml + '</div>';

    grid.appendChild(left);
    grid.appendChild(right);

    var desks = container.querySelector('.desk-quick');
    if (desks && desks.parentNode) {
      desks.parentNode.insertBefore(grid, desks.nextSibling);
    } else {
      container.appendChild(grid);
    }
  }

  var CMD = [
    { label: 'Macro & data desk', meta: 'Desk', href: 'pages/education-macro.html' },
    { label: 'Macro desk · Focus layout', meta: 'Layout', href: 'pages/education-macro.html', layout: 'focus' },
    { label: 'Macro desk · Calendar', meta: 'Layout', href: 'pages/education-macro.html', layout: 'calendar' },
    { label: 'Candlestick literacy', meta: 'Structure', href: 'pages/education-candlesticks.html' },
    { label: 'Markets workspace', meta: 'Markets', href: 'pages/markets.html' },
    { label: 'Education hub', meta: 'Learn', href: 'pages/education.html' },
    { label: 'Approach', meta: 'Firm', href: 'pages/approach.html' },
    { label: 'About', meta: 'Firm', href: 'pages/about.html' },
    { label: 'Contact', meta: 'Firm', href: 'pages/contact.html' },
    { label: 'Focus DXY', meta: 'Symbol', href: 'pages/education-macro.html#focus', symbol: 'TVC:DXY' },
    { label: 'Focus US 10Y', meta: 'Symbol', href: 'pages/education-macro.html#focus', symbol: 'TVC:US10Y' },
    { label: 'Focus Gold', meta: 'Symbol', href: 'pages/education-macro.html#focus', symbol: 'TVC:GOLD' },
    { label: 'Focus S&P 500', meta: 'Symbol', href: 'pages/education-macro.html#focus', symbol: 'FOREXCOM:SPXUSD' },
    { label: 'Focus VIX', meta: 'Symbol', href: 'pages/education-macro.html#focus', symbol: 'TVC:VIX' }
  ];

  var cmdItems = [];
  var cmdIndex = 0;

  function openCmd() {
    var bd = document.getElementById('home-cmd');
    if (!bd) return;
    bd.classList.add('is-open');
    renderCmd('');
    var input = document.getElementById('home-cmd-input');
    if (input) { input.value = ''; input.focus(); }
  }
  function closeCmd() {
    var bd = document.getElementById('home-cmd');
    if (bd) bd.classList.remove('is-open');
  }
  function goCmd(item) {
    if (!item) return;
    if (item.symbol) {
      try {
        var hist = loadJSON('winemi-macro-history', []);
        hist = [item.symbol].concat(hist.filter(function (x) { return x !== item.symbol; })).slice(0, 8);
        localStorage.setItem('winemi-macro-history', JSON.stringify(hist));
      } catch (e) {}
    }
    if (item.layout) {
      try { localStorage.setItem('winemi-macro-layout', item.layout); } catch (e) {}
    }
    window.location.href = item.href;
  }
  function renderCmd(q) {
    var list = document.getElementById('home-cmd-list');
    if (!list) return;
    q = (q || '').trim().toLowerCase();
    cmdItems = !q ? CMD.slice(0, 10) : CMD.filter(function (c) {
      return c.label.toLowerCase().indexOf(q) !== -1 || c.meta.toLowerCase().indexOf(q) !== -1;
    }).slice(0, 12);
    cmdIndex = 0;
    list.innerHTML = '';
    cmdItems.forEach(function (it, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'home-cmd-item' + (i === 0 ? ' is-active' : '');
      b.innerHTML = '<span>' + it.label + '</span><kbd>' + it.meta + '</kbd>';
      b.addEventListener('click', function () { goCmd(it); });
      list.appendChild(b);
    });
  }

  function mountCommandUI() {
    if (document.getElementById('home-cmd')) return;
    var bd = document.createElement('div');
    bd.id = 'home-cmd';
    bd.className = 'home-cmd-backdrop';
    bd.innerHTML =
      '<div class="home-cmd" role="dialog" aria-label="Command launcher">' +
      '<input type="text" id="home-cmd-input" placeholder="Jump to desk, symbol, page…" autocomplete="off" />' +
      '<div class="home-cmd-list" id="home-cmd-list"></div></div>';
    document.body.appendChild(bd);
    bd.addEventListener('click', function (e) {
      if (e.target === bd) closeCmd();
    });
    var input = document.getElementById('home-cmd-input');
    if (input) {
      input.addEventListener('input', function () { renderCmd(input.value); });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeCmd(); e.preventDefault(); }
        if (e.key === 'ArrowDown') { cmdIndex = Math.min(cmdIndex + 1, cmdItems.length - 1); e.preventDefault(); }
        if (e.key === 'ArrowUp') { cmdIndex = Math.max(cmdIndex - 1, 0); e.preventDefault(); }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          document.querySelectorAll('.home-cmd-item').forEach(function (el, i) {
            el.classList.toggle('is-active', i === cmdIndex);
          });
        }
        if (e.key === 'Enter' && cmdItems[cmdIndex]) {
          goCmd(cmdItems[cmdIndex]);
          e.preventDefault();
        }
      });
    }

    var bar = document.getElementById('home-session-bar');
    if (bar && !document.getElementById('home-cmd-open')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'home-cmd-open';
      btn.className = 'home-cmd-btn';
      btn.title = 'Command launcher (Ctrl+K)';
      btn.textContent = 'Ctrl+K';
      btn.addEventListener('click', openCmd);
      bar.appendChild(btn);
    }
  }

  function wireKeys() {
    document.addEventListener('keydown', function (e) {
      var meta = e.metaKey || e.ctrlKey;
      if (meta && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        var bd = document.getElementById('home-cmd');
        if (bd && bd.classList.contains('is-open')) closeCmd();
        else openCmd();
      }
      if (e.key === 'Escape') closeCmd();
    });
  }

  function boot() {
    injectStyles();
    enhanceSessions();
    setInterval(enhanceSessions, 30000);

    var section = document.getElementById('desk-access');
    var container = section && section.querySelector('.container');
    if (container) {
      mountContinue(container);
      mountDigest(container);
      mountPulse(container);
    }
    mountCommandUI();
    wireKeys();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
