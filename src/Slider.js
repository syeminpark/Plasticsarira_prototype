class Slider {

    constructor() {

        this.slider = document.getElementById('mySlider')
        this.sliderRect = this.slider.getBoundingClientRect()

        this.sliderContainer =  this.sliderRect
        
        window.addEventListener('resize', this.updateSliderRect.bind(this));
    }

    isWithin(event) {
        if (event.clientX > this.sliderRect.left && event.clientY > this.sliderRect.top && event.clientY < this.sliderRect.bottom) {

            return true
        }
        return false
    }

    moveSlider(event) {

        let dist= event.clientY - this.sliderContainer.top
        this.slider.style.top =dist+"px"

    }

    updateSliderRect() {

        this.sliderRect = this.slider.getBoundingClientRect()
    }
}