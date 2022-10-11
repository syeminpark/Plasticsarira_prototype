    class LifeSystem {
    constructor() {
        //생물 개체수 시작값
        const minNum_p = Math.floor(this.worldSize/20);
        const minNum_s = Math.floor(this.worldSize/40);
        const minNum_t = Math.floor(this.worldSize/50);

        //생물 개체수 최댓값
        this.maxNum_p = Math.floor(this.worldSize/8);
        this.maxNum_s = Math.floor(this.worldSize/16);
        this.maxNum_t = Math.floor(this.worldSize/32);

        this.primaryNum = minNum_p;
        this.secondaryNum = minNum_s;
        this.tertiaryNum = minNum_t;
        this.num = 1 + this.primaryNum + this.secondaryNum + this.tertiaryNum;

        this.microPlastic_Material = createPointMaterial();
        this.microPlastic_ConvexMaterial = createConvexMaterial();

        this.lifes = [];
        this.life_user = new Life_user(this.microPlastic_Material, this.microPlastic_ConvexMaterial);

        this.lifes.push(this.life_user);

        for (let i = 1; i < this.num; i++) {
            if (i < 1 + this.primaryNum) {
                const l = new Life_primaryConsumer(i, this.worldSize, this.microPlastic_Material, this.microPlastic_ConvexMaterial);
                this.lifes.push(l);
            } else if (i < 1 + this.primaryNum + this.secondaryNum && i >= 1 + this.primaryNum) {
                const l = new Life_secondaryConsumer(i, this.worldSize, this.microPlastic_Material, this.microPlastic_ConvexMaterial);
                this.lifes.push(l);
            } else {
                const l = new Life_tertiaryConsumer(i, this.worldSize, this.microPlastic_Material, this.microPlastic_ConvexMaterial);
                this.lifes.push(l);
            }
        }
    }

    update() {
        for (let i = 0; i < this.lifes.length; i++) {
            if (this.lifes[i].index == 0) this.lifes[i].update_user();
            if (this.lifes[i].index >= 1) {
                this.lifes[i].update();
                if (this.primaryNum < this.maxNum_p && this.lifes[i].lifeName.includes('Plankton') == true) this.lifes[i].division(this.lifes, this);
                if (this.secondaryNum < this.maxNum_s && this.lifes[i].lifeName.includes('Herbivores') == true) this.lifes[i].division(this.lifes, this);
                if (this.tertiaryNum < this.maxNum_t && this.lifes[i].lifeName.includes('Carnivores') == true) this.lifes[i].division(this.lifes, this);

                // for (let j = 0; j < this.lifes.length; j++){
                //     this.lifes[i].eatLife(this.lifes[j]);
                // }
            }
        }

        for (let i = this.lifes.length - 1; i >= 0; i--) {
            if (this.lifes[i].isDead == true) {
                if (this.lifes[i].lifeName.includes('Plankton') == true) {
                    this.primaryNum--;
                    //console.log('primaryNum' + this.primaryNum);
                }
                if (this.lifes[i].lifeName.includes('Herbivores') == true) {
                    this.secondaryNum--;
                    //console.log('secondaryNum' + this.secondaryNum);
                }
                if (this.lifes[i].lifeName.includes('Carnivores') == true) {
                    this.tertiaryNum--;
                    //console.log('tertiaryNum' + this.tertiaryNum);
                }

                this.lifes.splice(i, 1);
            }
        }

        if (this.primaryNum <= 0) {
            const l = new Life_primaryConsumer(this.lifes.length, this.worldSize);
            this.lifes.push(l);
            //console.log('all primaryConsumer dead, add new');
        }
        // if (this.secondaryNum <= 0) {
        //     const l = new Life_secondaryConsumer(this.lifes.length, this.worldSize);
        //     this.lifes.push(l);
        // }
        // if (this.tertiaryNum <= 0) {
        //     const l = new Life_tertiaryConsumer(this.lifes.length, this.worldSize);
        //     this.lifes.push(l);
        // }
    }
}

