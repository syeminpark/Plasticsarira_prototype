class TerminalController {

    constructor() {
        this.iterm = new Terminal()

        this.renderCanvas = document.querySelector('#c');
        
        this.canvas = document.querySelector('#sarira')
        this.canvasRect = this.canvas.getBoundingClientRect()
        this.categoryTextSize = "0.6vw"

        this.categoryList = ["Type ", `Birthday`, `Origin`, `Owners`, `Retrieved By`, `Date Retrieved`]
        
      this.initialSpace=window.screen.width/250
      this.space=window.screen.width/200

    }
    initialize() {
        this.initializeCategory()
    }

    initializeCategory() {
        let leftPosition = this.canvasRect.left + this.initialSpace
        

        for (let i = 0; i < this.categoryList.length; i++) {
            this.iterm.createText(this.categoryList[i], leftPosition, this.canvasRect.bottom + this.initialSpace , this.categoryTextSize)
       
            leftPosition +=  this.categoryList[i].length*this.space

        }
    }
    


}