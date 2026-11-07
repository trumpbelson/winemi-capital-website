(function () {
  if (document.getElementById('triple-patterns')) return;
  var dualDetail = document.getElementById('dual-detail');
  if (!dualDetail) return;

  var workflow = '<h2>Study workflow</h2><div class="workflow" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.75rem;margin:1.25rem 0 1.75rem">'
    + '<article style="border:1px solid rgba(184,149,106,.22);border-radius:12px;padding:.9rem 1rem;background:#121214"><strong style="display:block;color:#b8956a;font-size:.72rem;letter-spacing:.07em;text-transform:uppercase;margin-bottom:.35rem">1 · Regime</strong><span class="card-text">Map weekly/daily structure before naming any candle.</span></article>'
    + '<article style="border:1px solid rgba(184,149,106,.22);border-radius:12px;padding:.9rem 1rem;background:#121214"><strong style="display:block;color:#b8956a;font-size:.72rem;letter-spacing:.07em;text-transform:uppercase;margin-bottom:.35rem">2 · Zone</strong><span class="card-text">Locate demand or supply (base + departure quality).</span></article>'
    + '<article style="border:1px solid rgba(184,149,106,.22);border-radius:12px;padding:.9rem 1rem;background:#121214"><strong style="display:block;color:#b8956a;font-size:.72rem;letter-spacing:.07em;text-transform:uppercase;margin-bottom:.35rem">3 · Candle</strong><span class="card-text">Use pattern labels only as timing language inside the zone.</span></article>'
    + '<article style="border:1px solid rgba(184,149,106,.22);border-radius:12px;padding:.9rem 1rem;background:#121214"><strong style="display:block;color:#b8956a;font-size:.72rem;letter-spacing:.07em;text-transform:uppercase;margin-bottom:.35rem">4 · Invalidation</strong><span class="card-text">Write where the idea is wrong; check the calendar.</span></article></div>';

  var triple = '<h2>Triple-candle patterns</h2><p>Three-session sequences can describe a fuller transition from one side of control to the other. Still filtered by structure.</p>'
    + '<div class="candle-grid" id="triple-patterns" role="list">'
    + '<button type="button" class="candle-card" data-id="morning" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 110 100" width="78" height="64"><rect x="8" y="20" width="16" height="60" fill="#9b2226"/><rect x="40" y="48" width="14" height="18" fill="#6c757d"/><rect x="68" y="28" width="20" height="52" fill="#2d6a4f"/></svg></div><strong>Morning Star</strong><span>Decline → small indecision → strong bullish — potential demand transition</span></button>'
    + '<button type="button" class="candle-card" data-id="evening" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 110 100" width="78" height="64"><rect x="8" y="20" width="16" height="60" fill="#2d6a4f"/><rect x="40" y="48" width="14" height="18" fill="#6c757d"/><rect x="68" y="28" width="20" height="52" fill="#9b2226"/></svg></div><strong>Evening Star</strong><span>Advance → small indecision → strong bearish — potential supply transition</span></button>'
    + '<button type="button" class="candle-card" data-id="three-soldiers" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 110 100" width="78" height="64"><rect x="10" y="50" width="16" height="35" fill="#2d6a4f"/><rect x="40" y="35" width="16" height="45" fill="#2d6a4f"/><rect x="70" y="18" width="16" height="55" fill="#2d6a4f"/></svg></div><strong>Three White Soldiers</strong><span>Three advancing bullish bodies — sustained buy-side pressure</span></button>'
    + '<button type="button" class="candle-card" data-id="three-crows" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 110 100" width="78" height="64"><rect x="10" y="18" width="16" height="55" fill="#9b2226"/><rect x="40" y="32" width="16" height="48" fill="#9b2226"/><rect x="70" y="48" width="16" height="38" fill="#9b2226"/></svg></div><strong>Three Black Crows</strong><span>Three consecutive declining bearish bodies — sustained sell-side pressure</span></button>'
    + '</div><div class="candle-detail" id="triple-detail" aria-live="polite"><p class="body-base" style="margin:0;color:rgba(247,245,240,.55)">Select a triple-candle pattern above to view its educational description.</p></div>';

  var visuals = '<div class="visual-strip" style="display:grid;grid-template-columns:1.1fr .9fr;gap:1.15rem;margin:1.25rem 0 1.75rem" aria-label="Study context images">'
    + '<img src="https://images.unsplash.com/photo-1611974789855-9c2a0b7235e5?auto=format&fit=crop&w=1400&q=80" alt="Multi-monitor desk showing live candlestick charts" width="1400" height="220" style="width:100%;height:220px;object-fit:cover;border-radius:14px;border:1px solid rgba(184,149,106,.28)" loading="eager" />'
    + '<img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80" alt="Close view of candlestick chart data on screen" width="1200" height="220" style="width:100%;height:220px;object-fit:cover;border-radius:14px;border:1px solid rgba(184,149,106,.28)" loading="eager" />'
    + '</div>';

  var disclaimer = document.querySelector('.prose > p.label');
  if (disclaimer && disclaimer.nextElementSibling) {
    disclaimer.nextElementSibling.insertAdjacentHTML('afterend', visuals);
  }

  var context = document.querySelector('.context-list');
  if (context) context.insertAdjacentHTML('afterend', workflow);

  dualDetail.insertAdjacentHTML('afterend', triple);

  var single = document.getElementById('single-patterns');
  if (single && !single.querySelector('[data-id="spinning"]')) {
    single.insertAdjacentHTML('beforeend',
      '<button type="button" class="candle-card" data-id="long-doji" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 60 100" width="44" height="72"><line x1="30" y1="8" x2="30" y2="92" stroke="#b8956a" stroke-width="2"/><line x1="10" y1="50" x2="50" y2="50" stroke="#b8956a" stroke-width="3"/></svg></div><strong>Long-legged Doji</strong><span>Wide range, open ≈ close — high volatility indecision</span></button>'
      + '<button type="button" class="candle-card" data-id="spinning" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 60 100" width="44" height="72"><line x1="30" y1="12" x2="30" y2="38" stroke="#b8956a" stroke-width="2"/><rect x="22" y="38" width="16" height="24" fill="#6c757d"/><line x1="30" y1="62" x2="30" y2="88" stroke="#b8956a" stroke-width="2"/></svg></div><strong>Spinning Top</strong><span>Small body, upper and lower wicks — temporary balance</span></button>');
  }
  var dual = document.getElementById('dual-patterns');
  if (dual && !dual.querySelector('[data-id="tweezers-bottom"]')) {
    dual.insertAdjacentHTML('beforeend',
      '<button type="button" class="candle-card" data-id="tweezers-bottom" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 90 100" width="64" height="64"><line x1="22" y1="70" x2="22" y2="88" stroke="#b8956a" stroke-width="2"/><rect x="14" y="40" width="16" height="30" fill="#9b2226"/><line x1="68" y1="70" x2="68" y2="88" stroke="#b8956a" stroke-width="2"/><rect x="60" y="38" width="16" height="32" fill="#2d6a4f"/></svg></div><strong>Tweezer Bottom</strong><span>Matching lows across two sessions — possible support agreement</span></button>'
      + '<button type="button" class="candle-card" data-id="tweezers-top" role="listitem"><div class="svg-wrap"><svg viewBox="0 0 90 100" width="64" height="64"><line x1="22" y1="12" x2="22" y2="30" stroke="#b8956a" stroke-width="2"/><rect x="14" y="30" width="16" height="32" fill="#2d6a4f"/><line x1="68" y1="12" x2="68" y2="30" stroke="#b8956a" stroke-width="2"/><rect x="60" y="30" width="16" height="30" fill="#9b2226"/></svg></div><strong>Tweezer Top</strong><span>Matching highs across two sessions — possible resistance agreement</span></button>');
  }

  var extra = {
    'long-doji': { title: 'Long-legged Doji', bias: 'High-volatility indecision', body: 'Wide range with open and close near the middle. Both sides probed aggressively and neither held. Often appears around event risk or regime transitions.' },
    spinning: { title: 'Spinning Top', bias: 'Temporary balance', body: 'Small body with upper and lower wicks of meaningful length. Neither side dominated. Common in consolidations; less informative without location and HTF structure.' },
    'tweezers-bottom': { title: 'Tweezer Bottom', bias: 'Matching lows', body: 'Two sessions share a similar low. Suggests agreement on a price floor for that window. Meaningful mainly when aligned with a demand zone and followed by constructive departure.' },
    'tweezers-top': { title: 'Tweezer Top', bias: 'Matching highs', body: 'Two sessions share a similar high. Suggests agreement on a ceiling. Meaningful mainly at supply with clear invalidation above those highs.' },
    morning: { title: 'Morning Star', bias: 'Demand transition sequence', body: 'A three-candle idea: a declining session, a small indecision body (star), then a strong bullish session. Describes a transition from sell control toward buy control. Filter with demand location and invalidation below the structure.' },
    evening: { title: 'Evening Star', bias: 'Supply transition sequence', body: 'A three-candle idea: an advancing session, a small indecision body, then a strong bearish session. Describes a transition toward sell control. Filter with supply location and invalidation above the structure.' },
    'three-soldiers': { title: 'Three White Soldiers', bias: 'Sustained buy-side pressure', body: 'Three consecutive advancing bullish bodies, ideally with limited upper wicks. Describes persistence of demand after a base or reversal. Still requires HTF regime support.' },
    'three-crows': { title: 'Three Black Crows', bias: 'Sustained sell-side pressure', body: 'Three consecutive declining bearish bodies. Describes persistence of supply. Common after failed rallies into premium; invalidation above the sequence remains essential.' }
  };

  function bind(gridId, detailId) {
    var grid = document.getElementById(gridId);
    var detail = document.getElementById(detailId);
    if (!grid || !detail) return;
    grid.querySelectorAll('.candle-card').forEach(function (card) {
      if (card._candleBound) return;
      card._candleBound = true;
      card.addEventListener('click', function () {
        grid.querySelectorAll('.candle-card').forEach(function (c) { c.classList.remove('active'); });
        card.classList.add('active');
        var id = card.getAttribute('data-id');
        var d = extra[id];
        if (!d) return;
        detail.innerHTML = '<span class="bias">' + d.bias + '</span><h3>' + d.title + '</h3><p class="body-base" style="margin:0">' + d.body + '</p>';
      });
    });
  }
  bind('single-patterns', 'single-detail');
  bind('dual-patterns', 'dual-detail');
  bind('triple-patterns', 'triple-detail');
})();
