class Terminal {

    constructor() {
        // this.uniqueCode = "Element"
        // this.count=0
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
       this.yPosi
        let totalText=document.querySelectorAll('text');
        for (let i = 0; i < totalText.length; i++) {
            totalText[i].style.top=`${parseInt(totalText[i].style.top.split("vh")[0])}vh`
        }
    }



    // createText(elementName, leftPosition, topPosition, textSize) {
    //     let element = elementName.split(" ")[0]
    //     if (parseInt(element)>0) {
    //         element="Num"+element
    //     }
      
    //     let text = document.createElement(element);
    //     text.style.position = 'absolute';
    //     text.style.fontSize = textSize
    //     text.innerHTML = elementName
    //     text.style.top = `${topPosition}px`;
    //     text.style.left = `${leftPosition}px`;
    //     document.body.appendChild(text);
    // }

 

    // refreshText(elementName, leftPosition, topPosition) {

    //     let element = elementName.split(" ")[0]
    //     if (parseInt(element)>0) {
    //         element="Num"+element
    //     }
    //     let text = document.querySelector(`${element}`)
    //     text.style.top = `${topPosition}px`;
    //     text.style.left = `${leftPosition}px`;
    // }

}