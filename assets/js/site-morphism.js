/*! WINEMI CAPITAL — site-wide glassmorphism + theme refine */
(function () {
  'use strict';

  function injectLink(name) {
    if (document.querySelector('link[href*="' + name + '"]')) return;
    var path = (window.location.pathname || '');
    var inPages = /\/pages\//.test(path);
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = (inPages ? '../' : '') + 'assets/css/' + name;
    document.head.appendChild(l);
  }

  function injectCss() {
    injectLink('site-morphism.css');
    injectLink('theme-refine.css');
  }

  function enhanceSurfaces() {
    document.querySelectorAll(
      '.card, .about-panel, .desk-quick a, .form-card, .login-panel, .pair-card, .founder-home-card'
    ).forEach(function (el) {
      el.classList.add('morph-surface');
    });
  }

  function boot() {
    injectCss();
    enhanceSurfaces();
    setTimeout(enhanceSurfaces, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
