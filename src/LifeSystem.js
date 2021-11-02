class LifeSystem{
    constructor(){
        this.num = 15;
        this.windowSize = 140;

        this.lifes = [];

        for (let i = 0; i < this.num; i++) {
            this.l = new Life(i, this.windowSize);
            this.lifes.push(this.l);
        }
        
        this.life_user = new Life_user();

        this.display();
    }

    update(){
        for (let i = 0; i < this.lifes.length; i++) {
            this.lifes[i].noise_animate();
            this.lifes[i].update();
            this.lifes[i].wrap(this.windowSize);
        }

        this.life_user.noise_animate();
        this.life_user.update_position();
    }

    display(){

    }
}