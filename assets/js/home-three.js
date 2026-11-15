/*! WINEMI CAPITAL — Homepage Three.js scene
 * Institutional ambient: gold wire geometry + particle field.
 * Progressive enhancement — safe if WebGL unavailable.
 */
(function () {
  'use strict';

  if (!document.body.classList.contains('is-home')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var CDN = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
  var host = null;
  var renderer = null;
  var scene = null;
  var camera = null;
  var group = null;
  var particles = null;
  var meshes = [];
  var raf = 0;
  var running = false;
  var mouseX = 0;
  var mouseY = 0;
  var targetX = 0;
  var targetY = 0;
  var dprCap = 1.5;
  var clockStart = 0;

  function isLight() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  function ensureHost() {
    var hero = document.querySelector('.hero');
    if (!hero) return null;
    var existing = document.getElementById('hero-three');
    if (existing) return existing;
    var el = document.createElement('div');
    el.id = 'hero-three';
    el.className = 'hero-three';
    el.setAttribute('aria-hidden', 'true');
    hero.insertBefore(el, hero.firstChild);
    return el;
  }

  function palette() {
    if (isLight()) {
      return { bg: 0xf7f5f0, gold: 0x8a6d3b, goldSoft: 0xc9a87c, alpha: 0.55 };
    }
    return { bg: 0x0a0a0b, gold: 0xc9a87c, goldSoft: 0xb8956a, alpha: 0.85 };
  }

  function buildScene(THREE) {
    host = ensureHost();
    if (!host) return false;

    var w = host.clientWidth || window.innerWidth;
    var h = host.clientHeight || Math.max(480, window.innerHeight * 0.85);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0.15, 5.2);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer.setSize(w, h, false);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    host.innerHTML = '';
    host.appendChild(renderer.domElement);
    host.classList.add('is-ready');

    group = new THREE.Group();
    scene.add(group);

    var pal = palette();
    var goldMat = new THREE.MeshBasicMaterial({
      color: pal.gold,
      wireframe: true,
      transparent: true,
      opacity: isLight() ? 0.28 : 0.38
    });
    var softMat = new THREE.MeshBasicMaterial({
      color: pal.goldSoft,
      wireframe: true,
      transparent: true,
      opacity: isLight() ? 0.18 : 0.22
    });

    var ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 1), goldMat);
    group.add(ico);
    meshes.push(ico);

    var torus = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.55, 0.045, 120, 12, 2, 3),
      softMat
    );
    torus.rotation.x = 0.6;
    group.add(torus);
    meshes.push(torus);

    var ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.012, 12, 100),
      new THREE.MeshBasicMaterial({
        color: pal.gold,
        transparent: true,
        opacity: isLight() ? 0.2 : 0.28
      })
    );
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);
    meshes.push(ring);

    var ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.008, 10, 80),
      new THREE.MeshBasicMaterial({
        color: pal.goldSoft,
        transparent: true,
        opacity: isLight() ? 0.12 : 0.16
      })
    );
    ring2.rotation.x = Math.PI / 3.2;
    ring2.rotation.y = 0.4;
    group.add(ring2);
    meshes.push(ring2);

    var count = window.innerWidth < 700 ? 180 : 320;
    var positions = new Float32Array(count * 3);
    var i;
    for (i = 0; i < count; i++) {
      var r = 2.4 + Math.random() * 3.2;
      var theta = Math.random() * Math.PI * 2;
      var phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.65;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    var pMat = new THREE.PointsMaterial({
      color: pal.gold,
      size: isLight() ? 0.018 : 0.022,
      transparent: true,
      opacity: isLight() ? 0.45 : 0.65,
      depthWrite: false,
      sizeAttenuation: true
    });
    particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    var count2 = Math.floor(count * 0.4);
    var pos2 = new Float32Array(count2 * 3);
    for (i = 0; i < count2; i++) {
      pos2[i * 3] = (Math.random() - 0.5) * 10;
      pos2[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos2[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    var pGeo2 = new THREE.BufferGeometry();
    pGeo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
    var dust = new THREE.Points(
      pGeo2,
      new THREE.PointsMaterial({
        color: pal.goldSoft,
        size: 0.012,
        transparent: true,
        opacity: isLight() ? 0.2 : 0.3,
        depthWrite: false
      })
    );
    scene.add(dust);
    meshes.push(dust);

    clockStart = performance.now();
    return true;
  }

  function applyTheme() {
    if (!scene || !meshes.length) return;
    var pal = palette();
    meshes.forEach(function (m) {
      if (m.material && m.material.color) {
        if (m.geometry && m.geometry.type === 'IcosahedronGeometry') {
          m.material.color.setHex(pal.gold);
          m.material.opacity = isLight() ? 0.28 : 0.38;
        } else if (m.geometry && m.geometry.type && m.geometry.type.indexOf('Torus') === 0) {
          m.material.color.setHex(pal.goldSoft);
        }
      }
    });
    if (particles && particles.material) {
      particles.material.color.setHex(pal.gold);
      particles.material.opacity = isLight() ? 0.45 : 0.65;
    }
  }

  function onResize() {
    if (!host || !renderer || !camera) return;
    var w = host.clientWidth || window.innerWidth;
    var h = host.clientHeight || Math.max(480, window.innerHeight * 0.85);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer.setSize(w, h, false);
  }

  function tick(now) {
    if (!running) return;
    raf = requestAnimationFrame(tick);
    var t = (now - clockStart) * 0.001;

    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    if (group) {
      group.rotation.y = t * 0.12 + targetX * 0.35;
      group.rotation.x = 0.18 + Math.sin(t * 0.22) * 0.06 + targetY * 0.2;
      group.position.y = Math.sin(t * 0.35) * 0.06;
    }
    if (particles) {
      particles.rotation.y = t * 0.04;
      particles.rotation.x = Math.sin(t * 0.15) * 0.04;
    }
    if (meshes[1]) meshes[1].rotation.z = t * 0.08;
    if (meshes[2]) meshes[2].rotation.z = -t * 0.05;

    camera.position.x = targetX * 0.25;
    camera.position.y = 0.15 + targetY * 0.15;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  function start() {
    if (running || !renderer) return;
    running = true;
    clockStart = performance.now();
    raf = requestAnimationFrame(tick);
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function dispose() {
    stop();
    window.removeEventListener('resize', onResize);
    document.removeEventListener('pointermove', onPointer);
    if (renderer) {
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
    renderer = null;
    scene = null;
    camera = null;
    group = null;
    particles = null;
    meshes = [];
  }

  function onPointer(e) {
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    mouseX = (e.clientX - cx) / cx;
    mouseY = (e.clientY - cy) / cy;
  }

  function observeVisibility() {
    var hero = document.querySelector('.hero');
    if (!hero || !('IntersectionObserver' in window)) {
      start();
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) start();
        else stop();
      });
    }, { threshold: 0.08 });
    io.observe(hero);
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (window.THREE) {
        resolve(window.THREE);
        return;
      }
      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = function () {
        if (window.THREE) resolve(window.THREE);
        else reject(new Error('THREE missing'));
      };
      s.onerror = function () { reject(new Error('THREE load failed')); };
      document.head.appendChild(s);
    });
  }

  function boot() {
    if (window.innerWidth < 480 && (navigator.hardwareConcurrency || 8) <= 4) return;
    loadScript(CDN)
      .then(function (THREE) {
        if (!buildScene(THREE)) return;
        onResize();
        window.addEventListener('resize', onResize, { passive: true });
        if (window.matchMedia('(pointer: fine)').matches) {
          document.addEventListener('pointermove', onPointer, { passive: true });
        }
        observeVisibility();
        var obs = new MutationObserver(function () { applyTheme(); });
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      })
      .catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.__winemiThreeDispose = dispose;
})();
