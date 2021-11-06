class LifeSystem{
    constructor(threeSystemController){
        this.num = 15;
        this.windowSize = 140;

        this.lifes = [];

        for (let i = 0; i < this.num; i++) {
            this.l = new Life(i, this.windowSize,threeSystemController);
            this.lifes.push(this.l);
        }
        
        this.life_user = new Life_user(threeSystemController);

        this.display();     
        
        this.userText= new UserText("Myself",threeSystemController.worldThreeSystem,document.querySelector("#world"))
        this.userText.createLabel()

    }

    update(){
        for (let i = 0; i < this.lifes.length; i++) {
            this.lifes[i].update();
        }

        this.life_user.update_user();
        this.userText.updateLabel(this.life_user.life.position)
    }

    display(){

    }
}