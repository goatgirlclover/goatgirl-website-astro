function toggleClass(element, className) { // better support for old old browsers
    var currentClasses = ' ' + element.className + ' ';
    if (currentClasses.indexOf(' ' + className + ' ') > -1) {
        element.className = currentClasses.replace(' ' + className + ' ', ' ').trim();
    } else {
        element.className += (element.className ? ' ' : '') + className;
    }
}

function toggleDarkMode() {
  toggleClass(document.documentElement, "light-mode"); // dark mode is default
  const usingLightMode = document.documentElement.className.indexOf("light-mode") > -1;
  document.querySelector("button.dark-mode").setAttribute("data-aftercontent", usingLightMode ? ": off" : ": on"); 
  localStorage.setItem('lightMode', usingLightMode);
}

function toggleReducedMotion() {
  toggleClass(document.documentElement, "reduced-motion");
  toggleClass(document.documentElement, "full-motion"); 
  const usingRM = document.documentElement.className.indexOf("reduced-motion") > -1;
  document.querySelector("button.reduced-motion").setAttribute("data-aftercontent", usingRM ? ": on" : ": off"); 
  localStorage.setItem('reducedMotion', usingRM);
  
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
toggleClass(document.documentElement, "full-motion");
if (localStorage.getItem('reducedMotion') === 'true') { toggleReducedMotion(); }

if (navigator.userAgent.indexOf("Nintendo 3DS") !== -1 && (localStorage.getItem('reducedMotion') === null)) { toggleReducedMotion(); } 