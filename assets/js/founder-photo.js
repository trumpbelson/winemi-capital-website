/** Isaac Winemi Ayama — force clear high-res portrait + elevated styles */
(function () {
  var img = document.getElementById('founder-photo-img');
  if (!img) return;
  var hiRes = '../assets/images/team/WhatsApp%20Image%202026-10-19%20at%2001.39.15.jpeg?v=20261031d';
  function apply() {
    img.src = hiRes;
    img.setAttribute('width', '400');
    img.setAttribute('height', '520');
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 16%';
  }
  img.addEventListener('error', apply);
  apply();
})();
