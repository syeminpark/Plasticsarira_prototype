class Terminal {

    constructor() {
        
    }

    createText(elementName,leftPosition,topPosition,textSize){

       
        let text = document.createElement(elementName.split(" ")[0]);
        text.style.position = 'absolute';
        text.style.fontSize= textSize
        text.innerHTML = elementName
        text.style.top =  `${topPosition}px`;
        text.style.left =  `${leftPosition}px`;
        document.body.appendChild(text);
    }


}