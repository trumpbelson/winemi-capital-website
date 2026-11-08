(function () {
  var dualDetail = document.getElementById('dual-detail');
  if (!dualDetail) return;

  if (!document.getElementById('candle-chart-lab')) {
    var lab = document.createElement('div');
    lab.id = 'candle-chart-lab';
    lab.innerHTML =
      '<h2>Live chart lab</h2>' +
      '<p>Study real price action on a live chart. Switch instruments, then practice naming structure and candle geometry — not entries.</p>' +
      '<div class="chart-switch" style="display:flex;flex-wrap:wrap;gap:.45rem;margin:0 0 1rem" role="toolbar" aria-label="Chart instrument">' +
      '<button type="button" class="candle-card" data-symbol="FX:EURUSD" style="padding:.45rem .85rem;width:auto;min-width:0"><strong style="margin:0;font-size:.75rem">EURUSD</strong></button>' +
      '<button type="button" class="candle-card" data-symbol="FX:GBPUSD" style="padding:.45rem .85rem;width:auto;min-width:0"><strong style="margin:0;font-size:.75rem">GBPUSD</strong></button>' +
      '<button type="button" class="candle-card" data-symbol="OANDA:XAUUSD" style="padding:.45rem .85rem;width:auto;min-width:0"><strong style="margin:0;font-size:.75rem">XAUUSD</strong></button>' +
      '<button type="button" class="candle-card" data-symbol="NASDAQ:AAPL" style="padding:.45rem .85rem;width:auto;min-width:0"><strong style="margin:0;font-size:.75rem">AAPL</strong></button>' +
      '<button type="button" class="candle-card" data-symbol="BINANCE:BTCUSDT" style="padding:.45rem .85rem;width:auto;min-width:0"><strong style="margin:0;font-size:.75rem">BTCUSDT</strong></button>' +
      '<button type="button" class="candle-card" data-symbol="TVC:SPX" style="padding:.45rem .85rem;width:auto;min-width:0"><strong style="margin:0;font-size:.75rem">SPX</strong></button>' +
      '</div>' +
      '<div id="tv-candle-wrap" class="tradingview-widget-container" style="height:480px;border-radius:14px;overflow:hidden;border:1px solid rgba(184,149,106,.3);margin-bottom:1.75rem">' +
      '<div id="tv-candle-chart" style="height:100%;width:100%"></div></div>' +
      '<div class="context-list" style="margin-bottom:1.75rem">' +
      '<article><h3>What to look for</h3><p class="card-text">Locate HTF swing, mark any base, then zoom to the session candles that form the edge. Name geometry only after location is clear.</p></article>' +
      '<article><h3>Journal prompt</h3><p class="card-text">Write: regime · zone type · candle label · invalidation level · calendar risk. Do not size from this page.</p></article>' +
      '</div>';

    var prose = document.querySelector('.prose');
    var structureH2 = null;
    if (prose) {
      prose.querySelectorAll('h2').forEach(function (h) {
        if (h.textContent.indexOf('How this ties') === 0) structureH2 = h;
      });
    }
    if (structureH2) structureH2.parentNode.insertBefore(lab, structureH2);
    else dualDetail.parentNode.appendChild(lab);

    function loadChart(symbol) {
      var host = document.getElementById('tv-candle-chart');
      if (!host) return;
      host.innerHTML = '';
      var s = document.createElement('script');
      s.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      s.async = true;
      s.type = 'text/javascript';
      s.text = JSON.stringify({
        autosize: true,
        symbol: symbol || 'FX:EURUSD',
        interval: '60',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        allow_symbol_change: true,
        calendar: false,
        support_host: 'https://www.tradingview.com'
      });
      host.appendChild(s);
    }

    lab.querySelectorAll('.chart-switch button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        lab.querySelectorAll('.chart-switch button').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        loadChart(btn.getAttribute('data-symbol'));
      });
    });
    var first = lab.querySelector('.chart-switch button');
    if (first) first.classList.add('active');
    loadChart('FX:EURUSD');
  }

  var single = document.getElementById('single-patterns');
  if (single && !single.querySelector('[data-id="four-price"]')) {
    single.insertAdjacentHTML('beforeend',
      '<button type="button" class="candle-card" data-id="four-price" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 60 100" width="44" height="72"><line x1="18" y1="50" x2="42" y2="50" stroke="#b8956a" stroke-width="4"/></svg></div><strong>Four-Price Doji</strong><span>Open = high = low = close — extreme compression</span></button>' +
      '<button type="button" class="candle-card" data-id="highwave" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 60 100" width="44" height="72"><line x1="30" y1="6" x2="30" y2="40" stroke="#b8956a" stroke-width="2"/><rect x="24" y="40" width="12" height="16" fill="#6c757d"/><line x1="30" y1="56" x2="30" y2="94" stroke="#b8956a" stroke-width="2"/></svg></div><strong>High-Wave Candle</strong><span>Very long upper and lower wicks — unstable balance</span></button>'
    );
  }

  var dual = document.getElementById('dual-patterns');
  if (dual && !dual.querySelector('[data-id="counter-bull"]')) {
    dual.insertAdjacentHTML('beforeend',
      '<button type="button" class="candle-card" data-id="counter-bull" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 90 100" width="64" height="64"><rect x="10" y="20" width="20" height="55" fill="#9b2226"/><rect x="48" y="20" width="20" height="55" fill="#2d6a4f"/></svg></div><strong>Bullish Counterattack</strong><span>Opens weaker, closes near prior close</span></button>' +
      '<button type="button" class="candle-card" data-id="counter-bear" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 90 100" width="64" height="64"><rect x="10" y="20" width="20" height="55" fill="#2d6a4f"/><rect x="48" y="20" width="20" height="55" fill="#9b2226"/></svg></div><strong>Bearish Counterattack</strong><span>Opens stronger, closes near prior close</span></button>' +
      '<button type="button" class="candle-card" data-id="sep-lines-bull" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 90 100" width="64" height="64"><rect x="10" y="30" width="20" height="45" fill="#2d6a4f"/><rect x="48" y="20" width="20" height="50" fill="#2d6a4f"/></svg></div><strong>Bullish Separating Lines</strong><span>Same open after opposite color — trend resume cue</span></button>' +
      '<button type="button" class="candle-card" data-id="sep-lines-bear" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 90 100" width="64" height="64"><rect x="10" y="20" width="20" height="50" fill="#9b2226"/><rect x="48" y="28" width="20" height="45" fill="#9b2226"/></svg></div><strong>Bearish Separating Lines</strong><span>Same open after opposite color — trend resume cue</span></button>'
    );
  }

  var tg = document.getElementById('triple-patterns');
  if (tg && !tg.querySelector('[data-id="abandoned-bull"]')) {
    tg.insertAdjacentHTML('beforeend',
      '<button type="button" class="candle-card" data-id="abandoned-bull" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 110 100" width="78" height="64"><rect x="6" y="18" width="16" height="55" fill="#9b2226"/><line x1="48" y1="70" x2="48" y2="88" stroke="#b8956a" stroke-width="2"/><line x1="40" y1="70" x2="56" y2="70" stroke="#b8956a" stroke-width="2"/><rect x="70" y="22" width="18" height="50" fill="#2d6a4f"/></svg></div><strong>Bullish Abandoned Baby</strong><span>Gap doji then gap bullish — rare transition</span></button>' +
      '<button type="button" class="candle-card" data-id="abandoned-bear" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 110 100" width="78" height="64"><rect x="6" y="22" width="16" height="50" fill="#2d6a4f"/><line x1="48" y1="12" x2="48" y2="30" stroke="#b8956a" stroke-width="2"/><line x1="40" y1="30" x2="56" y2="30" stroke="#b8956a" stroke-width="2"/><rect x="70" y="18" width="18" height="55" fill="#9b2226"/></svg></div><strong>Bearish Abandoned Baby</strong><span>Gap doji then gap bearish — rare transition</span></button>' +
      '<button type="button" class="candle-card" data-id="stick-sandwich" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 110 100" width="78" height="64"><rect x="8" y="25" width="16" height="50" fill="#9b2226"/><rect x="40" y="18" width="16" height="55" fill="#2d6a4f"/><rect x="72" y="25" width="16" height="50" fill="#9b2226"/></svg></div><strong>Stick Sandwich</strong><span>Two same-color closes sandwich opposite body</span></button>' +
      '<button type="button" class="candle-card" data-id="unique-river" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 110 100" width="78" height="64"><rect x="8" y="18" width="16" height="60" fill="#9b2226"/><rect x="40" y="40" width="14" height="28" fill="#9b2226"/><rect x="70" y="48" width="18" height="22" fill="#2d6a4f"/></svg></div><strong>Unique Three River</strong><span>Progressive lower extremes then small recovery</span></button>' +
      '<button type="button" class="candle-card" data-id="ladder-bottom" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 120 100" width="84" height="64"><rect x="4" y="20" width="12" height="50" fill="#9b2226"/><rect x="24" y="28" width="12" height="48" fill="#9b2226"/><rect x="44" y="36" width="12" height="46" fill="#9b2226"/><rect x="64" y="48" width="12" height="22" fill="#9b2226"/><rect x="88" y="30" width="16" height="48" fill="#2d6a4f"/></svg></div><strong>Ladder Bottom</strong><span>Series of lower closes then recovery candle</span></button>' +
      '<button type="button" class="candle-card" data-id="ladder-top" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 120 100" width="84" height="64"><rect x="4" y="40" width="12" height="40" fill="#2d6a4f"/><rect x="24" y="32" width="12" height="42" fill="#2d6a4f"/><rect x="44" y="24" width="12" height="44" fill="#2d6a4f"/><rect x="64" y="28" width="12" height="24" fill="#2d6a4f"/><rect x="88" y="22" width="16" height="50" fill="#9b2226"/></svg></div><strong>Ladder Top</strong><span>Series of higher closes then rejection candle</span></button>'
    );
  }

  var more = {
    'four-price': { title: 'Four-Price Doji', bias: 'Extreme compression', body: 'Open, high, low, and close are essentially equal. Rare. Describes a session with almost no traded range. Context decides whether it precedes expansion.' },
    highwave: { title: 'High-Wave Candle', bias: 'Unstable balance', body: 'Small body with unusually long upper and lower wicks. Both sides probed aggressively. Stronger indecision than a spinning top; still not a directional signal alone.' },
    'counter-bull': { title: 'Bullish Counterattack', bias: 'Meeting prior close from below', body: 'After a decline, a bullish session opens weaker but closes near the prior close. Describes a defence of that level. Weaker than engulfing; confirm with structure.' },
    'counter-bear': { title: 'Bearish Counterattack', bias: 'Meeting prior close from above', body: 'After an advance, a bearish session opens stronger but closes near the prior close. Describes resistance at that level window.' },
    'sep-lines-bull': { title: 'Bullish Separating Lines', bias: 'Trend resume cue', body: 'In an uptrend context, a bearish pause is followed by a bullish candle that opens near the same level. Language for possible continuation after a one-session setback.' },
    'sep-lines-bear': { title: 'Bearish Separating Lines', bias: 'Trend resume cue', body: 'In a downtrend context, a bullish pause is followed by a bearish candle opening near the same level. Continuation language only inside clear HTF supply regime.' },
    'abandoned-bull': { title: 'Bullish Abandoned Baby', bias: 'Rare demand transition', body: 'A declining session, a doji that gaps away from both neighbours, then a bullish session that also gaps. Very rare. Still requires demand location and invalidation under the structure.' },
    'abandoned-bear': { title: 'Bearish Abandoned Baby', bias: 'Rare supply transition', body: 'An advancing session, a gap doji, then a gap bearish session. Rare supply transition language — not a trade call.' },
    'stick-sandwich': { title: 'Stick Sandwich', bias: 'Matching closes around opposite body', body: 'Two candles of the same colour with matching closes sandwich an opposite-coloured body. Descriptive of a defended close level; confirmation and structure still required.' },
    'unique-river': { title: 'Unique Three River', bias: 'Exhaustion-style sequence', body: 'A long bearish body, a second bearish with a lower extreme but weaker close, then a small bullish recovery. An uncommon demand-transition vocabulary item.' },
    'ladder-bottom': { title: 'Ladder Bottom', bias: 'Decline series then recovery', body: 'Several sessions with progressively lower closes followed by a stronger bullish session. Only meaningful at demand with invalidation.' },
    'ladder-top': { title: 'Ladder Top', bias: 'Advance series then rejection', body: 'Several sessions with progressively higher closes followed by a strong bearish session. Supply-side mirror of ladder bottom.' }
  };

  function bindExtra(gridId, detailId) {
    var grid = document.getElementById(gridId);
    var detail = document.getElementById(detailId);
    if (!grid || !detail) return;
    grid.querySelectorAll('.candle-card').forEach(function (card) {
      if (card._chartsBound) return;
      card._chartsBound = true;
      card.addEventListener('click', function () {
        var id = card.getAttribute('data-id');
        var d = more[id];
        if (!d) return;
        grid.querySelectorAll('.candle-card').forEach(function (c) { c.classList.remove('active'); });
        card.classList.add('active');
        detail.innerHTML = '<span class="bias">' + d.bias + '</span><h3>' + d.title + '</h3><p class="body-base" style="margin:0">' + d.body + '</p>';
      });
    });
  }
  bindExtra('single-patterns', 'single-detail');
  bindExtra('dual-patterns', 'dual-detail');
  bindExtra('triple-patterns', 'triple-detail');
})();
