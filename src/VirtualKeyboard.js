class VirtualKeyboard {
    constructor() {

        createDomElement("div", false, "buttonInput", null, document.body)
        this.element=  document.getElementById("buttonInput")
  

        const Keyboard = window.SimpleKeyboard.default;
        const myKeyboard = new Keyboard({
            onKeyPress: (function( button ) {
                this.element.innerHTML = button
                console.log(this.element.innerHTML)
            }).bind(this),
            onKeyReleased: (function(){
                this.element.innerHTML = null;
                console.log(this.element.innerHTML)
            }).bind(this),
            theme: "hg-theme-default myTheme1",
            layout: {
                'default': [
                    ' W ',
                    'A S D',
                    ' Z '
                ]
            }
        });

    }

    getKeyValue(){
        return this.element.innerHTML
    }
}


