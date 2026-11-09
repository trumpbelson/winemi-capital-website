/*! WINEMI macro desk — advanced chrome bootstrap (runs before/with macro-desk.js) */
(function () {
  'use strict';
  if (document.getElementById('winemi-adv-style')) return;

  var css = document.createElement('style');
  css.id = 'winemi-adv-style';
  css.textContent = [
    '.status-pill{display:inline-flex;align-items:center;gap:.35rem;padding:.3rem .6rem;border-radius:999px;font-size:.65rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:1px solid rgba(184,149,106,.25);color:rgba(247,245,240,.7)}',
    '.status-pill .dot{width:6px;height:6px;border-radius:50%;background:#6a9e7a;box-shadow:0 0 8px rgba(106,158,122,.7)}',
    'html[data-theme=light] .status-pill{color:rgba(12,12,14,.65);border-color:rgba(122,95,50,.25)}',
    '.session-chip .sess-eta{opacity:.75;margin-left:.25rem}',
    '.basket-strip{display:flex;flex-wrap:wrap;gap:.35rem;margin:.45rem 0 .65rem}',
    '.basket-chip,.density-chip{padding:.4rem .72rem;border-radius:999px;cursor:pointer;border:1px solid rgba(184,149,106,.28);background:transparent;color:rgba(247,245,240,.75);font-size:.7rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase}',
    '.basket-chip.active,.density-chip.active{background:rgba(184,149,106,.16);border-color:rgba(184,149,106,.65);color:#e0c49a}',
    '.basket-chip:hover,.density-chip:hover{border-color:rgba(184,149,106,.5);color:#c9a87c}',
    'html[data-theme=light] .basket-chip,html[data-theme=light] .density-chip{color:rgba(12,12,14,.65);border-color:rgba(122,95,50,.25)}',
    'html[data-theme=light] .basket-chip.active,html[data-theme=light] .density-chip.active{color:#7a5f32;background:rgba(122,95,50,.1);border-color:rgba(122,95,50,.5)}',
    '.history-strip{display:flex;flex-wrap:wrap;gap:.3rem;margin:0 0 .5rem}',
    '.history-chip{padding:.28rem .55rem;border-radius:6px;font-size:.68rem;cursor:pointer;border:1px solid rgba(184,149,106,.2);background:rgba(184,149,106,.06);color:rgba(247,245,240,.7)}',
    '.history-chip:hover{border-color:rgba(184,149,106,.45);color:#c9a87c}',
    'html[data-theme=light] .history-chip{background:rgba(122,95,50,.06);color:rgba(12,12,14,.65);border-color:rgba(122,95,50,.2)}',
    '.template-row{display:flex;flex-wrap:wrap;gap:.3rem;margin:.4rem 0}',
    '.template-chip{padding:.28rem .5rem;font-size:.65rem;border-radius:6px;border:1px solid rgba(184,149,106,.25);background:transparent;color:rgba(247,245,240,.7);cursor:pointer}',
    '.template-chip:hover{border-color:rgba(184,149,106,.5);color:#c9a87c}',
    'html[data-theme=light] .template-chip{color:rgba(12,12,14,.65);border-color:rgba(122,95,50,.25)}',
    'body.desk-density-compact .tool-panel{padding:.55rem .65rem}',
    'body.desk-density-compact #macro-focus-chart{height:380px}',
    'body.desk-density-compact .macro-widget--tall{height:360px}',
    'body.desk-density-compact .desk-command{padding:.55rem .75rem}',
    'body.desk-density-compact .symbol-chip,body.desk-density-compact .tf-chip,body.desk-density-compact .layout-chip,body.desk-density-compact .tool-chip{padding:.32rem .58rem;font-size:.65rem}',
    '.cmd-palette-backdrop{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.55);display:none;align-items:flex-start;justify-content:center;padding:12vh 1rem 1rem}',
    '.cmd-palette-backdrop.is-open{display:flex}',
    '.cmd-palette{width:min(520px,100%);background:#161618;border:1px solid rgba(184,149,106,.4);border-radius:14px;box-shadow:0 24px 64px rgba(0,0,0,.55);overflow:hidden}',
    'html[data-theme=light] .cmd-palette{background:#fff;border-color:rgba(122,95,50,.35)}',
    '.cmd-palette input{width:100%;border:0;border-bottom:1px solid rgba(184,149,106,.2);background:transparent;color:rgba(247,245,240,.95);padding:.9rem 1rem;font:inherit;font-size:.95rem;outline:none}',
    'html[data-theme=light] .cmd-palette input{color:#0c0c0e}',
    '.cmd-palette-list{max-height:320px;overflow:auto}',
    '.cmd-palette-item{display:flex;justify-content:space-between;gap:.75rem;width:100%;text-align:left;padding:.65rem 1rem;border:0;background:transparent;color:rgba(247,245,240,.85);font:inherit;font-size:.85rem;cursor:pointer}',
    '.cmd-palette-item:hover,.cmd-palette-item.is-active{background:rgba(184,149,106,.12)}',
    '.cmd-palette-item kbd{font-size:.68rem;opacity:.55}',
    'html[data-theme=light] .cmd-palette-item{color:#0c0c0e}',
    '.desk-toast{position:fixed;bottom:1.25rem;right:1.25rem;z-index:180;padding:.65rem 1rem;border-radius:10px;background:#1a1a1c;border:1px solid rgba(184,149,106,.4);color:rgba(247,245,240,.92);font-size:.8rem;box-shadow:0 12px 32px rgba(0,0,0,.4);opacity:0;transform:translateY(8px);transition:opacity .2s,transform .2s;pointer-events:none}',
    '.desk-toast.is-show{opacity:1;transform:translateY(0)}',
    'html[data-theme=light] .desk-toast{background:#fff;color:#0c0c0e;border-color:rgba(122,95,50,.35)}'
  ].join('');
  document.head.appendChild(css);

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    ['asia', 'london', 'ny'].forEach(function (k) {
      var node = document.getElementById('sess-' + k);
      if (node && !document.getElementById('eta-' + k)) {
        var span = document.createElement('span');
        span.className = 'sess-eta';
        span.id = 'eta-' + k;
        node.appendChild(span);
      }
    });

    var sessionBar = document.getElementById('session-bar');
    if (sessionBar && !sessionBar.querySelector('.status-pill')) {
      var pill = document.createElement('span');
      pill.className = 'status-pill';
      pill.title = 'Educational desk status';
      pill.innerHTML = '<span class="dot" aria-hidden="true"></span> Desk live';
      sessionBar.insertBefore(pill, sessionBar.firstChild);
    }

    var cmdGroup = document.querySelector('.cmd-group') || document.querySelector('.cmd-actions');
    if (cmdGroup && !document.querySelector('.density-chip')) {
      var sep = document.createElement('span');
      sep.className = 'cmd-sep';
      sep.setAttribute('aria-hidden', 'true');
      var d1 = document.createElement('button');
      d1.type = 'button'; d1.className = 'density-chip active'; d1.setAttribute('data-density', 'comfortable');
      d1.title = 'Comfortable spacing'; d1.textContent = 'Comfort';
      var d2 = document.createElement('button');
      d2.type = 'button'; d2.className = 'density-chip'; d2.setAttribute('data-density', 'compact');
      d2.title = 'Compact density'; d2.textContent = 'Compact';
      var pk = document.createElement('button');
      pk.type = 'button'; pk.className = 'tool-chip'; pk.id = 'cmd-palette-open';
      pk.title = 'Command palette (Ctrl+K)'; pk.textContent = '⌘K';
      cmdGroup.appendChild(sep);
      cmdGroup.appendChild(d1);
      cmdGroup.appendChild(d2);
      cmdGroup.appendChild(pk);
    }

    var regime = document.getElementById('regime-strip');
    if (regime && !document.querySelector('.basket-strip')) {
      var baskets = document.createElement('div');
      baskets.className = 'basket-strip';
      baskets.setAttribute('role', 'group');
      baskets.setAttribute('aria-label', 'Regime baskets');
      [['riskon', 'Risk-on'], ['riskoff', 'Risk-off'], ['rates', 'Rates'], ['commod', 'Commod'], ['fx', 'FX']].forEach(function (pair) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'basket-chip';
        b.setAttribute('data-basket', pair[0]);
        b.textContent = pair[1];
        baskets.appendChild(b);
      });
      if (regime.parentNode) regime.parentNode.insertBefore(baskets, regime.nextSibling);
    }

    var focusStage = document.getElementById('focus') || document.querySelector('.desk-stage');
    if (focusStage && !document.getElementById('focus-history')) {
      var hist = document.createElement('div');
      hist.className = 'history-strip';
      hist.id = 'focus-history';
      hist.setAttribute('aria-label', 'Recent focus symbols');
      var panel = document.getElementById('focus-panel');
      if (panel && panel.parentNode) panel.parentNode.insertBefore(hist, panel);
      else focusStage.appendChild(hist);
    }

    var journal = document.getElementById('macro-journal');
    if (journal && !document.getElementById('journal-templates')) {
      var row = document.createElement('div');
      row.className = 'template-row';
      row.id = 'journal-templates';
      [['event', 'Event risk'], ['regime', 'Regime'], ['invalidation', 'Invalidation']].forEach(function (pair) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'template-chip';
        b.setAttribute('data-tpl', pair[0]);
        b.textContent = pair[1];
        row.appendChild(b);
      });
      journal.parentNode.insertBefore(row, journal);
    }

    if (!document.getElementById('cmd-palette')) {
      var bd = document.createElement('div');
      bd.className = 'cmd-palette-backdrop';
      bd.id = 'cmd-palette';
      bd.setAttribute('aria-hidden', 'true');
      bd.innerHTML = '<div class="cmd-palette" role="dialog" aria-label="Command palette"><input type="text" id="cmd-palette-input" placeholder="Jump to symbol, layout, panel…" autocomplete="off" /><div class="cmd-palette-list" id="cmd-palette-list"></div></div>';
      document.body.appendChild(bd);
    }
    if (!document.getElementById('desk-toast')) {
      var toastEl = document.createElement('div');
      toastEl.className = 'desk-toast';
      toastEl.id = 'desk-toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
  });
})();
