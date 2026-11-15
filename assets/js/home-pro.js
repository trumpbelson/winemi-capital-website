/*! WINEMI CAPITAL — Homepage Pro interactions
 * Command centre, session rings, sparkline pulse, reveals, float hint.
 * Educational UI only — no live trading advice.
 */
(function () {
  'use strict';
  if (!document.body.classList.contains('is-home')) return;

  var CIRC = 2 * Math.PI * 26;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function sessionProgress(utcH, utcM, openH, closeH) {
    var now = utcH + utcM / 60;
    if (openH < closeH) {
      if (now < openH) return { open: false, p: 0, eta: openH - now };
      if (now >= closeH) return { open: false, p: 1, eta: (24 - now) + openH };
      return { open: true, p: (now - openH) / (closeH - openH), eta: closeH - now };
    }
    if (now >= openH || now < closeH) {
      var span = (24 - openH) + closeH;
      var elapsed = now >= openH ? now - openH : (24 - openH) + now;
      return { open: true, p: elapsed / span, eta: span - elapsed };
    }
    return { open: false, p: 0, eta: openH - now };
  }

  function fmtEta(hours) {
    if (hours == null || isNaN(hours)) return '—';
    var m = Math.round(hours * 60);
    if (m < 60) return m + 'm';
    var h = Math.floor(m / 60);
    var mm = m % 60;
    return h + 'h' + (mm ? ' ' + mm + 'm' : '');
  }

  function updateRings() {
    var now = new Date();
    var h = now.getUTCHours();
    var m = now.getUTCMinutes();
    var meta = $('#cmd-utc-meta');
    if (meta) {
      meta.textContent = 'UTC ' + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
    }
    var defs = [
      { id: 'sr-asia', open: 0, close: 9 },
      { id: 'sr-london', open: 7, close: 16 },
      { id: 'sr-ny', open: 13, close: 21 }
    ];
    defs.forEach(function (d) {
      var el = document.getElementById(d.id);
      if (!el) return;
      var st = sessionProgress(h, m, d.open, d.close);
      el.classList.toggle('is-open', st.open);
      var fg = el.querySelector('.sr-fg');
      if (fg) {
        var p = Math.max(0, Math.min(1, st.p));
        fg.style.strokeDashoffset = String(CIRC * (1 - p));
      }
      var state = el.querySelector('.sr-state');
      if (state) {
        state.textContent = st.open
          ? 'Open · ' + fmtEta(st.eta) + ' left'
          : 'Closed · opens in ' + fmtEta(st.eta);
      }
    });
  }

  function sparkPath(seed, w, h) {
    var pts = [];
    var n = 14;
    var x = 0;
    var y = h * 0.55;
    var step = w / (n - 1);
    var s = seed;
    function rnd() {
      s = (s * 16807 + 0) % 2147483647;
      return (s - 1) / 2147483646;
    }
    for (var i = 0; i < n; i++) {
      y = Math.max(2, Math.min(h - 2, y + (rnd() - 0.48) * h * 0.28));
      pts.push((i === 0 ? 'M' : 'L') + (x.toFixed(1)) + ',' + y.toFixed(1));
      x += step;
    }
    return pts.join(' ');
  }

  function mountSparks() {
    $$('.pulse-pro .pp-spark').forEach(function (svg, i) {
      if (svg.querySelector('path')) return;
      var w = 120, h = 28;
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      svg.setAttribute('preserveAspectRatio', 'none');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', sparkPath(17 + i * 97, w, h));
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'rgba(201,168,124,0.75)');
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(path);
    });
  }

  function injectCommandCentre() {
    var host = document.getElementById('desk-access');
    if (!host || document.getElementById('home-command')) return;
    var container = host.querySelector('.container');
    if (!container) return;

    var sessionBar = document.getElementById('home-session-bar');
    if (sessionBar) sessionBar.style.display = 'none';

    var wrap = document.createElement('div');
    wrap.id = 'home-command';
    wrap.className = 'home-command hp-reveal';
    wrap.innerHTML = [
      '<div class="home-command-grid">',
      '  <div class="cmd-panel">',
      '    <div class="cmd-panel-head">',
      '      <h3>Session intelligence</h3>',
      '      <span class="cmd-meta" id="cmd-utc-meta">UTC --:--</span>',
      '    </div>',
      '    <div class="session-intel" aria-label="Global session status">',
      '      <div class="sess-ring" id="sr-asia">',
      '        <svg viewBox="0 0 64 64" aria-hidden="true">',
      '          <circle class="sr-bg" cx="32" cy="32" r="26"></circle>',
      '          <circle class="sr-fg" cx="32" cy="32" r="26" style="stroke-dasharray:' + CIRC + '"></circle>',
      '        </svg>',
      '        <span class="sr-label">Asia</span>',
      '        <span class="sr-state">—</span>',
      '      </div>',
      '      <div class="sess-ring" id="sr-london">',
      '        <svg viewBox="0 0 64 64" aria-hidden="true">',
      '          <circle class="sr-bg" cx="32" cy="32" r="26"></circle>',
      '          <circle class="sr-fg" cx="32" cy="32" r="26" style="stroke-dasharray:' + CIRC + '"></circle>',
      '        </svg>',
      '        <span class="sr-label">London</span>',
      '        <span class="sr-state">—</span>',
      '      </div>',
      '      <div class="sess-ring" id="sr-ny">',
      '        <svg viewBox="0 0 64 64" aria-hidden="true">',
      '          <circle class="sr-bg" cx="32" cy="32" r="26"></circle>',
      '          <circle class="sr-fg" cx="32" cy="32" r="26" style="stroke-dasharray:' + CIRC + '"></circle>',
      '        </svg>',
      '        <span class="sr-label">New York</span>',
      '        <span class="sr-state">—</span>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div class="cmd-panel">',
      '    <div class="cmd-panel-head">',
      '      <h3>Command tools</h3>',
      '      <span class="cmd-meta">Ctrl+K</span>',
      '    </div>',
      '    <div class="cmd-tools">',
      '      <a class="cmd-tool" href="pages/education-macro.html">',
      '        <span class="ct-key">M</span>',
      '        <span class="ct-icon">◈</span>',
      '        <span class="ct-title">Macro desk</span>',
      '        <span class="ct-desc">Calendar, board, focus chart, watchlist</span>',
      '      </a>',
      '      <a class="cmd-tool" href="pages/markets.html">',
      '        <span class="ct-key">W</span>',
      '        <span class="ct-icon">▣</span>',
      '        <span class="ct-title">Markets workspace</span>',
      '        <span class="ct-desc">Multi-asset TradingView context</span>',
      '      </a>',
      '      <a class="cmd-tool" href="pages/education-candlesticks.html">',
      '        <span class="ct-key">S</span>',
      '        <span class="ct-icon">◇</span>',
      '        <span class="ct-title">Structure literacy</span>',
      '        <span class="ct-desc">Bases, departures, invalidation</span>',
      '      </a>',
      '      <button type="button" class="cmd-tool" id="cmd-open-palette" data-action="palette">',
      '        <span class="ct-key">⌘K</span>',
      '        <span class="ct-icon">⬡</span>',
      '        <span class="ct-title">Command palette</span>',
      '        <span class="ct-desc">Jump anywhere on the site</span>',
      '      </button>',
      '    </div>',
      '  </div>',
      '</div>',
      '<div class="home-pulse-pro" aria-label="Regime pulse board">',
      pulseCard('DXY', 'Dollar index', 'FX pressure', 'pages/education-macro.html#focus'),
      pulseCard('US10Y', 'Treasury yield', 'Rates regime', 'pages/education-macro.html#focus'),
      pulseCard('VIX', 'Volatility', 'Risk appetite', 'pages/education-macro.html#focus'),
      pulseCard('SPX', 'S&P 500', 'Equity beta', 'pages/education-macro.html#focus'),
      pulseCard('GOLD', 'Gold', 'Hard asset', 'pages/education-macro.html#focus'),
      pulseCard('WTI', 'Crude oil', 'Energy complex', 'pages/education-macro.html#focus'),
      '</div>',
      '<div class="home-insight-strip">',
      '  <article class="insight-tile">',
      '    <div class="it-kicker">Process</div>',
      '    <h3 class="it-title">Structure before narrative</h3>',
      '    <p class="it-copy">Bases, impulsive departures, and defined invalidation remain the primary frame — stories follow price structure.</p>',
      '    <a class="it-link" href="pages/education-candlesticks.html">Study structure →</a>',
      '  </article>',
      '  <article class="insight-tile">',
      '    <div class="it-kicker">Macro</div>',
      '    <h3 class="it-title">Cross-asset confirmation</h3>',
      '    <p class="it-copy">Equities, yields, the dollar, and gold are read together. Single-chart storytelling is treated as incomplete.</p>',
      '    <a class="it-link" href="pages/education-macro.html">Open macro desk →</a>',
      '  </article>',
      '  <article class="insight-tile">',
      '    <div class="it-kicker">Risk</div>',
      '    <h3 class="it-title">Event risk is zone quality</h3>',
      '    <p class="it-copy">The calendar expands ranges around otherwise clean levels. Patience in high-volatility weeks is infrastructure.</p>',
      '    <a class="it-link" href="pages/education-risk.html">Risk framing →</a>',
      '  </article>',
      '</div>'
    ].join('');

    var deskQuick = container.querySelector('.desk-quick');
    if (deskQuick) {
      container.insertBefore(wrap, deskQuick);
    } else {
      container.appendChild(wrap);
    }

    var paletteBtn = document.getElementById('cmd-open-palette');
    if (paletteBtn) {
      paletteBtn.addEventListener('click', function () {
        var existing = document.querySelector('.home-cmd-backdrop, .cmd-backdrop, [data-cmd-palette]');
        if (existing) {
          existing.classList.add('is-open');
          return;
        }
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
      });
    }
  }

  function pulseCard(sym, name, tag, href) {
    return [
      '<a class="pulse-pro" href="' + href + '">',
      '  <span class="pp-sym">' + sym + '</span>',
      '  <span class="pp-name">' + name + '</span>',
      '  <svg class="pp-spark" aria-hidden="true"></svg>',
      '  <span class="pp-tag">' + tag + '</span>',
      '</a>'
    ].join('');
  }

  function bindReveals() {
    var nodes = $$('.hp-reveal, #desk-access .desk-quick, #desk-access .home-regime, .home-insight-strip, .home-pulse-pro');
    nodes.forEach(function (n) {
      if (!n.classList.contains('hp-reveal')) n.classList.add('hp-reveal');
    });
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    nodes.forEach(function (n) { io.observe(n); });
  }

  function bindTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    $$('.desk-quick a, .pulse-pro, .cmd-tool').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 5) + 'deg) translateY(-2px)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      });
    });
  }

  function bindFloatHint() {
    var hint = document.createElement('div');
    hint.className = 'home-float-hint';
    hint.innerHTML = 'Press <kbd>Ctrl</kbd> + <kbd>K</kbd> for command palette · <kbd>?</kbd> for shortcuts';
    document.body.appendChild(hint);
    var shown = false;
    var t = setTimeout(function () {
      if (window.scrollY < 120) {
        hint.classList.add('is-visible');
        shown = true;
        setTimeout(function () { hint.classList.remove('is-visible'); }, 5200);
      }
    }, 1800);
    window.addEventListener('scroll', function () {
      if (shown && window.scrollY > 200) hint.classList.remove('is-visible');
    }, { passive: true });
    hint.addEventListener('click', function () {
      hint.classList.remove('is-visible');
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    });
    window.addEventListener('pagehide', function () { clearTimeout(t); });
  }

  function bindHeroParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var bg = document.querySelector('.hero-bg');
    var panel = document.querySelector('.hero-content');
    if (!bg && !panel) return;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y > 900) return;
      if (bg) bg.style.transform = 'scale(1.06) translateY(' + (y * 0.18) + 'px';
      if (panel) panel.style.transform = 'translateY(' + (y * 0.06) + 'px';
    }, { passive: true });
  }

  function boot() {
    injectCommandCentre();
    updateRings();
    setInterval(updateRings, 30000);
    mountSparks();
    bindReveals();
    bindTilt();
    bindFloatHint();
    bindHeroParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
