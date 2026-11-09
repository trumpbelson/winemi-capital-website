(function () {
  'use strict';

  var STORAGE = {
    visible: 'winemi-macro-data-visible',
    watchlist: 'winemi-macro-watchlist',
    journal: 'winemi-macro-journal',
    workflow: 'winemi-macro-workflow',
    interval: 'winemi-macro-interval',
    compare: 'winemi-macro-compare',
    levels: 'winemi-macro-levels',
    layout: 'winemi-macro-layout',
    density: 'winemi-macro-density',
    history: 'winemi-macro-history'
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

  var focusNames = {
    'TVC:US10Y': 'US 10-year yield', 'TVC:US02Y': 'US 2-year yield', 'TVC:DXY': 'US Dollar Index',
    'TVC:GOLD': 'Gold', 'TVC:SILVER': 'Silver', 'FOREXCOM:SPXUSD': 'S&P 500',
    'FOREXCOM:NSXUSD': 'NASDAQ 100', 'FX:EURUSD': 'EUR/USD', 'FX:GBPUSD': 'GBP/USD',
    'FX:USDJPY': 'USD/JPY', 'FX:AUDUSD': 'AUD/USD', 'TVC:USOIL': 'WTI Crude',
    'TVC:COPPER': 'Copper', 'BINANCE:BTCUSDT': 'Bitcoin', 'BINANCE:ETHUSDT': 'Ethereum',
    'TVC:VIX': 'VIX', 'TVC:NI225': 'Nikkei 225', 'INDEX:DEU40': 'DAX'
  };
  var CATALOG = Object.keys(focusNames).map(function (s) {
    return { s: s, n: focusNames[s] };
  });

  var BASKETS = {
    riskon: ['FOREXCOM:SPXUSD', 'FOREXCOM:NSXUSD', 'BINANCE:BTCUSDT', 'TVC:COPPER', 'FX:AUDUSD'],
    riskoff: ['TVC:GOLD', 'TVC:US10Y', 'TVC:DXY', 'TVC:VIX', 'FX:USDJPY'],
    rates: ['TVC:US10Y', 'TVC:US02Y', 'TVC:DXY', 'FX:EURUSD', 'FOREXCOM:SPXUSD'],
    commod: ['TVC:GOLD', 'TVC:SILVER', 'TVC:USOIL', 'TVC:COPPER'],
    fx: ['FX:EURUSD', 'FX:GBPUSD', 'FX:USDJPY', 'FX:AUDUSD', 'TVC:DXY']
  };

  var JOURNAL_TPL = {
    event: '## Event risk\n- Event:\n- Consensus / prior:\n- Structure note:\n- Invalidation:\n',
    regime: '## Regime read\n- DXY:\n- US 10Y:\n- Equities:\n- Gold:\n- Bias:\n',
    invalidation: '## Invalidation\n- Symbol:\n- Level:\n- Condition that breaks thesis:\n- Timeframe:\n'
  };

  var currentSymbol = 'TVC:US10Y';
  var currentInterval = (function () {
    try { return localStorage.getItem(STORAGE.interval) || 'D'; } catch (e) { return 'D'; }
  })();
  var compareOn = (function () {
    try { return localStorage.getItem(STORAGE.compare) === '1'; } catch (e) { return false; }
  })();
  var compareSymbol = 'TVC:DXY';
  var history = loadJSON(STORAGE.history, []);

  /* ---------- Toast ---------- */
  function toast(msg) {
    var el = document.getElementById('desk-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('is-show'); }, 2200);
  }

  /* ---------- Session clock + ETA ---------- */
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function hoursUntil(openH, closeH, utcH) {
    var open = utcH >= openH && utcH < closeH;
    if (open) {
      var left = closeH - utcH;
      return { open: true, label: left <= 1 ? 'closes soon' : left + 'h left' };
    }
    var eta = openH > utcH ? openH - utcH : (24 - utcH + openH);
    return { open: false, label: 'in ' + eta + 'h' };
  }
  function updateClock() {
    var now = new Date();
    var utcH = now.getUTCHours();
    var utcM = now.getUTCMinutes();
    var el = document.getElementById('clock-utc');
    if (el) el.textContent = pad(utcH) + ':' + pad(utcM);
    function setSess(id, openH, closeH, etaId) {
      var node = document.getElementById(id);
      if (!node) return;
      var info = hoursUntil(openH, closeH, utcH);
      var st = node.querySelector('.sess-state');
      if (st) st.textContent = info.open ? 'Open' : 'Closed';
      node.classList.toggle('open', info.open);
      var eta = document.getElementById(etaId);
      if (eta) eta.textContent = info.label ? ' · ' + info.label : '';
    }
    setSess('sess-asia', 0, 9, 'eta-asia');
    setSess('sess-london', 7, 16, 'eta-london');
    setSess('sess-ny', 13, 21, 'eta-ny');
  }
  updateClock();
  setInterval(updateClock, 30000);

  /* ---------- Density ---------- */
  function applyDensity(key) {
    document.body.classList.toggle('desk-density-compact', key === 'compact');
    document.querySelectorAll('.density-chip').forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-density') === key);
    });
    try { localStorage.setItem(STORAGE.density, key); } catch (e) {}
  }
  document.querySelectorAll('.density-chip').forEach(function (c) {
    c.addEventListener('click', function () {
      applyDensity(c.getAttribute('data-density'));
      toast(c.getAttribute('data-density') === 'compact' ? 'Compact density' : 'Comfortable density');
    });
  });
  try {
    var savedDen = localStorage.getItem(STORAGE.density);
    if (savedDen === 'compact') applyDensity('compact');
  } catch (e) {}

  /* ---------- Layout presets ---------- */
  function applyLayout(key) {
    document.body.classList.remove('desk-layout-focus', 'desk-layout-calendar', 'desk-layout-tools');
    if (key === 'focus') document.body.classList.add('desk-layout-focus');
    if (key === 'calendar') {
      document.body.classList.add('desk-layout-calendar');
      activateDeskPanel('calendar');
    }
    if (key === 'tools') document.body.classList.add('desk-layout-tools');
    document.querySelectorAll('.layout-chip').forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-layout') === key);
    });
    try { localStorage.setItem(STORAGE.layout, key); } catch (e) {}
  }
  document.querySelectorAll('.layout-chip').forEach(function (c) {
    c.addEventListener('click', function () {
      applyLayout(c.getAttribute('data-layout'));
      toast('Layout: ' + c.getAttribute('data-layout'));
    });
  });
  try {
    var savedLayout = localStorage.getItem(STORAGE.layout);
    if (savedLayout && savedLayout !== 'full') applyLayout(savedLayout);
  } catch (e) {}

  /* ---------- Show / hide live data ---------- */
  var btn = document.getElementById('macro-data-toggle');
  var panel = document.getElementById('macro-data-section');
  var label = btn && btn.querySelector('.macro-toggle-label');
  function applyVisible(show) {
    if (!panel || !btn) return;
    panel.classList.toggle('is-hidden', !show);
    btn.setAttribute('aria-expanded', show ? 'true' : 'false');
    if (label) label.textContent = show ? 'Hide live data' : 'Show live data';
    try { localStorage.setItem(STORAGE.visible, show ? '1' : '0'); } catch (e) {}
  }
  if (btn && panel) {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE.visible); } catch (e) {}
    applyVisible(stored !== '0');
    btn.addEventListener('click', function () {
      applyVisible(btn.getAttribute('aria-expanded') !== 'true');
    });
  }

  /* ---------- Boards ---------- */
  var boardHost = document.getElementById('board-host');
  var boardTitle = document.getElementById('board-title');
  var boardHint = document.getElementById('board-hint');
  var boards = {
    overview: {
      title: 'Cross-asset overview', hint: 'Indices · rates · FX · commodities',
      src: 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
      cfg: {
        colorTheme: 'dark', dateRange: '1M', showChart: true, locale: 'en',
        width: '100%', height: '100%', isTransparent: true, showSymbolLogo: true, showFloatingTooltip: true,
        tabs: [
          { title: 'Indices', symbols: [
            { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' }, { s: 'FOREXCOM:NSXUSD', d: 'NASDAQ 100' },
            { s: 'INDEX:DEU40', d: 'DAX' }, { s: 'TVC:NI225', d: 'Nikkei 225' }
          ]},
          { title: 'Rates & FX', symbols: [
            { s: 'TVC:US10Y', d: 'US 10Y' }, { s: 'TVC:US02Y', d: 'US 2Y' },
            { s: 'TVC:DXY', d: 'DXY' }, { s: 'FX:EURUSD', d: 'EUR/USD' }, { s: 'FX:USDJPY', d: 'USD/JPY' }
          ]},
          { title: 'Commodities', symbols: [
            { s: 'TVC:GOLD', d: 'Gold' }, { s: 'TVC:SILVER', d: 'Silver' },
            { s: 'TVC:USOIL', d: 'WTI' }, { s: 'TVC:COPPER', d: 'Copper' }
          ]}
        ]
      }
    },
    forex: {
      title: 'Forex cross rates', hint: 'Major pairs matrix',
      src: 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js',
      cfg: { width: '100%', height: '100%', currencies: ['EUR','USD','JPY','GBP','CHF','AUD','CAD','NZD','CNY'], isTransparent: true, colorTheme: 'dark', locale: 'en' }
    },
    heatmap: {
      title: 'Stock heatmap', hint: 'SPX sector rotation',
      src: 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js',
      cfg: { dataSource: 'SPX500', grouping: 'sector', blockSize: 'market_cap_basic', blockColor: 'change', locale: 'en', colorTheme: 'dark', hasTopBar: false, isZoomEnabled: true, hasSymbolTooltip: true, width: '100%', height: '100%' }
    },
    crypto: {
      title: 'Crypto overview', hint: 'BTC · ETH · majors',
      src: 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
      cfg: {
        colorTheme: 'dark', dateRange: '1M', showChart: true, locale: 'en',
        width: '100%', height: '100%', isTransparent: true, showSymbolLogo: true,
        tabs: [{ title: 'Crypto', symbols: [
          { s: 'BINANCE:BTCUSDT', d: 'Bitcoin' }, { s: 'BINANCE:ETHUSDT', d: 'Ethereum' },
          { s: 'BINANCE:SOLUSDT', d: 'Solana' }, { s: 'BINANCE:BNBUSDT', d: 'BNB' }
        ]}]
      }
    }
  };

  function loadBoard(key) {
    var spec = boards[key];
    if (!spec || !boardHost) return;
    boardHost.innerHTML = '';
    if (boardTitle) boardTitle.textContent = spec.title;
    if (boardHint) boardHint.textContent = spec.hint;
    var wrap = document.createElement('div');
    wrap.className = 'tradingview-widget-container';
    wrap.style.height = '100%'; wrap.style.width = '100%';
    var inner = document.createElement('div');
    inner.className = 'tradingview-widget-container__widget';
    inner.style.height = '100%'; inner.style.width = '100%';
    var s = document.createElement('script');
    s.type = 'text/javascript'; s.src = spec.src; s.async = true;
    s.text = JSON.stringify(spec.cfg);
    wrap.appendChild(inner); wrap.appendChild(s);
    boardHost.appendChild(wrap);
  }

  document.querySelectorAll('.macro-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.macro-tab').forEach(function (t) {
        t.classList.remove('active'); t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
      loadBoard(tab.getAttribute('data-board'));
    });
  });
  loadBoard('overview');

  /* ---------- Secondary desk tabs ---------- */
  function activateDeskPanel(key) {
    document.querySelectorAll('.desk-tab').forEach(function (t) {
      var on = t.getAttribute('data-panel') === key;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('.desk-tab-panel').forEach(function (p) {
      p.classList.toggle('is-active', p.getAttribute('data-panel') === key);
    });
    if (key === 'board') loadBoard(
      (document.querySelector('.macro-tab.active') || {}).getAttribute('data-board') || 'overview'
    );
    if (key === 'technicals') loadTechnicals(currentSymbol);
  }
  document.querySelectorAll('.desk-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateDeskPanel(tab.getAttribute('data-panel'));
    });
  });

  /* ---------- Technicals (sync with focus) ---------- */
  function loadTechnicals(symbol) {
    var host = document.getElementById('ta-host');
    var title = document.getElementById('ta-title');
    var hint = document.getElementById('ta-hint');
    if (!host) return;
    host.innerHTML = '';
    if (title) title.textContent = (focusNames[symbol] || symbol) + ' technicals';
    if (hint) hint.textContent = symbol + ' · syncs with focus';
    var wrap = document.createElement('div');
    wrap.className = 'tradingview-widget-container';
    wrap.style.height = '100%'; wrap.style.width = '100%';
    var inner = document.createElement('div');
    inner.className = 'tradingview-widget-container__widget';
    inner.style.height = '100%'; inner.style.width = '100%';
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    s.async = true;
    s.text = JSON.stringify({
      interval: '1D', width: '100%', isTransparent: true, height: '100%',
      symbol: symbol, showIntervalTabs: true, displayMode: 'single', locale: 'en', colorTheme: 'dark'
    });
    wrap.appendChild(inner); wrap.appendChild(s);
    host.appendChild(wrap);
  }

  /* ---------- Focus history ---------- */
  function pushHistory(symbol) {
    history = history.filter(function (s) { return s !== symbol; });
    history.unshift(symbol);
    if (history.length > 8) history = history.slice(0, 8);
    saveJSON(STORAGE.history, history);
    renderHistory();
  }
  function renderHistory() {
    var host = document.getElementById('focus-history');
    if (!host) return;
    host.innerHTML = '';
    history.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'history-chip';
      b.textContent = focusNames[s] || s;
      b.addEventListener('click', function () { loadFocus(s, currentInterval); });
      host.appendChild(b);
    });
  }
  renderHistory();

  /* ---------- Focus chart ---------- */
  function setActiveSymbolUI(symbol) {
    document.querySelectorAll('.symbol-chip').forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-symbol') === symbol);
    });
    document.querySelectorAll('.regime-chip').forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-symbol') === symbol);
    });
  }

  function loadFocus(symbol, interval) {
    if (symbol) currentSymbol = symbol;
    if (interval) currentInterval = interval;
    var host = document.getElementById('macro-focus-chart');
    var title = document.getElementById('focus-title');
    var hint = document.getElementById('focus-hint');
    if (!host || typeof TradingView === 'undefined') return;
    host.innerHTML = '';
    var name = focusNames[currentSymbol] || currentSymbol;
    if (title) {
      title.textContent = compareOn
        ? name + ' vs ' + (focusNames[compareSymbol] || compareSymbol)
        : name;
    }
    if (hint) hint.textContent = currentSymbol + ' · ' + currentInterval + (compareOn ? ' · compare' : '');
    var studies = ['STD;SMA'];
    if (compareOn && compareSymbol && compareSymbol !== currentSymbol) {
      studies.push({ id: 'Compare@tv-basicstudies', inputs: { symbol: compareSymbol } });
    }
    new TradingView.widget({
      container_id: 'macro-focus-chart', symbol: currentSymbol, interval: currentInterval,
      timezone: 'Etc/UTC', theme: 'dark', style: '1', locale: 'en', toolbar_bg: '#0e0e10',
      enable_publishing: false, hide_top_toolbar: false, hide_legend: false, save_image: false,
      allow_symbol_change: true, height: host.clientHeight || 500, width: '100%', studies: studies
    });
    try { localStorage.setItem(STORAGE.interval, currentInterval); } catch (e) {}
    setActiveSymbolUI(currentSymbol);
    document.querySelectorAll('.tf-chip').forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-tf') === currentInterval);
    });
    var cb = document.getElementById('compare-toggle');
    if (cb) {
      cb.classList.toggle('active', compareOn);
      cb.setAttribute('aria-pressed', compareOn ? 'true' : 'false');
      cb.textContent = compareOn ? 'Compare on' : 'Compare off';
    }
    pushHistory(currentSymbol);
    var taPanel = document.querySelector('.desk-tab-panel[data-panel="technicals"]');
    if (taPanel && taPanel.classList.contains('is-active')) loadTechnicals(currentSymbol);
    var levelSym = document.getElementById('level-symbol');
    if (levelSym && !levelSym.value) levelSym.value = currentSymbol;
  }

  function bootFocus() {
    if (typeof TradingView !== 'undefined') loadFocus(currentSymbol, currentInterval);
    else setTimeout(bootFocus, 200);
  }
  bootFocus();

  document.querySelectorAll('.symbol-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      loadFocus(chip.getAttribute('data-symbol'), currentInterval);
    });
  });
  document.querySelectorAll('.regime-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      loadFocus(chip.getAttribute('data-symbol'), currentInterval);
      var focus = document.getElementById('focus');
      if (focus) focus.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  document.querySelectorAll('.tf-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      loadFocus(currentSymbol, chip.getAttribute('data-tf'));
    });
  });

  var compareBtn = document.getElementById('compare-toggle');
  if (compareBtn) {
    compareBtn.addEventListener('click', function () {
      compareOn = !compareOn;
      try { localStorage.setItem(STORAGE.compare, compareOn ? '1' : '0'); } catch (e) {}
      loadFocus(currentSymbol, currentInterval);
      toast(compareOn ? 'Compare on' : 'Compare off');
    });
  }
  var compareSelect = document.getElementById('compare-symbol');
  if (compareSelect) {
    compareSelect.value = compareSymbol;
    compareSelect.addEventListener('change', function () {
      compareSymbol = compareSelect.value;
      if (compareOn) loadFocus(currentSymbol, currentInterval);
    });
  }

  /* ---------- Baskets ---------- */
  document.querySelectorAll('.basket-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var key = chip.getAttribute('data-basket');
      var list = BASKETS[key] || [];
      document.querySelectorAll('.basket-chip').forEach(function (c) {
        c.classList.toggle('active', c === chip);
      });
      if (list.length) {
        loadFocus(list[0], currentInterval);
        var wl = loadJSON(STORAGE.watchlist, []);
        list.forEach(function (s) {
          if (wl.indexOf(s) === -1) wl.unshift(s);
        });
        if (wl.length > 16) wl = wl.slice(0, 16);
        saveJSON(STORAGE.watchlist, wl);
        renderWatchlist();
        toast('Basket: ' + key + ' · ' + list.length + ' symbols');
      }
    });
  });

  /* ---------- Symbol search ---------- */
  var searchInput = document.getElementById('symbol-search');
  var searchResults = document.getElementById('symbol-search-results');
  if (searchInput && searchResults) {
    function renderSearch(q) {
      q = (q || '').trim().toLowerCase();
      if (!q) { searchResults.hidden = true; searchResults.innerHTML = ''; return; }
      var hits = CATALOG.filter(function (c) {
        return c.n.toLowerCase().indexOf(q) !== -1 || c.s.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 10);
      searchResults.innerHTML = '';
      hits.forEach(function (h) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'option');
        b.textContent = h.n + '  ·  ' + h.s;
        b.addEventListener('click', function () {
          loadFocus(h.s, currentInterval);
          searchResults.hidden = true;
          searchInput.value = '';
        });
        searchResults.appendChild(b);
      });
      searchResults.hidden = !hits.length;
    }
    searchInput.addEventListener('input', function () { renderSearch(searchInput.value); });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { searchResults.hidden = true; searchInput.blur(); }
      if (e.key === 'Enter') {
        var first = searchResults.querySelector('button');
        if (first) first.click();
      }
    });
    document.addEventListener('click', function (e) {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.hidden = true;
      }
    });
  }

  /* ---------- Watchlist ---------- */
  var watchlist = loadJSON(STORAGE.watchlist, ['TVC:US10Y', 'TVC:DXY', 'TVC:GOLD']);
  function renderWatchlist() {
    var host = document.getElementById('watchlist-host');
    if (!host) return;
    host.innerHTML = '';
    watchlist.forEach(function (s, idx) {
      var row = document.createElement('div');
      row.className = 'watch-row';
      var label = document.createElement('span');
      label.textContent = focusNames[s] || s;
      label.addEventListener('click', function () { loadFocus(s, currentInterval); });
      var rm = document.createElement('button');
      rm.type = 'button'; rm.setAttribute('aria-label', 'Remove'); rm.textContent = '×';
      rm.addEventListener('click', function (e) {
        e.stopPropagation();
        watchlist.splice(idx, 1);
        saveJSON(STORAGE.watchlist, watchlist);
        renderWatchlist();
      });
      row.appendChild(label); row.appendChild(rm);
      host.appendChild(row);
    });
  }
  renderWatchlist();
  var watchAdd = document.getElementById('watchlist-add');
  if (watchAdd) {
    watchAdd.addEventListener('click', function () {
      if (watchlist.indexOf(currentSymbol) === -1) {
        watchlist.unshift(currentSymbol);
        if (watchlist.length > 16) watchlist.pop();
        saveJSON(STORAGE.watchlist, watchlist);
        renderWatchlist();
        toast('Added to watchlist');
      } else toast('Already on watchlist');
    });
  }

  /* ---------- Journal + templates ---------- */
  var journalEl = document.getElementById('macro-journal');
  var journalStatus = document.getElementById('journal-status');
  if (journalEl) {
    try { journalEl.value = localStorage.getItem(STORAGE.journal) || ''; } catch (e) {}
  }
  function setJournalStatus(msg) {
    if (journalStatus) {
      journalStatus.textContent = msg;
      setTimeout(function () { if (journalStatus) journalStatus.textContent = ''; }, 1800);
    }
  }
  var journalSave = document.getElementById('journal-save');
  if (journalSave && journalEl) {
    journalSave.addEventListener('click', function () {
      try { localStorage.setItem(STORAGE.journal, journalEl.value); } catch (e) {}
      setJournalStatus('Saved');
      toast('Journal saved');
    });
  }
  var journalClear = document.getElementById('journal-clear');
  if (journalClear && journalEl) {
    journalClear.addEventListener('click', function () {
      journalEl.value = '';
      try { localStorage.setItem(STORAGE.journal, ''); } catch (e) {}
      setJournalStatus('Cleared');
    });
  }
  document.querySelectorAll('.template-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var key = chip.getAttribute('data-tpl');
      var tpl = JOURNAL_TPL[key];
      if (!tpl || !journalEl) return;
      journalEl.value = (journalEl.value ? journalEl.value.replace(/\s*$/, '') + '\n\n' : '') + tpl;
      journalEl.focus();
      toast('Template: ' + key);
    });
  });

  /* ---------- Levels ---------- */
  var levels = loadJSON(STORAGE.levels, []);
  function renderLevels() {
    var host = document.getElementById('levels-host');
    if (!host) return;
    host.innerHTML = '';
    levels.forEach(function (L, idx) {
      var row = document.createElement('div');
      row.className = 'level-row';
      var txt = document.createElement('span');
      txt.textContent = (L.symbol || '—') + ' @ ' + (L.level || '—') + (L.note ? ' · ' + L.note : '');
      var rm = document.createElement('button');
      rm.type = 'button'; rm.textContent = '×'; rm.setAttribute('aria-label', 'Remove level');
      rm.addEventListener('click', function () {
        levels.splice(idx, 1);
        saveJSON(STORAGE.levels, levels);
        renderLevels();
      });
      row.appendChild(txt); row.appendChild(rm);
      host.appendChild(row);
    });
  }
  renderLevels();
  var levelAdd = document.getElementById('level-add');
  if (levelAdd) {
    levelAdd.addEventListener('click', function () {
      var sym = (document.getElementById('level-symbol') || {}).value || '';
      var val = (document.getElementById('level-value') || {}).value || '';
      var note = (document.getElementById('level-note') || {}).value || '';
      if (!sym.trim() && !val.trim()) return;
      levels.unshift({ symbol: sym.trim(), level: val.trim(), note: note.trim(), ts: Date.now() });
      saveJSON(STORAGE.levels, levels);
      if (document.getElementById('level-note')) document.getElementById('level-note').value = '';
      if (document.getElementById('level-value')) document.getElementById('level-value').value = '';
      renderLevels();
      toast('Level added');
    });
  }

  /* ---------- Workflow ---------- */
  var workflow = loadJSON(STORAGE.workflow, {});
  function syncWorkflow() {
    var total = 0, done = 0;
    document.querySelectorAll('.macro-checklist li').forEach(function (li) {
      var step = li.getAttribute('data-step');
      var input = li.querySelector('input');
      if (!input || !step) return;
      total++;
      input.checked = !!workflow[step];
      if (input.checked) done++;
      input.onchange = function () {
        workflow[step] = input.checked;
        saveJSON(STORAGE.workflow, workflow);
        syncWorkflow();
      };
    });
    var bar = document.getElementById('workflow-progress-bar');
    var lab = document.getElementById('workflow-progress-label');
    if (bar) bar.style.width = (total ? (done / total) * 100 : 0) + '%';
    if (lab) lab.textContent = done + ' / ' + total;
  }
  syncWorkflow();

  /* ---------- Export ---------- */
  function exportJournal() {
    var j = '';
    try { j = localStorage.getItem(STORAGE.journal) || ''; } catch (e) {}
    var md = '# WINEMI CAPITAL — Study export\n\n## Journal\n\n' + j + '\n\n## Levels\n\n';
    levels.forEach(function (L) {
      md += '- **' + (L.symbol || '—') + '** @ ' + (L.level || '—') + (L.note ? ' — ' + L.note : '') + '\n';
    });
    md += '\n## Watchlist\n\n';
    watchlist.forEach(function (s) { md += '- ' + (focusNames[s] || s) + ' (`' + s + '`)\n'; });
    md += '\n_Educational notes only. Not investment advice._\n';
    var blob = new Blob([md], { type: 'text/markdown' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'winemi-study-' + new Date().toISOString().slice(0, 10) + '.md';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('Exported study notes');
  }
  var journalExport = document.getElementById('journal-export');
  if (journalExport) journalExport.addEventListener('click', exportJournal);

  /* ---------- Fullscreen ---------- */
  var fsBtn = document.getElementById('focus-fullscreen');
  var focusPanel = document.getElementById('focus-panel');
  if (fsBtn && focusPanel) {
    fsBtn.addEventListener('click', function () {
      if (!document.fullscreenElement) focusPanel.requestFullscreen && focusPanel.requestFullscreen();
      else document.exitFullscreen && document.exitFullscreen();
    });
  }

  /* ---------- Command palette ---------- */
  var palette = document.getElementById('cmd-palette');
  var paletteInput = document.getElementById('cmd-palette-input');
  var paletteList = document.getElementById('cmd-palette-list');
  var paletteItems = [];
  var paletteIndex = 0;

  function buildPaletteItems() {
    var items = [];
    CATALOG.forEach(function (c) {
      items.push({ type: 'symbol', label: c.n, meta: c.s, run: function () { loadFocus(c.s, currentInterval); closePalette(); } });
    });
    ['full', 'focus', 'calendar', 'tools'].forEach(function (L) {
      items.push({ type: 'layout', label: 'Layout: ' + L, meta: 'L', run: function () { applyLayout(L); closePalette(); } });
    });
    ['board', 'calendar', 'technicals', 'gauges'].forEach(function (p) {
      items.push({ type: 'panel', label: 'Panel: ' + p, meta: 'Tab', run: function () { activateDeskPanel(p); closePalette(); } });
    });
    Object.keys(BASKETS).forEach(function (b) {
      items.push({
        type: 'basket', label: 'Basket: ' + b, meta: 'Preset',
        run: function () {
          var chip = document.querySelector('.basket-chip[data-basket="' + b + '"]');
          if (chip) chip.click();
          closePalette();
        }
      });
    });
    items.push({ type: 'action', label: 'Toggle compare', meta: 'C', run: function () { if (compareBtn) compareBtn.click(); closePalette(); } });
    items.push({ type: 'action', label: 'Export journal', meta: 'E', run: function () { exportJournal(); closePalette(); } });
    items.push({ type: 'action', label: 'Toggle density', meta: 'D', run: function () {
      var next = document.body.classList.contains('desk-density-compact') ? 'comfortable' : 'compact';
      applyDensity(next); closePalette();
    }});
    return items;
  }

  function renderPalette(q) {
    if (!paletteList) return;
    q = (q || '').trim().toLowerCase();
    var all = buildPaletteItems();
    paletteItems = !q ? all.slice(0, 12) : all.filter(function (it) {
      return it.label.toLowerCase().indexOf(q) !== -1 || (it.meta || '').toLowerCase().indexOf(q) !== -1;
    }).slice(0, 14);
    paletteIndex = 0;
    paletteList.innerHTML = '';
    paletteItems.forEach(function (it, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cmd-palette-item' + (i === 0 ? ' is-active' : '');
      b.innerHTML = '<span>' + it.label + '</span><kbd>' + (it.meta || it.type) + '</kbd>';
      b.addEventListener('click', function () { it.run(); });
      paletteList.appendChild(b);
    });
  }

  function openPalette() {
    if (!palette) return;
    palette.classList.add('is-open');
    palette.setAttribute('aria-hidden', 'false');
    renderPalette('');
    if (paletteInput) { paletteInput.value = ''; paletteInput.focus(); }
  }
  function closePalette() {
    if (!palette) return;
    palette.classList.remove('is-open');
    palette.setAttribute('aria-hidden', 'true');
  }
  var paletteOpenBtn = document.getElementById('cmd-palette-open');
  if (paletteOpenBtn) paletteOpenBtn.addEventListener('click', openPalette);
  if (palette) {
    palette.addEventListener('click', function (e) {
      if (e.target === palette) closePalette();
    });
  }
  if (paletteInput) {
    paletteInput.addEventListener('input', function () { renderPalette(paletteInput.value); });
    paletteInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closePalette(); e.preventDefault(); }
      if (e.key === 'ArrowDown') {
        paletteIndex = Math.min(paletteIndex + 1, paletteItems.length - 1);
        e.preventDefault();
      }
      if (e.key === 'ArrowUp') {
        paletteIndex = Math.max(paletteIndex - 1, 0);
        e.preventDefault();
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        paletteList.querySelectorAll('.cmd-palette-item').forEach(function (el, i) {
          el.classList.toggle('is-active', i === paletteIndex);
        });
      }
      if (e.key === 'Enter' && paletteItems[paletteIndex]) {
        paletteItems[paletteIndex].run();
        e.preventDefault();
      }
    });
  }

  /* ---------- Shortcuts ---------- */
  var help = document.getElementById('shortcut-help');
  var helpOpen = document.getElementById('shortcut-open');
  if (helpOpen && help) {
    helpOpen.addEventListener('click', function () { help.classList.toggle('is-open'); });
  }
  document.addEventListener('keydown', function (e) {
    var meta = e.metaKey || e.ctrlKey;
    if (meta && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (palette && palette.classList.contains('is-open')) closePalette();
      else openPalette();
      return;
    }
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) {
      if (e.key === 'Escape') {
        if (palette && palette.classList.contains('is-open')) closePalette();
      }
      return;
    }
    var k = e.key.toLowerCase();
    if (k === '?' || (e.shiftKey && k === '/')) { if (help) help.classList.toggle('is-open'); e.preventDefault(); }
    if (k === 'h') { if (btn) btn.click(); e.preventDefault(); }
    if (k === 'c') { if (compareBtn) compareBtn.click(); e.preventDefault(); }
    if (k === '1' || k === '2' || k === '3' || k === '4') {
      var map = { '1': 'D', '2': '240', '3': '60', '4': 'W' };
      loadFocus(currentSymbol, map[k]); e.preventDefault();
    }
    if (k === '/') {
      if (searchInput) { searchInput.focus(); e.preventDefault(); }
    }
    if (k === 'e') { exportJournal(); e.preventDefault(); }
    if (k === 'd') {
      var next = document.body.classList.contains('desk-density-compact') ? 'comfortable' : 'compact';
      applyDensity(next);
      toast(next === 'compact' ? 'Compact density' : 'Comfortable density');
      e.preventDefault();
    }
    if (k === 'l') {
      var chips = document.querySelectorAll('.layout-chip');
      if (!chips.length) return;
      var idx = 0;
      chips.forEach(function (c, i) { if (c.classList.contains('active')) idx = i; });
      var nextChip = chips[(idx + 1) % chips.length];
      if (nextChip) nextChip.click();
      e.preventDefault();
    }
    if (k === 'escape') {
      if (help) help.classList.remove('is-open');
      closePalette();
    }
  });
  var helpClose = document.getElementById('shortcut-help-close');
  if (helpClose && help) {
    helpClose.addEventListener('click', function () { help.classList.remove('is-open'); });
  }
})();
