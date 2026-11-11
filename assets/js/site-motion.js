/*! WINEMI CAPITAL — professional motion controller
 * Loads site-motion.css, staggers reveals, header scroll state.
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

  function boot() {
    injectCss();
    markReady();
    headerScroll();
    staggerGrids();
    polishHero();
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
