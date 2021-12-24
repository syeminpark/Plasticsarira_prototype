class Life {
    constructor(index, windowSize, microPlastic_Material, microPlastic_ConvexMaterial) {
        this.index = index;

        this.windowSize = windowSize;

        this.init();

        this.mass = this.size + this.sizeMax;

        this.glowAmount = 0.25;

        const { Perlin } = THREE_Noise;
        this.perlin = new Perlin(Math.random());
        
        this.isMakeSarira = false;
        this.absorbedParticles = [];
        this.sariraParticlesData = [];
        this.sariraParticles = [];
        this.sariraPosition = new THREE.Vector3();
        this.sariraType = Math.floor(random(1, 4));

        this.microPlastic_eat_maxAmount = Math.floor(mapRange(this.mass, 0, 50, 30, 150));
        this.microPlastic_breath_maxAmount = Math.floor(mapRange(this.mass, 0, 50, 30, 100));
        this.sariraSpeed = (this.size+this.sizeMax)*(1/10000);

        this.ableToBreathPlasticList = [];
        this.set_ableToBreathPlasticList();
        this.ableToEatPlasticList = [];
        this.set_ableToEatPlasticList();

        this.absorbPlasticNum = (this.size + this.sizeMax) * 100;

        this.isDead = false;
        this.age = 0;

        this.display();
        this.noise_init();

        //======================================================
        
        this.isReadyToDivision = false;

        this.energy = random(this.size/2, this.size*3);
        this.hungryValue = this.size*0.7;
        
        this.division_energy = this.size;
        this.division_age = this.lifespan/3;
        this.division_term = this.size*5;

        //======================================================

        this.sarira_amount;
        this.toxicResistance;

        this.microPlastic_Material = microPlastic_Material;
        this.microPlastic_ConvexMaterial = microPlastic_ConvexMaterial;

        this.sarira_position;
        this.createBodySystem();
    }

    init(){
        this.position = new THREE.Vector3(
            random(-this.windowSize, this.windowSize),
            random(-this.windowSize, this.windowSize),
            random(-this.windowSize, this.windowSize));

        if (this.position.length() > this.windowSize) this.position.setLength(this.windowSize);

        this.velocity = new THREE.Vector3(
            random(-0.1, 0.1),
            random(-0.1, 0.1),
            random(-0.1, 0.1));

        this.acceleration = new THREE.Vector3(0, 0, 0);

        this.velLimit = 0.1;

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

        this.lifeName = 'life' + String(this.index);
        this.lifespan = (this.size + this.sizeMax)*10;
    }

    update() {
        this.lifeGo();

        if (this.isDead == false){
            this.randomWalk();
            //this.randomLook();

            this.noise_update();
            this.glow_shader_update();

            this.wrap_particles();
            this.wrap();
            this.add_MicroPlasticToBodySystem();
            this.eatenByOther();
            this.sarira_position = this.position.clone();
        }
        
        this.bodySystem.update();
        this.bodySystem.getLifePosition(this.sarira_position);
     
    }

    randomWalk() {
        this.life.position.set(this.position.x, this.position.y, this.position.z);
        this.position = this.life.position;

        const speed = mapRange(this.mass, 50, 0, 0.001, 0.04); 
        this.acceleration.add(new THREE.Vector3(
            random(-speed, speed),
            random(-speed, speed),
            random(-speed, speed)
        ));

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        if (this.velocity.length() > this.velLimit) this.velocity.multiplyScalar(0.1);
        this.acceleration.multiplyScalar(0);
    }

    randomLook() {
        this.life.rotation.set(this.angle.x, this.angle.y, this.angle.z);
        this.angleAcceleration.add(new THREE.Vector3(
            random(-0.01, 0.01),
            random(-0.01, 0.01),
            random(-0.01, 0.01)
        ));
        this.angleVelocity.add(this.angleAcceleration);
        this.angle.add(this.angleVelocity);
        if (this.angleVelocity.length() > 0.025) this.angleVelocity.multiplyScalar(0.1);
        this.angleVelocity.clampLength(0, 0.05);
        this.angleAcceleration.setLength(0);
    }

    display() {
        var geometry = new THREE.SphereGeometry(this.size, 32, 32);

        // var material = new THREE.MeshDepthMaterial({
        //     transparent: true,
        //     opacity: 0.5,
        // });
        var material = new THREE.ShaderMaterial({
            uniforms: 
            { 
                "c":   { type: "f", value: 1.0 },
                "p":   { type: "f", value: 1.4 },
                glowColor: { type: "c", value: new THREE.Color(0xffffff) },
                viewVector: { type: "v3", value: threeSystemController.worldThreeSystem.camera.position }
            },
            vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
            fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true

        }   );

        this.life = new THREE.Mesh(geometry, material);
        this.life.position.set(this.position.x, this.position.y, this.position.z);
        //this.life.rotation.set(this.angle.x, this.angle.y, this.angle.z);

        threeSystemController.addToWorldScene(this.life);

        this.glow_sprite();
    }

    glow_sprite(){
        var map = new THREE.TextureLoader().load('images/glow.png')
        var spriteMaterial = new THREE.SpriteMaterial({
            map: map,
            blending: THREE.AdditiveBlending,
            opacity: this.glowAmount
        })
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(
            ((this.size * 2) + this.sizeMax) * 2,
            ((this.size * 2) + this.sizeMax) * 2,
            1.0);
        this.life.add(sprite);
    }

    glow_shader_update(){
        this.life.material.uniforms.viewVector.value = 
			new THREE.Vector3().subVectors( threeSystemController.worldThreeSystem.camera.position, this.position );
    }

    createBodySystem(){
        this.bodySystem = new BodySystem(threeSystemController.worldThreeSystem, this.index);
        this.bodySystem.createBuffer(this.microPlastic_Material);
        this.bodySystem.createSarira(this.microPlastic_ConvexMaterial);
    }

    noise_init() {
        this.n_position = this.life.geometry.attributes.position.clone();
        this.n_normal = this.life.geometry.attributes.normal.clone();
        this.n_position_num = this.n_position.count;

        this.clock = new THREE.Clock();
    }

    noise_update() {
        const position = this.life.geometry.attributes.position;
        const normal = this.life.geometry.attributes.normal;
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

        this.sariraPosition = noise[Math.floor(random(0, 1089))];

        this.life.geometry.computeVertexNormals();
        this.life.geometry.attributes.position.needsUpdate = true;
    }

    wrap() {
        const distance = this.position.length();

        if (distance > this.windowSize - this.mass/2) {
            this.velocity.multiplyScalar(-0.9);
        }
    }

    //안씀
    absorb(microPlastic) {
        const distance = this.position.distanceTo(microPlastic.position);
        const lifeSize = (this.size + this.sizeMax) * 1;
        var sariraPos = this.position;

        var force = new THREE.Vector3().subVectors(sariraPos, microPlastic.position);

        if (microPlastic.isEaten == false && this.absorbedParticles.length < this.microPlastic_maxAmount) {
            //아직 먹히지 않은 상태의 파티클 끌어당기기
            if (distance < lifeSize) {
                force.multiplyScalar(0.02);
                microPlastic.applyForce(force);
            }

            //파티클 먹고 파티클 상태 먹힌것으로 변경
            if (distance < this.size * 0.5) {
                microPlastic.data.setPassBy('life'+this.index);
                this.absorbedParticles.push(microPlastic);
                this.sariraParticlesData.push(microPlastic.data.getDataList());
   
                microPlastic.isEaten = true;
                this.isMakeSarira = true;
            }
        }
    }

    eat(microPlastic){
        if (microPlastic.isEaten == false && this.ableToEatPlasticList.includes(microPlastic.data.microType) == true && 
            this.isDead == false && this.absorbedParticles.length < this.microPlastic_eat_maxAmount) {

                const distance = this.position.distanceTo(microPlastic.position);
                const lifeSize = (this.size + this.sizeMax) * 1.5;
                
            //아직 먹히지 않은 상태의 파티클 끌어당기기
            if (distance < lifeSize && distance > this.size * 0.45) {

                var sariraPos = this.position;
                var force = new THREE.Vector3().subVectors(sariraPos, microPlastic.position);

                force.multiplyScalar(0.1);
                microPlastic.applyForce(force);
                microPlastic.velocity.multiplyScalar(0.9);
            }

            //파티클 먹고 파티클 흡수 상태로 변경
           else if (distance <= this.size * 0.45) {
                microPlastic.data.setAbsorbedBy(1);
                this.absorbedParticles.push(microPlastic);
                this.energy += 0.1;
                microPlastic.isEaten = true;
            }
        }
    }

    breath(microPlastic) {
        //아직 먹히지 않은 상태의 파티클 끌어당기기
        if (microPlastic.isEaten == false && this.ableToBreathPlasticList.includes(microPlastic.data.microType) == true && 
            this.isDead == false && this.absorbedParticles.length < this.microPlastic_breath_maxAmount) {
                const distance = this.position.distanceTo(microPlastic.position);
                const lifeSize = (this.size + this.sizeMax) * 1;

            if (distance < lifeSize && distance > this.size * 0.55) {
                var force = new THREE.Vector3().subVectors(this.position.clone(), microPlastic.position); 

                force.multiplyScalar(0.1);
                microPlastic.applyForce(force);
                microPlastic.velocity.multiplyScalar(0.9);
            }

            //파티클 먹고 파티클 흡수 상태로 변경
             else if (distance <= this.size * 0.55 && random(0, 1) < 0.55) {
                microPlastic.data.setAbsorbedBy(1);
                this.absorbedParticles.push(microPlastic);
                microPlastic.isEaten = true;
            }
        }
    }

    wrap_particles() {
        var sariraPos = this.position.clone();
        var sariraSpace = this.size * 0.3;

        //흡수된 파티클 몸안에 가둠
        for (let i = 0; i < this.absorbedParticles.length; i++) {
            this.absorbedParticles[i].wrapCenter = this.position;
            this.absorbedParticles[i].wrapSize = this.size/2;
            this.absorbedParticles[i].velLimit = 0.25;
            
            var distance = this.position.distanceTo(this.absorbedParticles[i].position);
            const force = new THREE.Vector3().subVectors(sariraPos, this.absorbedParticles[i].position);
            const wrapPos = new THREE.Vector3().addVectors(sariraPos, force.setLength(this.size * 0.5));
            
            //if (distance < this.size*0.7) force.multiplyScalar(((distance*distance*distance)/150));
            force.multiplyScalar(((distance*distance*distance)/900));
            this.absorbedParticles[i].applyForce(force);

            //그중에서 일정 확률로 몇몇 파티클이 사리가 되도록 함
            if (random(0, 5) < this.sariraSpeed && distance < sariraSpace && 
                this.absorbedParticles[i].becomeSarira == false && this.absorbedParticles.length < this.absorbPlasticNum){

                this.absorbedParticles[i].data.setPassBy('');

                this.absorbedParticles[i].becomeSarira = true;

                this.sariraParticles.push(this.absorbedParticles[i]);
                this.sariraParticlesData.push(this.absorbedParticles[i].data.getDataList());
                
                if (sariraSpace < this.size) sariraSpace += 0.01;
                this.isMakeSarira = true;
            }
        }
    }

    add_MicroPlasticToBodySystem(){
        if (this.isMakeSarira == true) {
            var data = this.sariraParticlesData[this.sariraParticlesData.length-1];
            var send_pos = new THREE.Vector3().subVectors(this.sariraParticles[this.sariraParticlesData.length-1].position, this.position);
            //print(data)          
            this.bodySystem.addFloatingPlastics(send_pos, data);
            
            this.isMakeSarira = false;
        }

        for (let j = 0; j < this.sariraParticles.length; j++) {
            this.sariraParticles[j].position = this.position.clone();
        }
    }

    make_sarira() {
        const sariraSize = this.size/5;
        if (this.sariraType == 1) {
            var sariraGeometry = new THREE.SphereGeometry(
                sariraSize, 
                Math.floor(random(3, 5)), 
                Math.floor(random(2, 5)));
        } else if (this.sariraType == 2){
            var sariraGeometry = new THREE.TetrahedronGeometry(
                sariraSize, 
                Math.floor(random(0, 5)));
        } else {
            var sariraGeometry = new THREE.CircleGeometry(
                sariraSize, 
                Math.floor(random(0, 24)),
                0,
                random(0, 6.3));
        }
        
        var sariraMaterial = new THREE.MeshBasicMaterial({
            transparent: false,
            opacity: 0.5,
        });
        this.sarira = new THREE.Mesh(sariraGeometry, sariraMaterial);
        this.sarira.rotation.set(this.angle.x, this.angle.y, this.angle.z);

        this.life.add(this.sarira);
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
            if (this.life.scale.x > 0.011){
                // this.velocity.add(new THREE.Vector3(
                //     random(-0.2, 0.2),
                //     random(-0.2, 0.2),
                //     random(-0.2, 0.2)));
                this.velLimit = 0.01;
                this.velocity.multiplyScalar(0.1);

                this.life.scale.x -= 0.015;
                this.life.scale.y -= 0.015;
                this.life.scale.z -= 0.015;

                if(this.noiseShape < 0.5) this.noiseShape += 0.01;
            }

            if (this.life.material.opacity > 0.01){
                this.life.material.opacity -= 0.01;
            }
            
            if (this.isDead == false && this.life.scale.x <= 0.010){
                for (let i = 0; i < this.absorbedParticles.length; i++) {
                    this.absorbedParticles[i].data.setPassBy(this.lifeName);
                    this.absorbedParticles[i].wrap_init();
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
            
            var child;
            if (this.lifeName.includes('Plankton') == true) {
                child = new Life_primaryConsumer(lifes.length, this.windowSize, this.microPlastic_Material, this.microPlastic_ConvexMaterial);
                lifeSystem.primaryNum ++;

                //console.log('primaryNum' + String(lifeSystem.primaryNum));
            }
            else if (this.lifeName.includes('Herbivores') == true) {
                child = new Life_secondaryConsumer(lifes.length, this.windowSize, this.microPlastic_Material, this.microPlastic_ConvexMaterial);
                lifeSystem.secondaryNum ++;
                //console.log('secondaryNum' + String(lifeSystem.secondaryNum));
            }
            else if (this.lifeName.includes('Carnivores') == true) {
                child = new Life_tertiaryConsumer(lifes.length, this.windowSize, this.microPlastic_Material, this.microPlastic_ConvexMaterial);
                lifeSystem.tertiaryNum ++;
                //console.log('tertiaryNum' + String(lifeSystem.tertiaryNum));
            }
            
            if (child != null){
                child.position = this.position.clone();
                //child.energy = random(0, (this.size + this.sizeMax)/2);
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
        var distance = this.position.clone().distanceTo(otherLife.position);
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

    set_ableToBreathPlasticList(){
        const percente = this.size / 25;

        if (random(0, 1) < percente * 4) this.ableToBreathPlasticList.push("Polyethylene");
        if (random(0, 1) < percente * 3) this.ableToBreathPlasticList.push("Polypropylene");
        if (random(0, 1) < percente * 2) this.ableToBreathPlasticList.push("Polystyrene");
        if (random(0, 1) < percente) this.ableToBreathPlasticList.push("Polyamide");
        if (random(0, 1) < percente) this.ableToBreathPlasticList.push("Polyester");
        if (random(0, 1) < percente) this.ableToBreathPlasticList.push("Acrylic");
        if (random(0, 1) < percente) this.ableToBreathPlasticList.push("Polyacetal");
        if (random(0, 1) < percente) this.ableToBreathPlasticList.push("PolyvinylChloride");
        if (random(0, 1) < percente) this.ableToBreathPlasticList.push("Polyurethane");
    }

    set_ableToEatPlasticList(){
        const percente = this.size / 10;

        if (random(0, 1) < 0.5) this.ableToEatPlasticList.push("Polyethylene");
        if (random(0, 1) < 0.5) this.ableToEatPlasticList.push("Polypropylene");
        if (random(0, 1) < percente) this.ableToEatPlasticList.push("Polystyrene");
        if (random(0, 1) < percente) this.ableToEatPlasticList.push("Polyamide");
        if (random(0, 1) < percente) this.ableToEatPlasticList.push("Polyester");
        if (random(0, 1) < percente) this.ableToEatPlasticList.push("Acrylic");
        if (random(0, 1) < percente) this.ableToEatPlasticList.push("Polyacetal");
        if (random(0, 1) < percente) this.ableToEatPlasticList.push("PolyvinylChloride");
        if (random(0, 1) < percente) this.ableToEatPlasticList.push("Polyurethane");
    }
}
