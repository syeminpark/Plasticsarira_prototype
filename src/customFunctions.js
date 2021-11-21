function constrain(num, min, max) {
  const MIN = min
  const MAX = max
  const parsed = parseInt(num)
  return Math.min(Math.max(parsed, MIN), MAX)
}

function print(...args) {
  console.log(...args)
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function map(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function vhToPx(vh) {
  return window.innerHeight * (vh / 100)
}

function vwToPx(vw) {
  return window.innerWidth * (vw / 100)
}


function pxToVh(px) {
  return px * (100 / window.innerHeight)
}

function pxToVw(px) {
  return px * (100 / window.innerWidth)
}

function requestFullScreen(element) {
  // Supports most browsers and their versions.
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

  if (requestMethod) { // Native full screen.
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}

function checkScreenSize() {
  if (screen.width != window.innerWidth) {
    swal("Experince With A FullScreen?", {
      buttons: ["No Thanks", "Sure! (Recommended)"],
      closeOnClickOutside: false,

    }).then(isOkay => {
      if (isOkay) {
        var elem = document.documentElement;; // Make the body go full screen.
        requestFullScreen(elem);
      }
    })
  };
}