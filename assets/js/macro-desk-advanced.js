(function () {
  'use strict';

  /* Additive advanced features for production macro-desk.js
     Regime strip · symbol search · layout presets · study levels · journal export · crypto board */

  var STORAGE_EXT = {
    levels: 'winemi-macro-levels',
    layout: 'winemi-macro-layout'
  };

  function loadJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function saveJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  var REGIME = [
    { s: 'TVC:DXY', label: 'DXY' },
    { s: 'TVC:US10Y', label: 'US 10Y' },
    { s: 'TVC:VIX', label: 'VIX' },
    { s: 'FOREXCOM:SPXUSD', label: 'S&P 500' },
    { s: 'TVC:GOLD', label: 'Gold' },
    { s: 'TVC:USOIL', label: 'WTI' }
  ];

  var CATALOG = [
    { s: 'TVC:US10Y', n: 'US 10Y' }, { s: 'TVC:DXY', n: 'DXY' },
    { s: 'TVC:GOLD', n: 'Gold' }, { s: 'FOREXCOM:SPXUSD', n: 'S&P 500' },
    { s: 'FX:EURUSD', n: 'EUR/USD' }, { s: 'TVC:USOIL', n: 'WTI' },
    { s: 'BINANCE:BTCUSDT', n: 'Bitcoin' }, { s: 'TVC:VIX', n: 'VIX' },
    { s: 'FX:GBPUSD', n: 'GBP/USD' }, { s: 'FX:USDJPY', n: 'USD/JPY' },
    { s: 'TVC:SILVER', n: 'Silver' }, { s: 'BINANCE:ETHUSDT', n: 'Ethereum' }
  ];

  function injectStyles() {
    if (document.getElementById('macro-ext-style')) return;
    var st = document.createElement('style');
    st.id = 'macro-ext-style';
    st.textContent =
      '.regime-strip{display:flex;flex-wrap:wrap;gap:.5rem;margin:0 0 1.25rem}' +
      '.regime-chip{padding:.5rem .85rem;border-radius:8px;border:1px solid rgba(184,149,106,.28);background:#161618;color:rgba(247,245,240,.8);font-size:.75rem;font-weight:600;cursor:pointer;letter-spacing:.03em}' +
      '.regime-chip:hover,.regime-chip.active{border-color:rgba(184,149,106,.65);color:#e0c49a;background:rgba(184,149,106,.12)}' +
      'html[data-theme=light] .regime-chip{background:#fff;color:rgba(12,12,14,.75);border-color:rgba(122,95,50,.25)}' +
      'html[data-theme=light] .regime-chip:hover,html[data-theme=light] .regime-chip.active{color:#7a5f32;background:rgba(122,95,50,.08);border-color:rgba(122,95,50,.45)}' +
      '.layout-presets{display:flex;flex-wrap:wrap;gap:.4rem;margin:0 0 1rem;align-items:center}' +
      '.layout-presets .label-inline{font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;color:rgba(201,168,124,.9);margin-right:.35rem;font-weight:600}' +
      '.layout-chip{padding:.35rem .7rem;border-radius:999px;border:1px solid rgba(184,149,106,.25);background:transparent;color:rgba(247,245,240,.7);font-size:.7rem;font-weight:600;cursor:pointer;letter-spacing:.04em;text-transform:uppercase}' +
      '.layout-chip.active{background:rgba(184,149,106,.14);border-color:rgba(184,149,106,.6);color:#e0c49a}' +
      'html[data-theme=light] .layout-chip{color:rgba(12,12,14,.65);border-color:rgba(122,95,50,.25)}' +
      'html[data-theme=light] .layout-chip.active{color:#7a5f32;background:rgba(122,95,50,.1);border-color:rgba(122,95,50,.45)}' +
      '.symbol-search-wrap{position:relative;margin:0 0 .75rem;max-width:22rem}' +
      '.symbol-search{width:100%;padding:.55rem .85rem;border-radius:8px;border:1px solid rgba(184,149,106,.28);background:#121214;color:rgba(247,245,240,.9);font-size:.875rem}' +
      'html[data-theme=light] .symbol-search{background:#fff;color:#0c0c0e;border-color:rgba(122,95,50,.28)}' +
      '.symbol-search-results{position:absolute;left:0;right:0;top:100%;z-index:30;margin-top:2px;border-radius:8px;border:1px solid rgba(184,149,106,.3);background:#161618;max-height:200px;overflow:auto;box-shadow:0 8px 28px rgba(0,0,0,.4)}' +
      '.symbol-search-results[hidden]{display:none}' +
      '.symbol-search-results button{display:block;width:100%;text-align:left;padding:.5rem .85rem;border:0;background:transparent;color:rgba(247,245,240,.85);font-size:.8125rem;cursor:pointer}' +
      '.symbol-search-results button:hover{background:rgba(184,149,106,.12);color:#e0c49a}' +
      'html[data-theme=light] .symbol-search-results{background:#fff;border-color:rgba(122,95,50,.28)}' +
      'html[data-theme=light] .symbol-search-results button{color:#0c0c0e}' +
      '.levels-panel textarea{width:100%;min-height:70px;resize:vertical;padding:.65rem .85rem;border-radius:8px;border:1px solid rgba(184,149,106,.25);background:#121214;color:rgba(247,245,240,.9);font-family:inherit;font-size:.875rem}' +
      'html[data-theme=light] .levels-panel textarea{background:#fff;color:#0c0c0e;border-color:rgba(122,95,50,.28)}' +
      '.level-row{display:flex;align-items:flex-start;justify-content:space-between;gap:.5rem;padding:.5rem 0;border-bottom:1px solid rgba(184,149,106,.12);font-size:.8125rem}' +
      '.level-row strong{color:#c9a87c}' +
      '.level-remove{background:none;border:none;color:rgba(247,245,240,.4);cursor:pointer;font-size:1rem}' +
      '.level-remove:hover{color:#c45c5c}' +
      '.desk-layout-focus #board,.desk-layout-focus #calendar,.desk-layout-focus #technicals,.desk-layout-focus .macro-pair-grid{display:none!important}' +
      '.desk-layout-calendar #board,.desk-layout-calendar #focus,.desk-layout-calendar #technicals,.desk-layout-calendar .macro-pair-grid{display:none!important}' +
      '.desk-layout-tools #board,.desk-layout-tools #focus,.desk-layout-tools #calendar,.desk-layout-tools #technicals,.desk-layout-tools .macro-pair-grid{display:none!important}';
    document.head.appendChild(st);
  }

  function clickSymbolChip(symbol) {
    var chip = document.querySelector('.symbol-chip[data-symbol="' + symbol + '"]');
    if (chip) { chip.click(); return; }
    var event = new CustomEvent('macro-focus-symbol', { detail: { symbol: symbol } });
    document.dispatchEvent(event);
  }

  function injectRegimeStrip() {
    if (document.getElementById('regime-strip')) return;
    var session = document.getElementById('session-bar');
    if (!session) return;
    var strip = document.createElement('div');
    strip.className = 'regime-strip';
    strip.id = 'regime-strip';
    strip.setAttribute('role', 'group');
    strip.setAttribute('aria-label', 'Regime quick focus');
    strip.innerHTML = REGIME.map(function (r) {
      return '<button type="button" class="regime-chip" data-symbol="' + r.s + '">' + r.label + '</button>';
    }).join('');
    session.parentNode.insertBefore(strip, session.nextSibling);
    strip.querySelectorAll('.regime-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        strip.querySelectorAll('.regime-chip').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        clickSymbolChip(btn.getAttribute('data-symbol'));
      });
    });
  }

  function injectLayoutPresets() {
    if (document.getElementById('layout-presets')) return;
    var toolbar = document.querySelector('.macro-toolbar') || document.getElementById('live-data');
    if (!toolbar) return;
    var bar = document.createElement('div');
    bar.className = 'layout-presets';
    bar.id = 'layout-presets';
    bar.innerHTML =
      '<span class="label-inline">Layout</span>' +
      '<button type="button" class="layout-chip active" data-layout="full">Full desk</button>' +
      '<button type="button" class="layout-chip" data-layout="focus">Focus</button>' +
      '<button type="button" class="layout-chip" data-layout="calendar">Calendar</button>' +
      '<button type="button" class="layout-chip" data-layout="tools">Tools</button>';
    toolbar.parentNode.insertBefore(bar, toolbar);
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_EXT.layout); } catch (e) {}
    function applyLayout(key) {
      document.body.classList.remove('desk-layout-focus', 'desk-layout-calendar', 'desk-layout-tools');
      if (key === 'focus') document.body.classList.add('desk-layout-focus');
      if (key === 'calendar') document.body.classList.add('desk-layout-calendar');
      if (key === 'tools') document.body.classList.add('desk-layout-tools');
      bar.querySelectorAll('.layout-chip').forEach(function (c) {
        c.classList.toggle('active', c.getAttribute('data-layout') === key);
      });
      try { localStorage.setItem(STORAGE_EXT.layout, key); } catch (e) {}
    }
    bar.querySelectorAll('.layout-chip').forEach(function (c) {
      c.addEventListener('click', function () { applyLayout(c.getAttribute('data-layout')); });
    });
    if (saved && saved !== 'full') applyLayout(saved);
  }

  function injectSymbolSearch() {
    if (document.getElementById('symbol-search')) return;
    var chips = document.getElementById('focus-chips');
    if (!chips) return;
    var wrap = document.createElement('div');
    wrap.className = 'symbol-search-wrap';
    wrap.innerHTML =
      '<input type="search" id="symbol-search" class="symbol-search" placeholder="Search symbol (DXY, Gold, BTC…)" autocomplete="off" aria-label="Search focus symbol" />' +
      '<div id="symbol-search-results" class="symbol-search-results" role="listbox" hidden></div>';
    chips.parentNode.insertBefore(wrap, chips);
    var input = wrap.querySelector('#symbol-search');
    var results = wrap.querySelector('#symbol-search-results');
    function render(q) {
      q = (q || '').trim().toLowerCase();
      if (!q) { results.hidden = true; results.innerHTML = ''; return; }
      var hits = CATALOG.filter(function (c) {
        return c.n.toLowerCase().indexOf(q) !== -1 || c.s.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 8);
      if (!hits.length) { results.hidden = true; return; }
      results.innerHTML = hits.map(function (h) {
        return '<button type="button" role="option" data-symbol="' + h.s + '">' + h.n + ' <span style="opacity:.5">' + h.s + '</span></button>';
      }).join('');
      results.hidden = false;
      results.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          clickSymbolChip(b.getAttribute('data-symbol'));
          input.value = '';
          results.hidden = true;
        });
      });
    }
    input.addEventListener('input', function () { render(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { results.hidden = true; input.blur(); }
    });
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) results.hidden = true;
    });
  }

  function injectLevelsPanel() {
    if (document.getElementById('levels-host')) return;
    var desk = document.getElementById('desk-tools');
    var hostParent = desk || document.querySelector('main .container');
    if (!hostParent) return;
    var panel = document.createElement('div');
    panel.className = 'macro-panel levels-panel';
    panel.style.cssText = 'padding:1.1rem 1.15rem;overflow:visible;margin:1.5rem 0';
    panel.innerHTML =
      '<div class="macro-panel-head" style="border:0;padding:0 0 0.75rem;background:transparent;">' +
      '<h2 style="margin:0;font-size:1.15rem;color:#f7f5f0;">Study levels</h2>' +
      '<span class="hint" style="font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:rgba(201,168,124,.95);font-weight:600;">Local invalidation notes</span></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:.65rem;">' +
      '<input type="text" id="level-symbol" placeholder="Symbol" style="flex:1;min-width:6rem;padding:.4rem .6rem;border-radius:6px;border:1px solid rgba(184,149,106,.28);background:#121214;color:#f7f5f0;font-size:.8rem;" />' +
      '<input type="text" id="level-value" placeholder="Level" style="flex:1;min-width:5rem;padding:.4rem .6rem;border-radius:6px;border:1px solid rgba(184,149,106,.28);background:#121214;color:#f7f5f0;font-size:.8rem;" />' +
      '<button type="button" class="tool-chip" id="level-add">Add</button></div>' +
      '<textarea id="level-note" placeholder="Invalidation / zone note…"></textarea>' +
      '<div id="levels-host" style="margin-top:.75rem;"></div>' +
      '<div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap;">' +
      '<button type="button" class="tool-chip" id="journal-export">Export journal</button></div>';
    if (desk) desk.appendChild(panel);
    else hostParent.appendChild(panel);

    var levels = loadJSON(STORAGE_EXT.levels, []);
    function renderLevels() {
      var h = document.getElementById('levels-host');
      if (!h) return;
      if (!levels.length) {
        h.innerHTML = '<p class="body-small" style="margin:0;opacity:.65;">No levels yet — record invalidation before high-impact prints.</p>';
        return;
      }
      h.innerHTML = levels.map(function (L, i) {
        return '<div class="level-row"><div><strong>' + (L.symbol || '—') + '</strong> @ ' + (L.level || '—') +
          (L.note ? '<div style="opacity:.75;margin-top:.2rem;">' + L.note + '</div>' : '') +
          '</div><button type="button" class="level-remove" data-i="' + i + '" aria-label="Remove">×</button></div>';
      }).join('');
      h.querySelectorAll('.level-remove').forEach(function (b) {
        b.addEventListener('click', function () {
          levels.splice(parseInt(b.getAttribute('data-i'), 10), 1);
          saveJSON(STORAGE_EXT.levels, levels);
          renderLevels();
        });
      });
    }
    renderLevels();
    var addBtn = document.getElementById('level-add');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        var sym = (document.getElementById('level-symbol') || {}).value || '';
        var val = (document.getElementById('level-value') || {}).value || '';
        var note = (document.getElementById('level-note') || {}).value || '';
        if (!sym && !val) return;
        levels.unshift({ symbol: sym.trim(), level: val.trim(), note: note.trim(), ts: Date.now() });
        saveJSON(STORAGE_EXT.levels, levels);
        if (document.getElementById('level-note')) document.getElementById('level-note').value = '';
        if (document.getElementById('level-value')) document.getElementById('level-value').value = '';
        renderLevels();
      });
    }
    var exp = document.getElementById('journal-export');
    if (exp) {
      exp.addEventListener('click', function () {
        var journal = '';
        try { journal = localStorage.getItem('winemi-macro-journal') || ''; } catch (e) {}
        var md = '# WINEMI CAPITAL — Study export\n\n## Journal\n\n' + journal + '\n\n## Levels\n\n';
        levels.forEach(function (L) {
          md += '- **' + (L.symbol || '—') + '** @ ' + (L.level || '—') + (L.note ? ' — ' + L.note : '') + '\n';
        });
        md += '\n_Educational notes only. Not investment advice._\n';
        var blob = new Blob([md], { type: 'text/markdown' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'winemi-study-' + new Date().toISOString().slice(0, 10) + '.md';
        a.click();
        URL.revokeObjectURL(a.href);
      });
    }
  }

  function injectCryptoTab() {
    var tabs = document.querySelector('.macro-tabs');
    if (!tabs || tabs.querySelector('[data-board="crypto"]')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'macro-tab';
    btn.setAttribute('data-board', 'crypto');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', 'false');
    btn.textContent = 'Crypto';
    tabs.appendChild(btn);
    btn.addEventListener('click', function () {
      tabs.querySelectorAll('.macro-tab').forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      var host = document.getElementById('board-host');
      var title = document.getElementById('board-title');
      var hint = document.getElementById('board-hint');
      if (title) title.textContent = 'Crypto overview';
      if (hint) hint.textContent = 'BTC · ETH · majors';
      if (!host) return;
      host.innerHTML = '';
      var wrap = document.createElement('div');
      wrap.className = 'tradingview-widget-container';
      wrap.style.height = '100%';
      wrap.style.width = '100%';
      var inner = document.createElement('div');
      inner.className = 'tradingview-widget-container__widget';
      inner.style.height = '100%';
      inner.style.width = '100%';
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
      s.async = true;
      s.text = JSON.stringify({
        colorTheme: 'dark', dateRange: '1M', showChart: true, locale: 'en',
        width: '100%', height: '100%', isTransparent: true, showSymbolLogo: true,
        tabs: [{ title: 'Crypto', symbols: [
          { s: 'BINANCE:BTCUSDT', d: 'Bitcoin' },
          { s: 'BINANCE:ETHUSDT', d: 'Ethereum' },
          { s: 'BINANCE:SOLUSDT', d: 'Solana' },
          { s: 'BINANCE:BNBUSDT', d: 'BNB' }
        ]}]
      });
      wrap.appendChild(inner);
      wrap.appendChild(s);
      host.appendChild(wrap);
    });
  }

  function expandShortcuts() {
    var help = document.getElementById('shortcut-help');
    if (help && help.querySelector('dl') && !help.getAttribute('data-ext')) {
      help.setAttribute('data-ext', '1');
      var dl = help.querySelector('dl');
      dl.innerHTML +=
        '<dt>/</dt><dd>Focus symbol search</dd>' +
        '<dt>E</dt><dd>Export journal</dd>' +
        '<dt>L</dt><dd>Cycle layout</dd>';
    }
    document.addEventListener('keydown', function (e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) return;
      var k = e.key.toLowerCase();
      if (k === '/') {
        var search = document.getElementById('symbol-search');
        if (search) { search.focus(); e.preventDefault(); }
      }
      if (k === 'e') {
        var exp = document.getElementById('journal-export');
        if (exp) { exp.click(); e.preventDefault(); }
      }
      if (k === 'l') {
        var chips = document.querySelectorAll('.layout-chip');
        if (!chips.length) return;
        var idx = 0;
        chips.forEach(function (c, i) { if (c.classList.contains('active')) idx = i; });
        var next = chips[(idx + 1) % chips.length];
        if (next) next.click();
        e.preventDefault();
      }
    });
  }

  function boot() {
    injectStyles();
    injectRegimeStrip();
    injectLayoutPresets();
    injectSymbolSearch();
    injectLevelsPanel();
    injectCryptoTab();
    expandShortcuts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
