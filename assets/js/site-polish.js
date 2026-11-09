/*! WINEMI CAPITAL — site polish: reveal, progress, back-to-top */
(function () {
  'use strict';

  function injectStylesheet() {
    if (document.querySelector('link[href*="site-polish.css"]')) return;
    var path = (window.location.pathname || '');
    var inPages = /\/pages\//.test(path);
    var href = (inPages ? '../' : '') + 'assets/css/site-polish.css';
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }

  function ensureLightTheme() {
    if (document.querySelector('link[href*="light-theme.css"]')) return;
    var path = (window.location.pathname || '');
    var inPages = /\/pages\//.test(path);
    var href = (inPages ? '../' : '') + 'assets/css/light-theme.css';
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }

  function mountProgress() {
    if (document.getElementById('scroll-progress')) return;
    var bar = document.createElement('div');
    bar.id = 'scroll-progress';
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
  }

  function mountBackTop() {
    if (document.getElementById('back-top')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'back-top';
    btn.className = 'back-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.title = 'Back to top';
    btn.innerHTML = '↑';
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btn);
  }

  function onScroll() {
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop || 0;
    var height = (doc.scrollHeight - doc.clientHeight) || 1;
    var pct = Math.min(100, Math.max(0, (scrollTop / height) * 100));
    var bar = document.getElementById('scroll-progress');
    if (bar) bar.style.width = pct + '%';
    var top = document.getElementById('back-top');
    if (top) top.classList.toggle('is-show', scrollTop > 480);
  }

  function observeReveal() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var nodes = document.querySelectorAll(
      'main .card, main .section .heading-2, main .context-strip, main .desk-quick a, main .home-regime a, main .grid-3 > *, main .page-header'
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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    nodes.forEach(function (el) { io.observe(el); });
  }

  function smoothAnchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try { history.pushState(null, '', id); } catch (err) {}
    });
  }

  function boot() {
    injectStylesheet();
    ensureLightTheme();
    mountProgress();
    mountBackTop();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    observeReveal();
    smoothAnchors();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
