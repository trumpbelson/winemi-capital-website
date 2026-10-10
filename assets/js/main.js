/**
 * WINEMI CAPITAL. — Core site scripts
 */

(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

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

  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href')?.replace(/\/$/, '') || '';
    if (href === path || (path.endsWith(href) && href !== '/')) {
      link.classList.add('active');
    }
  });

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
        const err = document.createElement('div');
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
          feedback.innerHTML = '<div style="padding:1.25rem;background:rgba(184,149,106,0.1);border:1px solid var(--color-muted-gold);border-radius:4px;color:var(--color-ivory);"><strong>Form ready.</strong> Backend delivery is not yet configured. Please email <a href="mailto:winemicapital@gmail.com" style="color:var(--color-muted-gold);">winemicapital@gmail.com</a> or use WhatsApp.</div>';
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        contactForm.reset();
      }
    });
  }

  const tabs = document.querySelectorAll('.instrument-tab');
  const chartFrame = document.getElementById('tv-chart');
  if (tabs.length && chartFrame) {
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
        if (symbols[key] && chartFrame) {
          const container = document.getElementById('tradingview-widget');
          if (container && window.TradingView) {
            container.innerHTML = '';
            new TradingView.widget({
              autosize: true,
              symbol: symbols[key],
              interval: 'D',
              timezone: 'Etc/UTC',
              theme: 'dark',
              style: '1',
              locale: 'en',
              toolbar_bg: '#1c1c1f',
              enable_publishing: false,
              hide_top_toolbar: false,
              hide_legend: false,
              save_image: false,
              container_id: 'tradingview-widget',
              backgroundColor: '#1c1c1f',
              gridColor: 'rgba(255,255,255,0.06)'
            });
          }
        }
      });
    });
  }
})();
