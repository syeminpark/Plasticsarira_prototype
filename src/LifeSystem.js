class LifeSystem{
    constructor(threeSystemController){
        this.primaryNum = 15;
        this.secondaryNum = 8;
        this.tertiaryNum = 2;
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

    update(bodySystemController){
        for (let i = 0; i < this.lifes.length; i++) {
            if (this.lifes[i].index == 0) this.lifes[i].update_user();
            if (this.lifes[i].index >= 1) this.lifes[i].update(bodySystemController);
        }
        
        for (let i = this.lifes.length-1; i >= 0 ; i--) {
            if (this.lifes[i].isDead == true){
                this.lifes.splice(i, 1);
                console.log(i + 'delete');
            }
        }

        this.userText.updateLabel(this.life_user.life.position)
    }

    display(){

    }
}