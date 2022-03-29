class Life_primaryConsumer extends Life {
    constructor(index, windowSize, microPlastic_Material, microPlastic_ConvexMaterial){
        super(index, windowSize, microPlastic_Material, microPlastic_ConvexMaterial);
    }

    init(){
        this.position = new THREE.Vector3(
            myMath.random(-this.windowSize*0.5, this.windowSize)*0.5,
            myMath.random(-this.windowSize*0.5, this.windowSize*0.5),
            myMath.random(-this.windowSize*0.5, this.windowSize*0.5));

        if (this.position.length() > this.windowSize) this.position.setLength(this.windowSize);

        this.velocity = new THREE.Vector3(
            myMath.random(-0.1, 0.1),
            myMath.random(-0.1, 0.1),
            myMath.random(-0.1, 0.1));
        this.acceleration = new THREE.Vector3(0, 0, 0);

        this.velLimit = 1;

        this.angle = new THREE.Vector3(
            myMath.random(0, Math.PI * 2),
            myMath.random(0, Math.PI * 2),
            myMath.random(0, Math.PI * 2));
        this.angleVelocity = this.velocity.clone();
        this.angleAcceleration = this.acceleration.clone();

        this.size = myMath.random(1, 3);
        this.sizeMax = myMath.random(2, 5);

        this.noiseShape = myMath.random(0.05, 0.5);
        this.noiseAnimSpeed = myMath.random(0.5, 1);

        this.lifeName = 'Plankton' + String(this.index);
        this.lifespan = (this.size + this.sizeMax)*10;
    }
}

class Life_secondaryConsumer extends Life {
    constructor(index, windowSize, microPlastic_Material, microPlastic_ConvexMaterial){
        super(index, windowSize, microPlastic_Material, microPlastic_ConvexMaterial);
    }

    init(){
        this.position = new THREE.Vector3(
            myMath.random(-this.windowSize*0.7, this.windowSize*0.7),
            myMath.random(-this.windowSize*0.7, this.windowSize*0.7),
            myMath.random(-this.windowSize*0.7, this.windowSize*0.7));

        if (this.position.length() > this.windowSize) this.position.setLength(this.windowSize);

        this.velocity = new THREE.Vector3(
            myMath.random(-0.1, 0.1),
            myMath.random(-0.1, 0.1),
            myMath.random(-0.1, 0.1));
        this.acceleration = new THREE.Vector3(0, 0, 0);

        this.velLimit = 1.25;

        this.angle = new THREE.Vector3(
            myMath.random(0, Math.PI * 2),
            myMath.random(0, Math.PI * 2),
            myMath.random(0, Math.PI * 2));
        this.angleVelocity = this.velocity.clone();
        this.angleAcceleration = this.acceleration.clone();

        this.size = myMath.random(2, 5);
        this.sizeMax = myMath.random(0, 20);

        this.noiseShape = myMath.random(0.05, 0.3);
        this.noiseAnimSpeed = myMath.random(0.1, 0.5);

        this.lifeName = 'Herbivores' + String(this.index);
        this.lifespan = (this.size + this.sizeMax)*5;
    }
}

class Life_tertiaryConsumer extends Life {
    constructor(index, windowSize, microPlastic_Material, microPlastic_ConvexMaterial){
        super(index, windowSize, microPlastic_Material, microPlastic_ConvexMaterial);
    }

    init(){
        this.position = new THREE.Vector3(
            myMath.random(-this.windowSize*0.5, this.windowSize*0.5),
            myMath.random(-this.windowSize*0.5, this.windowSize*0.5),
            myMath.random(-this.windowSize*0.5, this.windowSize*0.5));

        if (this.position.length() > this.windowSize) this.position.setLength(this.windowSize);

        this.velocity = new THREE.Vector3(
            myMath.random(-0.1, 0.1),
            myMath.random(-0.1, 0.1),
            myMath.random(-0.1, 0.1));
        this.acceleration = new THREE.Vector3(0, 0, 0);

        this.velLimit = 1.5;

        this.angle = new THREE.Vector3(
            myMath.random(0, Math.PI * 2),
            myMath.random(0, Math.PI * 2),
            myMath.random(0, Math.PI * 2));
        this.angleVelocity = this.velocity.clone();
        this.angleAcceleration = this.acceleration.clone();

        this.size = myMath.random(10, 20);
        this.sizeMax = myMath.random(15, 30);

        this.noiseShape = myMath.random(0.01, 0.1);
        this.noiseAnimSpeed = myMath.random(0.1, 0.3);

        this.lifeName = 'Carnivores' + String(this.index);
        this.lifespan = (this.size + this.sizeMax)*5;
    }
}