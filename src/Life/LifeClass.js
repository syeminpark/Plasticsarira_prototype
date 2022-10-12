// 파티클 흡수하는 Life
class Life_Absorb extends Life {
    constructor(index, worldSize) {
        super(index, worldSize);

        this.setMicroPlastic();
    }

    setMicroPlastic() {
        this.absorbedParticles = [];
        this.sariraParticlesData = [];
        this.sariraParticles = [];

        this.ableToBreathPlasticList = [];
        this.set_ableToBreathPlasticList();

        this.ableToEatPlasticList = [];
        this.set_ableToEatPlasticList();

        this.absorbPlasticNum = (this.size + this.sizeMax) * 100;

        this.microPlastic_eat_maxAmount = Math.floor(MyMath.mapRange(this.mass, 0, 50, 30, 150));
        this.microPlastic_breath_maxAmount = Math.floor(MyMath.mapRange(this.mass, 0, 50, 30, 100));
    }

    update() {
        super.update();

        if (this.isDead == false) {
            this.wrapParticles();
        }
    }

    //안씀
    absorb(microPlastic) {
        const distance = this.position.distanceTo(microPlastic.position);
        const lifeSize = (this.size + this.sizeMax) * 1;
        let sariraPos = this.position;

        let force = new THREE.Vector3().subVectors(sariraPos, microPlastic.position);

        if (microPlastic.isEaten == false && this.absorbedParticles.length < this.microPlastic_maxAmount) {
            //아직 먹히지 않은 상태의 파티클 끌어당기기
            if (distance < lifeSize) {
                force.multiplyScalar(0.02);
                microPlastic.applyForce(force);
            }

            //파티클 먹고 파티클 상태 먹힌것으로 변경
            if (distance < this.size * 0.5) {
                microPlastic.data.setPassBy('life' + this.index);
                this.absorbedParticles.push(microPlastic);
                this.sariraParticlesData.push(microPlastic.data.getDataList());

                microPlastic.isEaten = true;
                this.isMakeSarira = true;
            }
        }
    }

    eat(microPlastic) {
        if (microPlastic.isEaten == false && this.ableToEatPlasticList.includes(microPlastic.data.microType) == true &&
            this.isDead == false && this.absorbedParticles.length < this.microPlastic_eat_maxAmount) {

            const distance = this.position.distanceTo(microPlastic.position);
            const lifeSize = (this.size + this.sizeMax) * 1.5;

            //아직 먹히지 않은 상태의 파티클 끌어당기기
            if (distance < lifeSize && distance > this.size * 0.45) {

                let sariraPos = this.position;
                let force = new THREE.Vector3().subVectors(sariraPos, microPlastic.position);

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
                let force = new THREE.Vector3().subVectors(this.position.clone(), microPlastic.position);

                force.multiplyScalar(0.1);
                microPlastic.applyForce(force);
                microPlastic.velocity.multiplyScalar(0.9);
            }

            //파티클 먹고 파티클 흡수 상태로 변경
            else if (distance <= this.size * 0.55 && MyMath.random(0, 1) < 0.55) {
                microPlastic.data.setAbsorbedBy(1);
                this.absorbedParticles.push(microPlastic);
                microPlastic.isEaten = true;
            }
        }
    }

    wrapParticles() {
        let sariraPos = this.position.clone();
        let sariraSpace = this.size * 0.3;

        //흡수된 파티클 몸안에 가둠
        for (let i = 0; i < this.absorbedParticles.length; i++) {
            this.absorbedParticles[i].wrapCenter = this.position;
            this.absorbedParticles[i].wrapSize = this.size * 0.7;
            this.absorbedParticles[i].velLimit = 0.25;

            let distance = this.position.distanceTo(this.absorbedParticles[i].position);
            const force = new THREE.Vector3().subVectors(sariraPos, this.absorbedParticles[i].position);
            const wrapPos = new THREE.Vector3().addVectors(sariraPos, force.setLength(this.size * 0.6));

            //if (distance < this.size*0.7) force.multiplyScalar(((distance*distance*distance)/150));
            force.multiplyScalar(((distance * distance * distance) / 900));
            this.absorbedParticles[i].applyForce(force);
            if (distance > this.size * 0.7) this.absorbedParticles[i].position = wrapPos;

            //그중에서 일정 확률로 몇몇 파티클이 사리가 되도록 함
            if (MyMath.random(0, 5) < this.sariraSpeed && distance < sariraSpace &&
                this.absorbedParticles[i].becomeSarira == false && this.absorbedParticles.length < this.absorbPlasticNum) {

                this.absorbedParticles[i].data.setPassBy('');

                this.absorbedParticles[i].becomeSarira = true;

                this.sariraParticles.push(this.absorbedParticles[i]);
                this.sariraParticlesData.push(this.absorbedParticles[i].data.getDataList());

                if (sariraSpace < this.size) sariraSpace += 0.01;
                this.isMakeSarira = true;
            }
        }
    }

    set_ableToBreathPlasticList() {
        const percente = this.size / 25;

        if (MyMath.random(0, 1) < percente * 4) this.ableToBreathPlasticList.push("Polyethylene");
        if (MyMath.random(0, 1) < percente * 3) this.ableToBreathPlasticList.push("Polypropylene");
        if (MyMath.random(0, 1) < percente * 2) this.ableToBreathPlasticList.push("Polystyrene");
        if (MyMath.random(0, 1) < percente) this.ableToBreathPlasticList.push("Polyamide");
        if (MyMath.random(0, 1) < percente) this.ableToBreathPlasticList.push("Polyester");
        if (MyMath.random(0, 1) < percente) this.ableToBreathPlasticList.push("Acrylic");
        if (MyMath.random(0, 1) < percente) this.ableToBreathPlasticList.push("Polyacetal");
        if (MyMath.random(0, 1) < percente) this.ableToBreathPlasticList.push("PolyvinylChloride");
        if (MyMath.random(0, 1) < percente) this.ableToBreathPlasticList.push("Polyurethane");
    }

    set_ableToEatPlasticList() {
        const percente = this.size / 10;

        if (MyMath.random(0, 1) < 0.5) this.ableToEatPlasticList.push("Polyethylene");
        if (MyMath.random(0, 1) < 0.5) this.ableToEatPlasticList.push("Polypropylene");
        if (MyMath.random(0, 1) < percente) this.ableToEatPlasticList.push("Polystyrene");
        if (MyMath.random(0, 1) < percente) this.ableToEatPlasticList.push("Polyamide");
        if (MyMath.random(0, 1) < percente) this.ableToEatPlasticList.push("Polyester");
        if (MyMath.random(0, 1) < percente) this.ableToEatPlasticList.push("Acrylic");
        if (MyMath.random(0, 1) < percente) this.ableToEatPlasticList.push("Polyacetal");
        if (MyMath.random(0, 1) < percente) this.ableToEatPlasticList.push("PolyvinylChloride");
        if (MyMath.random(0, 1) < percente) this.ableToEatPlasticList.push("Polyurethane");
    }
}

// 사리 만드는 Life
class Life_Sarira extends Life_Absorb {
    constructor(index, worldSize, Sarira_Material, Sarira_ConvexMaterial) {
        super(index, worldSize);

        this.bodySystem = new BodySystem(this.index);

        this.Sarira_Material = Sarira_Material;
        this.Sarira_ConvexMaterial = Sarira_ConvexMaterial;
        this.setSarira();
    }

    setSarira() {
        this.isMakeSarira = false;
        this.sariraPosition = new THREE.Vector3();
        this.sariraType = Math.floor(MyMath.random(1, 4));

        this.sariraSpeed = (this.size + this.sizeMax) * (1 / 10000);

        this.sarira_amount;
        this.toxicResistance;

        this.sarira_position;

        this.bodySystem.createBuffer(this.Sarira_Material);
        this.bodySystem.createSarira(this.Sarira_ConvexMaterial);
    }

    update(){
        super.update();

        if (this.isDead == false) {
            this.add_MicroPlasticToSarira();
            this.sarira_position = this.position.clone();
        }
        
        this.bodySystem.update();
        this.bodySystem.getLifePosition(this.sarira_position);
    }

    add_MicroPlasticToSarira() {
        if (this.isMakeSarira == true) {
            let data = this.sariraParticlesData[this.sariraParticlesData.length - 1];
            let send_pos = new THREE.Vector3().subVectors(this.sariraParticles[this.sariraParticlesData.length - 1].position, this.position);

            this.bodySystem.addFloatingPlastics(send_pos, data);

            this.isMakeSarira = false;
        }

        for (let j = 0; j < this.sariraParticles.length; j++) {
            this.sariraParticles[j].position = this.position.clone();
        }
    }

    make_sarira() {
        const sariraSize = this.size / 5;
        if (this.sariraType == 1) {
            let sariraGeometry = new THREE.SphereGeometry(
                sariraSize,
                Math.floor(MyMath.random(3, 5)),
                Math.floor(MyMath.random(2, 5)));
        } else if (this.sariraType == 2) {
            let sariraGeometry = new THREE.TetrahedronGeometry(
                sariraSize,
                Math.floor(MyMath.random(0, 5)));
        } else {
            let sariraGeometry = new THREE.CircleGeometry(
                sariraSize,
                Math.floor(MyMath.random(0, 24)),
                0,
                MyMath.random(0, 6.3));
        }

        let sariraMaterial = new THREE.MeshBasicMaterial({
            transparent: false,
            opacity: 0.5,
        });
        this.sarira = new THREE.Mesh(sariraGeometry, sariraMaterial);
        this.sarira.rotation.set(this.angle.x, this.angle.y, this.angle.z);

        this.lifeMesh.add(this.sarira);
    }
}