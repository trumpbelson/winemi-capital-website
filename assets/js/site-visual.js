/*! WINEMI CAPITAL — visual interactivity layer
 * Ambient orbs, tilt cards, ripple buttons, live chips, counters.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function injectCss() {
    if (document.querySelector('link[href*="site-visual.css"]')) return;
    var path = (window.location.pathname || '');
    var inPages = /\/pages\//.test(path);
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = (inPages ? '../' : '') + 'assets/css/site-visual.css';
    document.head.appendChild(l);
  }

  function mountAmbient() {
    if (document.querySelector('.visual-ambient')) return;
    if (reduce) return;
    var el = document.createElement('div');
    el.className = 'visual-ambient';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<div class="orb orb-a"></div><div class="orb orb-b"></div><div class="orb orb-c"></div>';
    document.body.insertBefore(el, document.body.firstChild);
  }

  function enhanceLiveChips() {
    document.querySelectorAll('.header-status').forEach(function (el) {
      el.classList.add('ix-chip-live');
    });
    document.querySelectorAll('.home-sess.is-open').forEach(function (el) {
      el.classList.add('ix-chip-live');
    });
  }

  function wireTilt() {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return;
    var cards = document.querySelectorAll('main .card, main .desk-quick a');
    cards.forEach(function (card) {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = '1';
      card.classList.add('ix-tilt');
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg) translateY(-2px)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      });
    });
  }

  function wireRipple() {
    document.querySelectorAll('.btn, .desk-quick a, .pulse-card').forEach(function (btn) {
      if (btn.dataset.rippleBound) return;
      btn.dataset.rippleBound = '1';
      btn.style.position = btn.style.position || 'relative';
      btn.style.overflow = 'hidden';
      btn.addEventListener('click', function (e) {
        if (reduce) return;
        var r = btn.getBoundingClientRect();
        var size = Math.max(r.width, r.height);
        var span = document.createElement('span');
        span.className = 'ix-ripple';
        span.style.width = span.style.height = size + 'px';
        span.style.left = (e.clientX - r.left - size / 2) + 'px';
        span.style.top = (e.clientY - r.top - size / 2) + 'px';
        btn.appendChild(span);
        setTimeout(function () {
          if (span.parentNode) span.parentNode.removeChild(span);
        }, 650);
      });
    });
  }

  function animateCounters() {
    var nodes = document.querySelectorAll('[data-count]');
    if (!nodes.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      if (isNaN(target)) return;
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      if (reduce) {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
        return;
      }
      var start = performance.now();
      var dur = 1100;
      function frame(now) {
        var t = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - t, 3);
        var val = target * eased;
        el.textContent = prefix + val.toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      nodes.forEach(function (n) {
        n.classList.add('ix-stat');
        io.observe(n);
      });
    } else {
      nodes.forEach(run);
    }
  }

  function injectHomeStats() {
    var section = document.getElementById('desk-access');
    if (!section || document.getElementById('ix-home-stats')) return;
    var container = section.querySelector('.container');
    if (!container) return;

    var strip = document.createElement('div');
    strip.id = 'ix-home-stats';
    strip.setAttribute('aria-label', 'Study context');
    strip.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);gap:0.65rem;margin:0 0 1.25rem';
    if (window.matchMedia('(max-width:700px)').matches) {
      strip.style.gridTemplateColumns = 'repeat(2,1fr)';
    }
    var items = [
      { label: 'Sessions tracked', count: 3, suffix: '' },
      { label: 'Regime refs', count: 6, suffix: '' },
      { label: 'Research desks', count: 4, suffix: '' },
      { label: 'Study tools', count: 12, suffix: '+' }
    ];
    items.forEach(function (it) {
      var card = document.createElement('div');
      card.className = 'card';
      card.style.cssText = 'padding:0.85rem 1rem;text-align:left';
      card.innerHTML =
        '<div class="ix-stat" data-count="' + it.count + '" data-suffix="' + it.suffix + '">0</div>' +
        '<div style="font-size:0.72rem;letter-spacing:0.04em;text-transform:uppercase;opacity:0.65;margin-top:0.25rem">' + it.label + '</div>';
      strip.appendChild(card);
    });
    var sessionBar = container.querySelector('#home-session-bar');
    if (sessionBar && sessionBar.nextSibling) {
      container.insertBefore(strip, sessionBar.nextSibling);
    } else {
      container.insertBefore(strip, container.firstChild);
    }
  }

  function parallaxHero() {
    if (reduce) return;
    var hero = document.querySelector('.hero');
    if (!hero) return;
    var onScroll = function () {
      var y = window.scrollY || 0;
      if (y > 500) return;
      var content = hero.querySelector('.hero-content');
      if (content) content.style.transform = 'translateY(' + (y * 0.08) + 'px)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function themeTransitionPolish() {
    document.documentElement.style.transition = 'background-color 0.25s ease, color 0.25s ease';
  }

  function boot() {
    injectCss();
    mountAmbient();
    themeTransitionPolish();
    injectHomeStats();
    enhanceLiveChips();
    wireTilt();
    wireRipple();
    animateCounters();
    parallaxHero();
    setTimeout(function () {
      enhanceLiveChips();
      wireTilt();
      wireRipple();
      animateCounters();
    }, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
