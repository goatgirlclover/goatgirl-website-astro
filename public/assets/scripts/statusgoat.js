const x = document.getElementById("status-section").firstElementChild;
const y = document.getElementById("status-bubble");
const z = document.getElementById("status-goat");

//new Image().src = "/assets/img/goatsit_talk.png"; // preload

z.setAttribute("data-before", "click me! ⤵")
toggleStatus();

function toggleStatus() {
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
    y.style.visibility = "visible";
    z.setAttribute("data-before", "")
    z.style.animation = "bounce 0.15s ease 1";
    /*z.children[0].src = "/assets/img/goatsit_talk.png";
    setTimeout(
      function () {
        z.children[0].src = "/assets/img/goatsit.png";
      }, 300); */
  } else {
    x.style.visibility = "hidden";
    y.style.visibility = "hidden";
    // z.setAttribute("data-before", "click me! ⤵") 
    z.style.animation = "none";
  }
}

function styleSpeechBubble() {
  if (y.offsetTop < z.offsetTop) {
    y.className = "speech-bubble";
  } else {
    y.className = "speech-bubble right";
  }
}

window.addEventListener('resize', styleSpeechBubble);
window.addEventListener('load', styleSpeechBubble);