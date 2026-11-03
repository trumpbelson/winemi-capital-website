/**
 * WINEMI CAPITAL. — Interactive Education & Insights
 */
(function () {
  'use strict';

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var patterns = {
    DBR: {
      title: 'Drop–Base–Rally (Demand · Reversal)',
      text: 'Price declines into a tight base, then departs impulsively higher. The base is where aggressive demand absorbed selling. On a first return, that area is treated as potential demand — not a guarantee. Freshness and higher-timeframe alignment improve the hypothesis.'
    },
    RBR: {
      title: 'Rally–Base–Rally (Demand · Continuation)',
      text: 'An uptrend pauses in a compact base, then continues higher. The pause is often re-accumulation. Pullbacks into that base can be demand candidates when structure remains intact and departure was strong.'
    },
    RBD: {
      title: 'Rally–Base–Drop (Supply · Reversal)',
      text: 'Price advances into a base, then drops with force. The base marks where supply overwhelmed buyers. First revisits from below may offer supply context, especially when aligned with a higher-timeframe premium area.'
    },
    DBD: {
      title: 'Drop–Base–Drop (Supply · Continuation)',
      text: 'A downtrend consolidates, then continues lower. The base can act as continuation supply on rallies back into it. Quality rises with impulsive departure, limited prior tests, and clear structural break.'
    }
  };

  qsa('[data-pattern]').forEach(function (card) {
    card.addEventListener('click', function () {
      var key = card.getAttribute('data-pattern');
      qsa('[data-pattern]').forEach(function (c) { c.classList.toggle('active', c === card); });
      var detail = qs('#pattern-detail');
      if (detail && patterns[key]) {
        detail.innerHTML = '<h4>' + patterns[key].title + '</h4><p>' + patterns[key].text + '</p>';
      }
    });
  });
  var first = qs('[data-pattern]');
  if (first) first.click();

  qsa('.accordion-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var panel = qs('#' + btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (panel) panel.classList.toggle('open', !expanded);
      var icon = qs('.accordion-icon', btn);
      if (icon) icon.textContent = expanded ? '+' : '−';
    });
  });

  qsa('.learn-nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-target');
      var el = id && qs('#' + id);
      qsa('.learn-nav-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  qsa('.quiz-opt').forEach(function (opt) {
    opt.addEventListener('click', function () {
      var group = opt.closest('.quiz-question');
      if (!group || group.getAttribute('data-answered') === '1') return;
      group.setAttribute('data-answered', '1');
      var correct = opt.getAttribute('data-correct') === 'true';
      qsa('.quiz-opt', group).forEach(function (o) {
        if (o.getAttribute('data-correct') === 'true') o.classList.add('correct');
        else if (o === opt) o.classList.add('wrong');
      });
      var fb = qs('.quiz-feedback', group);
      if (fb) {
        fb.textContent = correct
          ? 'Correct. Structure and imbalance come first; prediction does not.'
          : 'Not quite. Re-read the related section — zones come from impulsive departure after a base, not from every swing.';
      }
    });
  });

  qsa('.insight-filter').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tag = btn.getAttribute('data-filter');
      qsa('.insight-filter').forEach(function (b) { b.classList.toggle('active', b === btn); });
      qsa('.insight-card').forEach(function (card) {
        if (tag === 'all') { card.hidden = false; return; }
        card.hidden = card.getAttribute('data-tags').indexOf(tag) === -1;
      });
    });
  });
  qsa('.insight-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.insight-card');
      if (card) card.classList.toggle('is-open');
    });
  });
})();
