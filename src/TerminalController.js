class TerminalController {

    constructor() {
        this.iterm = new Terminal()

        this.canvas = document.querySelector('#sarira')
        this.canvasRect = this.canvas.getBoundingClientRect()
        this.categoryTextSize = "small"
    }

    makeCategory() {
        
        this.iterm.createText("type", this.canvasRect.left, this.canvasRect.bottom)
    }

}