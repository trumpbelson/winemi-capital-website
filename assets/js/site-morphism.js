/*! WINEMI CAPITAL — site-wide glassmorphism controller */
(function () {
  'use strict';

  function injectCss() {
    if (document.querySelector('link[href*="site-morphism.css"]')) return;
    var path = (window.location.pathname || '');
    var inPages = /\/pages\//.test(path);
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = (inPages ? '../' : '') + 'assets/css/site-morphism.css';
    document.head.appendChild(l);
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
