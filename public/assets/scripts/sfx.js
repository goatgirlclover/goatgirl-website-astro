var audioContext;
var buffers = {};
var bufferLoader;

var soundEffects = {
  select: "/assets/sfx/UI_Select.wav",
  openExternal: "/assets/sfx/UI_Cmn_Open_Short.wav",
  click: "/assets/sfx/UI_Decide_Small.wav",
};

var globalVolume = 0.3;

function loadSound(name, url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (buffer) {
      buffers[name] = buffer;
    });
  };

  request.send();
}

function loadAllSounds() {
  for (const [key, value] of Object.entries(soundEffects)) {
    loadSound(key, value);
  }
}

function playSound(name, volume = 1) {
  var buffer = buffers[name];
  if (buffer) {
    var source = audioContext.createBufferSource();
    source.buffer = buffer;

    var gainVolume = audioContext.createGain();
    gainVolume.gain.value = volume * globalVolume;

    gainVolume.connect(audioContext.destination);
    source.connect(gainVolume);

    source.start(0);
    return source;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  audioContext = new AudioContext();
  loadAllSounds();

  document.body
    .querySelectorAll("a:is(:not(.art)), .button-holder>*")
    .forEach((a) => {
      a.addEventListener("mouseenter", () => {
        playSound("select");
      });

      a.addEventListener("click", (event) => {
        if (a.target == "_blank") {
          playSound("openExternal");
        } else {
          event.preventDefault();
          var source = playSound("click");
          if (source) {
            source.onended = () => (window.location.href = a.href);
          } else {
            window.location.href = a.href;
          }
        }
      });
    });

  document.body
    .querySelectorAll("#status-goat, details summary")
    .forEach((e) => {
      e.addEventListener("click", () => {
        playSound("click");
      });
    });
});
