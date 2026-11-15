/** Wilson Antwi Amoako — clarity filter + multi-source portrait */
(function () {
  var img = document.getElementById('founder-photo-wilson');
  if (!img) return;
  var base = (location.pathname || '').indexOf('/pages/') !== -1 ? '../assets/images/team/' : 'assets/images/team/';
  function paint(uri) {
    img.src = uri;
    img.removeAttribute('srcset');
    img.width = 400; img.height = 520;
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 14%';
    img.style.filter = 'contrast(1.14) saturate(1.08) brightness(1.04)';
    img.style.imageRendering = 'auto';
  }
  img.style.filter = 'contrast(1.14) saturate(1.08) brightness(1.04)';
  img.style.objectPosition = 'center 14%';
  var candidates = [
    base + 'wilson-antwi-amoako.jpg?v=20261115d',
    base + 'wilson-antwi-amoako.webp?v=20261115d',
    base + 'wilson-antwi-amoako@2x.jpg?v=20261115d'
  ];
  var i = 0;
  function next() {
    if (i >= candidates.length) {
      Promise.all([0,1,2,3].map(function (n) {
        return fetch(base + 'wilson.b64.' + n + '.txt?v=20261115d').then(function (r) { return r.ok ? r.text() : ''; });
      })).then(function (parts) {
        var t = parts.join('').replace(/\s+/g, '');
        if (t.length > 500) paint('data:image/jpeg;base64,' + t);
      }).catch(function () {});
      return;
    }
    var test = new Image();
    var src = candidates[i++];
    test.onload = function () {
      if (test.naturalWidth > 80) paint(src);
      else next();
    };
    test.onerror = next;
    test.src = src;
  }
  next();
})();
