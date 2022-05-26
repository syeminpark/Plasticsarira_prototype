class Life {
    constructor(index, worldSize) {
        this.index = index;

        this.worldSize = worldSize;
                
        this.init();

        this.mass = this.size + this.sizeMax;
        const spaceLimited = worldSize - this.mass;

        this.position = new THREE.Vector3(
            myMath.random(-spaceLimited, spaceLimited),
            myMath.random(-spaceLimited, spaceLimited),
            myMath.random(-spaceLimited, spaceLimited));

        if (this.position.length() > spaceLimited) this.position.setLength(spaceLimited);

        this.velocity = new THREE.Vector3(
            myMath.random(-0.1, 0.1),
            myMath.random(-0.1, 0.1),
            myMath.random(-0.1, 0.1));

        this.acceleration = new THREE.Vector3(0, 0, 0);

        this.angle = new THREE.Vector3(
            myMath.random(0, Math.PI * 2),
            myMath.random(0, Math.PI * 2),
            myMath.random(0, Math.PI * 2));
        this.angleVelocity = this.velocity.clone();
        this.angleAcceleration = this.acceleration.clone();

        this.initMetabolism();

        this.setDisplay();
        this.setNoise();
    }

    init(){ //상속할 때 다형화 용
        this.lifeName = 'life' + String(this.index);
        this.lifespan = this.mass*10;

        this.velLimit = 0.1;

        this.size = myMath.random(2, 5);
        this.sizeMax = myMath.random(0, 20);

        this.noiseShape = myMath.random(0.05, 0.3);
        this.noiseAnimSpeed = myMath.random(0.1, 0.5);
    }

    initMetabolism(){
        this.isDead = false;
        this.age = 0;

        this.isReadyToDivision = false;

        this.energy = myMath.random(this.size/2, this.size*3);
        this.hungryValue = this.size*0.7;
        
        this.division_energy = this.size;
        this.division_age = this.lifespan/3;
        this.division_term = this.size*5;
    }

    setDisplay() {
        // let material = new THREE.MeshDepthMaterial({
        //     transparent: true,
        //     opacity: 0.5,
        // });
        let material = new THREE.ShaderMaterial({
            uniforms:
            {
                "c": { type: "f", value: 1.0 },
                "p": { type: "f", value: 1.4 },
                glowColor: { type: "c", value: new THREE.Color(0xffffff) },
                viewVector: { type: "v3", value: threeSystemController.worldThreeSystem.camera.position }
            },
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent,
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending
        });
        material.transparent = true;
        let geometry = new THREE.SphereGeometry(this.size, 32, 32);

        this.lifeMesh = new THREE.Mesh(geometry, material);
        this.lifeMesh.position.set(this.position.x, this.position.y, this.position.z);
        //this.life.rotation.set(this.angle.x, this.angle.y, this.angle.z);
               
        //this.setGlow_2D();

        threeSystemController.addToWorldScene(this.lifeMesh);
    }

    setGlow_2D(){
        let glowAmount = 0.25;

        let map = new THREE.TextureLoader().load('images/glow.png')
        let spriteMaterial = new THREE.SpriteMaterial({
            map: map,
            blending: THREE.AdditiveBlending,
            opacity: glowAmount
        })
        let sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(
            ((this.size * 2) + this.sizeMax) * 2,
            ((this.size * 2) + this.sizeMax) * 2,
            1.0);
        this.lifeMesh.add(sprite);
    }

    setNoise() {
        this.clock = new THREE.Clock();
        const { Perlin } = THREE_Noise;
        this.perlin = new Perlin(Math.random());

        this.n_position = this.lifeMesh.geometry.attributes.position.clone();
        this.n_normal = this.lifeMesh.geometry.attributes.normal.clone();
        this.n_position_num = this.n_position.count;
    }

    update() {
        this.lifeGo();

        if (this.isDead == false){
            this.randomWalk();
            //this.randomLook();

            this.updateNoise();
            this.updateGlow_3D();

            this.wrapLife();
            this.eatenByOther();
        }
    }

    randomWalk() {
        this.lifeMesh.position.set(this.position.x, this.position.y, this.position.z);
        this.position = this.lifeMesh.position;

        const speed = myMath.mapRange(this.mass, 50, 0, 0.001, 0.04); 
        this.acceleration.add(new THREE.Vector3(
            myMath.random(-speed, speed),
            myMath.random(-speed, speed),
            myMath.random(-speed, speed)
        ));

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        if (this.velocity.length() > this.velLimit) this.velocity.multiplyScalar(0.1);
        this.acceleration.multiplyScalar(0);
    }

    randomLook() {
        this.lifeMesh.rotation.set(this.angle.x, this.angle.y, this.angle.z);
        this.angleAcceleration.add(new THREE.Vector3(
            myMath.random(-0.01, 0.01),
            myMath.random(-0.01, 0.01),
            myMath.random(-0.01, 0.01)
        ));
        this.angleVelocity.add(this.angleAcceleration);
        this.angle.add(this.angleVelocity);
        if (this.angleVelocity.length() > 0.025) this.angleVelocity.multiplyScalar(0.1);
        this.angleVelocity.clampLength(0, 0.05);
        this.angleAcceleration.setLength(0);
    }

    updateGlow_3D(){
        this.lifeMesh.material.uniforms.viewVector.value = 
			new THREE.Vector3().subVectors( threeSystemController.worldThreeSystem.camera.position, this.position );
    }

    updateNoise() {
        const position = this.lifeMesh.geometry.attributes.position;
        const normal = this.lifeMesh.geometry.attributes.normal;
        const elapsedTime = this.clock.getElapsedTime();

        const noise = [];
        for (let i = 0; i < this.n_position_num; i++) {
            const pos = new THREE.Vector3().fromBufferAttribute(this.n_position, i);
            const norm = new THREE.Vector3().fromBufferAttribute(this.n_normal, i);
            const newPos = pos.clone();

            pos.multiplyScalar(this.noiseShape);
            pos.x += elapsedTime * this.noiseAnimSpeed;
            const n = this.perlin.get3(pos) * this.sizeMax;

            newPos.add(norm.multiplyScalar(n));
            noise.push(newPos);
        }

        position.copyVector3sArray(noise);

        this.sariraPosition = noise[Math.floor(myMath.random(0, 1089))];

        this.lifeMesh.geometry.computeVertexNormals();
        this.lifeMesh.geometry.attributes.position.needsUpdate = true;
    }

    wrapLife() {
        const distance = this.position.length();
        if (distance > this.worldSize - this.mass/2) {
            this.velocity.multiplyScalar(-0.9);
        }
    }

    lifeGo(callback){
        if (this.age < this.lifespan) {
            this.age += 0.1;
            this.energy -= 0.001;
            if (this.division_term > 0) this.division_term -= 0.05;
        }

        if (this.age >= this.division_age && this.energy > this.division_energy && 
            this.division_term <= 0 && this.isReadyToDivision == false) this.isReadyToDivision = true;

        if (this.age > this.lifespan * 0.7) this.velLimit = (this.size+this.sizeMax) * 0.9;

        if (this.age >= this.lifespan - 0.1){
            if (this.lifeMesh.scale.x > 0.011){
                // this.velocity.add(new THREE.Vector3(
                //     myMath.random(-0.2, 0.2),
                //     myMath.random(-0.2, 0.2),
                //     myMath.random(-0.2, 0.2)));
                this.velLimit = 0.01;
                this.velocity.multiplyScalar(0.1);

                this.lifeMesh.scale.x -= 0.015;
                this.lifeMesh.scale.y -= 0.015;
                this.lifeMesh.scale.z -= 0.015;

                if(this.noiseShape < 0.5) this.noiseShape += 0.01;
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

                //make Dead alert if user 
                callback!= undefined? callback() : null;
            }
        }
    }

    division(lifes, lifeSystem) {
        if (this.isReadyToDivision == true){
            this.energy -= this.size;
            this.lifespan -= this.size/2;
            
            let child;
            if (this.lifeName.includes('Plankton') == true) {
                child = new Life_primaryConsumer(lifes.length);
                lifeSystem.primaryNum ++;

                //console.log('primaryNum' + String(lifeSystem.primaryNum));
            }
            else if (this.lifeName.includes('Herbivores') == true) {
                child = new Life_secondaryConsumer(lifes.length);
                lifeSystem.secondaryNum ++;
                //console.log('secondaryNum' + String(lifeSystem.secondaryNum));
            }
            else if (this.lifeName.includes('Carnivores') == true) {
                child = new Life_tertiaryConsumer(lifes.length);
                lifeSystem.tertiaryNum ++;
                //console.log('tertiaryNum' + String(lifeSystem.tertiaryNum));
            }
            
            if (child != null){
                child.position = this.position.clone();
                //child.energy = myMath.random(0, (this.size + this.sizeMax)/2);
                //child.lifeName = '(' + String(this.lifeName) + '\'s-child) ' + this.lifeName.replace(/[0-9]/g,"") + String(lifes.length);
                //child.lifeName = this.lifeName.replace(/[0-9]/g,"") + String(lifes.length);
                
                lifes.push(child);

                // console.log(this.lifeName + 
                //             '\n    - energy : ' + String(this.energy) + 
                //             '\n    - division_energy : ' + String(this.division_energy) +
                //             '\n    - division_term : ' + String(this.division_term) +
                //             '\n    - division_term : ' + String(this.division_term));

                //console.log(child.lifeName + ' is born');

                this.division_term += this.size;

                // console.log(this.lifeName + 
                //     ' - division_term add : ' + String(this.division_term));

                this.isReadyToDivision = false;
            }
        }
    }

    eatLife(otherLife){
        let distance = this.position.clone().distanceTo(otherLife.position);
        if (this.mass > otherLife.mass*1.5 && distance < this.size * 1.5 && otherLife.isEaten == false){

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
}

