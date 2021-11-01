class Terminal {

    constructor() {
        this.uniqueCode = "Element"
    }

    createText(elementName, leftPosition, topPosition, textSize) {
        let element = elementName.split(" ")[0]
        if (parseInt(element)>0) {
            element="Num"+element
        }
      
        let text = document.createElement(element);
        text.style.position = 'absolute';
        text.style.fontSize = textSize
        text.innerHTML = elementName
        text.style.top = `${topPosition}px`;
        text.style.left = `${leftPosition}px`;
        document.body.appendChild(text);
    }


    refreshText(elementName, leftPosition, topPosition) {

        let element = elementName.split(" ")[0]
        if (parseInt(element)>0) {
            element="Num"+element
        }
        let text = document.querySelector(`${element}`)
        text.style.top = `${topPosition}px`;
        text.style.left = `${leftPosition}px`;
    }

}