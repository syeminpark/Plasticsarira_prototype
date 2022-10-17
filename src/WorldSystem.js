//세계
class World {
    constructor(worldSize) {
        this.worldSize = worldSize;
        this.maxParticleCount = 1000;

        //흐름(속력+방향)
        this.velMin = 0.002;

        //파티클, 라이프 초기화
        this.createParticle();
        this.createLife();

        //파티클, 라이프 그리기
        this.drawParticles();
        
        //플라스틱 넣기
        this.loader_gltf = new THREE.GLTFLoader();
        //this.addPlastic();
    }

    createParticle() {
        //생성
        this.particles = [];
        this.particlePositions = [];

        for (let i = 0; i < this.maxParticleCount; i++) {
            let p = new MicroPlastic(i, this.worldSize);
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
        // let geometry = new THREE.BufferGeometry();
        let geometry = new THREE.BufferGeometry().setFromPoints(this.particlePositions);
        // geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( this.maxParticleCount * 3 ), 3));
        geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( this.maxParticleCount * 3 ), 3));
        geometry.setDrawRange(0, this.maxParticleCount);

        let material = createParticleMaterial();

        this.particleAppearence = new THREE.Points(geometry, material);
        this.particleAppearence.position.set(0, 0, 0);
        console.log(this.particleAppearence.geometry);

        threeSystemController.addToWorldScene(this.particleAppearence);
    }

    update() {
        this.updateWolrdData();

        this.updateParticles();
        this.updateLifes();
    }

    addPlastic(){
        // 1. 파일 로드
        // 2. 생성할 파티클 갯수 확인
        // 3. isActive == false 인 파티클 갯수 확인
        // 4. 2, 3번 비교하여 2 < 3 이면 isActive == false인 파티클에만 위치, 색상 적용
        
        let canAddPlastic = false;

        let plasticPos_arr = [];
        let plasticColor_arr = [];
        let activableParticle = [];

        this.loader_gltf.load(
            // resource URL
            '../models/plasticTest.gltf',
            // called when the resource is loaded
            function ( gltf ) {

                gltf.scene.traverse( function ( child ) {
                    if ( child.isObject3D ) {
                        //child.material.envMap = envMap;
                        //Setting the buffer geometry

                        //child.geometry;
                        console.log(child);
                        if (child.geometry != null){
                            let posAttribute = child.geometry.getAttribute( 'position' ).array;
                            for (let i = 0; i < posAttribute.length; i+=3) {
                                plasticPos_arr.push(
                                    new THREE.Vector3(
                                        posAttribute[i + 0], 
                                        posAttribute[i + 1], 
                                        posAttribute[i + 2]));
                            }
                            
                            let colorAttribute = child.geometry.getAttribute( 'color' ).array;
                            for (let i = 0; i < colorAttribute.length; i+=3) {
                                plasticColor_arr.push(
                                    new THREE.Color(
                                        colorAttribute[i + 0], 
                                        colorAttribute[i + 1], 
                                        colorAttribute[i + 2]));
                            }
                        }
                    }
                } );

                for (let i = 0; i < this.particles.length; i++) {
                    if (this.particles[i].isActive){
                        activableParticle.push(this.particles[i]);
                    }
                }

                if (activableParticleCount >= plasticPos_arr.length){
                    canAddPlastic = true;
                }

                if (canAddPlastic){
                    for (let i = 0; i < plasticPos_arr.length; i++) {
                        activableParticle[i].isActive = true;
                        activableParticle[i].setPos(plasticPos_arr[i]);
                        activableParticle[i].setColor(plasticColor_arr[i]);
                    }

                    plasticPos_arr = [];
                    plasticColor_arr = [];
                    activableParticle = [];
                    canAddPlastic = false;
                }
            }, 
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
                console.log( error );
            }
        );
    }

    updateWolrdData() {
        this.flow = new THREE.Vector3(
            MyMath.random(-this.velMin, this.velMin),
            MyMath.random(-this.velMin, this.velMin),
            MyMath.random(-this.velMin, this.velMin));
    }

    updateParticles() {
        //const particlePos = this.particleAppearence.geometry.attributes.position.array; 
        var particlePos = this.particleAppearence.geometry.getAttribute( 'position' ).array;
        for (let i = 0; i < particlePos.length; i += 3) {
            const index = i / 3;

            if (this.particles[index].isActive == false){
                this.particles[index].position = new THREE.Vector3(0,0,0);
                continue;
            }

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

        var particleColor = this.particleAppearence.geometry.getAttribute( 'color' ).array;
        for (let i = 0; i < particleColor.length; i += 3) {
            const index = i / 3;

            if (this.particles[index].isActive == false){
                this.particles[index].setColor = new THREE.Color(0,0,0);
                continue;
            }

            particleColor[i + 0] = this.particles[index].color.r;
            particleColor[i + 1] = this.particles[index].color.g;
            particleColor[i + 2] = this.particles[index].color.b;

            //파티클이 사리가 됐으면 색을 검정색으로 바꿈 (안보이게)
            
        }        
        this.particleAppearence.geometry.attributes.color.needsUpdate = true;

        //console.log(this.particleAppearence.geometry);
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

