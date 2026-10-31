/** Isaac Winemi Ayama — force optimized studio portrait */
(function () {
  var img = document.getElementById('founder-photo-img');
  if (!img) return;
  var base = '../assets/images/team/isaac-winemi-ayama';
  var hiRes = base + '.jpg?v=20261031b';
  function apply() {
    if (!img.src || img.src.indexOf('isaac-winemi-ayama') === -1 || img.naturalWidth < 100) {
      img.src = hiRes;
    }
    img.setAttribute('width', '400');
    img.setAttribute('height', '520');
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 16%';
  }
  img.addEventListener('error', function () {
    img.src = hiRes;
  });
  apply();
})();
