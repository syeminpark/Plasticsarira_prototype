class Popup {
    constructor(dataList, popupTitleSize, splitWordsList, popupTextId, popupLimitWidth, boxSize) {
        //this.dataList has elemenets with names the same as their ids inside dom.
        this.dataList = dataList

        this.popupTitleSize = popupTitleSize
        this.splitWordsList = splitWordsList
        this.popupTextId = popupTextId
        this.popupLimitWidth = popupLimitWidth


        this.boxWidth = boxSize[0]
        this.boxHeight = boxSize[1]

        //comes from alreay crated css id
        this.popupBoxId = "popupBox"
    }

    assignPopupToDom(createText) {
        for (let [index, data] of this.dataList.entries()) {
            //access into category div
            let data = document.getElementById(this.dataList[index])
            //assign eventListener to these categories 
            data.addEventListener("mouseenter", function () {
                let mouseXPosition = event.clientX;
                let mouseYPosition = event.clientY;
                this.createBackgroundBox(mouseXPosition, mouseYPosition)
                this.createPopupText(data.id, index, createText)
            }.bind(this))
            data.addEventListener("touchstart", function (e) {
                e.preventDefault()
                let mouseXPosition = e.touches[0].clientX;
                let mouseYPosition = e.touches[0].clientY;

                this.createBackgroundBox(mouseXPosition, mouseYPosition)
                this.createPopupText(data.id, index, createText)
            }.bind(this))
            
            data.addEventListener("mouseleave", this.deletePopup.bind(this))
            data.addEventListener("touchend", this.deletePopup.bind(this))
        }
    }

    createBackgroundBox(mouseXPosition, mouseYPosition) {
        const box = document.createElement('div');
        box.id = this.popupBoxId
        box.style.height = `${this.boxHeight}vh`
        box.style.width = `${this.boxWidth}vw`
        
        //console.log(mouseYPosition)
        //offset by 1
        box.style.top = `${myMath.pxToVh(mouseYPosition) -this.boxHeight-1 }vh`
        //center frame
        box.style.left = `${myMath.pxToVw(mouseXPosition)-this.boxWidth}vw`
        document.body.appendChild(box)
    }


    createPopupText(metaDataId, index, createText) {
        let verticalSpace = 3;
        let popupTextSize = 0.7
        let popupBox = document.querySelector("#" + this.popupBoxId)
        let popupBoxLeftPosition = parseFloat(popupBox.style.left.replace("vw", ""))
        let popupBoxtopPosition = parseFloat(popupBox.style.top.replace("vh", ""))
        let sentenceLengthList = []

        //category
        createText(metaDataId, popupBoxLeftPosition + 0.5, popupBoxtopPosition + 0.5, this.popupTitleSize)

        let jsonData = JSON.parse(data)
        //get the count of keys inside each popUpData category 
        for (let i = 0; i < 3; i++) { // Object.keys(jsonData[this.categoryList[0]].length);
            let key = 0;
            if (i == 0) {
                key = jsonData[this.dataList[index]].text
            } else if (i == 1) {
                key = jsonData[this.dataList[index]].quote
            } else {
                key = jsonData[this.dataList[index]].src
            }
            sentenceLengthList.push(this.splitWords(i, key))
        }

        let paragraphSpace = 0;
        for (let [i, category] of this.splitWordsList.entries()) {
            let verticalPosition = 0;
            for (let [j, sentence] of category.entries()) {
                paragraphSpace == 0 ? verticalPosition = popupBoxtopPosition + verticalSpace + (j * 2) : verticalPosition = paragraphSpace + 3 + (j * 2);
                createText(sentence, popupBoxLeftPosition + 0.5, verticalPosition, popupTextSize)
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