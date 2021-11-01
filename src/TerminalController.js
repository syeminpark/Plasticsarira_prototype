class TerminalController {

    constructor() {
        this.iterm = new Terminal()

        this.canvas = document.querySelector('#sarira')
        this.canvasRect = this.canvas.getBoundingClientRect()

        this.categoryTextSize = "0.6vw"
        this.metaDataTextSize = "0.4vw"
        this.ownerVerticalSpace = 0
        this.categoryList = ["Type ", `Birthday`, `Origin`, `Owners`, `Retrieved By`, `Date Retrieved`]

        this.metaDataList = new Array(5)
        for (let i = 0; i < 6; i++) {
            this.metaDataList[i] = new Array(0)
        }

        window.addEventListener('resize', this.refreshCategory.bind(this));
        window.addEventListener('resize', this.refreshMetaData.bind(this));
    }

    initializeCategory() {
        this.updateInfo()

        for (let i = 0; i < this.categoryList.length; i++) {
            this.iterm.createText(this.categoryList[i], this.leftPosition, this.canvasRect.bottom + this.initialSpace, this.categoryTextSize)
            this.leftPosition += this.categoryList[i].length * this.space
        }
    }

    refreshCategory() {
        this.updateInfo()
        //refresh category
        for (let i = 0; i < this.categoryList.length; i++) {
            this.iterm.refreshText(this.categoryList[i], this.leftPosition, this.canvasRect.bottom + this.initialSpace)
            this.leftPosition += this.categoryList[i].length * this.space
        }
    }
    refreshMetaData() {
        this.updateInfo()

        let currentMetaData = 1
        //refresh Metadata
        for (let [horitontalIndex, category] of this.metaDataList) {
            print(this.metaDataList)
            this.initialSpace *= currentMetaData + 1
            for (let [verticalIndex, metaData] of category) {
                this.iterm.refreshText(metaData, this.leftPosition, this.canvasRect.bottom + this.initialSpace)
                this.leftPosition += this.categoryList[index].length * this.space
            }
            this.updateInfo()
        }


    }
    createMetaDataText() {
        this.updateInfo()
        let initialSpace= this.initialSpace
        if(this.metaDataList[0].length==1){
            initialSpace *= this.metaDataList[0].length + this.space/2
        }
        else{
            initialSpace += this.ownerVerticalSpace 
        }

        for (let [index, category] of this.metaDataList.entries()) {
            let ownerVerticalSpace = initialSpace
            if (index == 3) {
                for (let pastOwner of category[category.length - 1]) {
                    this.iterm.createText(pastOwner, this.leftPosition, this.canvasRect.bottom + ownerVerticalSpace, this.metaDataTextSize)
                    ownerVerticalSpace +=this.space
                }
                this.ownerVerticalSpace= ownerVerticalSpace
                
            } else {
                this.iterm.createText(category[category.length - 1], this.leftPosition, this.canvasRect.bottom +initialSpace, this.metaDataTextSize)
            }
            
            this.leftPosition += this.categoryList[index].length * this.space
        }
    }

    updateInfo() {
        this.initialSpace = window.innerWidth / 250
        this.space = window.innerWidth / 200
        this.canvasRect = this.canvas.getBoundingClientRect()
        this.leftPosition = this.canvasRect.left + this.initialSpace
    }

}