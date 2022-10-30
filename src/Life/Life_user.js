class Life_user extends Life_Sarira {
    constructor(worldSystem){
        super(0, worldSystem);

        this.position = new THREE.Vector3(); 
        this.velocity = new THREE.Vector3(); 
        this.acceleration = new THREE.Vector3(); 

        this.angle = new THREE.Vector3(); 
        this.angleVelocity = new THREE.Vector3(); 
        this.angleAcceleration = new THREE.Vector3(); 
    }

    init(){
        this.velLimit = 1;

        this.size = MyMath.random(3, 10);
        this.sizeMax = MyMath.random(10, 20);

        this.lifeName = 'user';
        this.lifespan = 250;
    }

    update(){
        this.lifeMesh.position.set(this.position.x, this.position.y, this.position.z);
        this.lifeMesh.rotation.set(this.angle.x, this.angle.y, this.angle.z);

        if (this.isDead == false){
            //this.MyMath.randomWalk();
            this.updateShaderMat();
            this.wrapParticles();
            this.add_MicroPlasticToBodySystem();
        }

        this.bodySystem.update();
        this.bodySystem.getLifePosition(_.cloneDeep(this.position));
        this.bodySystemWindow.update();
    }

    lifeGo(){
        super.lifeGo(deadAlert);
    }

    shaderCalculate(camPos){
        if (this.lifeMesh.material.uniforms.viewVector.value){
            this.lifeMesh.material.uniforms.viewVector.value = 
                new THREE.Vector3().subVectors( camPos, this.position );
        }
    }

    createWindowBodySystem(microPlastic_Material, microPlastic_ConvexMaterial) {
        this.bodySystemWindow = new BodySystem();
        this.bodySystemWindow.createBuffer(microPlastic_Material);
        this.bodySystemWindow.createSarira(microPlastic_ConvexMaterial);
        this.bodySystemWindow.createTerminal();
    }

    getSariraDataForServer() {
        //user
        let newPositionArray = [];
        let indexLength = 0;
        let originalPositionArray = this.bodySystemWindow.sariraBuffer.bufferGeometry.attributes.position.array;

        for (let i = 1; i < 300; i++) {
            if (originalPositionArray[i * 3] == 0 && originalPositionArray[(i * 3) + 1] == 0 && originalPositionArray[(i * 3) + 2] == 0) {
                indexLength = i;
                break;
            }
        }
        for (let i = 0; i < indexLength * 3; i++) {
            newPositionArray[i] = originalPositionArray[i]
        }

        let message={
            vertices: newPositionArray,
            metaData: this.bodySystemWindow.terminal.metaDataList
        }
        console.log(message);
        return message;
    }

    add_MicroPlasticToBodySystem(){
        //function map_range(value, low1, high1, low2, high2) {
        //    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        //}
        var age = 0 + (100-0) * (this.age - 0) / (this.lifespan - 0);
        if (this.isMakeSarira == true) {
            var data = this.sariraParticlesData[this.sariraParticlesData.length-1];
            var send_pos = new THREE.Vector3().subVectors(this.sariraParticles[this.sariraParticlesData.length-1].position, this.position);

            this.bodySystemWindow.addFloatingPlastics(send_pos, data);
            this.bodySystem.addFloatingPlastics(send_pos, data);

            this.isMakeSarira = false;
        }

        for (let j = 0; j < this.sariraParticles.length; j++) {
            this.sariraParticles[j].position = this.position.clone();
        }
    }
}

