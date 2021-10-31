class TerminalController {

    constructor() {
        this.iterm = new Terminal()

        this.canvas = document.querySelector('#sarira')
        this.canvasRect = this.canvas.getBoundingClientRect()
        this.categoryTextSize = "x-small"

        this.categoryList = ["Type", `Date Created`,`Origin`, `Past Owners`, `Retrieved Method`, `Date Retrieved`]
        this.space=60;

    }
    initialize(){
        this.initializeCategory()
    }

    initializeCategory() {
        let bottomPosition = this.canvasRect.bottom +this.space

        for (let i = 0; i < this.categoryList.length; i++) {
           
            this.iterm.createText(this.categoryList[i], this.canvasRect.left, bottomPosition, this.categoryTextSize)
            bottomPosition+=this.space 
            
            
        }
    }



}