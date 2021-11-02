class Slider {

    constructor() {
        this.slider = document.querySelector('#slider')
        this.sliderRect = slider.getBoundingClientRect()

        window.addEventListener('resize', this.updateSliderRect.bind(this));
    }

    isWithin(event) {
        if (event.clientX > this.sliderRect.left && event.clientY > this.sliderRect.top && event.clientY < this.sliderRect.bottom) {
            return true
        }
        return false
    }

    moveSlider() {
        this.sliderRect
    }

    updateSliderRect() {
        this.sliderRect = slider.getBoundingClientRect()
    }
}