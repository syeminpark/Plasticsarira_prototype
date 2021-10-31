class Life{
    constructor(index, windowSize){
        const { Perlin } = THREE_Noise;
        this.perlin = new Perlin(Math.random());

        this.index = index;

        this.position = new THREE.Vector3(
            random(-windowSize, windowSize), 
            random(-windowSize, windowSize), 
            random(-windowSize, windowSize));

        if (this.position.length() > windowSize) this.position.setLength(windowSize);
        
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

        this.size = random(0.001, 7);
        this.sizeMax = random(0.001, 17);

        this.noiseShape = (0.05, 0.18);
        this.noiseAnimSpeed = random(0.1, 0.5);

        this.sariraPosition = new THREE.Vector3();
        
        this.movement;

        this.lifespan;

        this.division_speed;

        this.nutrients;

        this.microPlastic_amount;
        this.sarira_amount;

        this.sarira_makingSpeed;

        this.toxicResistance;
        
        this.display();
        this.noise_set();
    }

    update(){
        this.life.position.set(this.position.x, this.position.y, this.position.z);
        this.acceleration.add(new THREE.Vector3(
            random(-0.01, 0.01),
            random(-0.01, 0.01),
            random(-0.01, 0.01)
            ));
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        if(this.velocity.length() > 0.2) this.velocity.multiplyScalar(0.1);
        this.velocity.clampLength(0, 0.5);
        this.acceleration.setLength(0);

        this.life.rotation.set(this.angle.x, this.angle.y, this.angle.z);
        this.angleAcceleration.add(new THREE.Vector3(
            random(-0.001, 0.001),
            random(-0.001, 0.001),
            random(-0.001, 0.001)
            ));
        this.angleVelocity.add(this.angleAcceleration);
        this.angle.add(this.angleVelocity);
        if(this.angleVelocity.length() > 0.025) this.angleVelocity.multiplyScalar(0.1);
        this.angleVelocity.clampLength(0, 0.05);
        this.angleAcceleration.setLength(0);
    }

    display(){
        var geometry = new THREE.SphereGeometry(this.size, 32, 32);
        // var material = new THREE.MeshNormalMaterial({
        //     transparent:true,
        //     opacity:0.8,
        //     depthTest:false,
        //     shadowSide:3
        // });
        var material = new THREE.MeshDepthMaterial({
            transparent:true,
            opacity:0.5,
        });
        this.life = new THREE.Mesh(geometry, material);
        this.life.position.set(this.position.x, this.position.y, this.position.z);

        threeSystemController.addToWorldScene(this.life);

        //glow
        var map = new THREE.TextureLoader().load('images/glow.png')
        var spriteMaterial = new THREE.SpriteMaterial({
            map: map,
            blending:THREE.AdditiveBlending
        })
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(
            ((this.size*2) + this.sizeMax)*2, 
            ((this.size*2) + this.sizeMax)*2, 
            1.0);
        this.life.add(sprite);
    }

    noise_set(){
        this.n_position = this.life.geometry.attributes.position.clone();
        this.n_normal = this.life.geometry.attributes.normal.clone();
        this.n_position_num = this.n_position.count;
        
        this.clock = new THREE.Clock();
    }

    noise_animate(){
        const position = this.life.geometry.attributes.position;
        const normal = this.life.geometry.attributes.normal;
        const elapsedTime = this.clock.getElapsedTime();

        const noise = [];
        for (let i = 0; i < this.n_position_num; i++) {
            const pos = new THREE.Vector3().fromBufferAttribute(this.n_position,i);
            const norm = new THREE.Vector3().fromBufferAttribute(this.n_normal,i);
            const newPos = pos.clone();

            pos.multiplyScalar(this.noiseShape);
            pos.x += elapsedTime * this.noiseAnimSpeed;
            const n = this.perlin.get3(pos) * this.sizeMax;

            newPos.add(norm.multiplyScalar(n));

            noise.push(newPos);
        }

        position.copyVector3sArray(noise);

        this.sariraPosition = noise[Math.floor(random(0, 1089))];

        this.life.geometry.computeVertexNormals();
        this.life.geometry.attributes.position.needsUpdate = true;
    }

    wrap(size){
        const distance = this.position.length();

        if (distance > size){
            this.velocity.multiplyScalar(-1);
        } 
    }
    
    eat(microPlastic){
        const distance = this.position.distanceTo(microPlastic.position);
        const lifeSize = this.sizeMax;
        var sariraPos = new THREE.Vector3().addVectors(
            this.position, 
            this.sariraPosition.setLength(this.size*0.5));

        if (distance < lifeSize && microPlastic.isEaten == false){
            
            var force = new THREE.Vector3().subVectors(sariraPos, microPlastic.position);

            force.setLength(0.1); //0.1
            microPlastic.applyForce(force);
            microPlastic.eaten_becomeSarira();
        }
    }

    breath(){

    }

    divistion(){

    }

    make_sarira(){

    }

    eaten(){

    }
}