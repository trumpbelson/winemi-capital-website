/** Wilson portrait combiner — clearer HD image */
(function () {
  var img = document.getElementById('founder-photo-wilson');
  if (!img) return;
  function paint() {
    var a = window.__WC_WILSON_A || [];
    var b = window.__WC_WILSON_B || [];
    if (!a.length || !b.length) return;
    var uri = 'data:image/jpeg;base64,' + a.join('') + b.join('');
    img.src = uri;
    img.removeAttribute('srcset');
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 14%';
    img.style.filter = 'contrast(1.12) saturate(1.06) brightness(1.03)';
  }
  var base = (location.pathname || '').indexOf('/pages/') !== -1 ? '../assets/js/' : 'assets/js/';
  function load(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = res;
      s.onerror = rej;
      document.head.appendChild(s);
    });
  }
  Promise.all([
    load(base + 'wilson-photo-a.js'),
    load(base + 'wilson-photo-b.js')
  ]).then(paint).catch(function () {});
})();
