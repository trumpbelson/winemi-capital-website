/*! WINEMI CAPITAL — site-wide interactivity
 * Shortcuts help, term tooltips, quick study dock, accordion, copy-link headings.
 * Educational framing only.
 */
(function () {
  'use strict';

  var TERMS = {
    'demand zone': 'An area where buying interest previously absorbed selling and price departed impulsively. Study locations where residual demand may still exist — not a guarantee of a bounce.',
    'supply zone': 'An area where selling previously absorbed buying and price dropped away. Residual supply can reject later rallies into the zone.',
    'invalidation': 'The price level or condition that proves a hypothesis wrong. Written before targets so risk is designed, not discovered after entry.',
    'regime': 'The broader market environment (risk-on, risk-off, range, trend). Higher-timeframe regime filters lower-timeframe noise.',
    'structure': 'Observable sequence of bases, departures, and swings. Structure-first means mapping what price has already done before narrative.',
    'liquidity': 'Pools of resting orders (stops, limits) that can attract or accelerate price. Discussed as context, not as certainty of a hunt.',
    'order flow': 'How aggressive buyers and sellers interact at the bid/ask. Educational lens for imbalance — not proof of institutional intent on every print.',
    'base': 'A pause or consolidation after an impulsive move. Freshness and strength of departure affect zone quality.',
    'macro': 'Policy, growth, rates, and calendar forces that expand or compress ranges and can invalidate quiet bases.',
    'risk-on': 'Environment where risk assets tend to be bid and hedges lag. Labels are descriptive, not forecasts.',
    'risk-off': 'Environment where safety and hedges are preferred. Always confirm with structure across assets.',
    'dxy': 'US Dollar Index — broad dollar strength/weakness context for FX, commodities, and global risk.',
    'vix': 'Volatility index often used as a fear/complacency gauge. Context only — not a trade signal by itself.'
  };

  function injectStyles() {
    if (document.getElementById('site-ix-style')) return;
    var s = document.createElement('style');
    s.id = 'site-ix-style';
    s.textContent = [
      '.term-tip{border-bottom:1px dashed rgba(201,168,124,.55);cursor:help;position:relative}',
      '.term-tip:hover,.term-tip:focus{color:#e0c49a}',
      'html[data-theme=light] .term-tip:hover,html[data-theme=light] .term-tip:focus{color:#7a5f32}',
      '.term-popover{position:absolute;z-index:150;max-width:280px;padding:.7rem .85rem;border-radius:10px;border:1px solid rgba(184,149,106,.4);background:#161618;color:rgba(247,245,240,.9);font-size:.78rem;line-height:1.45;box-shadow:0 16px 40px rgba(0,0,0,.45);pointer-events:none}',
      'html[data-theme=light] .term-popover{background:#fff;color:#0c0c0e;border-color:rgba(122,95,50,.35);box-shadow:0 12px 28px rgba(0,0,0,.1)}',
      '.study-dock{position:fixed;left:1rem;bottom:1rem;z-index:95;display:flex;flex-direction:column;gap:.4rem}',
      '.study-dock-toggle{width:2.75rem;height:2.75rem;border-radius:999px;border:1px solid rgba(184,149,106,.45);background:rgba(20,20,22,.94);color:#c9a87c;cursor:pointer;font-size:1rem;box-shadow:0 10px 28px rgba(0,0,0,.35)}',
      '.study-dock-toggle:hover{background:rgba(184,149,106,.14)}',
      '.study-dock-panel{display:none;flex-direction:column;gap:.3rem;padding:.55rem;border-radius:14px;border:1px solid rgba(184,149,106,.35);background:rgba(16,16,18,.96);min-width:11rem;box-shadow:0 16px 40px rgba(0,0,0,.4)}',
      '.study-dock.is-open .study-dock-panel{display:flex}',
      '.study-dock-panel a,.study-dock-panel button{display:block;text-align:left;padding:.45rem .65rem;border-radius:8px;border:0;background:transparent;color:rgba(247,245,240,.88);font:inherit;font-size:.78rem;text-decoration:none;cursor:pointer}',
      '.study-dock-panel a:hover,.study-dock-panel button:hover{background:rgba(184,149,106,.12);color:#e0c49a}',
      'html[data-theme=light] .study-dock-toggle,html[data-theme=light] .study-dock-panel{background:#fff;color:#0c0c0e;border-color:rgba(122,95,50,.3)}',
      'html[data-theme=light] .study-dock-panel a,html[data-theme=light] .study-dock-panel button{color:#0c0c0e}',
      '.ix-help-backdrop{position:fixed;inset:0;z-index:210;background:rgba(0,0,0,.55);display:none;align-items:flex-start;justify-content:center;padding:10vh 1rem 1rem}',
      '.ix-help-backdrop.is-open{display:flex}',
      '.ix-help{width:min(420px,100%);background:#161618;border:1px solid rgba(184,149,106,.4);border-radius:14px;padding:1.1rem 1.2rem;box-shadow:0 24px 64px rgba(0,0,0,.5);color:rgba(247,245,240,.9)}',
      'html[data-theme=light] .ix-help{background:#fff;color:#0c0c0e;border-color:rgba(122,95,50,.35)}',
      '.ix-help h2{margin:0 0 .5rem;font-size:.85rem;letter-spacing:.08em;text-transform:uppercase;color:#c9a87c}',
      'html[data-theme=light] .ix-help h2{color:#7a5f32}',
      '.ix-help ul{margin:0;padding:0;list-style:none}',
      '.ix-help li{display:flex;justify-content:space-between;gap:1rem;padding:.4rem 0;border-bottom:1px solid rgba(184,149,106,.12);font-size:.82rem}',
      '.ix-help kbd{font-size:.72rem;opacity:.7;white-space:nowrap}',
      '.ix-help p{margin:.75rem 0 0;font-size:.72rem;opacity:.65}',
      '.copy-link{opacity:0;margin-left:.35rem;border:0;background:transparent;color:#c9a87c;cursor:pointer;font-size:.75rem;vertical-align:middle}',
      'h1:hover .copy-link,h2:hover .copy-link,h3:hover .copy-link,.copy-link:focus{opacity:1}',
      '.ix-toast{position:fixed;bottom:1.25rem;left:50%;transform:translateX(-50%) translateY(8px);z-index:220;padding:.55rem .9rem;border-radius:999px;background:#1a1a1c;border:1px solid rgba(184,149,106,.4);color:rgba(247,245,240,.92);font-size:.78rem;opacity:0;transition:opacity .2s,transform .2s;pointer-events:none}',
      '.ix-toast.is-show{opacity:1;transform:translateX(-50%) translateY(0)}',
      'html[data-theme=light] .ix-toast{background:#fff;color:#0c0c0e;border-color:rgba(122,95,50,.35)}',
      '@media (max-width:640px){.study-dock{left:.65rem;bottom:.65rem}}'
    ].join('');
    document.head.appendChild(s);
  }

  function toast(msg) {
    var el = document.getElementById('ix-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'ix-toast';
      el.className = 'ix-toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('is-show'); }, 1800);
  }

  function pathPrefix() {
    var path = (window.location.pathname || '');
    return /\/pages\//.test(path) ? '' : 'pages/';
  }

  function wireAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
      if (btn.dataset.ixBound) return;
      btn.dataset.ixBound = '1';
      btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var panelId = btn.getAttribute('aria-controls');
        var panel = panelId ? document.getElementById(panelId) : btn.nextElementSibling;
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if (panel) {
          panel.hidden = expanded;
          panel.classList.toggle('is-open', !expanded);
        }
        var icon = btn.querySelector('.accordion-icon');
        if (icon) icon.textContent = expanded ? '+' : '−';
      });
      var panelId = btn.getAttribute('aria-controls');
      var panel = panelId ? document.getElementById(panelId) : btn.nextElementSibling;
      if (panel && btn.getAttribute('aria-expanded') !== 'true') {
        panel.hidden = true;
      }
    });
  }

  function enhanceTerms() {
    var main = document.querySelector('main');
    if (!main) return;
    var walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.tagName;
        if (/^(SCRIPT|STYLE|A|BUTTON|INPUT|TEXTAREA|CODE|PRE|KBD)$/.test(tag)) return NodeFilter.FILTER_REJECT;
        if (p.closest('.term-tip, .term-popover, .study-dock, .ix-help')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    var keys = Object.keys(TERMS).sort(function (a, b) { return b.length - a.length; });
    nodes.forEach(function (textNode) {
      var text = textNode.nodeValue;
      var lower = text.toLowerCase();
      var hit = null;
      for (var i = 0; i < keys.length; i++) {
        var idx = lower.indexOf(keys[i]);
        if (idx !== -1) { hit = { key: keys[i], idx: idx }; break; }
      }
      if (!hit) return;
      var before = text.slice(0, hit.idx);
      var match = text.slice(hit.idx, hit.idx + hit.key.length);
      var after = text.slice(hit.idx + hit.key.length);
      var frag = document.createDocumentFragment();
      if (before) frag.appendChild(document.createTextNode(before));
      var span = document.createElement('span');
      span.className = 'term-tip';
      span.tabIndex = 0;
      span.setAttribute('data-term', hit.key);
      span.setAttribute('title', TERMS[hit.key]);
      span.textContent = match;
      frag.appendChild(span);
      if (after) frag.appendChild(document.createTextNode(after));
      textNode.parentNode.replaceChild(frag, textNode);
    });

    var pop;
    function showPop(el) {
      hidePop();
      var key = el.getAttribute('data-term');
      if (!key || !TERMS[key]) return;
      pop = document.createElement('div');
      pop.className = 'term-popover';
      pop.textContent = TERMS[key];
      document.body.appendChild(pop);
      var r = el.getBoundingClientRect();
      var top = r.bottom + window.scrollY + 6;
      var left = Math.min(r.left + window.scrollX, window.scrollX + window.innerWidth - 300);
      pop.style.top = top + 'px';
      pop.style.left = Math.max(8, left) + 'px';
    }
    function hidePop() {
      if (pop && pop.parentNode) pop.parentNode.removeChild(pop);
      pop = null;
    }
    document.querySelectorAll('.term-tip').forEach(function (el) {
      el.addEventListener('mouseenter', function () { showPop(el); });
      el.addEventListener('mouseleave', hidePop);
      el.addEventListener('focus', function () { showPop(el); });
      el.addEventListener('blur', hidePop);
    });
  }

  function mountDock() {
    if (document.getElementById('study-dock')) return;
    if (/education-macro/.test(window.location.pathname || '')) return;

    var prefix = pathPrefix();
    var dock = document.createElement('div');
    dock.id = 'study-dock';
    dock.className = 'study-dock';
    dock.innerHTML =
      '<div class="study-dock-panel" role="menu" aria-label="Quick study">' +
        '<a href="' + prefix + 'education-macro.html" role="menuitem">Macro desk</a>' +
        '<a href="' + prefix + 'education-candlesticks.html" role="menuitem">Candlesticks</a>' +
        '<a href="' + prefix + 'markets.html" role="menuitem">Markets</a>' +
        '<a href="' + prefix + 'education.html" role="menuitem">Education hub</a>' +
        '<button type="button" id="study-dock-help" role="menuitem">Shortcuts (?)</button>' +
      '</div>' +
      '<button type="button" class="study-dock-toggle" aria-label="Open study menu" title="Study tools">◎</button>';
    document.body.appendChild(dock);

    var toggle = dock.querySelector('.study-dock-toggle');
    toggle.addEventListener('click', function () {
      dock.classList.toggle('is-open');
      toggle.setAttribute('aria-label', dock.classList.contains('is-open') ? 'Close study menu' : 'Open study menu');
    });
    document.addEventListener('click', function (e) {
      if (!dock.contains(e.target)) dock.classList.remove('is-open');
    });
    var helpBtn = document.getElementById('study-dock-help');
    if (helpBtn) helpBtn.addEventListener('click', openHelp);
  }

  function openHelp() {
    var bd = document.getElementById('ix-help');
    if (!bd) return;
    bd.classList.add('is-open');
  }
  function closeHelp() {
    var bd = document.getElementById('ix-help');
    if (bd) bd.classList.remove('is-open');
  }
  function mountHelp() {
    if (document.getElementById('ix-help')) return;
    var bd = document.createElement('div');
    bd.id = 'ix-help';
    bd.className = 'ix-help-backdrop';
    bd.innerHTML =
      '<div class="ix-help" role="dialog" aria-label="Keyboard shortcuts">' +
        '<h2>Keyboard shortcuts</h2>' +
        '<ul>' +
          '<li><span>Command launcher (home)</span><kbd>Ctrl+K</kbd></li>' +
          '<li><span>This help</span><kbd>?</kbd></li>' +
          '<li><span>Close overlays</span><kbd>Esc</kbd></li>' +
          '<li><span>Macro desk palette</span><kbd>Ctrl+K</kbd></li>' +
          '<li><span>Go + Macro / Edu / Candles / Home</span><kbd>g m · g e · g c · g h</kbd></li>' +
        '</ul>' +
        '<p>Educational tools only — not investment advice.</p>' +
      '</div>';
    document.body.appendChild(bd);
    bd.addEventListener('click', function (e) {
      if (e.target === bd) closeHelp();
    });
  }

  function copyHeadings() {
    document.querySelectorAll('main h2[id], main h3[id]').forEach(function (h) {
      if (h.querySelector('.copy-link')) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-link';
      btn.setAttribute('aria-label', 'Copy link to section');
      btn.title = 'Copy link';
      btn.textContent = '🔗';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var url = window.location.href.split('#')[0] + '#' + h.id;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () { toast('Link copied'); }).catch(function () {
            toast(url);
          });
        } else {
          toast(url);
        }
      });
      h.appendChild(btn);
    });
  }

  function firstVisitCue() {
    try {
      if (localStorage.getItem('winemi-ix-seen')) return;
      localStorage.setItem('winemi-ix-seen', '1');
      setTimeout(function () {
        toast('Tip: press ? for shortcuts · ◎ for study tools');
      }, 1200);
    } catch (e) {}
  }

  function wireKeys() {
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (/INPUT|TEXTAREA|SELECT/.test(tag) || e.target.isContentEditable) return;

      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        openHelp();
      }
      if (e.key === 'Escape') {
        closeHelp();
        var dock = document.getElementById('study-dock');
        if (dock) dock.classList.remove('is-open');
      }
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        if (e.key === 'g') {
          wireKeys._g = true;
          clearTimeout(wireKeys._gt);
          wireKeys._gt = setTimeout(function () { wireKeys._g = false; }, 800);
          return;
        }
        if (wireKeys._g) {
          wireKeys._g = false;
          var prefix = pathPrefix();
          if (e.key === 'm') window.location.href = prefix + 'education-macro.html';
          if (e.key === 'e') window.location.href = prefix + 'education.html';
          if (e.key === 'c') window.location.href = prefix + 'education-candlesticks.html';
          if (e.key === 'h') window.location.href = prefix ? '../index.html' : 'index.html';
        }
      }
    });
  }

  function boot() {
    injectStyles();
    wireAccordions();
    enhanceTerms();
    mountDock();
    mountHelp();
    copyHeadings();
    wireKeys();
    firstVisitCue();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
