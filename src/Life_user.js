class Life_user extends Life {
    constructor(microPlastic_Material, microPlastic_ConvexMaterial){
        super(0, 0, microPlastic_Material, microPlastic_ConvexMaterial);

        this.createWindowBodySystem();
    }

    init(){
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.acceleration = new THREE.Vector3();

        this.velLimit = 1;

        this.angle = new THREE.Vector3();
        this.angleVelocity = new THREE.Vector3();
        this.angleAcceleration = new THREE.Vector3();

        this.size = random(3, 10);
        this.sizeMax = random(10, 20);

        this.noiseShape = random(0.05, 0.1);
        this.noiseAnimSpeed = random(0.1, 0.7);

        this.lifeName = 'user';
        this.lifespan = 200;
    }

    update_user(){
        this.life.position.set(this.position.x, this.position.y, this.position.z);
        this.life.rotation.set(this.angle.x, this.angle.y, this.angle.z);

        this.lifeGo();

        if (this.isDead == false){
            this.randomWalk(0);
            this.noise_update();
            this.wrap_particles();
            this.add_MicroPlasticToBodySystem();
        }

        this.bodySystem.update();
        this.bodySystem.getLifePosition(_.cloneDeep(this.position));
        this.bodySystemWindow.update();
    }

    createWindowBodySystem() {
        this.bodySystemWindow = new BodySystem(threeSystemController.sariraThreeSystem);
        this.bodySystemWindow.createBuffer(this.microPlastic_Material);
        this.bodySystemWindow.createSarira(this.microPlastic_ConvexMaterial);
        this.bodySystemWindow.createTerminal();
    }

    getSariraDataForServer() {
        //user
        let newPositionArray = []
        let indexLength = 0;
        let originalPositionArray = this.bodySystemWindow.sariraBuffer.bufferGeometry.attributes.position.array;

        for (let i = 1; i < 300; i++) {
            if (originalPositionArray[i * 3] == 0 && originalPositionArray[(i * 3) + 1] == 0 && originalPositionArray[(i * 3) + 2] == 0) {
                indexLength = i
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
        console.log(message)
        return message
        
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

    lifeGo(){
        super.lifeGo(deadAlert)
       
    }
}

