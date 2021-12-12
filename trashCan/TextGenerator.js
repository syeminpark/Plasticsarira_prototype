class TextGenerator{
    constructor(){

    }

    createText(textContent, leftPosition, topPosition, textSize, isMetaData) {
        let text = document.createElement('text');
        text.style.position = 'absolute';
        text.style.fontSize = `${textSize}vw`;
        text.innerHTML = textContent
        text.style.top = `${topPosition}vh`;
        text.style.left = `${leftPosition}vw`;
        text.style.zIndex = 3;

        if (isMetaData) {
            //check leftPosition of text and assign the appropriate html div element among category
            for (let [index, space] of this.wordSpacingList.entries()) {
                let totalSpace = 0;
                if (index == 0)
                    totalSpace = space + this.leftPosition
                else {
                    for (let i = 1; i <= index; i++) {
                        totalSpace += this.wordSpacingList[i]
                    }
                    totalSpace += this.leftPosition
                }
                if (Math.round(totalSpace) == Math.round(leftPosition)) {
                    document.getElementById(this.categoryList[index]).appendChild(text);
                    break;
                }
            }
        } else {
            text.id = this.popupTextId
            if(textSize==this.popupTitleSize)
            text.style.color = "rgba(200,200,200,1)"
            else{
                text.style.color = "rgba(150,150,150,1)"
            }
            document.body.appendChild(text)
        }
    }
}