class LifeSystem{
    constructor(threeSystemController){
        this.num = 15;
        this.windowSize = 140;

        this.lifes = [];
        this.life_user = new Life_user(threeSystemController);

        this.lifes.push(this.life_user);

        for (let i = 1; i < this.num; i++) {
            this.l = new Life(i, this.windowSize,threeSystemController);
            this.lifes.push(this.l);
        }

        this.display();     
        
        this.userText= new UserText("Myself",threeSystemController.worldThreeSystem,document.querySelector("#world"))
        this.userText.createLabel()
    }

    update(){
        this.lifes[0].update_user();
        
        for (let i = 1; i < this.lifes.length; i++) {
            this.lifes[i].update();
        }
        this.userText.updateLabel(this.life_user.life.position)
    }

    display(){

    }
}