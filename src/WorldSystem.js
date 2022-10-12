//세계
class World {
    constructor(worldSize) {
        this.worldSize = worldSize;
        this.maxParticleCount = 100000;

        this.plastic = new PlasticSpawner();

        //흐름(속력+방향)
        this.velMin = 0.002;

        //파티클, 라이프 초기화
        this.createParticle();
        this.createLife();

        //플라스틱 넣기
        this.plastic.loadFile();
        this.addPlastic();

        //파티클, 라이프 그리기
        this.drawParticles();
    }

    updateWolrdData() {
        this.flow = new THREE.Vector3(
            MyMath.random(-this.velMin, this.velMin),
            MyMath.random(-this.velMin, this.velMin),
            MyMath.random(-this.velMin, this.velMin));
    }

    createParticle() {
        //생성
        //let plasticNum = this.worldSize * 80;
        let plasticNum = 100;
        let foodNum = this.worldSize * 40;

        this.particles = [];
        this.particlePositions = [];

        for (let i = 0; i < plasticNum; i++) {
            let p = new MicroPlastic(i, this.worldSize);
            this.particles.push(p);
            this.particlePositions.push(p.position);
        }

        // for (let i = plasticNum; i < foodNum + plasticNum; i++) {
        //     let p = new Food(i, this.worldSize);
        //     this.particles.push(p);
        //     this.particlePositions.push(p.position);
        // }
    }

    addPlastic(){
        let plasticNum = this.plastic.particleCount;
        let plasticPosArray = this.plastic.particlePosArray;

        for (let i = 0; i < plasticNum; i++) {
            let p = new MicroPlastic(this.particles.length + i, this.worldSize, plasticPosArray[i]);
            this.particles.push(p);
            this.particlePositions.push(p.position);
        }
    }

    createLife() {
        //생물 개체수 시작값
        const minNum_p = Math.floor(this.worldSize / 20);
        const minNum_s = Math.floor(this.worldSize / 40);
        const minNum_t = Math.floor(this.worldSize / 50);

        //생물 개체수 최댓값
        this.maxNum_p = Math.floor(this.worldSize / 8);
        this.maxNum_s = Math.floor(this.worldSize / 16);
        this.maxNum_t = Math.floor(this.worldSize / 32);

        this.primaryNum = minNum_p;
        this.secondaryNum = minNum_s;
        this.tertiaryNum = minNum_t;
        this.lifeNum = 1 + this.primaryNum + this.secondaryNum + this.tertiaryNum;

        let Sarira_Material = createPointMaterial();
        let Sarira_ConvexMaterial = createConvexMaterial();

        this.lifes = [];
        this.life_user = new Life_user(this.worldSize, Sarira_Material, Sarira_ConvexMaterial);
        this.lifes.push(this.life_user);
        this.lifes[0].createWindowBodySystem();

        for (let i = 1; i < this.lifeNum; i++) {
            if (i < 1 + this.primaryNum) {
                const l = new Life_primaryConsumer(i, this.worldSize, Sarira_Material, Sarira_ConvexMaterial);
                this.lifes.push(l);
            } else if (i < 1 + this.primaryNum + this.secondaryNum && i >= 1 + this.primaryNum) {
                const l = new Life_secondaryConsumer(i, this.worldSize, Sarira_Material, Sarira_ConvexMaterial);
                this.lifes.push(l);
            } else {
                const l = new Life_tertiaryConsumer(i, this.worldSize, Sarira_Material, Sarira_ConvexMaterial);
                this.lifes.push(l);
            }
        }
    }

    drawParticles() {
        let geometry = new THREE.BufferGeometry().setFromPoints(this.particlePositions);
        let material = createPointMaterial();

        this.particleAppearence = new THREE.Points(geometry, material);
        this.particleAppearence.position.set(0, 0, 0);

        threeSystemController.addToWorldScene(this.particleAppearence);
    }

    update() {
        this.updateWolrdData();

        this.updateParticles();
        this.updateLifes();
    }

    updateParticles() {
        const particlePos = this.particleAppearence.geometry.attributes.position.array; 
        // buffer attribute position array

        for (let i = 0; i < particlePos.length; i += 3) {
            const index = i / 3;

            particlePos[i + 0] = this.particles[index].position.x;
            particlePos[i + 1] = this.particles[index].position.y;
            particlePos[i + 2] = this.particles[index].position.z;

            this.particles[index].applyForce(this.flow);
            this.particles[index].wrap();

            this.lifes.forEach(life => {
               life.breath(this.particles[index]);
                if (life.energy < life.hungryValue) life.eat(this.particles[index]);  
            });

            this.life_user.eat(this.particles[index]);
            this.life_user.breath(this.particles[index]);
        }

        this.particleAppearence.geometry.attributes.position.needsUpdate = true;
    }

    updateLifes() {
        for (let i = 0; i < this.lifes.length; i++) {
            this.lifes[i].update();
            if (this.primaryNum < this.maxNum_p && this.lifes[i].lifeName.includes('Plankton') == true) this.lifes[i].division(this.lifes, this);
            if (this.secondaryNum < this.maxNum_s && this.lifes[i].lifeName.includes('Herbivores') == true) this.lifes[i].division(this.lifes, this);
            if (this.tertiaryNum < this.maxNum_t && this.lifes[i].lifeName.includes('Carnivores') == true) this.lifes[i].division(this.lifes, this);

            // for (let j = 0; j < this.lifes.length; j++){
            //     this.lifes[i].eatLife(this.lifes[j]);
            // }
        }

        for (let i = this.lifes.length - 1; i >= 0; i--) {
            if (this.lifes[i].isDead == true) {
                if (this.lifes[i].lifeName.includes('Plankton') == true) {
                    this.primaryNum--;
                    //console.log('primaryNum' + this.primaryNum);
                }
                if (this.lifes[i].lifeName.includes('Herbivores') == true) {
                    this.secondaryNum--;
                    //console.log('secondaryNum' + this.secondaryNum);
                }
                if (this.lifes[i].lifeName.includes('Carnivores') == true) {
                    this.tertiaryNum--;
                    //console.log('tertiaryNum' + this.tertiaryNum);
                }

                this.lifes.splice(i, 1);
            }
        }

        if (this.primaryNum <= 0) {
            const l = new Life_primaryConsumer(this.lifes.length, this.worldSize);
            this.lifes.push(l);
            //console.log('all primaryConsumer dead, add new');
        }
        // if (this.secondaryNum <= 0) {
        //     const l = new Life_secondaryConsumer(this.lifes.length, this.worldSize);
        //     this.lifes.push(l);
        // }
        // if (this.tertiaryNum <= 0) {
        //     const l = new Life_tertiaryConsumer(this.lifes.length, this.worldSize);
        //     this.lifes.push(l);
        // }
    }
}

