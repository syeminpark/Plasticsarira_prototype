class Terminal {

    constructor() {

        this.categoryTextSize = "0.65vw"
        this.metaDataTextSize = "0.5vw"
        this.wordSpacingList = [0, 5.8, 3.5, 5, 3.5, 5]
        this.space = 2
        this.ownerVerticalSpace = 0

        this.canvas = document.querySelector('#sarira')
        this.initialSpace = pxToVh(this.canvas.getBoundingClientRect().bottom) + this.space
        this.leftPosition = pxToVw(this.canvas.getBoundingClientRect().left)

        this.categoryList = [`Original_Form`, `Made_In`, "Micro_Type ", `Pass_By`, `Absorbed_By`, `Date_Retrieved`]
        this.metaDataList = new Array(5)
        for (let i = 0; i < this.categoryList.length; i++) {
            this.metaDataList[i] = new Array(0)
        }
    }

    initializeCategory() {
        let leftPosition = this.leftPosition
        for (let i = 0; i < this.categoryList.length; i++) {
            leftPosition += this.wordSpacingList[i]
            this.createText(this.categoryList[i], leftPosition, this.initialSpace, this.categoryTextSize)
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
                    this.createText(pastOwner, leftPosition, ownerVerticalSpace, this.metaDataTextSize)
                    ownerVerticalSpace += this.space / 2
                }
                this.ownerVerticalSpace = ownerVerticalSpace
            } else {
                this.createText(category[category.length - 1], leftPosition, initialSpace, this.metaDataTextSize)
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

    createText(elementName, leftPosition, topPosition, textSize) {
        let text = document.createElement('text');
        text.style.position = 'absolute';
        text.style.fontSize = textSize
        text.innerHTML = elementName
        text.style.top = `${topPosition}vh`;
        text.style.left = `${leftPosition}vw`;
        document.getElementById("metaData").appendChild(text);
    }
}