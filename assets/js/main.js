/**
 * WINEMI CAPITAL. — Core site scripts
 */

/* Ensure portfolio nav injector is present on every page (4-dash menu + top-right tabs) */
(function ensureSiteNav() {
  if (document.querySelector('script[src*="site-nav.js"]')) return;
  var s = document.createElement('script');
  var path = (window.location.pathname || '');
  var inPages = /\/pages\//.test(path);
  s.src = (inPages ? '../' : '') + 'assets/js/site-nav.js';
  s.async = false;
  document.head.appendChild(s);
})();

(function () {
  'use strict';

  const THEME_KEY = 'winemi-theme';
  const root = document.documentElement;

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      const isLight = theme === 'light';
      btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      btn.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f5f0' : '#0a0a0b');
    window.dispatchEvent(new CustomEvent('winemi:themechange', { detail: { theme } }));
  }

  applyTheme(getPreferredTheme());

  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
    });
  });

  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Page enter
  requestAnimationFrame(function () {
    document.body.classList.add('page-ready');
  });

  // Smooth internal nav exit
  document.querySelectorAll('a[href]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const href = a.getAttribute('href') || '';
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank') return;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.hash) return;
      } catch (err) {
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(function () {
        window.location.href = a.href;
      }, 220);
    });
  });

  // Stagger reveal children in common grids
  document.querySelectorAll('.founders-home-grid, .pair-grid, .grid-3, .footer-grid').forEach(function (grid) {
    var kids = grid.querySelectorAll(':scope > .reveal, :scope > .card, :scope > .pair-card, :scope > .founder-home-card, :scope > article, :scope > div');
    kids.forEach(function (el, i) {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
      el.classList.add('reveal-delay-' + Math.min(4, (i % 4) + 1));
    });
  });

  // Also mark common section blocks
  document.querySelectorAll('.section .section-title, .section .section-label, .section .body-base, .split-copy, .split-visual, .visual-band, .founder-home-card, .pair-card, .card').forEach(function (el) {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('.reveal, .founder-home-card, .env-card, .pair-card, .card');

  if (reduceMotion) {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Lightweight 3D tilt on cards
  function pointerTilt() {
    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.card-3d').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateX(' + (-y * 5) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-2px)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      });
    });
  }
  pointerTilt();

  // Year stamps
  document.querySelectorAll('.year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
