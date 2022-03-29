class Terminal {

    constructor() {

        this.categoryTextSize = "0.65"
        this.metaDataTextSize = "0.5"
        this.wordSpacingList = [0, 5.8, 3.3, 5.2, 3.3, 4.8]
        this.space = 2
        this.ownerVerticalSpace = 0

        this.metaDataNameCss = "metaData"
        this.popupTextId = "popupText"
  

        this.splitWordsList = []
        for (let i = 0; i < 3; i++) {
            this.splitWordsList[i] = new Array(0)
        }

        this.popupLimitWidth = 100;
        this.popupLimitHeight = 5
        this.popupTitleSize= "0.8"

        this.canvas = document.querySelector('#sarira')
        this.initialSpace = myMath.pxToVh(this.canvas.getBoundingClientRect().bottom) + this.space
        this.leftPosition = myMath.pxToVw(this.canvas.getBoundingClientRect().left)

        //Get Names Of index.html div Elements
        this.categoryList = []
        for (let child of document.querySelector('#' + this.metaDataNameCss).children) {
            this.categoryList.push(child.id)
        }

        this.metaDataList = new Array(5)
        for (let i = 0; i < this.categoryList.length; i++) {
            this.metaDataList[i] = new Array(0)
        }

        //
        this.popup = new Popup(this.categoryList, this.popupTitleSize, this.splitWordsList,this.popupTextId,this.popupLimitWidth,[40,20])
    }

    initializeCategory() {
        let leftPosition = this.leftPosition
        for (let i = 0; i < this.categoryList.length; i++) {
            leftPosition += this.wordSpacingList[i]
            this.createText(this.categoryList[i], leftPosition, this.initialSpace, this.categoryTextSize, true)
        }
    }

    createMetaDataText() {
        const OWNERS_INDEX = 3
        let initialSpace = this.checkMetaDataLength()
        let leftPosition = this.leftPosition

        for (let [i, category] of this.metaDataList.entries()) {
            leftPosition += this.wordSpacingList[i]
            if (i == OWNERS_INDEX) {
                let ownerVerticalSpace = initialSpace
                
                for (let pastOwner of category[category.length - 1]) {
                    this.createText(pastOwner, leftPosition, ownerVerticalSpace, this.metaDataTextSize, true)
                    ownerVerticalSpace += this.space / 2
                }
                this.ownerVerticalSpace = ownerVerticalSpace 
            } else {
                this.createText(category[category.length - 1], leftPosition, initialSpace, this.metaDataTextSize, true)
            }
        }
    }

    checkMetaDataLength() {
        let initialSpace = this.initialSpace
        if (this.metaDataList[0].length == 1) {
            initialSpace += this.space
        } else {
            initialSpace = this.ownerVerticalSpace
        }
        return initialSpace
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
            text.style.position = 'fixed';
            text.id = this.popupTextId
            if(textSize==this.popupTitleSize)
            text.style.color = "rgba(200,200,200,1)"
            else{
                text.style.color = "rgba(150,150,150,1)"
            }
            document.body.appendChild(text)
        }
    }

    assignPopupToText() {
       this.popup.assignPopupToDom(this.createText.bind(this))
    }

}