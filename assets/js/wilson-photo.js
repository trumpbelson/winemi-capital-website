/** Wilson Antwi Amoako — clear portrait from HD base64 parts */
(function () {
  var img = document.getElementById('founder-photo-wilson');
  if (!img) return;
  var base = (location.pathname || '').indexOf('/pages/') !== -1 ? '../assets/images/team/' : 'assets/images/team/';
  function paint(uri) {
    img.src = uri;
    img.removeAttribute('srcset');
    img.setAttribute('width', '400');
    img.setAttribute('height', '520');
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 14%';
    img.style.filter = 'contrast(1.1) saturate(1.05) brightness(1.03)';
  }
  Promise.all([
    fetch(base + 'wilson.b64.a.txt').then(function (r) { return r.ok ? r.text() : ''; }),
    fetch(base + 'wilson.b64.b.txt').then(function (r) { return r.ok ? r.text() : ''; })
  ]).then(function (parts) {
    var t = ((parts[0] || '') + (parts[1] || '')).replace(/\s+/g, '');
    if (t) paint('data:image/jpeg;base64,' + t);
  }).catch(function () {});
})();
