//세계
class World {
    constructor(worldSize) {
        this.worldSize = worldSize;
        this.maxParticleCount = 10000;

        //흐름(속력+방향)
        this.velMin = 0.001;

        //파티클, 라이프 초기화
        this.createParticle();
        this.createLife();

        //파티클, 라이프 그리기
        this.drawParticles();
        
        //플라스틱 넣기        
        this.createPlastic();
    }

    createParticle() {
        //생성
        this.particles = [];
        this.particlePositions = [];

        for (let i = 0; i < this.maxParticleCount; i++) {
            let p = new MicroPlastic(i, this.worldSize);

            if (i < this.maxParticleCount * 0.1){
                p.initPos(true);
                p.isActive = true;
            }

            this.particles.push(p);
            this.particlePositions.push(p.position);
        }
    }

    drawParticles() {
        // let geometry = new THREE.BufferGeometry();
        let geometry = new THREE.BufferGeometry().setFromPoints(this.particlePositions);
        let material = createParticleMaterial();

        // geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( this.maxParticleCount * 3 ), 3));
        geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( this.maxParticleCount * 3 ), 3));
        geometry.setDrawRange(0, this.maxParticleCount);

        this.particleAppearence = new THREE.Points(geometry, material);
        this.particleAppearence.position.set(0, 0, 0);
        //console.log(this.particleAppearence.geometry);

        // 카메라에 일부 메시 안잡히는 문제 https://discourse.threejs.org/t/zooming-in-camera-make-some-meshes-not-visible/3872/6
        this.particleAppearence.traverse( function( object ) {
            object.frustumCulled = false;
        } );

        this.particlePositionAttributes = this.particleAppearence.geometry.getAttribute( 'position' ).array;
        this.particleColorAttributes = this.particleAppearence.geometry.getAttribute( 'color' ).array;

        threeSystemController.addToWorldScene(this.particleAppearence);
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

        let options = {
            worldSize: this.worldSize, 
            Sarira_Material: createPointMaterial(), 
            Sarira_ConvexMaterial: createConvexMaterial()
        }

        this.lifes = [];
        this.life_user = new Life_user(options);
        this.lifes.push(this.life_user);
        this.lifes[0].createWindowBodySystem();

        for (let i = 1; i < this.lifeNum; i++) {
            if (i < 1 + this.primaryNum) {
                const l = new Life_primaryConsumer(i, options);
                this.lifes.push(l);
            } else if (i < 1 + this.primaryNum + this.secondaryNum && i >= 1 + this.primaryNum) {
                const l = new Life_secondaryConsumer(i, options);
                this.lifes.push(l);
            } else {
                const l = new Life_tertiaryConsumer(i, options);
                this.lifes.push(l);
            }
        }
    }

    createPlastic(){
        this.fileList = [];
        this.fileList.push('../models/jsonTest.json');

        this.fileData;

        this.fileIndex = 0;
        this.fileLoaded = false;

        // ==========================

        this.canAddPlastic = false;

        this.plasticOffsetPosition = new THREE.Vector3(
            MyMath.random(-this.worldSize * 0.4, this.worldSize * 0.4), 
            MyMath.random(-this.worldSize * 0.4, this.worldSize * 0.4), 
            MyMath.random(0, this.worldSize * 0.4));

        this.plasticRotation = new THREE.Vector3(
            Math.PI * MyMath.random(0, 2), 
            Math.PI * MyMath.random(0, 2), 
            Math.PI * MyMath.random(0, 2));

        this.plasticScale = 3;

        this.plasticPositions = [];
        this.plasticColors = [];
        this.activableParticles = [];

        this.loadFile();
    }

    loadFile(){
        readTextFile(
            this.fileList[this.fileIndex], 

            function(text){
            this.fileData = JSON.parse(text);
            console.log(this.fileData);
            console.log("file loaded");

            var positions = new Float32Array(this.fileData.count);
            var colors = new Float32Array(this.fileData.count);
        
            for (let i = 0; i < positions.length; i+=3) {
                let newPos = new THREE.Vector3( 
                    this.fileData.position[i + 0],
                    this.fileData.position[i + 1],
                    this.fileData.position[i + 2]);
                //console.log(newPos);

                newPos.multiplyScalar(this.plasticScale);

                let quaternion = new THREE.Quaternion();
                quaternion.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), this.plasticRotation.z );
                newPos.applyQuaternion( quaternion );

                newPos.add(this.plasticOffsetPosition);
                //console.log(newPos);

                this.plasticPositions.push(newPos);
            }
            for (let i = 0; i < colors.length; i+=3) {
                this.plasticColors.push(
                    new THREE.Color(
                        this.fileData.color[i + 0], 
                        this.fileData.color[i + 1], 
                        this.fileData.color[i + 2]));
            }

            this.fileLoaded = true;
            if (this.fileIndex < this.fileList.length) this.fileIndex++;
            },

            this
        );
    }

    addPlastic(){
        // 1. 파일 로드
        // 2. 생성할 플라스틱 파티클 갯수 확인
        // 3. isActive == false 인 파티클 갯수 확인
        // 4. 2, 3번 비교하여 2번 < 3번 이면 isActive == false인 파티클에만 위치, 색상 적용
        
        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i].isActive == false){
                this.activableParticles.push(this.particles[i]);
            }
        }

        if (this.activableParticles.length >= this.plasticPositions.length && 
            this.activableParticles.length > 0 && this.plasticPositions.length > 0){

            this.canAddPlastic = true;
            console.log("activable Particle = " + this.activableParticles.length);
            console.log("plastic Particle = " + this.plasticPositions.length);
            console.log("add plastic");
        }

        if (this.canAddPlastic == true){
            for (let i = 0; i < this.plasticPositions.length; i++) {
                this.activableParticles[i].isActive = true;
                this.activableParticles[i].setPos(this.plasticPositions[i]);
                this.activableParticles[i].setColor(this.plasticColors[i]);
            }

            this.plasticPositions = [];
            this.plasticColors = [];
            this.activableParticles = [];
            this.canAddPlastic = false;

            this.fileLoaded = false;
        }
    }

    update() {
        if (this.fileLoaded == true){
            this.addPlastic();
        }

        this.updateParticles();
        this.updateLifes();
    }

    updateParticles() {
        //const particlePos = this.particleAppearence.geometry.attributes.position.array; 
        //var particlePos = this.particleAppearence.geometry.getAttribute( 'position' ).array;
        for (let i = 0; i < this.particlePositionAttributes.length; i += 3) {
            const index = i / 3;

            this.particlePositionAttributes[i + 0] = this.particles[index].position.x;
            this.particlePositionAttributes[i + 1] = this.particles[index].position.y;
            this.particlePositionAttributes[i + 2] = this.particles[index].position.z;

            if (this.particles[index].isActive == false){
                this.particles[index].setPos( new THREE.Vector3(0,this.worldSize - 1,0) );
                continue;
            }

            let flow = new THREE.Vector3(
                MyMath.random(-this.velMin, this.velMin),
                MyMath.random(-this.velMin, this.velMin),
                MyMath.random(-this.velMin, this.velMin));

            this.particles[index].applyForce(flow);
            this.particles[index].wrap();

            this.lifes.forEach(life => {
               life.breath(this.particles[index]);
                if (life.energy < life.hungryValue) life.eat(this.particles[index]);  
            });

            this.life_user.eat(this.particles[index]);
            this.life_user.breath(this.particles[index]);
        }
        this.particleAppearence.geometry.attributes.position.needsUpdate = true; 

        // var particleColor = this.particleAppearence.geometry.getAttribute( 'color' ).array;
        for (let i = 0; i < this.particleColorAttributes.length; i += 3) {
            const index = i / 3;

            this.particleColorAttributes[i + 0] = this.particles[index].color.r;
            this.particleColorAttributes[i + 1] = this.particles[index].color.g;
            this.particleColorAttributes[i + 2] = this.particles[index].color.b;

            if (this.particles[index].isActive == false){
                this.particles[index].setColor(new THREE.Color(0,0,0));
                continue;
            }

            //파티클이 사리가 됐으면 색을 검정색으로 바꿈 (안보이게)
            
        }        
        this.particleAppearence.geometry.attributes.color.needsUpdate = true;

        //console.log(this.particleAppearence.geometry);
    }

    updateLifes() {
        for (let i = 0; i < this.lifes.length; i++) {

            this.lifes[i].lifeGo();

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
                continue;
            }

            this.lifes[i].update();

            if (this.tertiaryNum < this.maxNum_t && this.lifes[i].lifeName.includes('Carnivores') == true) {
                this.lifes[i].division(this.lifes, this);
                continue;
            }
            if (this.secondaryNum < this.maxNum_s && this.lifes[i].lifeName.includes('Herbivores') == true) {
                this.lifes[i].division(this.lifes, this);
                continue;
            }
            if (this.primaryNum < this.maxNum_p && this.lifes[i].lifeName.includes('Plankton') == true) {
                this.lifes[i].division(this.lifes, this);
                continue;
            }

            for (let j = 0; j < this.lifes.length; j++){
                this.lifes[i].pushOtherLife(this.lifes[j]);
                //this.lifes[i].eatLife(this.lifes[j]);
            }
        }

        if (this.primaryNum <= 0) {
            const l = new Life_primaryConsumer(this.lifes.length, this.worldSize, createPointMaterial(), createConvexMaterial());
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

