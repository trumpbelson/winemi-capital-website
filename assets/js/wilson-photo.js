/** Wilson Antwi Amoako — sharpened portrait */
(function () {
  var img = document.getElementById("founder-photo-wilson");
  if (!img) return;
  var a = window.__WILSON_B64_A || "";
  var b = window.__WILSON_B64_B || "";
  if (!a || !b) return;
  img.decoding = "async";
  img.loading = "eager";
  img.style.imageRendering = "auto";
  img.style.filter = "contrast(1.14) saturate(1.1)";
  img.removeAttribute("srcset");
  img.src = "data:image/jpeg;base64," + a + b;
})();
