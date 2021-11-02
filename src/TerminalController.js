class TerminalController {

    constructor() {
        this.iterm = new Terminal()

        this.canvas = document.querySelector('#sarira')
        this.canvasRect = this.canvas.getBoundingClientRect()

        this.categoryTextSize = "0.7vw"
        this.metaDataTextSize = "0.5vw"
        // this.wordSpacingList = [0, 4.5, 8, 12, 6.5, 11.5]
        this.wordSpacingList = [0, 2.3, 4, 6.5, 3.5, 5.8]

        this.initialSpace =36 
        this.space = 2
        this.ownerVerticalSpace = 0
        
        this.categoryList = ["Type ", `Birthday`, `Origin`, `Owners`, `Retrieved_By`, `Date_Retrieved`]

        this.metaDataList = new Array(5)
        for (let i = 0; i < 6; i++) {
            this.metaDataList[i] = new Array(0)
        }
        //window.addEventListener('resize', this.refreshCategory.bind(this));
       // window.addEventListener('resize', this.refreshMetaData.bind(this));
    }


    initializeCategory() {
        let leftPosition=100-(this.canvasRect.width/document.documentElement.clientWidth * 100)
        for (let i = 0; i < this.categoryList.length; i++) {
            leftPosition+=this.wordSpacingList[i]
            this.iterm.createText(this.categoryList[i], leftPosition, this.initialSpace, this.categoryTextSize)
        }
    }

    createMetaDataText() {

        let initialSpace=this.checkMetaDataLength()
        let leftPosition=100-(this.canvasRect.width/document.documentElement.clientWidth * 100)

        for (let [i, category] of this.metaDataList.entries()) {
            leftPosition += this.wordSpacingList[i] 

            if (i == 3) {
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

    checkMetaDataLength() {
        let initialSpace = this.initialSpace
        if (this.metaDataList[0].length == 1) {
            initialSpace += this.space
        } else {
            initialSpace = this.ownerVerticalSpace 
        }
        return initialSpace
    }

    // initializeCategory() {
    //     this.updateInfo()
    //     for (let i = 0; i < this.categoryList.length; i++) {
    //         this.leftPosition += this.wordSpacingList[i] * this.space
    //         this.iterm.createText(this.categoryList[i], this.leftPosition, this.canvasRect.bottom + this.initialSpace, this.categoryTextSize)
    //     }
    // }

    // refreshCategory() {
    //     this.updateInfo()
    //     //refresh category
    //     for (let i = 0; i < this.categoryList.length; i++) {
    //         this.leftPosition += this.wordSpacingList[i] * this.space
    //         this.iterm.refreshText(this.categoryList[i], this.leftPosition, this.canvasRect.bottom + this.initialSpace)
    //     }
    // }

    // refreshMetaData() {
    // print("resize")
        
    //     this.updateInfo()
    //     for (let indexLength = 0; indexLength < this.metaDataList[0].length; indexLength++) {

    //         let initialSpace = this.checkMetaDataLength2()
    //         for (let [i, category] of this.metaDataList.entries()) {

    //             this.leftPosition += this.wordSpacingList[i] * this.space

    //             if (i == 3) {
    //                 let ownerVerticalSpace = initialSpace
    //                 //category=pastOwners
    //                 for (let pastOwner of category[indexLength]) {
    //                     this.iterm.refreshText(pastOwner, this.leftPosition, this.canvasRect.bottom + ownerVerticalSpace)
    //                     ownerVerticalSpace += this.space
    //                 }
    //                 this.ownerVerticalSpace2 = ownerVerticalSpace
    //             } else {
    //                 this.iterm.refreshText(category[indexLength], this.leftPosition, this.canvasRect.bottom + initialSpace)
    //             }
    //         }
    //     }


    // }

    // createMetaDataText() {
    //     this.updateInfo()

    //     let initialSpace = this.checkMetaDataLength()

    //     for (let [i, category] of this.metaDataList.entries()) {
    //         this.leftPosition += this.wordSpacingList[i] * this.space

    //         if (i == 3) {
    //             let ownerVerticalSpace = initialSpace
    //             for (let pastOwner of category[category.length - 1]) {
    //                 this.iterm.createText(pastOwner, this.leftPosition, this.canvasRect.bottom + ownerVerticalSpace, this.metaDataTextSize)
    //                 ownerVerticalSpace += this.space
    //             }
    //             this.ownerVerticalSpace = ownerVerticalSpace

    //         } else {
    //             this.iterm.createText(category[category.length - 1], this.leftPosition, this.canvasRect.bottom + initialSpace, this.metaDataTextSize)
    //         }
    //     }

    // }


    // updateInfo() {
    //     this.initialSpace = window.innerWidth / 250
    //     this.space = window.innerWidth / 200
    //     this.canvasRect = this.canvas.getBoundingClientRect()
    //     this.leftPosition = this.canvasRect.left
    // }

    // checkMetaDataLength() {
    //     let initialSpace = this.initialSpace
    //     if (this.metaDataList[0].length == 1) {
    //         initialSpace *= this.metaDataList[0].length + 3
    //     } else {
    //         initialSpace += this.ownerVerticalSpace - this.space
    //     }
    //     return initialSpace
    // }

    // checkMetaDataLength2() {
    //     let initialSpace = this.initialSpace
    //     if (this.metaDataList[0].length == 1) {
    //         initialSpace *= this.metaDataList[0].length + 3
    //     } else {
    //         initialSpace += this.ownerVerticalSpace2 - this.space
    //     }
    //     return initialSpace
    // }

}