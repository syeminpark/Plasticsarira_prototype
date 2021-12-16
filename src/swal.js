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

function checkDeviceType() {
  const ua = window.navigator.userAgent;
  let isTablet = false;
  if (/(tablet|iPad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    isTablet = true;
    writeName(isTablet)

  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    useComputerAlert()
  } else if (window.navigator.maxTouchPoints && /Macintosh/.test(ua)) {
    isTablet = true;
    writeName(isTablet)
  } else {
    writeName(isTablet)
  }
};

function writeName(isTablet) {
  //check if userName Dom already exists. if it does. erase content
  swal({
    text: "What is your Name?",
    content: "input",
    button: "Wrote!",
    closeOnClickOutside: false,

    content: {
      element: "input",
      attributes: {
        placeholder: "Please Type Your Name",
      },
    },
  }, ).then(value => {

    document.querySelector("body").style.overflow = "visible"
    if (window.innerHeight > window.innerWidth) {
      window.scrollTo(0, pxToVh(document.querySelector('#sarira').getBoundingClientRect().bottom));
    } else {
      window.scrollTo(0, document.querySelector('#sarira').getBoundingClientRect().bottom)
    }


    if (value) {
      //only fullscreen for others
      if (!isTablet) {
        var elem = document.documentElement;; // Make the body go full screen.a
        requestFullScreen(elem);
      }
      document.querySelector("input").value = ""
      createDomElement("div", false, "userName", value, document.body)
      setup()
    } else {
      writeName()

    }
  })
}

function useComputerAlert() {
  swal({
      text: "Please use a computer to fully experience our project",
      buttons: "Return",
      closeOnClickOutside: false,
    })
    .then(() => {
      window.location.href = 'https://greenverse.art/artworks/plastic-sarira/';
    })
}

async function deadAlert() {
  await swal({
      text: "You Have Died. Now You Will Be Moved To The Archival. ",
      closeOnClickOutside: false,
      timer: 5000,
      button: false,
    })
    .then(() => {
      userDead = true;
    })
}

function userHoverGuide() {
  swal({
      text: "Hover/Scroll Mouse To Reveal More Information",
      timer: 4000,
      closeOnClickOutside: false,
      className: "hoverGuide",
      button: false
    })
    .then(() => {})
}


function userSmallWindowGuide() {
  swal({
      text: "Click Mouse To Rotate Screen",
      timer: 4000,
      closeOnClickOutside: false,
      className: "rotateGuide",
      button: false
    })
    .then(() => {
      userHoverGuide()
    })
}