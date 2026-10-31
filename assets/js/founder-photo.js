/** Isaac Winemi Ayama — optimized portrait with high-res fallback */
(function () {
  var img = document.getElementById('founder-photo-img');
  if (!img) return;
  var primary = '../assets/images/team/isaac-winemi-ayama.jpg?v=20261031c';
  var fallback = '../assets/images/team/WhatsApp%20Image%202026-10-19%20at%2001.39.15.jpeg?v=20261031c';
  function style() {
    img.setAttribute('width', '400');
    img.setAttribute('height', '520');
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 16%';
  }
  function use(src) {
    img.src = src;
    style();
  }
  img.addEventListener('error', function onErr() {
    img.removeEventListener('error', onErr);
    use(fallback);
  });
  if (img.src.indexOf('isaac-winemi-ayama') === -1 || img.naturalWidth < 100) {
    use(primary);
  } else {
    style();
  }
})();
