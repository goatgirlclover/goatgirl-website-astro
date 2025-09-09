function toggleDarkMode() {
  document.body.classList.toggle("light-mode"); // dark mode is default
  const usingLightMode = document.body.classList.contains("light-mode");
  localStorage.setItem('lightMode', usingLightMode);
  document.querySelector("a.dark-mode").setAttribute("data-aftercontent", usingLightMode ? ": off" : ": on"); 
}

function toggleReducedMotion() {
  document.body.classList.toggle("reduced-motion"); // dark mode is default
  const usingRM = document.body.classList.contains("reduced-motion");
  localStorage.setItem('reducedMotion', usingRM);
  document.querySelector("a.reduced-motion").setAttribute("data-aftercontent", usingRM ? ": on" : ": off"); 
}

addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem('lightMode') === 'true') { toggleDarkMode(document.querySelector("a.dark-mode")); }

  const prefersReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  if (localStorage.getItem('reducedMotion') === null || prefersReduced) { localStorage.setItem('reducedMotion', usingRM);}
  if (localStorage.getItem('reducedMotion') === 'true') { toggleReducedMotion(document.querySelector("a.reduced-motion")); }
}); 
