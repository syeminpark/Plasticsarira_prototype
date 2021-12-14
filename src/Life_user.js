class Life_user extends Life {
    constructor(microPlastic_Material, microPlastic_ConvexMaterial){
        super(0, 0, microPlastic_Material, microPlastic_ConvexMaterial);

        this.createWindowBodySystem();
    }

    init(){
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.acceleration = new THREE.Vector3();

        this.velLimit = 0.01;

        this.angle = new THREE.Vector3();
        this.angleVelocity = new THREE.Vector3();
        this.angleAcceleration = new THREE.Vector3();

        this.size = random(3, 10);
        this.sizeMax = random(10, 20);

        this.noiseShape = random(0.05, 0.1);
        this.noiseAnimSpeed = random(0.1, 0.7);

        this.lifeName = 'user';
        this.lifespan = 500;
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
        this.bodySystem.getLifePosition(this.position.clone());
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

    lerpLoad(){
        if (this.timer > 0){
            this.orbitControl.enabled = false;
            this.timer -= 0.015;
            this.cam.position.lerp(this.camLerp, 0.05);
        } else {
            this.orbitControl.enabled = true;
        }
    }

    key_check(){
        this.keyboard.update();

        if ( this.keyboard.down("Z") ) {
            this.isLifeFocusOn = !this.isLifeFocusOn;
            //console.log('focus mode : ' + this.isLifeFocusOn);
            this.timer = 1;
            if (this.isLifeFocusOn == true){
                this.camera_focusOn_init();
            } else {
                this.camera_focusOff_init();
            }
        }
    }

    key_update(){
        var moveDistance = 500 * this.clock.getDelta();
        var rotateValue = 500 * this.clock.getDelta();

        if ( this.keyboard.pressed("W") ){
            this.life.translateY( moveDistance );
        }
		    
        if ( this.keyboard.pressed("S") ){
            this.life.translateY(  -moveDistance );
        }

        if ( this.keyboard.pressed("A") ){
            this.life.translateX(  moveDistance );
        }
		    
        if ( this.keyboard.pressed("D") ){
            this.life.translateX(  -moveDistance );
        }

        if ( this.keyboard.pressed("Q") ){
            this.life.translateZ(  moveDistance );
        }
		    
        if ( this.keyboard.pressed("E") ){
            this.life.translateZ(  -moveDistance );
        }
            
    }

    mouse_update(){
        var moveDistance = 500 * this.clock.getDelta();
        var cameraLook = new THREE.Vector3().subVectors(this.life.position, this.cam.position);
        cameraLook.setLength(moveDistance);

        document.addEventListener('contextmenu', onContextMenu, false);
        document.addEventListener('mousedown', onMouseDown, false);
        document.addEventListener('mouseup', onMouseUp, false);

        switch(mouseHold) {
            case 1:
                this.life.translateX( cameraLook.x );
                this.life.translateY( cameraLook.y );
                this.life.translateZ( cameraLook.z );
              break;
          }
    }

    camera_focusOff_init(){
        this.goal = new THREE.Object3D;
        this.follow = new THREE.Object3D;

        //======================================================
        //this.cam.position.set(50, 50, 200);
        this.camLerp = new THREE.Vector3(50, 50, -300);
        this.cam.lookAt(0, 0, 0);
        this.orbitControl.enablePan = true;
        this.orbitControl.target = new THREE.Vector3(0, 0, 0);
    }

    camera_focusOn_init(){

        this.life.add( this.follow );
        this.goal.add( this.cam );

        //======================================================
        // this.cam.position.set(
        //     this.life.position.x, this.life.position.y, 
        //     this.life.position.z - 100);
        this.camLerp = new THREE.Vector3(
            this.life.position.x, this.life.position.y, 
            this.life.position.z - 100);
        this.orbitControl.enablePan = false;
        this.orbitControl.target = this.life.position;
    }

    camera_focusOn_update(){
        this.a.lerp(this.life.position, 0.4);
        this.b.copy(this.goal.position);
        
        this.dir.copy( this.a ).sub( this.b ).normalize();

        const dis = this.a.distanceTo( this.b ) - this.safetyDistance;
        this.goal.position.addScaledVector( this.dir, dis );
        this.goal.position.lerp(this.temp, 0.02);
        this.temp.setFromMatrixPosition(this.follow.matrixWorld);
        
        this.cam.lookAt( this.life.position );
    }
    lifeGo(){
        super.lifeGo(deadAlert)
       
    }
}

