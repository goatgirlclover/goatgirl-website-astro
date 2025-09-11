function toggleDarkMode() {
  document.body.classList.toggle("light-mode"); // dark mode is default
  const usingLightMode = document.body.classList.contains("light-mode");
  localStorage.setItem('lightMode', usingLightMode);
  document.querySelector("button.dark-mode").setAttribute("data-aftercontent", usingLightMode ? ": off" : ": on"); 
}

function toggleReducedMotion() {
  document.body.classList.toggle("reduced-motion"); // dark mode is default
  const usingRM = document.body.classList.contains("reduced-motion");
  localStorage.setItem('reducedMotion', usingRM);
  document.querySelector("button.reduced-motion").setAttribute("data-aftercontent", usingRM ? ": on" : ": off"); 
  
  if (usingRM) { freezeGifs(); } else { unfreezeGifs(); }
}

function freezeGifs() {
  var x = document.querySelectorAll("img.freezable[src^='/assets'], .freezable img[src^='/assets']");
  for (var i = 0; i < x.length; i++) {
    if (x[i].src.endsWith(".gif")) { x[i].src = x[i].src.slice(0, -4) + '-static.png'; }
    x[i].onmouseover = function() { if (this.src.endsWith("-static.png")) { this.src = this.src.slice(0, -11) + '.gif'; } };
    x[i].onmouseleave = function() { if (this.src.endsWith(".gif")) { this.src = this.src.slice(0, -4) + '-static.png'; } };
  }
}

function unfreezeGifs() {
  var x = document.querySelectorAll("img.freezable, .freezable img");
  for (var i = 0; i < x.length; i++) {
    if (x[i].src.endsWith("-static.png")) { x[i].src = x[i].src.slice(0, -11) + '.gif'; }
    x[i].onmouseover = function(){};
    x[i].onmouseleave = function(){};
  }
}

if (localStorage.getItem('lightMode') === 'true') { toggleDarkMode(); }

const prefersReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
if (localStorage.getItem('reducedMotion') === null && prefersReduced) { localStorage.setItem('reducedMotion', true);}
if (localStorage.getItem('reducedMotion') === 'true') { toggleReducedMotion(); }