/** Wilson Antwi Amoako — clear portrait from HD base64 parts + path fallback */
(function () {
  var img = document.getElementById('founder-photo-wilson');
  if (!img) return;
  var base = (location.pathname || '').indexOf('/pages/') !== -1 ? '../assets/images/team/' : 'assets/images/team/';
  function paint(uri) {
    img.src = uri;
    img.removeAttribute('srcset');
    img.width = 400; img.height = 520;
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 12%';
    img.style.filter = 'contrast(1.12) saturate(1.06) brightness(1.03)';
    img.style.imageRendering = 'auto';
  }
  function fromParts() {
    return Promise.all([
      fetch(base + 'wilson.b64.a.txt?v=20261115').then(function (r) { return r.ok ? r.text() : ''; }),
      fetch(base + 'wilson.b64.b.txt?v=20261115').then(function (r) { return r.ok ? r.text() : ''; })
    ]).then(function (parts) {
      var t = ((parts[0] || '') + (parts[1] || '')).replace(/\s+/g, '');
      if (t.length > 1000) { paint('data:image/jpeg;base64,' + t); return true; }
      return false;
    }).catch(function () { return false; });
  }
  function tryJpg() {
    return new Promise(function (resolve) {
      var test = new Image();
      var src = base + 'wilson-antwi-amoako.jpg?v=20261115';
      test.onload = function () {
        if (test.naturalWidth > 40) { paint(src); resolve(true); }
        else resolve(false);
      };
      test.onerror = function () { resolve(false); };
      test.src = src;
    });
  }
  tryJpg().then(function (ok) {
    if (!ok) return fromParts();
  }).then(function (ok) {
    if (!ok) {
      img.style.filter = 'contrast(1.12) saturate(1.06) brightness(1.03)';
    }
  });
})();
