/**
 * WINEMI CAPITAL. — Core site scripts
 */

(function () {
  'use strict';

  // Theme toggle (dark default, light optional)
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

  // Sticky header scroll state
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile navigation
  const toggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Active nav link
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href')?.replace(/\/$/, '') || '';
    if (href === path || (path.endsWith(href) && href !== '/')) {
      link.classList.add('active');
    }
  });

  // Contact form validation (client-side)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const message = contactForm.querySelector('[name="message"]');
      let valid = true;
      contactForm.querySelectorAll('.form-error').forEach((el) => el.remove());
      const showError = (input, msg) => {
        valid = false;
        const err = document.createElement('p');
        err.className = 'form-error';
        err.textContent = msg;
        input.parentElement.appendChild(err);
      };
      if (!name.value.trim()) showError(name, 'Please enter your name.');
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, 'Please enter a valid email address.');
      }
      if (!message.value.trim() || message.value.trim().length < 10) {
        showError(message, 'Please enter a message of at least 10 characters.');
      }
      if (valid) {
        const feedback = document.getElementById('form-feedback');
        if (feedback) {
          feedback.innerHTML = `
            <div style="padding:1.25rem;background:rgba(184,149,106,0.1);border:1px solid var(--color-muted-gold);border-radius:4px;color:var(--color-text-primary);">
              <strong>Form ready.</strong> Backend delivery is not yet configured.
              Please email <a href="mailto:winemicapital@gmail.com" style="color:var(--color-muted-gold);">winemicapital@gmail.com</a>
              or use WhatsApp to reach the team directly.
            </div>`;
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        contactForm.reset();
      }
    });
  }

  // Instrument tabs for markets
  const tabs = document.querySelectorAll('.instrument-tab');
  if (tabs.length) {
    const symbols = {
      nasdaq: 'NASDAQ:QQQ',
      gold: 'TVC:GOLD',
      btc: 'BINANCE:BTCUSDT',
      spx: 'TVC:SPX',
      dji: 'TVC:DJI',
      eurusd: 'FX:EURUSD',
      gbpusd: 'FX:GBPUSD',
      usdjpy: 'FX:USDJPY',
      oil: 'TVC:USOIL'
    };
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.dataset.symbol;
        if (symbols[key] && typeof TradingView !== 'undefined') {
          const container = document.getElementById('tradingview-widget');
          if (container) {
            container.innerHTML = '';
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            new TradingView.widget({
              autosize: true,
              symbol: symbols[key],
              interval: 'D',
              timezone: 'Etc/UTC',
              theme: isLight ? 'light' : 'dark',
              style: '1',
              locale: 'en',
              toolbar_bg: isLight ? '#ffffff' : '#1c1c1f',
              enable_publishing: false,
              hide_top_toolbar: false,
              hide_legend: false,
              save_image: false,
              container_id: 'tradingview-widget',
              backgroundColor: isLight ? '#ffffff' : '#1c1c1f',
              gridColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
              studies_overrides: {}
            });
          }
        }
      });
    });
  }

  // Homepage education visual cards + diagram strip
  (function enhanceEducationPreview() {
    var section = document.getElementById('education-preview');
    if (!section) return;
    var grid = section.querySelector('.grid-3');
    if (!grid || grid.querySelector('.card-visual')) return;
    var cards = [
      { href: 'pages/education.html', img: 'assets/images/diagrams/four-patterns.svg', title: 'Supply & Demand Structure', text: 'Rally, drop, and base; the four patterns (RBR, DBR, DBD, RBD); demand and supply zones.' },
      { href: 'pages/education.html', img: 'assets/images/diagrams/order-flow.svg', title: 'Institutional Order Flow', text: 'Imbalance, absorption, liquidity pools — how size leaves footprints on the chart.' },
      { href: 'pages/education.html', img: 'assets/images/diagrams/complete-setup.svg', title: 'Complete Setup Discipline', text: 'Pattern, location, confirmation, and defined risk — act only when the picture is complete.' }
    ];
    grid.innerHTML = cards.map(function (c) {
      return '<a href="' + c.href + '" class="card card-visual" style="text-decoration:none;color:inherit;">' +
        '<div class="card-visual-media"><img src="' + c.img + '" alt="" loading="lazy" width="640" height="160" /></div>' +
        '<h3 class="card-title">' + c.title + '</h3>' +
        '<p class="card-text">' + c.text + '</p></a>';
    }).join('');
    var strip = document.createElement('div');
    strip.className = 'diagram-strip';
    strip.setAttribute('aria-label', 'Framework at a glance');
    var items = [
      ['assets/images/diagrams/moves.svg', 'Moves'],
      ['assets/images/diagrams/zone-location.svg', 'Location'],
      ['assets/images/diagrams/fresh-vs-depleted.svg', 'Fresh vs depleted'],
      ['assets/images/diagrams/multi-timeframe.svg', 'HTF / LTF'],
      ['assets/images/diagrams/risk-reward.svg', 'Risk & reward'],
      ['assets/images/diagrams/fakeout-sweep.svg', 'Liquidity sweeps']
    ];
    strip.innerHTML = items.map(function (it) {
      return '<figure class="diagram-strip-item"><img src="' + it[0] + '" alt="" loading="lazy" /><figcaption>' + it[1] + '</figcaption></figure>';
    }).join('');
    grid.parentNode.insertBefore(strip, grid.nextSibling);
  })();

})();
