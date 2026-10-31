/* WINEMI CAPITAL. — Subtle ambient particles (hero) */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var hero = document.querySelector('.hero');
  if (!hero) return;

  var canvas = document.createElement('canvas');
  canvas.className = 'hero-particles';
  canvas.setAttribute('aria-hidden', 'true');

  var bg = hero.querySelector('.hero-bg');
  if (bg && bg.nextSibling) {
    hero.insertBefore(canvas, bg.nextSibling);
  } else if (bg) {
    bg.insertAdjacentElement('afterend', canvas);
  } else {
    hero.insertBefore(canvas, hero.firstChild);
  }

  var ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var particles = [];
  var running = false;
  var raf = 0;
  var w = 0, h = 0;
  var mouse = { x: 0.5, y: 0.5, active: false };
  var COUNT = 48;

  function resize() {
    var rect = hero.getBoundingClientRect();
    w = Math.max(1, Math.floor(rect.width));
    h = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seed() {
    particles = [];
    for (var i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.05 - Math.random() * 0.22,
        a: 0.12 + Math.random() * 0.28,
        phase: Math.random() * Math.PI * 2,
        spin: 0.004 + Math.random() * 0.008
      });
    }
  }

  function isLight() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);

    var light = isLight();
    var base = light ? '184, 149, 106' : '212, 184, 140';

    var mx = mouse.active ? (mouse.x - 0.5) * 12 : 0;
    var my = mouse.active ? (mouse.y - 0.5) * 8 : 0;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.phase += p.spin;
      p.x += p.vx + Math.sin(p.phase) * 0.12 + mx * 0.02;
      p.y += p.vy + my * 0.015;

      if (p.y < -8) { p.y = h + 6; p.x = Math.random() * w; }
      if (p.x < -8) p.x = w + 4;
      if (p.x > w + 8) p.x = -4;

      var glow = p.a * (0.75 + 0.25 * Math.sin(p.phase * 1.7));
      ctx.beginPath();
      ctx.fillStyle = 'rgba(' + base + ',' + glow.toFixed(3) + ')';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  }

  function start() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(draw);
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  resize();
  seed();

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) start();
        else stop();
      });
    }, { threshold: 0.05 });
    io.observe(hero);
  } else {
    start();
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      seed();
    }, 120);
  }, { passive: true });

  if (window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
      mouse.active = true;
    });
    hero.addEventListener('pointerleave', function () {
      mouse.active = false;
    });
  }
})();
