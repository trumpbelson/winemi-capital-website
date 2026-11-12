/** Wilson Antwi Amoako — clearer portrait */
(function(){
  var img=document.getElementById('founder-photo-wilson');
  if(!img)return;
  var uri='data:image/jpeg;base64,PLACEHOLDER';
  function apply(){
    img.src=uri;
    img.removeAttribute('srcset');
    img.style.objectFit='cover';
    img.style.objectPosition='center 12%';
    img.style.filter='contrast(1.14) saturate(1.08) brightness(1.04)';
  }
  apply();
  img.addEventListener('error',apply,{once:true});
})();
