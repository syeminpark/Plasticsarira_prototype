class Slider {

    constructor() {
        this.slider = document.querySelector('#slider')
        this.sliderRect = slider.getBoundingClientRect()
      

        window.addEventListener('resize', this.updateSliderRect.bind(this));
    }

    isWithin(event) {
        if (event.clientX > this.sliderRect.left && event.clientY > this.sliderRect.top && event.clientY < this.sliderRect.bottom) {
            this.moveSlider(event.clientY)
            return true
          
        }
        return false
    }

    moveSlider(mouseYPosition) {
       print("true")
       print(this.slider.style.top)
        constrain(this.sliderRect.top)
    }

    updateSliderRect() {
        this.sliderRect = slider.getBoundingClientRect()
    }
}