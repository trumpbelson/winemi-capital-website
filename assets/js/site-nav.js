/**
 * WINEMI CAPITAL. — Shared portfolio navigation + professional footer
 */
(function () {
  'use strict';

  var path = (window.location.pathname || '').replace(/\/$/, '') || '/';
  var inPages = /\/pages\//.test(path) || /\/pages$/.test(path);
  var prefix = inPages ? '' : 'pages/';
  var homeHref = inPages ? '../index.html' : 'index.html';

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
    if (p.indexOf('about') !== -1 || p.indexOf('team') !== -1) return 'about';
    if (p.indexOf('approach') !== -1 || p.indexOf('services') !== -1) return 'approach';
    if (p.indexOf('markets') !== -1 || p.indexOf('investments') !== -1 || p.indexOf('asset-management') !== -1) return 'markets';
    if (p.indexOf('education') !== -1 || p.indexOf('mentorship') !== -1 || p.indexOf('glossary') !== -1 || p.indexOf('resources') !== -1 || p.indexOf('research') !== -1) return 'education';
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
      '<div class="header-left">' +
        '<a href="' + homeHref + '" class="logo" aria-label="WINEMI CAPITAL. home"><span class="logo-mark" aria-hidden="true"></span></a>' +
        '<span class="header-divider" aria-hidden="true"></span>' +
        '<span class="header-meta" title="Firm focus">Accra · Global markets</span>' +
      '</div>' +
      '<nav class="nav-desktop" aria-label="Primary">' + desktopLinks + '</nav>' +
      '<div class="header-right">' +
        '<span class="header-status" aria-hidden="true"><span class="status-dot"></span>Live context</span>' +
        '<a href="' + loginHref + '" class="nav-cta">Portal</a>' +
        '<div class="header-actions">' +
          '<button type="button" class="theme-toggle" aria-label="Toggle theme" title="Toggle theme">' +
            '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>' +
            '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
          '</button>' +
          '<button type="button" class="mobile-toggle" aria-label="Open menu" aria-expanded="false">' +
            '<span class="mobile-toggle-icon" aria-hidden="true">' +
              '<svg class="icon-menu" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
              '<svg class="icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
            '</span>' +
            '<span class="mobile-toggle-label">Menu</span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  var mobileHtml =
    '<div class="mobile-nav-inner">' +
      '<p class="mobile-nav-label">Navigate</p>' +
      mobileLinks +
      '<div class="mobile-nav-footer">' +
        '<p class="mobile-nav-meta">Accra · Global markets · Institutional research</p>' +
        '<a class="mobile-nav-contact" href="https://wa.me/233503100519" target="_blank" rel="noopener noreferrer">WhatsApp +233 50 310 0519</a>' +
        '<a href="' + loginHref + '" class="mobile-nav-cta">Client Portal</a>' +
      '</div>' +
    '</div>';

  function icon(paths) {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + paths + '</svg>';
  }

  function buildFooter() {
    var socials = [
      { label: 'Instagram', href: 'https://www.instagram.com/WinemiCapital', svg: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/winemicapital', svg: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>' },
      { label: 'X', href: 'https://x.com/WinemiCapital', svg: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.828L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>' },
      { label: 'YouTube', href: 'https://www.youtube.com/@WinemiCapital', svg: '<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>' },
      { label: 'Telegram', href: 'https://t.me/WinemiCapital', svg: '<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.15 1.568-.769 5.233-1.087 6.94-.134.72-.402 1.161-.66 1.189-.552.064-1.067-.36-1.62-.706-.88-.549-1.402-.89-2.246-1.39-1.405-.835-.524-1.293.325-2.04.222-.196 4.068-3.724 4.143-4.046.009-.04.018-.189-.07-.267-.089-.078-.219-.05-.312-.03-.132.027-2.228 1.416-6.286 4.15-.595.408-1.135.608-1.566.599-.516-.01-1.508-.291-2.245-.53-.904-.293-1.623-.449-1.561-.949.032-.26.481-.526 1.319-.8 5.145-2.23 8.576-3.701 10.24-4.37.918-.36 2.14-.54 2.69-.55z"/>' },
      { label: 'WhatsApp', href: 'https://wa.me/233503100519', svg: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' }
    ];

    var socialHtml = socials.map(function (s) {
      return '<a href="' + s.href + '" class="social-icon" aria-label="' + s.label + '" target="_blank" rel="noopener" title="' + s.label + '">' + icon(s.svg) + '</a>';
    }).join('');

    var firmLinks = [
      { label: 'About', href: prefix + 'about.html' },
      { label: 'Team', href: prefix + 'team.html' },
      { label: 'Services', href: prefix + 'services.html' },
      { label: 'Approach', href: prefix + 'approach.html' },
      { label: 'Global presence', href: prefix + 'global.html' },
      { label: 'Careers', href: prefix + 'careers.html' },
      { label: 'Partners', href: prefix + 'partners.html' },
      { label: 'Contact', href: prefix + 'contact.html' }
    ].map(function (l) { return '<a href="' + l.href + '">' + l.label + '</a>'; }).join('');

    var resourceLinks = [
      { label: 'Education', href: prefix + 'education.html' },
      { label: 'Macro desk', href: prefix + 'education-macro.html' },
      { label: 'Research', href: prefix + 'research.html' },
      { label: 'Resources', href: prefix + 'resources.html' },
      { label: 'Glossary', href: prefix + 'glossary.html' },
      { label: 'FAQ', href: prefix + 'faq.html' },
      { label: 'Insights', href: prefix + 'insights.html' },
      { label: 'Risk Disclosure', href: prefix + 'risk-disclosure.html' }
    ].map(function (l) { return '<a href="' + l.href + '">' + l.label + '</a>'; }).join('');

    var contactLinks = [
      { label: 'winemicapital@gmail.com', href: 'mailto:winemicapital@gmail.com' },
      { label: '+233 50 310 0519', href: 'https://wa.me/233503100519' },
      { label: '@WinemiCapital', href: 'https://t.me/WinemiCapital' },
      { label: 'Accra, Ghana', href: prefix + 'contact.html' }
    ].map(function (l) {
      var ext = l.href.indexOf('http') === 0 || l.href.indexOf('mailto:') === 0;
      return '<a href="' + l.href + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + l.label + '</a>';
    }).join('');

    var footerHtml =
      '<div class="container">' +
        '<div class="footer-grid footer-grid--rich">' +
          '<div class="footer-brand">' +
            '<a href="' + homeHref + '" class="logo" aria-label="WINEMI CAPITAL. home"><span class="logo-mark" aria-hidden="true"></span></a>' +
            '<p class="footer-tag">Building wealth through intelligent capital allocation.</p>' +
            '<p class="footer-meta">Global markets · Institutional research · Accra</p>' +
            '<div class="social-icons footer-social">' + socialHtml + '</div>' +
          '</div>' +
          '<div class="footer-col">' +
            '<p class="footer-col-title">Firm</p>' +
            '<div class="footer-links">' + firmLinks + '</div>' +
          '</div>' +
          '<div class="footer-col">' +
            '<p class="footer-col-title">Resources</p>' +
            '<div class="footer-links">' + resourceLinks + '</div>' +
          '</div>' +
          '<div class="footer-col">' +
            '<p class="footer-col-title">Contact</p>' +
            '<div class="footer-links">' + contactLinks + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<p class="footer-copy">&copy; <span class="year"></span> WINEMI CAPITAL. All rights reserved.</p>' +
          '<div class="footer-legal">' +
            '<a href="' + prefix + 'privacy.html">Privacy</a>' +
            '<a href="' + prefix + 'terms.html">Terms</a>' +
            '<a href="' + prefix + 'disclaimer.html">Disclaimer</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    var footer = document.querySelector('.site-footer');
    if (footer) {
      footer.innerHTML = footerHtml;
      footer.setAttribute('role', 'contentinfo');
    } else {
      var f = document.createElement('footer');
      f.className = 'site-footer';
      f.setAttribute('role', 'contentinfo');
      f.innerHTML = footerHtml;
      document.body.appendChild(f);
    }

    document.querySelectorAll('.year').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function ensureNavCss() {
    if (document.querySelector('link[href*="nav.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = inPages ? '../assets/css/nav.css' : 'assets/css/nav.css';
    document.head.appendChild(link);
  }

  function mount() {
    ensureNavCss();
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

    var toggle = header && header.querySelector('.mobile-toggle');
    var themeBtn = header && header.querySelector('.theme-toggle');

    if (toggle && mobile) {
      toggle.addEventListener('click', function () {
        var open = mobile.classList.toggle('is-open');
        mobile.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.classList.toggle('nav-open', open);
      });
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var root = document.documentElement;
        var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('winemi-theme', next); } catch (e) {}
      });
    }

    buildFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();

/* Site-wide polish */
(function loadSitePolish() {
  if (document.querySelector('script[src*="site-polish.js"]')) return;
  var path = (window.location.pathname || '');
  var inPages = /\/pages\//.test(path);
  var s = document.createElement('script');
  s.src = (inPages ? '../' : '') + 'assets/js/site-polish.js';
  s.defer = true;
  document.head.appendChild(s);
})();

/* Site-wide interactivity */
(function loadSiteInteractive() {
  if (document.querySelector('script[src*="site-interactive.js"]')) return;
  var path = (window.location.pathname || '');
  var inPages = /\/pages\//.test(path);
  var s = document.createElement('script');
  s.src = (inPages ? '../' : '') + 'assets/js/site-interactive.js';
  s.defer = true;
  document.head.appendChild(s);
})();

/* Visual appeal */
(function loadSiteVisual() {
  if (document.querySelector('script[src*="site-visual.js"]')) return;
  var path = (window.location.pathname || '');
  var inPages = /\/pages\//.test(path);
  var s = document.createElement('script');
  s.src = (inPages ? '../' : '') + 'assets/js/site-visual.js';
  s.defer = true;
  document.head.appendChild(s);
})();

/* Professional motion system */
(function loadSiteMotion() {
  if (document.querySelector('script[src*="site-motion.js"]')) return;
  var path = (window.location.pathname || '');
  var inPages = /\/pages\//.test(path);
  var s = document.createElement('script');
  s.src = (inPages ? '../' : '') + 'assets/js/site-motion.js';
  s.defer = true;
  document.head.appendChild(s);
})();
