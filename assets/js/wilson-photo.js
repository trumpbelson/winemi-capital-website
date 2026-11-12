/** Wilson Antwi Amoako — clearer presentation */
(function () {
  var img = document.getElementById('founder-photo-wilson');
  if (!img) return;

  var base = (location.pathname || '').indexOf('/pages/') !== -1
    ? '../assets/images/team/'
    : 'assets/images/team/';

  function style() {
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 12%';
    img.style.filter = 'contrast(1.18) saturate(1.1) brightness(1.05)';
    img.style.imageRendering = 'auto';
    img.setAttribute('width', '400');
    img.setAttribute('height', '520');
  }

  function trySrc(src, next) {
    var probe = new Image();
    probe.onload = function () {
      img.src = src;
      img.removeAttribute('srcset');
      style();
    };
    probe.onerror = function () {
      if (typeof next === 'function') next();
      else style();
    };
    probe.src = src;
  }

  // Prefer local team assets (clearer when present on CDN)
  trySrc(base + 'wilson-antwi-amoako.jpg', function () {
    trySrc(base + 'wilson-antwi-amoako@2x.jpg', function () {
      trySrc(base + 'wilson-antwi-amoako.webp', function () {
        style();
      });
    });
  });
})();
