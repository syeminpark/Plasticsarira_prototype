class Life_user extends Life {
    constructor(){
        super(1, 0);
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.acceleration = new THREE.Vector3();

        this.angle = new THREE.Vector3();
        this.angleVelocity = new THREE.Vector3();
        this.angleAcceleration = new THREE.Vector3();

        //======================================================
        this.scene = threeSystemController.worldThreeSystem.scene;
        this.cam = threeSystemController.worldThreeSystem.camera;
        this.orbitControl = threeSystemController.worldThreeSystem.controls;
        this.keyboard = new KeyboardState();

        //======================================================
        this.newPos = new THREE.Vector3();
        this.matrix = new THREE.Matrix4();

        this.stop = 1;
        this.DEGTORAD = 0.01745327;
        this.temp = new THREE.Vector3;
        this.dir = new THREE.Vector3;
        this.a = new THREE.Vector3;
        this.b = new THREE.Vector3;
        this.safetyDistance = 0.1;
        this.vel = 0.0;
        this.acc = 0.0;

        this.goal = new THREE.Object3D;
        this.follow = new THREE.Object3D;
        this.follow.position.z = -this.safetyDistance;

        this.camLerp = new THREE.Vector3();

        //======================================================
        this.isLifeFocusOn = true;
        this.timer = 1;

        this.camera_focusOn_init();
    }

    update_position(){
        this.life.position.set(this.position.x, this.position.y, this.position.z);
        this.life.rotation.set(this.angle.x, this.angle.y, this.angle.z);

        this.randomWalk(0.01, 0.08);

        this.key_check();

        this.lerpLoad();
        

        if (this.isLifeFocusOn == true){
            this.camera_focusOn_update();
            this.key_update();
        } else {
            //this.randomLook();
        }
    }

    lerpLoad(){
        if (this.timer > 0){
            this.timer -= 0.01;
            this.cam.position.lerp(this.camLerp, 0.05);
        }
    }

    key_check(){
        this.keyboard.update();

        if ( this.keyboard.down("F") ) {
            this.isLifeFocusOn = !this.isLifeFocusOn;
            this.timer = 1;
            if (this.isLifeFocusOn == true){
                console.log('focus on');
                this.camera_focusOn_init();
            } else {
                console.log('focus off');
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

    camera_focusOff_init(){
        this.goal = new THREE.Object3D;
        this.follow = new THREE.Object3D;

        //======================================================
        //this.cam.position.set(50, 50, 200);
        this.camLerp = new THREE.Vector3(50, 50, -400);
        this.cam.lookAt(0, 0, 0);
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
}