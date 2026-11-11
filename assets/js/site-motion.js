/*! WINEMI CAPITAL — professional motion controller
 * Page enter/exit transitions, staggered reveals, smooth scroll, header scroll state.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function injectCss() {
    if (document.querySelector('link[href*="site-motion.css"]')) return;
    var path = (window.location.pathname || '');
    var inPages = /\/pages\//.test(path);
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = (inPages ? '../' : '') + 'assets/css/site-motion.css';
    document.head.appendChild(l);
  }

  function markReady() {
    document.documentElement.classList.add('motion-ready');
  }

  function headerScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var onScroll = function () {
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      header.classList.toggle('scrolled', y > 24);
      header.classList.toggle('is-scrolled', y > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function staggerGrids() {
    var selectors = [
      '.grid-3',
      '.desk-quick',
      '.home-regime',
      '.home-pulse',
      '.home-digest',
      '#ix-home-stats'
    ];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (grid) {
        grid.classList.add('reveal-stagger');
        Array.prototype.forEach.call(grid.children, function (child) {
          if (!child.classList.contains('reveal')) child.classList.add('reveal');
        });
      });
    });
  }

  function observeReveals() {
    var nodes = document.querySelectorAll(
      'main .card, main .section .heading-2, main .context-strip, main .desk-quick a, main .home-regime a, main .grid-3 > *, main .page-header, main .pulse-card, main .digest-panel, #ix-home-stats > *'
    );
    if (!nodes.length) return;

    nodes.forEach(function (el) {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
    );
    nodes.forEach(function (el) { io.observe(el); });
  }

  function polishHero() {
    var hero = document.querySelector('.hero');
    if (hero) hero.classList.add('motion-hero');
  }

  function headerOffset() {
    var header = document.querySelector('.site-header');
    var h = header ? header.offsetHeight : 72;
    return h + 12;
  }

  function scrollToEl(el, replaceHash) {
    if (!el) return;
    var top = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - headerOffset();
    if (reduce) {
      window.scrollTo(0, Math.max(0, top));
    } else {
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
    if (replaceHash && el.id) {
      try { history.pushState(null, '', '#' + el.id); } catch (e) {}
    }
  }

  function wireSmoothScroll() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;

      if (href.charAt(0) === '#') {
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        scrollToEl(target, true);
        var mobile = document.querySelector('.mobile-nav');
        var toggle = document.querySelector('.mobile-toggle');
        if (mobile && (mobile.classList.contains('is-open') || mobile.classList.contains('open'))) {
          mobile.classList.remove('is-open', 'open');
          document.body.classList.remove('nav-open');
          if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open menu');
          }
        }
        return;
      }

      try {
        var url = new URL(href, window.location.href);
        if (url.origin === window.location.origin &&
            url.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '') &&
            url.hash && url.hash.length > 1) {
          var el = document.querySelector(url.hash);
          if (el) {
            e.preventDefault();
            scrollToEl(el, true);
          }
        }
      } catch (err) {}
    });

    if (window.location.hash && window.location.hash.length > 1) {
      var initial = document.querySelector(window.location.hash);
      if (initial) {
        setTimeout(function () { scrollToEl(initial, false); }, 80);
      }
    }
  }

  function mountVeil() {
    if (document.querySelector('.page-transition-veil')) return;
    var v = document.createElement('div');
    v.className = 'page-transition-veil';
    v.setAttribute('aria-hidden', 'true');
    document.body.appendChild(v);
  }

  function isInternalNav(a, href) {
    if (!a || !href) return false;
    if (a.target === '_blank' || a.hasAttribute('download')) return false;
    if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return false;
    if (href.charAt(0) === '#') return false;
    try {
      var url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return false;
      var samePath = url.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '');
      if (samePath) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  function wirePageTransitions() {
    if (reduce) return;
    mountVeil();

    document.addEventListener('click', function (e) {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.button !== 0) return;

      var a = e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!isInternalNav(a, href)) return;

      e.preventDefault();
      var dest = a.href;

      document.documentElement.classList.add('is-page-exit');
      window.setTimeout(function () {
        window.location.href = dest;
      }, 280);
    });

    window.addEventListener('pageshow', function (ev) {
      document.documentElement.classList.remove('is-page-exit');
      if (ev.persisted) {
        document.documentElement.classList.remove('motion-ready');
        requestAnimationFrame(function () {
          document.documentElement.classList.add('motion-ready');
        });
      }
    });
  }

  function boot() {
    injectCss();
    markReady();
    headerScroll();
    staggerGrids();
    polishHero();
    wireSmoothScroll();
    wirePageTransitions();
    setTimeout(function () {
      staggerGrids();
      observeReveals();
    }, 80);
    setTimeout(function () {
      staggerGrids();
      observeReveals();
    }, 700);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
