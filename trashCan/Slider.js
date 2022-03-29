class Slider {

    constructor() {

        this.mouseYPosition = 0
        this.newMouseYPosition = 0
        this.overflowLength=0

        this.sliderElement = document.getElementById('mySlider')
        this.sliderRect = this.sliderElement.getBoundingClientRect()
        this.sliderBoundary = this.sliderRect

        this.sliderElement.onmousedown = this.dragMouseDown.bind(this)
        
    }

    dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        this.mouseYPosition = e.clientY;
        
        //stop movving when elements by disassigning
        document.onmouseup = this.closeDragElement.bind(this)
        // 1 check= if clicked on. theen activate mouseMoved
        document.onmousemove = this.elementDrag.bind(this)
    }

    elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        this.mouseYPositionDifference = this.mouseYPosition - e.clientY;
        
        this.mouseYPosition = e.clientY;
        let offset = this.sliderElement.offsetTop - this.mouseYPositionDifference
        // set the element's new position:
        let constrainedOffset = myMath.constrain(offset, this.sliderBoundary.top, window.inner - this.sliderRect.height)
        this.sliderElement.style.top = constrainedOffset+ "px";
    }

    closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

    adjustSize(metaDataLength) {
        this.sliderRect = this.sliderElement.getBoundingClientRect()
       
        if (myMath.vhToPx(metaDataLength) > this.sliderBoundary.bottom  && this.sliderRect.height>10) {
            this.sliderElement.style.height = myMath.pxToVh((this.sliderBoundary.height - (metaDataLength-this.overflowLength))) + "vh"
        }
        else{
            this.overflowLength=metaDataLength
        }
    }

    


}