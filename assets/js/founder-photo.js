/** Isaac Winemi Ayama — portrait from team asset on CDN */
(function () {
  var img = document.getElementById('founder-photo-img');
  if (!img) return;
  var primary = '../assets/images/team/WhatsApp%20Image%202026-10-19%20at%2001.39.15.jpeg';
  // Homepage uses same id; resolve relative to root when needed
  var onHome = !/\/pages\//.test(window.location.pathname);
  if (onHome) {
    primary = 'assets/images/team/WhatsApp%20Image%202026-10-19%20at%2001.39.15.jpeg';
  }
  function style() {
    img.setAttribute('width', '400');
    img.setAttribute('height', '520');
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 16%';
  }
  img.src = primary;
  style();
  img.addEventListener('error', function () {
    // absolute production path fallback
    img.src = '/assets/images/team/WhatsApp%20Image%202026-10-19%20at%2001.39.15.jpeg';
    style();
  }, { once: true });
})();
