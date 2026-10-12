(function(){
var root=document.getElementById('world-map');
if(!root)return;
var section=document.getElementById('map');
if(section){section.classList.add('map-section-enhanced');}

var svg="<svg class=\"wc-map-svg\" viewBox=\"0 0 1000 500\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\"><defs><linearGradient id=\"oceanGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#071018\"/><stop offset=\"45%\" stop-color=\"#0b1a28\"/><stop offset=\"100%\" stop-color=\"#0a1522\"/></linearGradient><linearGradient id=\"landFill\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#4a5d6e\"/><stop offset=\"55%\" stop-color=\"#364858\"/><stop offset=\"100%\" stop-color=\"#2a3848\"/></linearGradient><linearGradient id=\"iceFill\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#6a7a88\"/><stop offset=\"100%\" stop-color=\"#4a5a68\"/></linearGradient><radialGradient id=\"vignette\" cx=\"50%\" cy=\"48%\" r=\"68%\"><stop offset=\"35%\" stop-color=\"#000\" stop-opacity=\"0\"/><stop offset=\"100%\" stop-color=\"#000\" stop-opacity=\"0.45\"/></radialGradient><radialGradient id=\"glowHome\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#c9a87c\" stop-opacity=\"0.4\"/><stop offset=\"100%\" stop-color=\"#b8956a\" stop-opacity=\"0\"/></radialGradient><filter id=\"landShadow\" x=\"-2%\" y=\"-2%\" width=\"104%\" height=\"104%\"><feDropShadow dx=\"0\" dy=\"1\" stdDeviation=\"1.5\" flood-color=\"#000\" flood-opacity=\"0.35\"/></filter><filter id=\"pinShadow\" x=\"-80%\" y=\"-80%\" width=\"260%\" height=\"260%\"><feDropShadow dx=\"0\" dy=\"1.5\" stdDeviation=\"1.2\" flood-color=\"#000\" flood-opacity=\"0.55\"/></filter></defs><rect width=\"1000\" height=\"500\" fill=\"url(#oceanGrad)\"/><rect width=\"1000\" height=\"500\" fill=\"url(#vignette)\" pointer-events=\"none\"/><g stroke=\"rgba(255,255,255,0.035)\" stroke-width=\"0.7\" fill=\"none\"><line x1=\"0\" y1=\"62.5\" x2=\"1000\" y2=\"62.5\"/><line x1=\"0\" y1=\"125\" x2=\"1000\" y2=\"125\"/><line x1=\"0\" y1=\"187.5\" x2=\"1000\" y2=\"187.5\"/><line x1=\"0\" y1=\"250\" x2=\"1000\" y2=\"250\"/><line x1=\"0\" y1=\"312.5\" x2=\"1000\" y2=\"312.5\"/><line x1=\"0\" y1=\"375\" x2=\"1000\" y2=\"375\"/><line x1=\"0\" y1=\"437.5\" x2=\"1000\" y2=\"437.5\"/><line x1=\"125\" y1=\"0\" x2=\"125\" y2=\"500\"/><line x1=\"250\" y1=\"0\" x2=\"250\" y2=\"500\"/><line x1=\"375\" y1=\"0\" x2=\"375\" y2=\"500\"/><line x1=\"500\" y1=\"0\" x2=\"500\" y2=\"500\"/><line x1=\"625\" y1=\"0\" x2=\"625\" y2=\"500\"/><line x1=\"750\" y1=\"0\" x2=\"750\" y2=\"500\"/><line x1=\"875\" y1=\"0\" x2=\"875\" y2=\"500\"/></g><g filter=\"url(#landShadow)\"><path fill=\"url(#iceFill)\" stroke=\"rgba(200,215,230,0.18)\" stroke-width=\"0.6\" d=\"M408,22 L448,12 L488,20 L505,48 L498,78 L475,98 L445,102 L415,88 L400,58 L405,30 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.16)\" stroke-width=\"0.55\" d=\"M95,68 L125,52 L160,42 L200,38 L245,48 L285,58 L315,78 L335,105 L342,135 L338,160 L325,180 L305,190 L285,185 L265,195 L250,215 L238,235 L225,242 L208,238 L192,220 L178,200 L162,178 L150,155 L145,125 L148,95 L162,72 L148,62 L118,65 L98,78 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.12)\" stroke-width=\"0.45\" d=\"M68,72 L98,55 L135,45 L155,42 L148,65 L130,82 L105,90 L80,85 L68,75 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.12)\" stroke-width=\"0.45\" d=\"M225,242 L248,248 L258,265 L248,278 L228,272 L218,255 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.1)\" stroke-width=\"0.4\" d=\"M258,238 L285,232 L302,242 L292,252 L265,250 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.15)\" stroke-width=\"0.55\" d=\"M262,278 L295,265 L318,272 L335,295 L345,330 L348,365 L340,400 L322,430 L300,448 L275,445 L258,425 L250,395 L255,355 L262,315 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.15)\" stroke-width=\"0.55\" d=\"M478,78 L512,65 L545,72 L568,90 L575,110 L568,128 L548,138 L525,142 L505,138 L488,128 L478,112 L475,92 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.12)\" stroke-width=\"0.45\" d=\"M478,88 L498,78 L510,95 L498,108 L482,102 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.1)\" stroke-width=\"0.4\" d=\"M468,95 L480,90 L484,102 L474,108 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.12)\" stroke-width=\"0.45\" d=\"M512,45 L538,35 L558,50 L552,78 L532,85 L512,70 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.12)\" stroke-width=\"0.45\" d=\"M478,125 L502,120 L512,135 L500,148 L482,145 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.1)\" stroke-width=\"0.4\" d=\"M528,135 L545,130 L552,155 L540,168 L528,158 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.16)\" stroke-width=\"0.6\" d=\"M490,148 L532,135 L565,148 L588,175 L598,210 L600,250 L592,290 L575,328 L550,358 L522,375 L498,380 L475,372 L458,348 L448,310 L445,270 L450,230 L460,190 L475,162 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.12)\" stroke-width=\"0.4\" d=\"M560,345 L575,338 L582,368 L570,385 L555,375 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.13)\" stroke-width=\"0.5\" d=\"M580,155 L620,145 L650,162 L658,192 L642,218 L612,225 L582,208 L575,178 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.15)\" stroke-width=\"0.55\" d=\"M560,72 L610,50 L675,40 L745,48 L815,65 L875,88 L925,115 L955,145 L965,175 L955,200 L920,215 L870,210 L815,200 L760,190 L705,180 L655,168 L610,152 L580,130 L560,100 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.13)\" stroke-width=\"0.5\" d=\"M705,180 L748,168 L770,188 L778,225 L765,265 L740,282 L715,275 L700,245 L698,205 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.12)\" stroke-width=\"0.45\" d=\"M785,195 L825,185 L848,208 L842,250 L815,265 L790,245 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.1)\" stroke-width=\"0.4\" d=\"M805,272 L850,262 L890,275 L882,295 L845,298 L808,290 Z M892,278 L925,270 L942,288 L928,302 L895,295 Z M835,300 L865,295 L875,312 L852,320 L830,315 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.15)\" stroke-width=\"0.5\" d=\"M885,128 L915,115 L932,138 L922,162 L900,172 L882,158 L878,138 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.1)\" stroke-width=\"0.4\" d=\"M860,125 L878,118 L885,140 L870,150 L855,140 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.1)\" stroke-width=\"0.35\" d=\"M852,225 L868,218 L875,242 L860,252 L848,238 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.15)\" stroke-width=\"0.55\" d=\"M815,312 L865,300 L920,310 L952,330 L965,360 L958,390 L935,412 L890,420 L845,415 L812,395 L802,360 L808,330 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.1)\" stroke-width=\"0.35\" d=\"M892,422 L908,418 L912,435 L898,440 Z\"/><path fill=\"url(#landFill)\" stroke=\"rgba(184,149,106,0.12)\" stroke-width=\"0.4\" d=\"M962,375 L978,365 L985,390 L972,412 L958,400 Z M968,415 L982,408 L988,430 L972,442 L962,428 Z\"/></g><g fill=\"none\" stroke=\"rgba(184,149,106,0.14)\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-dasharray=\"3 5\"><path d=\"M499,240 Q390,165 292,135\"/><path d=\"M499,240 Q500,165 500,102\"/><path d=\"M499,240 Q680,165 650,175\"/><path d=\"M499,240 Q735,200 790,250\"/><path d=\"M499,240 Q760,155 818,185\"/><path d=\"M499,240 Q780,145 838,160\"/><path d=\"M499,240 Q830,130 890,148\"/></g><g class=\"map-pin map-pin--home\" data-name=\"Accra\" data-desc=\"Home of WINEMI CAPITAL. Growing financial centre in West Africa with a global outlook.\" transform=\"translate(499,240)\"><circle r=\"22\" fill=\"url(#glowHome)\"/><circle class=\"map-pin-hit\" r=\"14\" fill=\"transparent\"/><circle class=\"map-pin-ring map-pin-pulse\" r=\"11\" fill=\"none\" stroke=\"#c9a87c\" stroke-width=\"1.2\" opacity=\"0.45\"/><circle class=\"map-pin-dot\" r=\"5.5\" fill=\"#c9a87c\" stroke=\"#f7f5f0\" stroke-width=\"1.5\" filter=\"url(#pinShadow)\"/><text class=\"map-pin-label map-pin-label--home\" y=\"-15\" text-anchor=\"middle\">Accra</text></g><g class=\"map-pin\" data-name=\"New York\" data-desc=\"Largest capital market. NYSE, NASDAQ, extensive institutional activity.\" transform=\"translate(292,135)\"><circle class=\"map-pin-hit\" r=\"11\" fill=\"transparent\"/><circle class=\"map-pin-ring\" r=\"7\" fill=\"none\" stroke=\"#b8956a\" stroke-width=\"1\" opacity=\"0.4\"/><circle class=\"map-pin-dot\" r=\"4\" fill=\"#b8956a\" stroke=\"#f7f5f0\" stroke-width=\"1.2\" filter=\"url(#pinShadow)\"/><text class=\"map-pin-label\" y=\"-11\" text-anchor=\"middle\">New York</text></g><g class=\"map-pin\" data-name=\"London\" data-desc=\"Leading global financial centre. Equity, fixed income, and FX markets.\" transform=\"translate(500,102)\"><circle class=\"map-pin-hit\" r=\"11\" fill=\"transparent\"/><circle class=\"map-pin-ring\" r=\"7\" fill=\"none\" stroke=\"#b8956a\" stroke-width=\"1\" opacity=\"0.4\"/><circle class=\"map-pin-dot\" r=\"4\" fill=\"#b8956a\" stroke=\"#f7f5f0\" stroke-width=\"1.2\" filter=\"url(#pinShadow)\"/><text class=\"map-pin-label\" y=\"-11\" text-anchor=\"middle\">London</text></g><g class=\"map-pin\" data-name=\"Dubai\" data-desc=\"Regional hub for capital markets, commodities, and wealth management.\" transform=\"translate(650,175)\"><circle class=\"map-pin-hit\" r=\"11\" fill=\"transparent\"/><circle class=\"map-pin-ring\" r=\"7\" fill=\"none\" stroke=\"#b8956a\" stroke-width=\"1\" opacity=\"0.4\"/><circle class=\"map-pin-dot\" r=\"4\" fill=\"#b8956a\" stroke=\"#f7f5f0\" stroke-width=\"1.2\" filter=\"url(#pinShadow)\"/><text class=\"map-pin-label\" y=\"-11\" text-anchor=\"middle\">Dubai</text></g><g class=\"map-pin\" data-name=\"Singapore\" data-desc=\"Asian financial centre strong in FX, wealth, and asset management.\" transform=\"translate(790,250)\"><circle class=\"map-pin-hit\" r=\"11\" fill=\"transparent\"/><circle class=\"map-pin-ring\" r=\"7\" fill=\"none\" stroke=\"#b8956a\" stroke-width=\"1\" opacity=\"0.4\"/><circle class=\"map-pin-dot\" r=\"4\" fill=\"#b8956a\" stroke=\"#f7f5f0\" stroke-width=\"1.2\" filter=\"url(#pinShadow)\"/><text class=\"map-pin-label\" y=\"-11\" text-anchor=\"middle\">Singapore</text></g><g class=\"map-pin\" data-name=\"Hong Kong\" data-desc=\"Gateway for China-related capital markets and international finance.\" transform=\"translate(818,185)\"><circle class=\"map-pin-hit\" r=\"11\" fill=\"transparent\"/><circle class=\"map-pin-ring\" r=\"7\" fill=\"none\" stroke=\"#b8956a\" stroke-width=\"1\" opacity=\"0.4\"/><circle class=\"map-pin-dot\" r=\"4\" fill=\"#b8956a\" stroke=\"#f7f5f0\" stroke-width=\"1.2\" filter=\"url(#pinShadow)\"/><text class=\"map-pin-label\" y=\"-11\" text-anchor=\"middle\">Hong Kong</text></g><g class=\"map-pin\" data-name=\"Shanghai\" data-desc=\"Mainland China primary financial centre. Equity, bond, and commodities.\" transform=\"translate(838,160)\"><circle class=\"map-pin-hit\" r=\"11\" fill=\"transparent\"/><circle class=\"map-pin-ring\" r=\"7\" fill=\"none\" stroke=\"#b8956a\" stroke-width=\"1\" opacity=\"0.4\"/><circle class=\"map-pin-dot\" r=\"4\" fill=\"#b8956a\" stroke=\"#f7f5f0\" stroke-width=\"1.2\" filter=\"url(#pinShadow)\"/><text class=\"map-pin-label\" y=\"-11\" text-anchor=\"middle\">Shanghai</text></g><g class=\"map-pin\" data-name=\"Tokyo\" data-desc=\"Major Asian financial hub. Tokyo Stock Exchange and domestic capital markets.\" transform=\"translate(890,148)\"><circle class=\"map-pin-hit\" r=\"11\" fill=\"transparent\"/><circle class=\"map-pin-ring\" r=\"7\" fill=\"none\" stroke=\"#b8956a\" stroke-width=\"1\" opacity=\"0.4\"/><circle class=\"map-pin-dot\" r=\"4\" fill=\"#b8956a\" stroke=\"#f7f5f0\" stroke-width=\"1.2\" filter=\"url(#pinShadow)\"/><text class=\"map-pin-label\" y=\"-11\" text-anchor=\"middle\">Tokyo</text></g></svg>";
var legend="<ul class=\"wc-map-legend\" aria-label=\"Financial centres\"><li data-pin=\"Accra\"><button type=\"button\" class=\"leg-btn\"><span class=\"leg-dot leg-dot--home\"></span> Accra</button></li><li data-pin=\"New York\"><button type=\"button\" class=\"leg-btn\"><span class=\"leg-dot\"></span> New York</button></li><li data-pin=\"London\"><button type=\"button\" class=\"leg-btn\"><span class=\"leg-dot\"></span> London</button></li><li data-pin=\"Dubai\"><button type=\"button\" class=\"leg-btn\"><span class=\"leg-dot\"></span> Dubai</button></li><li data-pin=\"Singapore\"><button type=\"button\" class=\"leg-btn\"><span class=\"leg-dot\"></span> Singapore</button></li><li data-pin=\"Hong Kong\"><button type=\"button\" class=\"leg-btn\"><span class=\"leg-dot\"></span> Hong Kong</button></li><li data-pin=\"Shanghai\"><button type=\"button\" class=\"leg-btn\"><span class=\"leg-dot\"></span> Shanghai</button></li><li data-pin=\"Tokyo\"><button type=\"button\" class=\"leg-btn\"><span class=\"leg-dot\"></span> Tokyo</button></li></ul>";

var oldSvg=root.querySelector('svg.wc-map-svg');
if(oldSvg)oldSvg.outerHTML=svg;
var oldLeg=root.querySelector('ul.wc-map-legend');
if(oldLeg)oldLeg.outerHTML=legend;

var popup=document.getElementById('map-popup');
if(popup && !popup.querySelector('.wc-map-popup-close')){
  popup.innerHTML='<button type="button" class="wc-map-popup-close" aria-label="Close">×</button><strong class="wc-map-popup-title"></strong><p class="wc-map-popup-desc"></p><p class="wc-map-popup-hint">Click another city or press Esc to close</p>';
}
var title=popup&&popup.querySelector('.wc-map-popup-title');
var desc=popup&&popup.querySelector('.wc-map-popup-desc');
var closeBtn=popup&&popup.querySelector('.wc-map-popup-close');

var selected=null;
var pins=Array.prototype.slice.call(root.querySelectorAll('.map-pin'));
var routeGroup=null;
root.querySelectorAll('g').forEach(function(g){
  if(g.querySelector('path[stroke-dasharray]')) routeGroup=g;
});

function positionPopup(pin){
  if(!popup)return;
  var rect=root.getBoundingClientRect();
  var pr=pin.getBoundingClientRect();
  var x=pr.left-rect.left+pr.width/2-115;
  var y=pr.top-rect.top-10;
  popup.style.left=Math.max(8,Math.min(x,rect.width-240))+'px';
  popup.style.top=Math.max(8,y-90)+'px';
}
function setPopup(pin){
  if(!popup)return;
  if(title)title.textContent=pin.getAttribute('data-name')||'';
  if(desc)desc.textContent=pin.getAttribute('data-desc')||'';
  popup.hidden=false;
  popup.setAttribute('data-active','true');
  positionPopup(pin);
}
function clearSelection(){
  if(selected){selected.classList.remove('is-active');selected.setAttribute('aria-pressed','false');}
  selected=null;
  pins.forEach(function(p){p.classList.remove('is-dimmed');});
  root.querySelectorAll('.leg-btn').forEach(function(b){b.classList.remove('is-active');});
  if(routeGroup){
    routeGroup.classList.remove('routes-active');
    routeGroup.querySelectorAll('path').forEach(function(path){path.classList.remove('route-highlight');});
  }
  if(popup){popup.hidden=true;popup.removeAttribute('data-active');}
}
function selectPin(pin, sticky){
  if(!pin)return;
  if(selected===pin && sticky){clearSelection();return;}
  pins.forEach(function(p){
    p.classList.toggle('is-active', p===pin);
    p.classList.toggle('is-dimmed', p!==pin);
    p.setAttribute('aria-pressed', p===pin ? 'true' : 'false');
  });
  selected=pin;
  setPopup(pin);
  var name=pin.getAttribute('data-name')||'';
  root.querySelectorAll('.leg-btn').forEach(function(b){
    var li=b.closest('[data-pin]');
    b.classList.toggle('is-active', li && li.getAttribute('data-pin')===name);
  });
  if(routeGroup){
    routeGroup.classList.add('routes-active');
    routeGroup.querySelectorAll('path').forEach(function(path){path.classList.add('route-highlight');});
  }
}

pins.forEach(function(pin){
  pin.setAttribute('tabindex','0');
  pin.setAttribute('role','button');
  pin.setAttribute('aria-pressed','false');
  pin.setAttribute('aria-label',(pin.getAttribute('data-name')||'Financial centre')+' — view details');
  pin.addEventListener('mouseenter',function(){
    if(selected)return;
    setPopup(pin);
    pin.classList.add('is-hover');
  });
  pin.addEventListener('mouseleave',function(){
    pin.classList.remove('is-hover');
    if(!selected && popup) popup.hidden=true;
  });
  pin.addEventListener('focus',function(){if(!selected)setPopup(pin);});
  pin.addEventListener('click',function(e){e.preventDefault();selectPin(pin,true);});
  pin.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();selectPin(pin,true);}
  });
});

root.querySelectorAll('.leg-btn').forEach(function(btn){
  btn.addEventListener('click',function(){
    var li=btn.closest('[data-pin]');
    var name=li&&li.getAttribute('data-pin');
    var pin=pins.find(function(p){return p.getAttribute('data-name')===name;});
    if(pin){selectPin(pin,true);pin.focus();}
  });
});

if(closeBtn){
  closeBtn.addEventListener('click',function(e){e.stopPropagation();clearSelection();});
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape' && selected) clearSelection();
});
document.addEventListener('click',function(e){
  if(!selected)return;
  if(root.contains(e.target))return;
  clearSelection();
});
window.addEventListener('resize',function(){
  if(selected) positionPopup(selected);
});

if(!root.querySelector('.wc-map-interact-hint')){
  var hint=document.createElement('p');
  hint.className='wc-map-interact-hint body-small';
  hint.textContent='Hover or click a city marker or legend item for details. Press Esc to clear.';
  root.appendChild(hint);
}
})();
