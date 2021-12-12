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

function deadAlert() {
  userDead = true;
}

// async function deadAlert(){
//     await swal({
//         text: "You Have Died. You will be automatically moved to the next page",
//         closeOnClickOutside: false,
//         timer: 3000,
//         showCancelButton: false,
//         showConfirmButton: false

//     })
//     .then( ()=> {  
//       userDead=true; 

//     })



