class Terminal {

    constructor() {

        this.categoryTextSize = "0.65"
        this.metaDataTextSize = "0.5"
        this.wordSpacingList = [0, 5.8, 3.3, 5.2, 3.3, 4.8]
        this.space = 2
        this.ownerVerticalSpace = 0

        this.metaDataNameCss = "metaData"
        this.popupTextId = "popupText"
        this.popupBoxId = "popupBox"

        this.splitWordsList = []
        for (let i = 0; i < 3; i++) {
            this.splitWordsList[i] = new Array(0)
        }

        this.popupLimitWidth = 100;
        this.popupLimitHeight = 5
        this.popupTitleSize= "0.8"

        this.canvas = document.querySelector('#sarira')
        this.initialSpace = pxToVh(this.canvas.getBoundingClientRect().bottom) + this.space
        this.leftPosition = pxToVw(this.canvas.getBoundingClientRect().left)

        //Get Names Of index.html div Elements
        this.categoryList = []
        for (let child of document.querySelector('#' + this.metaDataNameCss).children) {
            this.categoryList.push(child.id)
        }

        this.metaDataList = new Array(5)
        for (let i = 0; i < this.categoryList.length; i++) {
            this.metaDataList[i] = new Array(0)
        }
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
        for (let [index, data] of this.categoryList.entries()) {
            //access into category div
            let metaData = document.getElementById(this.categoryList[index])
            //assign eventListener to these categories 
            metaData.addEventListener("mouseenter", function () {
                let mouseXPosition = event.clientX;
                let mouseYPosition = event.clientY;
                this.createBackgroundBox(mouseXPosition, mouseYPosition)
                this.createPopupText(metaData.id,index)
            }.bind(this))
            metaData.addEventListener("mouseleave", this.deletePopup.bind(this))
        }
    }

    createBackgroundBox(mouseXPosition, mouseYPosition) {
        let box = document.createElement('div');
        box.id = this.popupBoxId
        box.style.position = "absolute"
        let height = 8;
        let width = 40
        box.style.height = `${height}vh`
        box.style.width = `${width}vw`
        box.style.zIndex = "0";
        box.style.backgroundColor = "rgba(0,0,0,1)"
        box.style.borderColor = "rgba(100,100,100,1)"
        box.style.borderWidth = "0.001vw"
        box.style.borderStyle = "solid"
        box.style.zIndex = "3"
        //offset by 1
        box.style.top = `${pxToVh(mouseYPosition) -height-1 }vh`
        //center frame
        box.style.left = `${pxToVw(mouseXPosition)-width}vw`
        document.body.appendChild(box)
    }

    createPopupText(metaDataId,index) {
        let verticalSpace = 3;
        let popupTextSize=0.7
        let popupBox = document.querySelector("#" + this.popupBoxId)
        let popupBoxLeftPosition = parseFloat(popupBox.style.left.replace("vw", ""))
        let popupBoxtopPosition = parseFloat(popupBox.style.top.replace("vh", ""))
        let sentenceLengthList = []

        //category
        this.createText(metaDataId, popupBoxLeftPosition + 0.5, popupBoxtopPosition + 0.5, this.popupTitleSize)

        let jsonData = JSON.parse(data)
            //get the count of keys inside each popUpData category 
            for (let i = 0; i < 1; i++) { // Object.keys(jsonData[this.categoryList[0]].length);
                let key = 0;
                if (i == 0) {
                    key = jsonData[this.categoryList[index]].text
                } else if (i == 1) {
                    key = jsonData[this.categoryList[index]].quote
                } else {
                    key = jsonData[this.categoryList[index]].src
                }
                sentenceLengthList.push(this.splitWords(i, key))
            }

        let paragraphSpace = 0;
        for (let [i, category] of this.splitWordsList.entries()) {
            let verticalPosition = 0;
            for (let [j, sentence] of category.entries()) {
                paragraphSpace == 0 ? verticalPosition = popupBoxtopPosition + verticalSpace + (j * 2) : verticalPosition = paragraphSpace + 3 + (j * 2);
                this.createText(sentence, popupBoxLeftPosition + 0.5, verticalPosition, popupTextSize)
            }
            paragraphSpace = verticalPosition
        }
    }

    deletePopup() {
        if (document.querySelector("#" + this.popupBoxId)) {
            document.querySelector("#" + this.popupBoxId).remove()
            let textList = document.querySelectorAll("#" + this.popupTextId)
            for (let text of textList) {
                text.remove()
            }
        }
        for (let i = 0; i < 3; i++) {
            this.splitWordsList[i] = new Array(0)
        }
    }

    splitWords(index, key) {
        let jsonWordTotalCount = key.length
        let jsonSpaceTotalCount = key.split(" ").length - 1;
        let leftData = key;
        //total word count + total space count dividied by the limit of popup screen equals the l
        //the number of total senteces needed 
        let iteration = (jsonWordTotalCount + jsonSpaceTotalCount) / this.popupLimitWidth

        for (let i = 0; i < Math.ceil(iteration); i++) {
            let data = this.recursiveSplit(leftData, jsonWordTotalCount, key, (i + 1) == Math.ceil(iteration));
            this.splitWordsList[index].push(data.splitData)
            leftData = data.leftData;
        }
        return Math.ceil(iteration);
    }

    recursiveSplit(totalData, jsonWordTotalCount, key, isLastIndex) {
        for (let i = 0; i < jsonWordTotalCount; i++) {
            //if the splitData length is over the limit
            if (!isLastIndex) {
                //get all data and split it by spaces. 
                let splitData = totalData.split((/(\s)/), i).join(" ");
                //right now it is word length
                //must change to char length 
                if (splitData.length >= this.popupLimitWidth) {
                    //store the data up unitl now into split data 
                    // reamaining data stars from the total length minus splitData length - whitespaces= breakPoints. add + 1 to skip to the next char in the list 
                    let leftData = totalData.substring(splitData.length - i + 1, key.length)
                    return {
                        splitData,
                        leftData
                    }
                }
            } else {
                let splitData = totalData;
                let leftData = null;
                return {
                    splitData,
                    leftData
                }
            }
        }

    }

}