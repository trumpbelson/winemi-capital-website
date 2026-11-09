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

  function applyLayout(key) {
    document.body.classList.remove('desk-layout-focus', 'desk-layout-calendar', 'desk-layout-tools');
    if (key === 'focus') document.body.classList.add('desk-layout-focus');
    if (key === 'calendar') document.body.classList.add('desk-layout-calendar');
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

  var searchInput = document.getElementById('symbol-search');
  var searchResults = document.getElementById('symbol-search-results');
  if (searchInput && searchResults) {
    function renderSearch(q) {
      q = (q || '').trim().toLowerCase();
      if (!q) { searchResults.hidden = true; searchResults.innerHTML = ''; return; }
      var hits = CATALOG.filter(function (c) {
        return c.n.toLowerCase().indexOf(q) !== -1 || c.s.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 8);
      if (!hits.length) { searchResults.hidden = true; return; }
      searchResults.innerHTML = hits.map(function (h) {
        return '<button type="button" role="option" data-symbol="' + h.s + '">' + h.n +
          ' <span style="opacity:.5">' + h.s + '</span></button>';
      }).join('');
      searchResults.hidden = false;
      searchResults.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          loadFocus(b.getAttribute('data-symbol'), currentInterval);
          searchInput.value = '';
          searchResults.hidden = true;
        });
      });
    }
    searchInput.addEventListener('input', function () { renderSearch(searchInput.value); });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { searchResults.hidden = true; searchInput.blur(); }
    });
    document.addEventListener('click', function (e) {
      if (!searchInput.parentNode.contains(e.target)) searchResults.hidden = true;
    });
  }

  var defaultWatch = ['TVC:US10Y', 'TVC:DXY', 'TVC:GOLD', 'FOREXCOM:SPXUSD'];
  var watchlist = loadJSON(STORAGE.watchlist, defaultWatch);

  function renderWatchlist() {
    var host = document.getElementById('watchlist-host');
    if (!host) return;
    host.innerHTML = '';
    if (!watchlist.length) {
      host.innerHTML = '<p class="body-small" style="margin:0;opacity:.7">Empty — add the current focus symbol.</p>';
      return;
    }
    watchlist.forEach(function (sym) {
      var row = document.createElement('div');
      row.className = 'watch-row';
      row.innerHTML =
        '<button type="button" class="watch-sym" data-symbol="' + sym + '">' + (focusNames[sym] || sym) + '</button>' +
        '<button type="button" class="watch-remove" data-symbol="' + sym + '" aria-label="Remove">×</button>';
      host.appendChild(row);
    });
    host.querySelectorAll('.watch-sym').forEach(function (b) {
      b.addEventListener('click', function () {
        loadFocus(b.getAttribute('data-symbol'), currentInterval);
      });
    });
    host.querySelectorAll('.watch-remove').forEach(function (b) {
      b.addEventListener('click', function () {
        var sym = b.getAttribute('data-symbol');
        watchlist = watchlist.filter(function (s) { return s !== sym; });
        saveJSON(STORAGE.watchlist, watchlist);
        renderWatchlist();
      });
    });
  }
  var addWatch = document.getElementById('watchlist-add');
  if (addWatch) {
    addWatch.addEventListener('click', function () {
      if (watchlist.indexOf(currentSymbol) === -1) {
        watchlist.push(currentSymbol);
        saveJSON(STORAGE.watchlist, watchlist);
        renderWatchlist();
      }
    });
  }
  renderWatchlist();

  var workflowState = loadJSON(STORAGE.workflow, {});
  function renderWorkflow() {
    var items = document.querySelectorAll('.macro-checklist [data-step]');
    var done = 0;
    items.forEach(function (li) {
      var id = li.getAttribute('data-step');
      var on = !!workflowState[id];
      li.classList.toggle('is-done', on);
      if (on) done++;
      var cb = li.querySelector('input[type="checkbox"]');
      if (cb) cb.checked = on;
    });
    var bar = document.getElementById('workflow-progress-bar');
    var labelEl = document.getElementById('workflow-progress-label');
    var total = items.length || 4;
    if (bar) bar.style.width = Math.round((done / total) * 100) + '%';
    if (labelEl) labelEl.textContent = done + ' / ' + total + ' steps';
  }
  document.querySelectorAll('.macro-checklist [data-step] input[type="checkbox"]').forEach(function (cb) {
    cb.addEventListener('change', function () {
      var li = cb.closest('[data-step]');
      if (!li) return;
      workflowState[li.getAttribute('data-step')] = cb.checked;
      saveJSON(STORAGE.workflow, workflowState);
      renderWorkflow();
    });
  });
  renderWorkflow();

  var journal = document.getElementById('macro-journal');
  var journalStatus = document.getElementById('journal-status');
  if (journal) {
    try { journal.value = localStorage.getItem(STORAGE.journal) || ''; } catch (e) {}
  }
  function setJournalStatus(msg) {
    if (journalStatus) {
      journalStatus.textContent = msg;
      setTimeout(function () { if (journalStatus) journalStatus.textContent = ''; }, 2000);
    }
  }
  var journalSave = document.getElementById('journal-save');
  if (journalSave && journal) {
    journalSave.addEventListener('click', function () {
      try {
        localStorage.setItem(STORAGE.journal, journal.value || '');
        setJournalStatus('Saved');
      } catch (e) { setJournalStatus('Save failed'); }
    });
  }
  var journalClear = document.getElementById('journal-clear');
  if (journalClear && journal) {
    journalClear.addEventListener('click', function () {
      journal.value = '';
      try { localStorage.removeItem(STORAGE.journal); } catch (e) {}
      setJournalStatus('Cleared');
    });
  }

  var levels = loadJSON(STORAGE.levels, []);
  function renderLevels() {
    var h = document.getElementById('levels-host');
    if (!h) return;
    if (!levels.length) {
      h.innerHTML = '<p class="body-small" style="margin:0;opacity:.65">No levels yet — record invalidation before high-impact prints.</p>';
      return;
    }
    h.innerHTML = levels.map(function (L, i) {
      return '<div class="level-row"><div><strong>' + (L.symbol || '—') + '</strong> @ ' + (L.level || '—') +
        (L.note ? '<div style="opacity:.75;margin-top:.2rem">' + L.note + '</div>' : '') +
        '</div><button type="button" class="level-remove" data-i="' + i + '" aria-label="Remove">×</button></div>';
    }).join('');
    h.querySelectorAll('.level-remove').forEach(function (b) {
      b.addEventListener('click', function () {
        levels.splice(parseInt(b.getAttribute('data-i'), 10), 1);
        saveJSON(STORAGE.levels, levels);
        renderLevels();
      });
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

  var fsBtn = document.getElementById('focus-fullscreen');
  var focusPanel = document.getElementById('focus-panel');
  if (fsBtn && focusPanel) {
    fsBtn.addEventListener('click', function () {
      if (!document.fullscreenElement) focusPanel.requestFullscreen && focusPanel.requestFullscreen();
      else document.exitFullscreen && document.exitFullscreen();
    });
  }

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

  var links = document.querySelectorAll('.macro-subnav a');
  function syncSubnav() {
    var y = window.scrollY + 120;
    var current = null;
    links.forEach(function (a) {
      var id = (a.getAttribute('href') || '').slice(1);
      var el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = a;
    });
    links.forEach(function (a) { a.classList.toggle('is-active', a === current); });
  }
  window.addEventListener('scroll', syncSubnav, { passive: true });
  syncSubnav();
})();
