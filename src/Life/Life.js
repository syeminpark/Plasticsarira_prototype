class Life {
    constructor(index, worldSize, setPos) {
        this.index = index;
        this.worldSize = worldSize;
                
        this.init();

        this.mass = this.size + this.sizeMax;
        const spaceLimited = worldSize - 50.;

        this.position = setPos || new THREE.Vector3(
            MyMath.random(-spaceLimited, spaceLimited),
            MyMath.random(-spaceLimited, spaceLimited),
            MyMath.random(-spaceLimited, spaceLimited));        

        if (this.position.length() > spaceLimited) this.position.setLength(spaceLimited);

        this.velocity = new THREE.Vector3(0, 0, 0);
        this.acceleration = new THREE.Vector3(0, 0, 0);

        this.angle = new THREE.Vector3(
            MyMath.random(0, Math.PI * 2),
            MyMath.random(0, Math.PI * 2),
            MyMath.random(0, Math.PI * 2));
        this.angleVelocity = this.velocity.clone();
        this.angleAcceleration = this.acceleration.clone();

        this.clock = new THREE.Clock();
        this.noiseSpeed = MyMath.random(0.05, 0.15);
        this.setDisplay();

        this.initMetabolism();
    }

    // ===============================================================================
    // ===============================================================================

    init(){ //상속할 때 다형화 용
        this.size = MyMath.random(2, 5);
        this.sizeMax = MyMath.random(5., 40.);

        this.lifeName = 'life' + String(this.index);
        this.lifespan = (this.size + this.sizeMax) * 10;

        this.velLimit = 0.1;
    }

    initMetabolism(){
        this.isDead = false;
        this.age = 0;

        this.isReadyToDivision = false;

        this.energy = MyMath.random(this.size/2, this.size*3);
        this.hungryValue = this.size*0.7;
        
        this.division_energy = this.size;
        this.division_age = this.lifespan/3;
        this.division_term = this.size*5;
    }

    // ===============================================================================
    // ===============================================================================

    setDisplay() {
        const noiseCount = MyMath.random(1., 100.);

        let geometry = new THREE.SphereGeometry(this.size, 32, 32);
        let material = createLifeNoiseMaterial(noiseCount, this.sizeMax);
        // let material = new THREE.MeshDepthMaterial({
        //     transparent: true,
        //     opacity: 0.5,
        // });
        material.transparent = true;

        this.lifeMesh = new THREE.Mesh(geometry, material);
        this.lifeMesh.position.set(this.position.x, this.position.y, this.position.z);

        threeSystemController.addToWorldScene(this.lifeMesh);
    }

    updateShaderMat(){
        this.updateGlow_3D();
        this.updateNoiseShader();
    }

    updateGlow_3D(){
        this.lifeMesh.material.uniforms.viewVector.value = 
			new THREE.Vector3().subVectors( threeSystemController.worldThreeSystem.camera.position, this.position );
    }

    updateNoiseShader(){
        this.lifeMesh.material.uniforms.time.value = this.noiseSpeed * this.clock.getElapsedTime();
    }

    // ===============================================================================
    // ===============================================================================

    update() {
        if (this.clock.getElapsedTime() % this.mass * 250) this.randomWalk();

        this.updateShaderMat();
        this.wrapLife();
        //this.eatenByOther();
    }

    lifeGo(callback){
        if (this.age < this.lifespan) {
            this.age += 0.1;
            this.energy -= 0.001;
            if (this.division_term > 0) this.division_term -= 0.05;
        }

        if (this.age >= this.division_age && this.energy > this.division_energy && 
            this.division_term <= 0 && this.isReadyToDivision == false) this.isReadyToDivision = true;

        if (this.age > this.lifespan * 0.7) this.velLimit = this.mass * 0.5;

        if (this.age >= this.lifespan - 0.1){
            this.die(callback);
        }
    }

    applyForce(force){
        this.lifeMesh.position.set(this.position.x, this.position.y, this.position.z);
        this.position = this.lifeMesh.position;

        this.look(force);

        this.acceleration.add(force);
        this.velocity.add(this.acceleration);
        if (this.velocity > this.velLimit) this.velocity.multiplyScalar(0.5);
        this.position.add(this.velocity);

        this.velocity.multiplyScalar(0.9);
    }

    look(dir){
        this.lifeMesh.lookAt(this.position.add(dir));
    }

    randomWalk() {
        const speed = MyMath.mapRange(this.mass, 0, 50, 0.001, 0.005); 
        this.applyForce(new THREE.Vector3(
            MyMath.random(-speed, speed),
            MyMath.random(-speed, speed),
            MyMath.random(-speed, speed)
        ));
        //console.log("life_" + this.index + " randomWalk");
    }

    die(callback){
        if (this.lifeMesh.scale.x > 0.011){
            // this.velocity.add(new THREE.Vector3(
            //     MyMath.random(-0.2, 0.2),
            //     MyMath.random(-0.2, 0.2),
            //     MyMath.random(-0.2, 0.2)));
            this.velLimit = 0.01;
            this.velocity.multiplyScalar(0.1);

            this.lifeMesh.scale.x -= 0.015;
            this.lifeMesh.scale.y -= 0.015;
            this.lifeMesh.scale.z -= 0.015;

            if(this.lifeMesh.material.uniforms.noiseCount.value < 100.) 
                this.lifeMesh.material.uniforms.noiseCount.value += 1.;
        }

        if (this.lifeMesh.material.opacity > 0.01){
            this.lifeMesh.material.opacity -= 0.01;
        }
        
        if (this.isDead == false && this.lifeMesh.scale.x <= 0.010){
            for (let i = 0; i < this.absorbedParticles.length; i++) {
                this.absorbedParticles[i].data.setPassBy(this.lifeName);
                this.absorbedParticles[i].initWrap();
            }

            //console.log(this.lifeName + ' is die');
            this.isDead = true;

            let geometry = this.lifeMesh.geometry;
            let material = this.lifeMesh.material;
            threeSystemController.removeFromWorldScene(this.lifeMesh);
            geometry.dispose();
            material.dispose();

            //make Dead alert if user 
            callback!= undefined? callback() : null;
        }
    }

    division(lifes, lifeSystem) {
        if (this.isReadyToDivision == true){
            
            this.isReadyToDivision = false;

            this.energy -= this.size;
            this.lifespan -= this.size/2;
            
            let child = new Life(lifes.length, this.worldSize, this.position.clone());
            
            if (child == null) return;
            lifeSystem.lifeNum++;
            lifes.push(child);
            this.division_term += this.size;
        }
    }

    // ===============================================================================
    // ===============================================================================

    eatLife(otherLife){
        let distance = this.position.clone().distanceTo(otherLife.position);
        if (this.size > otherLife.size*1.5 && distance < this.size * 1.5 && otherLife.isEaten == false){

            const force = new THREE.Vector3().subVectors(this.position.clone(), otherLife.position);
            const EatenLifePos = new THREE.Vector3().addVectors(this.position.clone(), force.setLength(otherLife.size));
            
            EatenLifePos.multiplyScalar(0.01);
            otherLife.acceleration.add(EatenLifePos);

            otherLife.sarira_position = EatenLifePos;
            this.absorbedParticles.concat(otherLife.absorbedParticles);
            
            this.energy += otherLife.energy;

            //if (otherLife.isEaten == false) {
                console.log(this.lifeName + ' eat ' + otherLife.lifeName);
                otherLife.isEaten = true;
            //}
        }
    }

    eatenByOther() {
        if (this.isEaten == true && this.energy > 0){
            this.energy -= 0.5;
        } 
    }

    // ===============================================================================
    // ===============================================================================

    pushOtherLife(otherLife){
        let normal = new THREE.Vector3(); 
        const relativeVelocity = new THREE.Vector3();

        normal.copy(this.position).sub(otherLife.position);
        const distance = normal.length();

        if (this.index == otherLife.index) return;

        if ( distance < (this.size + otherLife.size) * 0.4 ) {
            normal.multiplyScalar( 0.5 * distance - ((this.size + otherLife.size) * 0.4) );
            normal.multiplyScalar(0.1);

            this.position.sub( normal );
            otherLife.position.add( normal );

            normal.normalize();

            relativeVelocity.copy( this.velocity ).sub( otherLife.velocity );
            normal = normal.multiplyScalar( relativeVelocity.dot( normal ) );
            this.applyForce( normal.multiplyScalar(-0.1) );
            otherLife.applyForce( normal.multiplyScalar(0.1) );
            //console.log("life_" + this.index + " push life_" + otherLife.index);
        }
    }

    wrapLife() {
        let normal = new THREE.Vector3(0, 0, 0); 
        const relativeVelocity = new THREE.Vector3(0, 0, 0);

        normal.sub(this.position);
        const distance = this.position.length();

        if (distance > this.worldSize - (this.mass * 0.5)) {
            this.velocity.multiplyScalar(-0.9);

            normal.setLength( this.size * 0.01 );
            this.applyForce( normal );

            relativeVelocity.sub( this.velocity.multiplyScalar(0.1) );
            normal = normal.multiplyScalar( relativeVelocity.dot( normal ) );
            this.applyForce( normal );
        }
    }
}

