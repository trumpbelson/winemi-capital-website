/** Isaac Winemi Ayama portrait — force clear high-res asset already in repo */
(function () {
  var img = document.getElementById('founder-photo-img');
  if (!img) return;
  var hiRes = '../assets/images/team/WhatsApp%20Image%202026-10-19%20at%2001.39.15.jpeg?v=20261031';
  function apply() {
    img.src = hiRes;
    img.setAttribute('width', '320');
    img.setAttribute('height', '480');
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 15%';
  }
  img.addEventListener('error', apply);
  // Always force the high-res version (overrides any broken data-URI or 404)
  apply();
})();
