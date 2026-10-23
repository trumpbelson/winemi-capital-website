/** Isaac Winemi Ayama portrait — enforce clear display from repo asset */
(function () {
  var img = document.getElementById('founder-photo-img');
  if (!img) return;
  // Prefer the high-res source already in the repo (WhatsApp original)
  var hiRes = '../assets/images/team/WhatsApp%20Image%202026-10-19%20at%2001.39.15.jpeg';
  function apply() {
    if (img.src.indexOf('WhatsApp') === -1 && img.naturalWidth < 200) {
      img.src = hiRes + '?v=20261023';
    }
    img.width = 280;
    img.height = 420;
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 12%';
  }
  img.addEventListener('load', apply);
  img.addEventListener('error', function () {
    img.src = hiRes + '?v=20261023';
  });
  apply();
  // Force refresh if currently showing a tiny/broken image
  if (img.complete && (img.naturalWidth === 0 || img.naturalWidth < 150)) {
    img.src = hiRes + '?v=20261023';
  }
})();
