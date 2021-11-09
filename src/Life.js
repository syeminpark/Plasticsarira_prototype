class Life {
    constructor(index, windowSize, threeSystemController) {
        this.index = index;

        this.windowSize = windowSize;

        this.init();
        this.mass = this.size + this.sizeMax;

        this.glowAmount = 0.5;

        const { Perlin } = THREE_Noise;
        this.perlin = new Perlin(Math.random());
        
        this.isMakeSarira = false;
        this.absorbedParticles = [];
        this.sariraParticlesData = [];
        this.sariraParticles = [];
        this.sariraPosition = new THREE.Vector3();
        this.sariraType = Math.floor(random(1, 4));

        this.microPlastic_eat_maxAmount = (this.size + this.sizeMax) * 2;
        this.microPlastic_breath_maxAmount = (this.size + this.sizeMax) * 1;
        this.sariraSpeed = (this.size+this.sizeMax)*(1/1000);

        this.absorbPlasticList = [];
        this.set_absorbPlasticList();

        this.absorbPlasticNum = (this.size + this.sizeMax) * 100;

        this.isDead = false;
        this.lifespan = (this.size + this.sizeMax)*20;

        this.display(threeSystemController);
        this.noise_init();

        //======================================================
        
        this.sarira_amount;

        this.movement;

        this.division_speed;

        this.nutrients;

        this.toxicResistance;
    }

    set_absorbPlasticList(){
        const percente = this.size/7;

        if (random(0, 1) < 0.5) this.absorbPlasticList.push("Polyethylene");
        if (random(0, 1) < 0.5) this.absorbPlasticList.push("Polypropylene");
        if (random(0, 1) < percente) this.absorbPlasticList.push("Polystyrene");
        if (random(0, 1) < percente) this.absorbPlasticList.push("Polyamide");
        if (random(0, 1) < percente) this.absorbPlasticList.push("Polyester");
        if (random(0, 1) < percente) this.absorbPlasticList.push("Acrylic");
        if (random(0, 1) < percente) this.absorbPlasticList.push("Polyacetal");
        if (random(0, 1) < percente) this.absorbPlasticList.push("PolyvinylChloride");
        if (random(0, 1) < percente) this.absorbPlasticList.push("Polyurethane");
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

    update() {
        this.lifeGo();
        if (this.isDead == false){
            this.randomWalk(this.size * 0.01, 0.1);
            this.randomLook();
            this.noise_update();
            this.wrap_particles();
            this.wrap();
            this.add_MicroPlasticToBodySystem();
        }
    }

    randomWalk(acc, velLimit) {
        this.life.position.set(this.position.x, this.position.y, this.position.z);
        this.position = this.life.position;
        this.acceleration.add(new THREE.Vector3(
            random(-acc, acc),
            random(-acc, acc),
            random(-acc, acc)
        ));
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        if (this.velocity.length() > velLimit) this.velocity.multiplyScalar(0.01);
        this.acceleration.setLength(0);

        plastiSarira.bodySystemController.updateLifePosition(this.index, this.position);
    }

    randomLook() {
        this.life.rotation.set(this.angle.x, this.angle.y, this.angle.z);
        this.angleAcceleration.add(new THREE.Vector3(
            random(-0.001, 0.001),
            random(-0.001, 0.001),
            random(-0.001, 0.001)
        ));
        this.angleVelocity.add(this.angleAcceleration);
        this.angle.add(this.angleVelocity);
        if (this.angleVelocity.length() > 0.025) this.angleVelocity.multiplyScalar(0.1);
        this.angleVelocity.clampLength(0, 0.05);
        this.angleAcceleration.setLength(0);
    }

    display(threeSystemController) {
        var geometry = new THREE.SphereGeometry(this.size, 32, 32);
        // var material = new THREE.MeshNormalMaterial({
        //     transparent:true,
        //     opacity:0.8,
        //     depthTest:false,
        //     shadowSide:3
        // });
        var material = new THREE.MeshDepthMaterial({
            transparent: true,
            opacity: 0.5,
        });
        this.life = new THREE.Mesh(geometry, material);
        this.life.position.set(this.position.x, this.position.y, this.position.z);
        this.life.rotation.set(this.angle.x, this.angle.y, this.angle.z);

        threeSystemController.addToWorldScene(this.life);

        //glow
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

        //this.make_sarira();
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

        if (distance > this.windowSize) {
            this.velocity.multiplyScalar(-1);
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
            if (distance < lifeSize && distance > this.size / 2) {
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
        const distance = this.position.distanceTo(microPlastic.position);
        const lifeSize = (this.size + this.sizeMax) * 1;
        var sariraPos = this.position;
        
        var force = new THREE.Vector3().subVectors(sariraPos, microPlastic.position);

        if (microPlastic.isEaten == false && this.absorbPlasticList.includes(microPlastic.data.microType) == true && this.isDead == false) {
            //아직 먹히지 않은 상태의 파티클 끌어당기기
            if (distance < lifeSize && distance > this.size * 0.5) {
                force.multiplyScalar(0.02);
                microPlastic.applyForce(force);
            }

            //파티클 먹고 파티클 흡수 상태로 변경
            if (distance < this.size * 0.5 && this.absorbedParticles.length < this.microPlastic_eat_maxAmount) {
                this.absorbedParticles.push(microPlastic);
                microPlastic.isEaten = true;
            }
        }
    }

    breath(microPlastic) {
        const distance = this.position.distanceTo(microPlastic.position);
        const lifeSize = (this.size + this.sizeMax) * 1;
        var sariraPos = this.position;
        
        var force = new THREE.Vector3().subVectors(sariraPos, microPlastic.position);

        if (microPlastic.isEaten == false && this.absorbPlasticList.includes(microPlastic.data.microType) == true && this.isDead == false) {
            //아직 먹히지 않은 상태의 파티클 끌어당기기
            if (distance < lifeSize && distance > this.size * 0.5) {
                force.multiplyScalar(0.02);
                microPlastic.applyForce(force);
            }

            //파티클 먹고 파티클 흡수 상태로 변경
            if (distance < this.size * 0.5 && this.absorbedParticles.length < this.microPlastic_breath_maxAmount) {
                this.absorbedParticles.push(microPlastic);
                microPlastic.isEaten = true;
            }
        }
    }

    wrap_particles() {
        var sariraPos = this.position;

        //흡수된 파티클 몸안에 가둠
        for (let i = 0; i < this.absorbedParticles.length; i++) {
            this.absorbedParticles[i].wrapCenter = this.position;
            this.absorbedParticles[i].wrapSize = this.size;
            this.absorbedParticles[i].velLimit = 0.5;
            
            const distance = this.position.distanceTo(this.absorbedParticles[i].position);
            var force = new THREE.Vector3().subVectors(sariraPos, this.absorbedParticles[i].position);

            if (distance > this.size * 0.5) {
                force.multiplyScalar(0.02);
                this.absorbedParticles[i].applyForce(force);
                this.absorbedParticles[i].velocity.multiplyScalar(0.8);
            } 

            //그중에서 일정 확률로 몇몇 파티클이 사리가 되도록 함
            if (random(0, 10) < this.sariraSpeed && distance < this.size * 0.3 && 
                this.absorbedParticles[i].becomeSarira == false && this.absorbedParticles.length < this.absorbPlasticNum){

                this.absorbedParticles[i].data.setPassBy('life' + String(this.index));
                this.absorbedParticles[i].data.setAbsorbedBy(1);
                this.absorbedParticles[i].becomeSarira = true;

                this.sariraParticles.push(this.absorbedParticles[i]);
                this.sariraParticlesData.push(this.absorbedParticles[i].data.getDataList());

                this.isMakeSarira = true;
            }
        }
    }

    add_MicroPlasticToBodySystem(){
        if (this.isMakeSarira == true) {
            var data = this.sariraParticlesData[this.sariraParticlesData.length-1];
            var send_pos = new THREE.Vector3().subVectors(this.sariraParticles[this.sariraParticlesData.length-1].position, this.position);

            plastiSarira.bodySystemController.bodySystemList[this.index+1].addFloatingPlastics(send_pos, data);
            
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

    lifeGo(){
        if (this.lifespan > 0){
            if (this.absorbedParticles.length < this.absorbPlasticNum) this.lifespan -= 0.1;
            else this.lifespan -= 0.2;
        } 

        if (this.lifespan < 0.1){
            if (this.life.scale.x > 0.011){
                this.life.scale.x -= 0.01;
                this.life.scale.y -= 0.01;
                this.life.scale.z -= 0.01;
            }

            if (this.life.material.opacity > 0.01){
                this.life.material.opacity -= 0.01;
            }
            
            if (this.isDead == false){
                for (let i = 0; i < this.absorbedParticles.length; i++) {
                    this.absorbedParticles[i].wrap_init();
                }

                console.log(this.index + ' is die');
                this.isDead = true;
            }
        }
    }

    excrete(){
        
    }

    divistion() {

    }

    eatenBy() {

    }
}