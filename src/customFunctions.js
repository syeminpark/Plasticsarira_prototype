//예시 큐브 
function createCube() {
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const material = new THREE.MeshPhongMaterial({
    color: '#8AC'
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, 0)
  return cube
}

//-----rgb to hex converter 
function color(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

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

function requestFullScreen(element) {
  // Supports most browsers and their versions.
  let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

  if (requestMethod) { // Native full screen.
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
    let wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}

function vhToPx(vh) {
  return window.innerHeight * (vh / 100)
}

function pxToVh(px) {
  return px * (100 / window.innerHeight)
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
    swal("Start Experince With A FullScreen?", {
      buttons: ["No Thanks", "Sure! (Recommended)"],
      closeOnClickOutside: false,

    }).then(isOkay => {
      if (isOkay) {
        var elem = document.documentElement;; // Make the body go full screen.
        requestFullScreen(elem);
      }
      setup()
      draw

    })

  };
  

}