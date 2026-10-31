/** Isaac Winemi Ayama — optimized portrait with high-res fallback */
(function () {
  var img = document.getElementById('founder-photo-img');
  if (!img) return;
  var primary = '../assets/images/team/isaac-winemi-ayama.jpg?v=20261031c';
  var fallback = '../assets/images/team/WhatsApp%20Image%202026-10-19%20at%2001.39.15.jpeg';
  function applyFit() {
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 16%';
    img.style.width = '100%';
    img.style.height = '100%';
  }
  function setSrc(src) {
    img.onload = function () {
      if (img.naturalWidth === 0) {
        if (src !== fallback) setSrc(fallback);
        return;
      }
      applyFit();
    };
    img.onerror = function () {
      if (src !== fallback) setSrc(fallback);
    };
    img.src = src;
  }
  setSrc(primary);
  applyFit();
})();
