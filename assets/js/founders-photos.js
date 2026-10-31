/** WINEMI CAPITAL. — Founder portrait framing (non-destructive) */
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
  var onHome = !/\/pages\//.test(window.location.pathname || '');
  var isaacPath = (onHome ? '' : '../') + 'assets/images/team/WhatsApp%20Image%202026-10-19%20at%2001.39.15.jpeg';
  if (base) {
    isaacPath = base + 'assets/images/team/WhatsApp%20Image%202026-10-19%20at%2001.39.15.jpeg';
  }

  function frame(img, pos) {
    if (!img) return;
    img.style.objectFit = 'cover';
    img.style.objectPosition = pos;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.display = 'block';
  }

  var isaac = document.getElementById('founder-photo-img');
  var wilson = document.getElementById('founder-photo-wilson');

  // Isaac: ensure a working src (WhatsApp portrait on repo)
  if (isaac) {
    var needsIsaac = !isaac.getAttribute('src') ||
      /isaac-winemi-ayama\.(jpg|webp)/i.test(isaac.getAttribute('src') || '');
    if (needsIsaac) {
      isaac.removeAttribute('srcset');
      isaac.src = isaacPath;
    }
    frame(isaac, 'center 14%');
    isaac.addEventListener('error', function () {
      isaac.src = '/assets/images/team/WhatsApp%20Image%202026-10-19%20at%2001.39.15.jpeg';
      frame(isaac, 'center 14%');
    }, { once: true });
  }

  // Wilson: NEVER overwrite with Isaac. wilson-photo.js supplies data-URI.
  if (wilson) {
    frame(wilson, 'center 18%');
  }
})();
