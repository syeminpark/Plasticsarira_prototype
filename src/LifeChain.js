class Life_primaryConsumer extends Life_Sarira {
    constructor(index, worldSize, Sarira_Material, Sarira_ConvexMaterial){
        super(index, worldSize, Sarira_Material, Sarira_ConvexMaterial);
    }

    init(){
        this.velLimit = 1;

        this.size = myMath.random(1, 3);
        this.sizeMax = myMath.random(2, 5);

        this.noiseShape = myMath.random(0.05, 0.5);
        this.noiseAnimSpeed = myMath.random(0.5, 1);

        this.lifeName = 'Plankton' + String(this.index);
        this.lifespan = (this.size + this.sizeMax)*10;
    }
}

class Life_secondaryConsumer extends Life_Sarira {
    constructor(index, worldSize, Sarira_Material, Sarira_ConvexMaterial){
        super(index, worldSize, Sarira_Material, Sarira_ConvexMaterial);
    }

    init(){
        this.velLimit = 1.25;

        this.size = myMath.random(2, 5);
        this.sizeMax = myMath.random(0, 20);

        this.noiseShape = myMath.random(0.05, 0.3);
        this.noiseAnimSpeed = myMath.random(0.1, 0.5);

        this.lifeName = 'Herbivores' + String(this.index);
        this.lifespan = (this.size + this.sizeMax)*5;
    }
}

class Life_tertiaryConsumer extends Life_Sarira {
    constructor(index, worldSize, Sarira_Material, Sarira_ConvexMaterial){
        super(index, worldSize, Sarira_Material, Sarira_ConvexMaterial);
    }

    init(){
        this.velLimit = 1.5;

        this.size = myMath.random(10, 20);
        this.sizeMax = myMath.random(15, 30);

        this.noiseShape = myMath.random(0.01, 0.1);
        this.noiseAnimSpeed = myMath.random(0.1, 0.3);

        this.lifeName = 'Carnivores' + String(this.index);
        this.lifespan = (this.size + this.sizeMax)*5;
    }
}