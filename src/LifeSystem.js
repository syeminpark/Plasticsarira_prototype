class LifeSystem{
    constructor(virtualKeyboard){
        this.primaryNum = 10;
        this.secondaryNum = 5;
        this.tertiaryNum = 3;
        this.num = 1 + this.primaryNum + this.secondaryNum + this.tertiaryNum;

        this.windowSize = 300;

        this.microPlastic_Material = createPointMaterial();
        this.microPlastic_ConvexMaterial = createConvexMaterial();

        this.lifes = [];
        this.life_user = new Life_user(this.microPlastic_Material, this.microPlastic_ConvexMaterial);

        this.lifes.push(this.life_user);

        for (let i = 1; i < this.num; i++) {
            if (i < 1+this.primaryNum) {
                const l = new Life_primaryConsumer(i, this.windowSize, this.microPlastic_Material, this.microPlastic_ConvexMaterial);
                this.lifes.push(l);
            } else if (i < 1+this.primaryNum+this.secondaryNum && i >= 1+this.primaryNum){
                const l = new Life_secondaryConsumer(i, this.windowSize, this.microPlastic_Material, this.microPlastic_ConvexMaterial);
                this.lifes.push(l);
            } else {
                const l = new Life_tertiaryConsumer(i, this.windowSize, this.microPlastic_Material, this.microPlastic_ConvexMaterial);
                this.lifes.push(l);
            }
        }

        this.control_life = new Controller2(this.life_user, this.windowSize,virtualKeyboard);
        
        this.userText= new UserText(threeSystemController.worldThreeSystem,document.querySelector("#world"))
        this.userText.createLabel();

        this.healthbar = new HealthBar('health',threeSystemController.worldThreeSystem,document.querySelector("#world"))
        this.healthbar.createBar(this.life_user.lifespan)
    }

    update(){
        for (let i = 0; i < this.lifes.length; i++) {
            if (this.lifes[i].index == 0) this.lifes[i].update_user();
            if (this.lifes[i].index >= 1) {
                this.lifes[i].update();
                if (this.primaryNum < 15 && this.lifes[i].lifeName.includes('Plankton') == true) this.lifes[i].division(this.lifes, this);
                if (this.secondaryNum < 10 && this.lifes[i].lifeName.includes('Herbivores') == true) this.lifes[i].division(this.lifes, this);
                if (this.tertiaryNum < 5 && this.lifes[i].lifeName.includes('Carnivores') == true) this.lifes[i].division(this.lifes, this);

                // for (let j = 0; j < this.lifes.length; j++){
                //     this.lifes[i].eatLife(this.lifes[j]);
                // }
            }
        }
        
        for (let i = this.lifes.length-1; i >= 0 ; i--) {
            if (this.lifes[i].isDead == true){
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
            const l = new Life_primaryConsumer(this.lifes.length, this.windowSize);
            this.lifes.push(l);
            //console.log('all primaryConsumer dead, add new');
        }
        // if (this.secondaryNum <= 0) {
        //     const l = new Life_secondaryConsumer(this.lifes.length, this.windowSize);
        //     this.lifes.push(l);
        // }
        // if (this.tertiaryNum <= 0) {
        //     const l = new Life_tertiaryConsumer(this.lifes.length, this.windowSize);
        //     this.lifes.push(l);
        // }

        this.control_life.update();

        this.healthbar.updatePosition(this.life_user.life.position)
        this.healthbar.updateHealth(this.life_user.lifespan-this.life_user.age)
        this.userText.updateLabel(this.life_user.life.position)
    }
}

var mouseHold = -1;
var isMouseMoving = false;

function onContextMenu(event) { // Prevent right click
    event.preventDefault();
}
  
function onMouseDown(event) {
    mouseHold = event.which;
}

function onMouseMove(event) {
    isMouseMoving = true;
}
  
function onMouseUp(event) {
    mouseHold = -1;
    isMouseMoving = false;
}

//이걸 씀
class Controller2{
    constructor(user_life, windowSize,virtualKeyboard){
        this.user = user_life;
        this.camDis = (this.user.size + this.user.sizeMax) * 1.5;

        this.windowSize = windowSize;

        this.scene = threeSystemController.worldThreeSystem.scene;
        this.cam = threeSystemController.worldThreeSystem.camera;
        this.orbitControl = threeSystemController.worldThreeSystem.controls;
        
        this.keyboard = new KeyboardState();

        this.isLifeFocusOn = true;
        this.isInWorld = true;

        this.isDuringLerp = false;
        
        this.timer = 1;
        this.isFirst = true;

        //=================================================================================
        this.pointerLockControl = threeSystemController.worldThreeSystem.controls_pointerLock;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        this.prevTime = performance.now();
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();

        this.camera_focusOn_init();

        this.virtualKeyboard=virtualKeyboard;

        document.getElementById('world').addEventListener('contextmenu', onContextMenu, false);
        document.getElementById('world').addEventListener('mousedown', onMouseDown, false);
        document.getElementById('world').addEventListener('mouseup', onMouseUp, false);
        document.getElementById('world').addEventListener('mousemove', onMouseMove, false);

    }

    update(){
        this.key_check();
        this.lerpLoad();
        
        if (this.isLifeFocusOn == true){
            this.camera_focusOn_update();
            if (this.user.isDead == false){
                this.wrap();
                if (this.isDuringLerp == false) {
                    this.key_update();
                    this.mouse_update();
                }
            }
        } 
        else {
            if (this.user.isDead == true) this.orbitControl.enabled = false;
            else this.orbitControl.target = new THREE.Vector3(0, 0, 0);
        }
    }

    key_check(){
        this.keyboard.update();

        if ( this.keyboard.down("Z") || this.virtualKeyboard.getKeyValue()=="Z" ) {
          this.virtualKeyboard.resetKeyValue()
            this.isLifeFocusOn = !this.isLifeFocusOn;
            //console.log('focus mode : ' + this.isLifeFocusOn);
            this.timer = 1;
            if (this.isLifeFocusOn == true){
                this.camera_focusOn_init();
            } else {
                this.camera_focusOff_init();
                //console.log('orbit control on' + this.orbitControl.enabled);
            }

        }
        

    }

    key_update(){
        var moveDistance = 100 * this.user.clock.getDelta();

        if (this.keyboard.pressed("W") || this.virtualKeyboard.getKeyValue()=="W"){
            this.cam.translateZ( -moveDistance );
        }
		    
        else if (this.keyboard.pressed("S")|| this.virtualKeyboard.getKeyValue()=="S"){
            this.cam.translateZ( moveDistance );
        }

        else if (this.keyboard.pressed("A") || this.virtualKeyboard.getKeyValue()=="A"){
            this.cam.translateX( -moveDistance );
        }
		    
        else if (this.keyboard.pressed("D")|| this.virtualKeyboard.getKeyValue()=="D"){
            this.cam.translateX( moveDistance );
        }

        // if ( this.keyboard.pressed("Q") ){
        //     this.user.life.translateY( moveDistance );
        // }
		    
        // if ( this.keyboard.pressed("E") ){
        //     this.user.life.translateY( -moveDistance );
        // }
    }

    mouse_update(){

        switch(mouseHold) {
            case 1:
                if (this.user.isDead == false) this.pointerLockControl.lock();
            break;
            case -1:
                this.pointerLockControl.unlock();
                this.pointerLockControl.isLocked = false;
            break;
        }
    }

    wrap() {
        const distance = this.user.life.position.length();
        const wrapLength = this.windowSize - (this.camDis*2);

        // var newParticlePos = [];
        // for (let i = 0; i < this.user.absorbedParticles.length; i++) {
        //     newParticlePos.push(this.user.absorbedParticles[i].position.clone());
        // }

        if (distance > wrapLength) {
            this.isInWorld = false;
            this.cam.position.setLength(wrapLength);
        }
        else {
            this.isInWorld = true;
        }
    }

    lerpLoad(){
        if (this.timer > 0 ){
            this.isDuringLerp = true;
            this.timer -= 0.01;

            if (this.isLifeFocusOn == true) {
                //this.pointerLockControl.unlock();
                this.pointerLockControl.isLocked = false;
            }
            else {
                this.orbitControl.enabled = false;
            }

            //this.cam.position.lerp(this.camLerp, 0.05);
            this.orbitControl.object.position.lerp(this.camLerp, 0.05);
        } else {
            this.isDuringLerp = false;


            if (this.isLifeFocusOn == true) {
                //this.pointerLockControl.lock();
                this.pointerLockControl.isLocked = true;
            }
            else {
                this.orbitControl.enabled = true;
            }

        }
    }

    camera_focusOff_init(){
        //this.cam.position.set(50, 50, 200);
        this.cam.lookAt(0, 0, 0);
        this.camLerp = this.cam.position.clone().setLength(this.windowSize);
        // this.camLerp = this.user.position.copy().add(new THREE.Vector3()).setLength(300);

        this.pointerLockControl.unlock();
        // this.pointerLockControl.isLocked = false;
        // this.pointerLockControl.enabled  = false;
        
        this.orbitControl.target = new THREE.Vector3(0, 0, 0);
        this.orbitControl.enablePan = true;
        this.orbitControl.enableZoom = true;
        this.orbitControl.enabled = true;
    }

    camera_focusOn_init(){
        const camDis = new THREE.Vector3().subVectors(this.user.position.clone(), this.cam.position.clone()).setLength(this.camDis);
        this.camLerp = new THREE.Vector3().subVectors(this.user.life.position.clone(), camDis);

        this.orbitControl.enabled = false;
        
        //this.pointerLockControl.lock();
        // this.pointerLockControl.isLocked = true;
        // this.pointerLockControl.enabled  = true;
    }

    camera_focusOn_update(){
        //const userPos = new THREE.Vector3().addVectors(this.cam.position.clone(), new THREE.Vector3(0, 0, this.camDis));
        const camDir = this.pointerLockControl.getDirection(this.cam.position.clone()).multiplyScalar(this.camDis);
        const userPos = new THREE.Vector3().addVectors(this.cam.position.clone(), camDir);
        var lerpSpeed = 0.5;
        if (this.isDuringLerp == false) this.user.position.lerp(userPos, lerpSpeed);
    }
}


//안씀
class Controller1{
    constructor(user_life, windowSize){
        this.user = user_life;
        this.camDis = (this.user.size + this.user.sizeMax) * 1.5;

        this.windowSize = windowSize;

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
        this.safetyDistance = this.camDis;
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

    update(){
        this.key_check();
        this.lerpLoad();
        
        if (this.isLifeFocusOn == true){
            this.camera_focusOn_update();
        } 

        if (this.user.isDead == false){
            this.key_update();
            this.wrap();
            //this.mouse_update();
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
        var moveDistance = 100 * this.user.clock.getDelta();
        var rotateValue = 500 * this.user.clock.getDelta();

        // var moveDistance = 80 * this.user.clock.getDelta();
        // //var cameraLook = new THREE.Vector3().subVectors(this.life.position, this.cam.position);
        // var cameraLook = new THREE.Vector3().subVectors(this.user.life.position, this.orbitControl.object.position);
        // cameraLook.setLength(moveDistance);

        if ( this.keyboard.pressed("W") ){
            this.user.life.translateY( moveDistance );
        }
		    
        if ( this.keyboard.pressed("S") ){
            this.user.life.translateY(  -moveDistance );
        }

        if ( this.keyboard.pressed("A") ){
            this.user.life.translateX(  moveDistance );
        }
		    
        if ( this.keyboard.pressed("D") ){
            this.user.life.translateX(  -moveDistance );
        }

        if ( this.keyboard.pressed("Q") ){
            this.user.life.translateZ(  moveDistance );
        }
		    
        if ( this.keyboard.pressed("E") ){
            this.user.life.translateZ(  -moveDistance );
        }
    }

    wrap() {
        const distance = this.user.life.position.length();
        var newPos = this.user.position.clone();

        var newParticlePos = [];
        for (let i = 0; i < this.user.absorbedParticles.length; i++) {
            newParticlePos.push(this.user.absorbedParticles[i].position.clone());
        }

        if (distance > this.windowSize) {
            // this.user.position = new THREE.Vector3(newPos.x * -1, newPos.y * -1, newPos.z * -1);

            // for (let i = 0; i < this.user.absorbedParticles.length; i++) {
            //     this.user.absorbedParticles[i].position = new THREE.Vector3(newParticlePos[i].x * -1, newParticlePos[i].y * -1, newParticlePos[i].z * -1);
            // }
        }
    }

    mouse_update(){
        var moveDistance = 80 * this.user.clock.getDelta();
        //var cameraLook = new THREE.Vector3().subVectors(this.life.position, this.cam.position);
        var cameraLook = new THREE.Vector3().subVectors(this.user.life.position, this.orbitControl.object.position);
        cameraLook.setLength(moveDistance);

        document.addEventListener('contextmenu', onContextMenu, false);
        document.addEventListener('mousedown', onMouseDown, false);
        document.addEventListener('mouseup', onMouseUp, false);
        document.addEventListener('mousemove', onMouseMove, false);

        switch(mouseHold) {
            case 1:
                //this.life.translateX( cameraLook.x );
                //this.life.translateY( cameraLook.y );
                //this.life.translateZ( cameraLook.z );
                //if (isMouseMoving == false) 
                this.user.acceleration.add(cameraLook);
              break;
            case -1:
                
            break;
        }
    }

    camera_focusOff_init(){
        this.goal = new THREE.Object3D;
        this.follow = new THREE.Object3D;

        //======================================================
        //this.cam.position.set(50, 50, 200);
        //this.cam.lookAt(0, 0, 0);

        this.camLerp = new THREE.Vector3(50, 50, 300);
        // this.camLerp = this.user.position.copy().add(new THREE.Vector3()).setLength(300);
        
        this.orbitControl.target = new THREE.Vector3(0, 0, 0);
        this.orbitControl.update();
        this.orbitControl.enablePan = true;
        this.orbitControl.enableZoom = true;
    }

    lerpLoad(){
        if (this.timer > 0){
            this.orbitControl.enabled = false;
            this.timer -= 0.01;
            //this.cam.position.lerp(this.camLerp, 0.05);
            this.orbitControl.object.position.lerp(this.camLerp, 0.05);
        } else {
            this.orbitControl.enabled = true;
        }
    }

    camera_focusOn_init(){
        this.user.life.add( this.follow );
        //this.goal.add( this.cam );
        this.goal.add( this.orbitControl.object );

        //======================================================
        // this.cam.position.set(
        //     this.life.position.x, this.life.position.y, 
        //     this.life.position.z - 100);
        this.camLerp = new THREE.Vector3(
            this.user.life.position.x, this.user.life.position.y, 
            this.user.life.position.z - this.camDis);

        this.orbitControl.target = this.user.life.position;
        this.orbitControl.enablePan = false;
        this.orbitControl.enableZoom = false;
    }

    camera_focusOn_update(){
        this.orbitControl.target = this.user.life.position;
        
        this.camLerp = new THREE.Vector3().subVectors(
            this.user.life.position,
            new THREE.Vector3(0, 0, this.camDis));

        this.a.lerp(this.user.life.position, 0.4);
        this.b.copy(this.goal.position);
        
        this.dir.copy( this.a ).sub( this.b ).normalize();

        const dis = this.a.distanceTo( this.b ) - this.safetyDistance;
        this.goal.position.addScaledVector( this.dir, dis );
        this.goal.position.lerp(this.temp, 0.02);

        this.temp.setFromMatrixPosition(this.follow.matrixWorld);
        
        //this.cam.lookAt( this.life.position );
        this.orbitControl.target = this.user.life.position;
        this.orbitControl.update();
        
        //this.follow.position.set(this.user.life.position.clone());
        this.orbitControl.object.position0 = this.goal.position.clone();

        // console.log( 'this.goal ' + String(this.goal.position));
        // console.log( 'this.orbitControl ' + String(this.orbitControl.object.position));
        //console.log(this.life.position);
    }
}
