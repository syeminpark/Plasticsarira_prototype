class Life_primaryConsumer extends Life {
    constructor(index, windowSize, threeSystemController){
        super(index, windowSize, threeSystemController);
    }

    init(){
        this.position = new THREE.Vector3(
            random(-this.windowSize, this.windowSize),
            random(-this.windowSize, this.windowSize),
            random(-this.windowSize, this.windowSize));

        if (this.position.length() > this.windowSize) this.position.setLength(this.windowSize);

        this.velocity = new THREE.Vector3(
            random(-0.01, 0.01),
            random(-0.01, 0.01),
            random(-0.01, 0.01));
        this.acceleration = new THREE.Vector3(0, 0, 0);

        this.angle = new THREE.Vector3(
            random(0, Math.PI * 2),
            random(0, Math.PI * 2),
            random(0, Math.PI * 2));
        this.angleVelocity = this.velocity.clone();
        this.angleAcceleration = this.acceleration.clone();

        this.size = random(1, 3);
        this.sizeMax = random(2, 5);

        this.noiseShape = random(0.05, 0.5);
        this.noiseAnimSpeed = random(0.5, 1);
    }
}

class Life_secondaryConsumer extends Life {
    constructor(index, windowSize, threeSystemController){
        super(index, windowSize, threeSystemController);
    }

    init(){
        this.position = new THREE.Vector3(
            random(-this.windowSize, this.windowSize),
            random(-this.windowSize, this.windowSize),
            random(-this.windowSize, this.windowSize));

        if (this.position.length() > this.windowSize) this.position.setLength(this.windowSize);

        this.velocity = new THREE.Vector3(
            random(-0.01, 0.01),
            random(-0.01, 0.01),
            random(-0.01, 0.01));
        this.acceleration = new THREE.Vector3(0, 0, 0);

        this.angle = new THREE.Vector3(
            random(0, Math.PI * 2),
            random(0, Math.PI * 2),
            random(0, Math.PI * 2));
        this.angleVelocity = this.velocity.clone();
        this.angleAcceleration = this.acceleration.clone();

        this.size = random(2, 5);
        this.sizeMax = random(0, 20);

        this.noiseShape = random(0.05, 0.3);
        this.noiseAnimSpeed = random(0.1, 0.5);
    }
}

class Life_tertiaryConsumer extends Life {
    constructor(index, windowSize, threeSystemController){
        super(index, windowSize, threeSystemController);
    }

    init(){
        this.position = new THREE.Vector3(
            random(-this.windowSize, this.windowSize),
            random(-this.windowSize, this.windowSize),
            random(-this.windowSize, this.windowSize));

        if (this.position.length() > this.windowSize) this.position.setLength(this.windowSize);

        this.velocity = new THREE.Vector3(
            random(-0.01, 0.01),
            random(-0.01, 0.01),
            random(-0.01, 0.01));
        this.acceleration = new THREE.Vector3(0, 0, 0);

        this.angle = new THREE.Vector3(
            random(0, Math.PI * 2),
            random(0, Math.PI * 2),
            random(0, Math.PI * 2));
        this.angleVelocity = this.velocity.clone();
        this.angleAcceleration = this.acceleration.clone();

        this.size = random(15, 20);
        this.sizeMax = random(20, 40);

        this.noiseShape = random(0.01, 0.1);
        this.noiseAnimSpeed = random(0.1, 0.3);
    }
}