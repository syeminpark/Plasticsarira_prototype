

function createDomElement(type, isDisplay, id, innerHtml, doc) {
  const dom = document.createElement(type);
  if (!isDisplay) {
    dom.style.display = "none"
  }
  dom.id = id

  dom.innerHTML = innerHtml
  doc.appendChild(dom)
}


function checkAccessRoute() {
  if (!sessionStorage.getItem("userId")) {
    window.location.href = 'https://gatheringmoss.art/artworks/plastic-sarira/';
  } else {
    createDomElement("div", false, "userId", sessionStorage.getItem("userId"), document.body)
    createDomElement("div", false, "userName", sessionStorage.getItem("userName"), document.body)
  }
}

function reloadCss() {
  let links = document.getElementsByTagName("link");
  for (var cl in links) {
    var link = links[cl];
    if (link.rel === "stylesheet")
      link.href += "";
  }
}

function moveToTopWindow() {
  let input = document.querySelector("input")
  input.addEventListener("input", (event) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }, true)
}

// https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript
function readTextFile(file, callback, thisObj) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback.call(thisObj, rawFile.responseText);
      }
  }
  rawFile.send(null);
}