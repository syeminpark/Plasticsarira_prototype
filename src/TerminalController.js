class TerminalController {

    constructor() {
        this.iterm = new Terminal()

        this.renderCanvas = document.querySelector('#c');

        this.canvas = document.querySelector('#sarira')
        this.canvasRect = this.canvas.getBoundingClientRect()
        this.categoryTextSize = "0.6vw"

        this.categoryList = ["Type ", `Birthday`, `Origin`, `Owners`, `Retrieved By`, `Date Retrieved`]

        this.initialSpace = window.innerWidth / 250
        this.space = window.innerWidth / 200

        window.addEventListener('resize', this.refreshText.bind(this));
    }

    initialize() {
        this.initializeCategory()
    }

    initializeCategory() {
        let leftPosition = this.canvasRect.left + this.initialSpace

        for (let i = 0; i < this.categoryList.length; i++) {
            this.iterm.createText(this.categoryList[i], leftPosition, this.canvasRect.bottom + this.initialSpace, this.categoryTextSize)
            leftPosition += this.categoryList[i].length * this.space
        }
    }
    refreshText() {
        this.canvasRect = this.canvas.getBoundingClientRect()
        this.initialSpace = window.innerWidth / 250
        this.space = window.innerWidth / 200
        let leftPosition = this.canvasRect.left + this.initialSpace

        for (let i = 0; i < this.categoryList.length; i++) {
            this.iterm.refreshText(this.categoryList[i], leftPosition, this.canvasRect.bottom + this.initialSpace)
            leftPosition += this.categoryList[i].length * this.space
        }

    }




}