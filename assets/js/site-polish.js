/*! WINEMI CAPITAL — site polish: smooth scroll, progress, back-to-top */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function injectStylesheet() {
    if (document.querySelector('link[href*="site-polish.css"]')) return;
    var path = (window.location.pathname || '');
    var inPages = /\/pages\//.test(path);
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = (inPages ? '../' : '') + 'assets/css/site-polish.css';
    document.head.appendChild(l);
  }

  function ensureLightTheme() {
    if (document.querySelector('link[href*="light-theme.css"]')) return;
    var path = (window.location.pathname || '');
    var inPages = /\/pages\//.test(path);
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = (inPages ? '../' : '') + 'assets/css/light-theme.css';
    document.head.appendChild(l);
  }

  function headerOffset() {
    var header = document.querySelector('.site-header');
    return (header ? header.offsetHeight : 72) + 12;
  }

  function smoothTo(el) {
    if (!el) return;
    var top = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - headerOffset();
    if (reduce) {
      window.scrollTo(0, Math.max(0, top));
    } else {
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
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
    btn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    btn.addEventListener('click', function () {
      if (reduce) window.scrollTo(0, 0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (top) top.classList.toggle('is-show', scrollTop > 400);
  }

  function observeReveal() {
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
    try {
      document.documentElement.style.scrollBehavior = reduce ? 'auto' : 'smooth';
    } catch (e) {}

    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;

      if (href.charAt(0) === '#') {
        var el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        smoothTo(el);
        try { history.pushState(null, '', href); } catch (err) {}
        return;
      }

      try {
        var url = new URL(href, window.location.href);
        if (url.origin === window.location.origin &&
            url.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '') &&
            url.hash && url.hash.length > 1) {
          var target = document.querySelector(url.hash);
          if (target) {
            e.preventDefault();
            smoothTo(target);
            try { history.pushState(null, '', url.hash); } catch (err2) {}
          }
        }
      } catch (err3) {}
    });

    if (window.location.hash && window.location.hash.length > 1) {
      var initial = document.querySelector(window.location.hash);
      if (initial) setTimeout(function () { smoothTo(initial); }, 60);
    }
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
