(function () {
  var section = document.getElementById('education-preview');
  if (!section) return;
  var grid = section.querySelector('.grid-3');
  if (!grid || grid.querySelector('.card-visual')) return;
  var cards = [
    { href: 'pages/education.html', img: 'assets/images/diagrams/four-patterns.svg', title: 'Supply & Demand Structure', text: 'Rally, drop, and base; the four patterns (RBR, DBR, DBD, RBD); demand and supply zones.' },
    { href: 'pages/education.html', img: 'assets/images/diagrams/order-flow.svg', title: 'Institutional Order Flow', text: 'Imbalance, absorption, liquidity pools — how size leaves footprints on the chart.' },
    { href: 'pages/education.html', img: 'assets/images/diagrams/complete-setup.svg', title: 'Complete Setup Discipline', text: 'Pattern, location, confirmation, and defined risk — act only when the picture is complete.' }
  ];
  grid.innerHTML = cards.map(function (c) {
    return '<a href="' + c.href + '" class="card card-visual" style="text-decoration:none;color:inherit;">' +
      '<div class="card-visual-media"><img src="' + c.img + '" alt="" loading="lazy" width="640" height="160" /></div>' +
      '<h3 class="card-title">' + c.title + '</h3>' +
      '<p class="card-text">' + c.text + '</p></a>';
  }).join('');
  var strip = document.createElement('div');
  strip.className = 'diagram-strip';
  strip.setAttribute('aria-label', 'Framework at a glance');
  var items = [
    ['assets/images/diagrams/moves.svg', 'Moves'],
    ['assets/images/diagrams/zone-location.svg', 'Location'],
    ['assets/images/diagrams/fresh-vs-depleted.svg', 'Fresh vs depleted'],
    ['assets/images/diagrams/multi-timeframe.svg', 'HTF / LTF'],
    ['assets/images/diagrams/risk-reward.svg', 'Risk & reward'],
    ['assets/images/diagrams/fakeout-sweep.svg', 'Liquidity sweeps']
  ];
  strip.innerHTML = items.map(function (it) {
    return '<figure class="diagram-strip-item"><img src="' + it[0] + '" alt="" loading="lazy" /><figcaption>' + it[1] + '</figcaption></figure>';
  }).join('');
  grid.parentNode.insertBefore(strip, grid.nextSibling);
})();
