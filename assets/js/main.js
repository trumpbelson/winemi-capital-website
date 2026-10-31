/* WINEMI CAPITAL. — Site interactions */
(function () {
  'use strict';

  // Theme toggle
  (function theme() {
    var root = document.documentElement;
    var btn = document.querySelector('.theme-toggle');
    function apply(t) {
      if (t === 'light') root.setAttribute('data-theme', 'light');
      else root.removeAttribute('data-theme');
      try { localStorage.setItem('winemi-theme', t); } catch (e) {}
    }
    if (btn) {
      btn.addEventListener('click', function () {
        var cur = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        apply(cur === 'light' ? 'dark' : 'light');
      });
    }
  })();

  // Header scroll state
  (function headerScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    function onScroll() {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // Mobile nav
  (function mobileNav() {
    var toggle = document.querySelector('.mobile-toggle');
    var drawer = document.querySelector('.mobile-nav');
    if (!toggle || !drawer) return;
    toggle.addEventListener('click', function () {
      var open = drawer.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });
  })();

  // Contact form feedback (static)
  (function contactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var feedback = document.getElementById('contact-feedback');
      if (feedback) {
        feedback.hidden = false;
        feedback.textContent = 'Thank you. Your message has been noted. For production use, connect this form to your mail or CRM endpoint.';
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  })();

  // TradingView chart (markets pages)
  (function tvChart() {
    var el = document.getElementById('tradingview-widget');
    if (!el || typeof TradingView === 'undefined') return;
    try {
      new TradingView.widget({
        autosize: true,
        symbol: 'NASDAQ:NDX',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#0a0a0b',
        enable_publishing: false,
        hide_top_toolbar: false,
        container_id: 'tradingview-widget'
      });
    } catch (err) {}
  })();

  // Ensure map section precedes education when both present
  (function orderMapEdu() {
    var map = document.getElementById('map');
    var edu = document.getElementById('education-preview');
    if (!map || !edu || !map.parentNode) return;
    if (edu.compareDocumentPosition(map) & Node.DOCUMENT_POSITION_FOLLOWING) return;
    edu.parentNode.insertBefore(map, edu.nextSibling);
  })();

  // Smooth page enter + scroll reveals
  (function smoothMotion() {
    document.body.classList.add('page-ready');

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    var candidates = document.querySelectorAll(
      'main .section, main .philosophy-band, main .visual-band, .card, .card-visual, .diagram-strip-item, .chart-container, .wc-map, .grid-2 > *, .grid-3 > *, .split-visual, .pair-card, .about-panel, .about-principle, .about-focus-card'
    );
    candidates.forEach(function (el) {
      if (el.classList.contains('reveal')) return;
      el.classList.add('reveal');
    });

    document.querySelectorAll('.grid-2, .grid-3, .diagram-strip, .login-visual-grid, .pair-grid').forEach(function (g) {
      g.classList.add('reveal-stagger');
    });

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      io.observe(el);
    });
  })();

  /* ── Smooth page transitions ─────────────────────────────── */
  (function pageTransitions() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var EXIT_MS = reduce ? 0 : 280;

    function markReady() {
      document.body.classList.add('page-ready');
      document.body.classList.remove('page-exit');
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        requestAnimationFrame(function () {
          requestAnimationFrame(markReady);
        });
      });
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(markReady);
      });
    }

    window.addEventListener('pageshow', function (e) {
      if (e.persisted) markReady();
    });

    function isInternal(a) {
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return false;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return false;
      try {
        var url = new URL(href, window.location.href);
        return url.origin === window.location.origin;
      } catch (err) {
        return false;
      }
    }

    function samePage(url) {
      return url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        (!url.hash || url.hash === window.location.hash);
    }

    function navigateTo(url) {
      window.location.href = url.href;
    }

    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest('a');
      if (!isInternal(a)) return;

      var url;
      try {
        url = new URL(a.getAttribute('href'), window.location.href);
      } catch (err) {
        return;
      }
      if (samePage(url) && url.hash) return;

      e.preventDefault();

      if (!reduce && typeof document.startViewTransition === 'function') {
        document.startViewTransition(function () {
          navigateTo(url);
        });
        setTimeout(function () {
          if (window.location.href !== url.href) navigateTo(url);
        }, 600);
        return;
      }

      document.body.classList.remove('page-ready');
      document.body.classList.add('page-exit');
      setTimeout(function () {
        navigateTo(url);
      }, EXIT_MS);
    }, true);
  })();

  /* Pointer tilt for 3D cards (desktop) */
  (function pointerTilt() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;

    var cards = document.querySelectorAll('.card-3d');
    cards.forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          'translateY(-4px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 7) + 'deg) scale(1.015)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      });
    });
  })();

})();
