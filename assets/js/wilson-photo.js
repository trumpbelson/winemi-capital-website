/** Wilson Antwi Amoako — clarity presentation */
(function () {
  var img = document.getElementById('founder-photo-wilson');
  if (!img) return;

  var base = (location.pathname || '').indexOf('/pages/') !== -1
    ? '../assets/images/team/'
    : 'assets/images/team/';

  function style() {
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 12%';
    img.style.filter = 'contrast(1.2) saturate(1.12) brightness(1.06)';
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

  trySrc(base + 'wilson-antwi-amoako.jpg', function () {
    trySrc(base + 'wilson-antwi-amoako%402x.jpg', function () {
      trySrc(base + 'wilson-antwi-amoako.webp', style);
    });
  });
})();
