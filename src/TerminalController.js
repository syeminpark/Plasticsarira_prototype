class TerminalController {

    constructor() {
        this.iterm = new Terminal()

        this.categoryTextSize = "0.7vw"
        this.metaDataTextSize = "0.5vw"
        this.wordSpacingList = [0, 2.3, 4, 6.5, 3.5, 5.8]

        this.initialSpace =36 
        this.space = 2
        this.ownerVerticalSpace = 0
        this.leftPosition=71
        
        this.categoryList = ["Type ", `Birthday`, `Origin`, `Owners`, `Retrieved_By`, `Date_Retrieved`]

        this.metaDataList = new Array(5)
        for (let i = 0; i < this.categoryList.length; i++) {
            this.metaDataList[i] = new Array(0)
        }

        this.slider=new Slider()
        this.canvas = document.querySelector('#sarira')
        document.addEventListener('mousemove', this.moveText.bind(this))
    }

    initializeCategory() {
        let leftPosition=this.leftPosition
        for (let i = 0; i < this.categoryList.length; i++) {
            leftPosition+=this.wordSpacingList[i]
            this.iterm.createText(this.categoryList[i], leftPosition, this.initialSpace, this.categoryTextSize)
        }
    }

    createMetaDataText() {
        const OWNERS_INDEX=3
        let initialSpace=this.checkMetaDataLength()
        let leftPosition=this.leftPosition
       
        for (let [i, category] of this.metaDataList.entries()) {
            leftPosition += this.wordSpacingList[i] 

            if (i == OWNERS_INDEX) {
                let ownerVerticalSpace = initialSpace
                for (let pastOwner of category[category.length - 1]) {
                    this.iterm.createText(pastOwner, leftPosition, ownerVerticalSpace, this.metaDataTextSize)
                    ownerVerticalSpace += this.space/2
                }
                this.ownerVerticalSpace = ownerVerticalSpace
            } else {
                this.iterm.createText(category[category.length - 1], leftPosition, initialSpace, this.metaDataTextSize)
            }
        }
    }

    moveText(event){
        if(this.slider.isWithin(event)){
            this.iterm.moveText()
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
}