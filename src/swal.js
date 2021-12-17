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
  
  window.scrollTo(0,0)
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
    window.scrollTo({top:0, behavior:'smooth'});

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
      text: "Please use a computer/tablet to fully experience our project",
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

async function userHoverGuide() {
  await swal({
      text: "Hover/Scroll Mouse To Reveal More Information",
      timer: 4000,

      className: "hoverGuide",
      button: false
    })

}


async function userSmallWindowGuide() {
 await swal({
      text: "Click Mouse To Rotate Screen",
      timer: 4000,

      className: "rotateGuide",
      button: false
    })
}
