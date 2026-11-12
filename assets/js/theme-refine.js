/*! WINEMI CAPITAL — dual-theme color refinement loader */
(function () {
  'use strict';
  if (document.querySelector('link[href*="theme-refine.css"]')) return;
  var path = window.location.pathname || '';
  var inPages = /\/pages\//.test(path);
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = (inPages ? '../' : '') + 'assets/css/theme-refine.css';
  document.head.appendChild(l);
})();
