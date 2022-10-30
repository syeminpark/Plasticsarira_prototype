class Life_primaryConsumer extends Life_Sarira {
    constructor(index, options, setPos){
        super(index, options.worldSize, setPos, options.Sarira_Material, options.Sarira_ConvexMaterial);
        this.options = options;
    }

    init(){
        this.velLimit = 1;

        this.size = MyMath.random(1, 3);
        this.sizeMax = MyMath.random(2, 5);

        this.noiseShape = MyMath.random(0.05, 0.5);
        this.noiseAnimSpeed = MyMath.random(0.5, 1);

        this.lifeName = 'Plankton' + String(this.index);
        this.lifespan = (this.size + this.sizeMax)*10;
    }

    division(lifes, lifeSystem){
        if (this.isReadyToDivision == true){
            this.energy -= this.size;
            this.lifespan -= this.size/2;
            
            let child = new Life_primaryConsumer(lifeSystem.lifeNum, this.options, this.position.clone());
            if (child == null) return;
            lifeSystem.primaryNum ++;
            lifeSystem.lifeNum ++;
            lifes.push(child);
            this.division_term += this.size;
            this.isReadyToDivision = false;

            console.log("create life_" + child.index);
        }
    }
}

class Life_secondaryConsumer extends Life_Sarira {
    constructor(index, options, setPos){
        super(index, options.worldSize, setPos, options.Sarira_Material, options.Sarira_ConvexMaterial);
        this.options = options;
    }

    init(){
        this.velLimit = 1.25;

        this.size = MyMath.random(2, 5);
        this.sizeMax = MyMath.random(0, 20);

        this.noiseShape = MyMath.random(0.05, 0.3);
        this.noiseAnimSpeed = MyMath.random(0.1, 0.5);

        this.lifeName = 'Herbivores' + String(this.index);
        this.lifespan = (this.size + this.sizeMax)*5;
    }

    division(lifes, lifeSystem){
        if (this.isReadyToDivision == true){
            this.energy -= this.size;
            this.lifespan -= this.size/2;
            
            let child = new Life_secondaryConsumer(lifeSystem.lifeNum, this.options, this.position.clone());
            if (child == null) return;
            lifeSystem.secondaryNum ++;
            lifeSystem.lifeNum ++;
            child.position = this.position.clone();
            lifes.push(child);
            this.division_term += this.size;
            this.isReadyToDivision = false;

            console.log("create life_" + child.index);
        }
    }
}

class Life_tertiaryConsumer extends Life_Sarira {
    constructor(index, options, setPos){
        super(index, options.worldSize, setPos, options.Sarira_Material, options.Sarira_ConvexMaterial);
        this.options = options;
    }

    init(){
        this.velLimit = 1.5;

        this.size = MyMath.random(10, 20);
        this.sizeMax = MyMath.random(15, 30);

        this.noiseShape = MyMath.random(0.01, 0.1);
        this.noiseAnimSpeed = MyMath.random(0.1, 0.3);

        this.lifeName = 'Carnivores' + String(this.index);
        this.lifespan = (this.size + this.sizeMax)*5;
    }

    division(lifes, lifeSystem){
        if (this.isReadyToDivision == true){
            this.energy -= this.size;
            this.lifespan -= this.size/2;
            
            let child = new Life_tertiaryConsumer(lifeSystem.lifeNum, this.options, this.position.clone());
            if (child == null) return;
            lifeSystem.tertiaryNum ++;
            lifeSystem.lifeNum ++;
            child.position = this.position.clone();
            lifes.push(child);
            this.division_term += this.size;
            this.isReadyToDivision = false;

            console.log("create life_" + child.index);
        }
    }
}