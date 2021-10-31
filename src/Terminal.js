class Terminal {

    constructor() {
        
    }

    createText(elementName,leftPosition,topPosition,){
        let text = document.createElement(elementName);

        text.style.position = 'absolute';
        text.style.fontSize=  this.categoryTextSize
        text.innerHTML = elementName
        text.style.top =  `${topPosition}px`;
        text.style.left =  `${leftPosition}px`;
        document.body.appendChild(text);
    }


}