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

function checkDeviceType(writename) {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    useComputerAlert()

  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    useComputerAlert()
  }
  else{
    writename()
  }

};

function writeName() {
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
    if (value) {
      //only fullscreen for others
      if (value != "admin") {
        var elem = document.documentElement;; // Make the body go full screen.a
        requestFullScreen(elem);
      }
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

// function deadAlert() {
//   userDead = true;
// }

async function deadAlert() {
  await swal({
      text: "You Have Died. Now You will be moved to the Arhival. ",
      closeOnClickOutside: false,
      timer: 5000,
      showCancelButton: false,
      showConfirmButton: false

    })
    .then(() => {
      userDead = true;

    })

}