(function () {
  'use strict';

  /* Bootstrap advanced UI onto older markup if needed */
  function ensureAdvancedUI() {
    var focusChips = document.getElementById('focus-chips');
    if (focusChips && !document.getElementById('compare-toggle')) {
      var tools = document.createElement('div');
      tools.className = 'focus-tools';
      tools.innerHTML =
        '<div class="tf-chips" role="group" aria-label="Chart timeframe">' +
        '<button type="button" class="tf-chip active" data-tf="D">1D</button>' +
        '<button type="button" class="tf-chip" data-tf="240">4H</button>' +
        '<button type="button" class="tf-chip" data-tf="60">1H</button>' +
        '<button type="button" class="tf-chip" data-tf="W">1W</button></div>' +
        '<button type="button" class="tool-chip" id="compare-toggle" aria-pressed="false">Compare off</button>' +
        '<select id="compare-symbol" class="compare-select" aria-label="Compare symbol">' +
        '<option value="TVC:DXY">vs DXY</option><option value="TVC:US10Y">vs US 10Y</option>' +
        '<option value="TVC:GOLD">vs Gold</option><option value="FOREXCOM:SPXUSD">vs S&P 500</option>' +
        '<option value="TVC:VIX">vs VIX</option></select>' +
        '<button type="button" class="tool-chip" id="watchlist-add">+ Watchlist</button>' +
        '<button type="button" class="tool-chip" id="focus-fullscreen">Fullscreen</button>';
      focusChips.parentNode.insertBefore(tools, focusChips.nextSibling);
      var panel = focusChips.parentNode.querySelector('#macro-focus-chart');
      if (panel) {
        var wrap = panel.closest('.macro-panel');
        if (wrap) wrap.id = 'focus-panel';
      }
    }

    if (focusChips && !document.getElementById('symbol-search')) {
      var searchWrap = document.createElement('div');
      searchWrap.className = 'symbol-search-wrap';
      searchWrap.innerHTML =
        '<input type="search" id="symbol-search" class="symbol-search" placeholder="Search symbol (e.g. DXY, Gold, BTC)…" autocomplete="off" aria-label="Search focus symbol" />' +
        '<div id="symbol-search-results" class="symbol-search-results" role="listbox" hidden></div>';
      focusChips.parentNode.insertBefore(searchWrap, focusChips);
    }

    // PLACEHOLDER_CONTINUE
  }
  ensureAdvancedUI();
})();
