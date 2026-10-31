/** WINEMI CAPITAL. — Founder portraits */
(function () {
  'use strict';
  function root() {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || '';
      if (src.indexOf('founders-photos.js') !== -1) {
        return src.replace(/assets\/js\/founders-photos\.js.*$/, '');
      }
    }
    return location.pathname.indexOf('/pages/') !== -1 ? '../' : '';
  }
  var base = root();
  var isaacSrc = base + 'assets/images/team/WhatsApp%20Image%202026-10-19%20at%2001.39.15.jpeg';

  function apply(id, src, pos) {
    var img = document.getElementById(id);
    if (!img) return;
    img.src = src;
    img.removeAttribute('srcset');
    img.style.objectFit = 'cover';
    img.style.objectPosition = pos;
    img.style.width = '100%';
    img.style.height = '100%';
  }
  apply('founder-photo-img', isaacSrc, 'center 16%');
  apply('founder-photo-wilson', isaacSrc, 'center 18%');
})();
