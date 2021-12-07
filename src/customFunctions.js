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



function changeHistory(){
  try {
      var stateObj = {
          foo: "bar"
      };
      history.pushState(stateObj, "page 2", "https://greenverse.art/artworks/plastic-sarira/");
  } catch (error) {
      console.log(error)
  }
  }