class Terminal {

    constructor() {
      this.canvas= document.querySelector(`#sarira`)
      window.addEventListener('resize', this.moveText.bind(this));
  
    }

    createText(elementName, leftPosition, topPosition, textSize) {

        let text = document.createElement('text');
        text.style.position = 'absolute';
        text.style.fontSize = textSize
        text.innerHTML = elementName
        text.style.top = `${topPosition}vh`;
        text.style.left = `${leftPosition}vw`;
        document.body.appendChild(text);
    }

    moveText(){

        let totalText=document.querySelectorAll('text');
        for (let i = 0; i < totalText.length; i++) {
            totalText[i].style.top=`${parseInt(totalText[i].style.top.split("vh")[0])}vh`
        }
    }
}