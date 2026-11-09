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

  var focusNames = {
    'TVC:US10Y': 'US 10-year yield', 'TVC:DXY': 'US Dollar Index', 'TVC:GOLD': 'Gold',
    'FOREXCOM:SPXUSD': 'S&P 500', 'FX:EURUSD': 'EUR/USD', 'TVC:USOIL': 'WTI Crude',
    'BINANCE:BTCUSDT': 'Bitcoin', 'TVC:VIX': 'VIX', 'FX:GBPUSD': 'GBP/USD',
    'FX:USDJPY': 'USD/JPY', 'TVC:SILVER': 'Silver', 'BINANCE:ETHUSDT': 'Ethereum'
  };
  var CATALOG = Object.keys(focusNames).map(function (s) {
    return { s: s, n: focusNames[s] };
  });

  var currentSymbol = 'TVC:US10Y';
  var currentInterval = (function () {
    try { return localStorage.getItem(STORAGE.interval) || 'D'; } catch (e) { return 'D'; }
  })();
  var compareOn = (function () {
    try { return localStorage.getItem(STORAGE.compare) === '1'; } catch (e) { return false; }
  })();
  var compareSymbol = 'TVC:DXY';

  /* ---------- Session clock ---------- */
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function updateClock() {
    var now = new Date();
    var utcH = now.getUTCHours();
    var utcM = now.getUTCMinutes();
    var el = document.getElementById('clock-utc');
    if (el) el.textContent = pad(utcH) + ':' + pad(utcM);
    function setSess(id, open) {
      var node = document.getElementById(id);
      if (!node) return;
      var st = node.querySelector('.sess-state');
      if (st) st.textContent = open ? 'Open' : 'Closed';
      node.classList.toggle('open', open);
    }
    setSess('sess-asia', utcH >= 0 && utcH < 9);
    setSess('sess-london', utcH >= 7 && utcH < 16);
    setSess('sess-ny', utcH >= 13 && utcH < 21);
  }
  updateClock();
  setInterval(updateClock, 30000);

  /* ---------- Layout presets ---------- */
  function applyLayout(key) {
    document.body.classList.remove('desk-layout-focus', 'desk-layout-calendar', 'desk-layout-tools');
    if (key === 'focus') document.body.classList.add('desk-layout-focus');
    if (key === 'calendar') {
      document.body.classList.add('desk-layout-calendar');
      document.querySelectorAll('.desk-tab').forEach(function (t) {
        var on = t.getAttribute('data-panel') === 'calendar';
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      document.querySelectorAll('.desk-tab-panel').forEach(function (p) {
        p.classList.toggle('is-active', p.getAttribute('data-panel') === 'calendar');
      });
    }
    if (key === 'tools') document.body.classList.add('desk-layout-tools');
    document.querySelectorAll('.layout-chip').forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-layout') === key);
    });
    try { localStorage.setItem(STORAGE.layout, key); } catch (e) {}
  }
  document.querySelectorAll('.layout-chip').forEach(function (c) {
    c.addEventListener('click', function () { applyLayout(c.getAttribute('data-layout')); });
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

  /* ---------- Secondary desk tabs (Board / Calendar / Technicals / Gauges) ---------- */
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
  }
  document.querySelectorAll('.desk-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateDeskPanel(tab.getAttribute('data-panel'));
    });
  });

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
    if (interval) {
      currentInterval = interval;
      try { localStorage.setItem(STORAGE.interval, interval); } catch (e) {}
    }
    setActiveSymbolUI(currentSymbol);
    document.querySelectorAll('.tf-chip').forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-tf') === currentInterval);
    });
    var title = document.getElementById('focus-title');
    var hint = document.getElementById('focus-hint');
    if (title) title.textContent = focusNames[currentSymbol] || currentSymbol;
    if (hint) hint.textContent = currentSymbol + ' · ' + currentInterval + (compareOn ? ' · vs ' + compareSymbol : '');
    var host = document.getElementById('macro-focus-chart');
    if (!host || typeof TradingView === 'undefined') return;
    host.innerHTML = '';
    var widgetOpts = {
      autosize: true,
      symbol: currentSymbol,
      interval: currentInterval,
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#0e0e10',
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      container_id: 'macro-focus-chart',
      studies: []
    };
    if (compareOn && compareSymbol && compareSymbol !== currentSymbol) {
      widgetOpts.studies = [];
      // Compare via dual symbol is limited in basic widget; set symbol as primary
    }
    try {
      new TradingView.widget(widgetOpts);
    } catch (e) {}
  }

  document.querySelectorAll('.symbol-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      loadFocus(chip.getAttribute('data-symbol'), currentInterval);
    });
  });
  document.querySelectorAll('.regime-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      loadFocus(chip.getAttribute('data-symbol'), currentInterval);
    });
  });
  document.querySelectorAll('.tf-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      loadFocus(currentSymbol, chip.getAttribute('data-tf'));
    });
  });

  var compareBtn = document.getElementById('compare-toggle');
  var compareSelect = document.getElementById('compare-symbol');
  function syncCompareUI() {
    if (compareBtn) {
      compareBtn.setAttribute('aria-pressed', compareOn ? 'true' : 'false');
      compareBtn.textContent = compareOn ? 'Compare on' : 'Compare off';
      compareBtn.classList.toggle('active', compareOn);
    }
  }
  if (compareBtn) {
    syncCompareUI();
    compareBtn.addEventListener('click', function () {
      compareOn = !compareOn;
      try { localStorage.setItem(STORAGE.compare, compareOn ? '1' : '0'); } catch (e) {}
      syncCompareUI();
      loadFocus(currentSymbol, currentInterval);
    });
  }
  if (compareSelect) {
    compareSelect.addEventListener('change', function () {
      compareSymbol = compareSelect.value;
      if (compareOn) loadFocus(currentSymbol, currentInterval);
    });
  }

  /* Symbol search */
  var searchInput = document.getElementById('symbol-search');
  var searchResults = document.getElementById('symbol-search-results');
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', function () {
      var q = (searchInput.value || '').trim().toLowerCase();
      if (!q) { searchResults.hidden = true; searchResults.innerHTML = ''; return; }
      var hits = CATALOG.filter(function (item) {
        return item.s.toLowerCase().indexOf(q) >= 0 || item.n.toLowerCase().indexOf(q) >= 0;
      }).slice(0, 8);
      searchResults.innerHTML = '';
      hits.forEach(function (h) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = h.n + ' (' + h.s + ')';
        b.addEventListener('click', function () {
          loadFocus(h.s, currentInterval);
          searchInput.value = '';
          searchResults.hidden = true;
        });
        searchResults.appendChild(b);
      });
      searchResults.hidden = hits.length === 0;
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { searchResults.hidden = true; }
    });
  }

  if (typeof TradingView !== 'undefined') loadFocus(currentSymbol, currentInterval);
  else {
    var tries = 0;
    var waitTv = setInterval(function () {
      tries++;
      if (typeof TradingView !== 'undefined') { clearInterval(waitTv); loadFocus(currentSymbol, currentInterval); }
      if (tries > 40) clearInterval(waitTv);
    }, 250);
  }

  /* ---------- Workflow ---------- */
  var workflowState = loadJSON(STORAGE.workflow, {});
  function updateWorkflowProgress() {
    var checks = document.querySelectorAll('.macro-checklist input[type=checkbox]');
    var done = 0;
    checks.forEach(function (c) { if (c.checked) done++; });
    var bar = document.getElementById('workflow-progress-bar');
    var lab = document.getElementById('workflow-progress-label');
    if (bar) bar.style.width = (checks.length ? (done / checks.length) * 100 : 0) + '%';
    if (lab) lab.textContent = done + ' / ' + checks.length;
  }
  document.querySelectorAll('.macro-checklist li').forEach(function (li) {
    var step = li.getAttribute('data-step');
    var input = li.querySelector('input');
    if (!input) return;
    if (workflowState[step]) input.checked = true;
    input.addEventListener('change', function () {
      workflowState[step] = !!input.checked;
      saveJSON(STORAGE.workflow, workflowState);
      updateWorkflowProgress();
    });
  });
  updateWorkflowProgress();

  /* ---------- Watchlist ---------- */
  var watchlist = loadJSON(STORAGE.watchlist, ['TVC:US10Y', 'TVC:DXY', 'TVC:GOLD']);
  function renderWatchlist() {
    var host = document.getElementById('watchlist-host');
    if (!host) return;
    host.innerHTML = '';
    watchlist.forEach(function (sym, idx) {
      var row = document.createElement('div');
      row.className = 'watch-row';
      var label = document.createElement('span');
      label.textContent = focusNames[sym] || sym;
      row.appendChild(label);
      var rm = document.createElement('button');
      rm.type = 'button'; rm.className = 'rm'; rm.setAttribute('aria-label', 'Remove');
      rm.textContent = '×';
      rm.addEventListener('click', function (e) {
        e.stopPropagation();
        watchlist.splice(idx, 1);
        saveJSON(STORAGE.watchlist, watchlist);
        renderWatchlist();
      });
      row.appendChild(rm);
      row.addEventListener('click', function () { loadFocus(sym, currentInterval); });
      host.appendChild(row);
    });
  }
  renderWatchlist();
  var watchAdd = document.getElementById('watchlist-add');
  if (watchAdd) {
    watchAdd.addEventListener('click', function () {
      if (watchlist.indexOf(currentSymbol) === -1) {
        watchlist.unshift(currentSymbol);
        saveJSON(STORAGE.watchlist, watchlist);
        renderWatchlist();
      }
    });
  }

  /* ---------- Journal ---------- */
  var journalEl = document.getElementById('macro-journal');
  var journalStatus = document.getElementById('journal-status');
  try {
    if (journalEl) journalEl.value = localStorage.getItem(STORAGE.journal) || '';
  } catch (e) {}
  function setJournalStatus(msg) {
    if (journalStatus) {
      journalStatus.textContent = msg;
      setTimeout(function () { if (journalStatus) journalStatus.textContent = ''; }, 2000);
    }
  }
  var journalSave = document.getElementById('journal-save');
  if (journalSave && journalEl) {
    journalSave.addEventListener('click', function () {
      try { localStorage.setItem(STORAGE.journal, journalEl.value || ''); setJournalStatus('Saved'); }
      catch (e) { setJournalStatus('Save failed'); }
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

  /* ---------- Levels ---------- */
  var levels = loadJSON(STORAGE.levels, []);
  function renderLevels() {
    var host = document.getElementById('levels-host');
    if (!host) return;
    host.innerHTML = '';
    levels.slice(0, 12).forEach(function (L, idx) {
      var row = document.createElement('div');
      row.className = 'level-row';
      row.innerHTML = '<strong>' + (L.symbol || '—') + '</strong> @ ' + (L.level || '—') +
        (L.note ? ' — ' + L.note : '');
      row.addEventListener('dblclick', function () {
        levels.splice(idx, 1);
        saveJSON(STORAGE.levels, levels);
        renderLevels();
      });
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
    });
  }

  function exportJournal() {
    var j = '';
    try { j = localStorage.getItem(STORAGE.journal) || ''; } catch (e) {}
    var md = '# WINEMI CAPITAL — Study export\n\n## Journal\n\n' + j + '\n\n## Levels\n\n';
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

  /* ---------- Shortcuts ---------- */
  var help = document.getElementById('shortcut-help');
  var helpOpen = document.getElementById('shortcut-open');
  if (helpOpen && help) {
    helpOpen.addEventListener('click', function () { help.classList.toggle('is-open'); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) return;
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
    if (k === 'l') {
      var chips = document.querySelectorAll('.layout-chip');
      if (!chips.length) return;
      var idx = 0;
      chips.forEach(function (c, i) { if (c.classList.contains('active')) idx = i; });
      var next = chips[(idx + 1) % chips.length];
      if (next) next.click();
      e.preventDefault();
    }
    if (k === 'escape' && help) help.classList.remove('is-open');
  });
  var helpClose = document.getElementById('shortcut-help-close');
  if (helpClose && help) {
    helpClose.addEventListener('click', function () { help.classList.remove('is-open'); });
  }
})();
