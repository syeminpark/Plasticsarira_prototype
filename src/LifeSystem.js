class LifeSystem{
    constructor(threeSystemController){
        this.primaryNum = 10;
        this.secondaryNum = 6;
        this.tertiaryNum = 3;
        this.num = 1 + this.primaryNum + this.secondaryNum + this.tertiaryNum;

        this.windowSize = 140;

        this.lifes = [];
        this.life_user = new Life_user(threeSystemController);

        this.lifes.push(this.life_user);

        for (let i = 1; i < this.num; i++) {
            if (i < 1+this.primaryNum) {
                const l = new Life_primaryConsumer(i, this.windowSize,threeSystemController);
                this.lifes.push(l);
            } else if (i < 1+this.primaryNum+this.secondaryNum && i >= 1+this.primaryNum){
                const l = new Life_secondaryConsumer(i, this.windowSize,threeSystemController);
                this.lifes.push(l);
            } else {
                const l = new Life_tertiaryConsumer(i, this.windowSize,threeSystemController);
                this.lifes.push(l);
            }
            
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