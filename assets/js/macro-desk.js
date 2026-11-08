(function () {
    'use strict';

    /* Session clock */
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

    /* Show / hide live data */
    var KEY = 'winemi-macro-data-visible';
    var btn = document.getElementById('macro-data-toggle');
    var panel = document.getElementById('macro-data-section');
    var label = btn && btn.querySelector('.macro-toggle-label');
    function applyVisible(show) {
      if (!panel || !btn) return;
      panel.classList.toggle('is-hidden', !show);
      btn.setAttribute('aria-expanded', show ? 'true' : 'false');
      if (label) label.textContent = show ? 'Hide live data' : 'Show live data';
      try { localStorage.setItem(KEY, show ? '1' : '0'); } catch (e) {}
    }
    if (btn && panel) {
      var stored = null;
      try { stored = localStorage.getItem(KEY); } catch (e) {}
      applyVisible(stored !== '0');
      btn.addEventListener('click', function () {
        applyVisible(btn.getAttribute('aria-expanded') !== 'true');
      });
    }

    /* Board tabs */
    var boardHost = document.getElementById('board-host');
    var boardTitle = document.getElementById('board-title');
    var boardHint = document.getElementById('board-hint');
    var boards = {
      overview: {
        title: 'Cross-asset overview',
        hint: 'Indices · rates · FX · commodities',
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
        title: 'Forex cross rates',
        hint: 'Major pairs matrix',
        src: 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js',
        cfg: {
          width: '100%', height: '100%', currencies: ['EUR','USD','JPY','GBP','CHF','AUD','CAD','NZD','CNY'],
          isTransparent: true, colorTheme: 'dark', locale: 'en'
        }
      },
      heatmap: {
        title: 'Stock heatmap',
        hint: 'SPX sector rotation',
        src: 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js',
        cfg: {
          dataSource: 'SPX500', grouping: 'sector', blockSize: 'market_cap_basic', blockColor: 'change',
          locale: 'en', colorTheme: 'dark', hasTopBar: false, isZoomEnabled: true, hasSymbolTooltip: true,
          width: '100%', height: '100%'
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
      wrap.style.height = '100%';
      wrap.style.width = '100%';
      var inner = document.createElement('div');
      inner.className = 'tradingview-widget-container__widget';
      inner.style.height = '100%';
      inner.style.width = '100%';
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = spec.src;
      s.async = true;
      s.text = JSON.stringify(spec.cfg);
      wrap.appendChild(inner);
      wrap.appendChild(s);
      boardHost.appendChild(wrap);
    }

    document.querySelectorAll('.macro-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.macro-tab').forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        loadBoard(tab.getAttribute('data-board'));
      });
    });
    loadBoard('overview');

    /* Focus chart */
    var focusNames = {
      'TVC:US10Y': 'US 10-year yield',
      'TVC:DXY': 'US Dollar Index',
      'TVC:GOLD': 'Gold',
      'FOREXCOM:SPXUSD': 'S&P 500',
      'FX:EURUSD': 'EUR/USD',
      'TVC:USOIL': 'WTI Crude',
      'BINANCE:BTCUSDT': 'Bitcoin',
      'TVC:VIX': 'VIX'
    };
    function loadFocus(symbol) {
      var host = document.getElementById('macro-focus-chart');
      var title = document.getElementById('focus-title');
      var hint = document.getElementById('focus-hint');
      if (!host || typeof TradingView === 'undefined') return;
      host.innerHTML = '';
      if (title) title.textContent = focusNames[symbol] || symbol;
      if (hint) hint.textContent = symbol + ' · daily';
      new TradingView.widget({
        container_id: 'macro-focus-chart',
        symbol: symbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#0e0e10',
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        height: host.clientHeight || 500,
        width: '100%',
        studies: ['STD;SMA']
      });
    }
    document.querySelectorAll('.symbol-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('.symbol-chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        loadFocus(chip.getAttribute('data-symbol'));
      });
    });
    function bootFocus() {
      if (typeof TradingView !== 'undefined') loadFocus('TVC:US10Y');
      else setTimeout(bootFocus, 200);
    }
    bootFocus();

    /* Subnav active state */
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
