class LifeSystem{
    constructor(){
        this.num = 5;
        this.windowSize = 50;

        this.lifes = [];

        for (let i = 0; i < this.num; i++) {
            this.l = new Life(i, this.windowSize);
            this.lifes.push(this.l);
        }

        this.display();
    }

    update(){
        for (let i = 0; i < this.lifes.length; i++) {
            this.lifes[i].noise_animate();
            this.lifes[i].update();
            this.lifes[i].wrap(this.windowSize);
        }
    }

    display(){

    }
}