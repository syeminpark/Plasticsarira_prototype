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
  
  async function writeName() {
      await swal({
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
      }, 
      ).then(value => {
        if (value) {
          var elem = document.documentElement;; // Make the body go full screen.
          requestFullScreen(elem);
          const userId= document.createElement("div");
          userId.style.display="none"
          userId.id="userId"
          userId.innerHTML=value
          document.body.appendChild(userId)
        }
        else{
          writeName()
        }
      })
  }
  
async function deadAlert(){
    await swal({
        text: "You Have Died. You will be automatically moved to the next page",
        closeOnClickOutside: false,
        timer: 3000,
        showCancelButton: false,
        showConfirmButton: false

    })
    .then( ()=> {  
      userDead=true; requestAnimationFrame(draw);
        
    })
}