/** Load sharpened Wilson from split b64 assets */
(function(){
  var img=document.getElementById("founder-photo-wilson");
  if(!img)return;
  var base=(location.pathname||"").indexOf("/pages/")!==-1?"../assets/images/team/":"assets/images/team/";
  Promise.all([
    fetch(base+"wilson.b64.a.txt").then(function(r){return r.text()}),
    fetch(base+"wilson.b64.b.txt").then(function(r){return r.text()})
  ]).then(function(parts){
    var t=((parts[0]||"")+(parts[1]||"")).replace(/\s+/g,"");
    if(!t||t.indexOf("PLACEHOLDER")===0)return;
    img.decoding="async";
    img.loading="eager";
    img.style.filter="contrast(1.14) saturate(1.1)";
    img.removeAttribute("srcset");
    img.src="data:image/jpeg;base64,"+t;
  }).catch(function(){});
})();
