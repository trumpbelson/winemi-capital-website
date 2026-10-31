/**
 * WINEMI CAPITAL. — Shared portfolio navigation injector
 * Ensures consistent top-right pill nav + mobile drawer on every page.
 */
(function () {
  'use strict';

  var path = (window.location.pathname || '').replace(/\/$/, '') || '/';
  var inPages = /\/pages\//.test(path) || /\/pages$/.test(path);
  var prefix = inPages ? '' : 'pages/';
  var homeHref = inPages ? '../index.html' : 'index.html';
  var assetPrefix = inPages ? '../assets/' : 'assets/';

  var items = [
    { id: 'home', label: 'Home', href: homeHref },
    { id: 'about', label: 'About', href: prefix + 'about.html' },
    { id: 'approach', label: 'Approach', href: prefix + 'approach.html' },
    { id: 'markets', label: 'Markets', href: prefix + 'markets.html' },
    { id: 'education', label: 'Education', href: prefix + 'education.html' },
    { id: 'insights', label: 'Insights', href: prefix + 'insights.html' },
    { id: 'contact', label: 'Contact', href: prefix + 'contact.html' }
  ];

  function activeId() {
    var p = path.toLowerCase();
    if (p.endsWith('/index.html') || p.endsWith('/') || p === '' || /winemi-capital-website\/?$/.test(p)) return 'home';
    if (p.indexOf('about') !== -1) return 'about';
    if (p.indexOf('approach') !== -1) return 'approach';
    if (p.indexOf('markets') !== -1 || p.indexOf('investments') !== -1 || p.indexOf('asset-management') !== -1) return 'markets';
    if (p.indexOf('education') !== -1 || p.indexOf('mentorship') !== -1) return 'education';
    if (p.indexOf('insights') !== -1) return 'insights';
    if (p.indexOf('contact') !== -1) return 'contact';
    return null;
  }

  var active = activeId();
  var loginHref = prefix + 'login.html';

  function linkClass(id) {
    return id === active ? 'nav-link active' : 'nav-link';
  }

  var desktopLinks = items.map(function (it) {
    return '<a href="' + it.href + '" class="' + linkClass(it.id) + '">' + it.label + '</a>';
  }).join('');

  var mobileLinks = items.map(function (it, i) {
    var n = (i + 1) < 10 ? '0' + (i + 1) : '' + (i + 1);
    return '<a href="' + it.href + '" class="' + linkClass(it.id) + '"><span>' + it.label + '</span><span class="nav-index">' + n + '</span></a>';
  }).join('');

  var headerHtml =
    '<div class="header-inner">' +
      '<a href="' + homeHref + '" class="logo" aria-label="WINEMI CAPITAL. home"><span class="logo-mark" aria-hidden="true"></span></a>' +
      '<div class="header-right">' +
        '<nav class="nav-desktop" aria-label="Primary">' + desktopLinks + '</nav>' +
        '<a href="' + loginHref + '" class="nav-cta">Portal</a>' +
        '<div class="header-actions">' +
          '<button type="button" class="theme-toggle" aria-label="Toggle theme" title="Toggle theme">' +
            '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>' +
            '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
          '</button>' +
          '<button type="button" class="mobile-toggle" aria-label="Open menu" aria-expanded="false">' +
            '<svg class="icon-menu" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>' +
            '<svg class="icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  var mobileHtml =
    '<div class="mobile-nav-inner">' +
      mobileLinks +
      '<a href="' + loginHref + '" class="mobile-nav-cta">Client Portal</a>' +
    '</div>';

  function ensureCss(hrefPart) {
    if (document.querySelector('link[href*="' + hrefPart + '"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = assetPrefix + 'css/' + hrefPart;
    document.head.appendChild(link);
  }

  function mount() {
    ensureCss('nav.css');
    ensureCss('glass.css');
    var header = document.querySelector('.site-header');
    if (header) {
      header.innerHTML = headerHtml;
      header.setAttribute('role', 'banner');
    }
    var mobile = document.querySelector('.mobile-nav');
    if (!mobile) {
      mobile = document.createElement('nav');
      mobile.className = 'mobile-nav';
      mobile.setAttribute('aria-label', 'Mobile');
      if (header && header.parentNode) {
        header.parentNode.insertBefore(mobile, header.nextSibling);
      } else {
        document.body.insertBefore(mobile, document.body.firstChild);
      }
    }
    mobile.innerHTML = mobileHtml;

    var toggle = document.querySelector('.mobile-toggle');
    if (toggle && mobile) {
      toggle.addEventListener('click', function () {
        var open = mobile.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
      mobile.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobile.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
