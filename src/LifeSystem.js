class LifeSystem{
    constructor(){
        this.primaryNum = 15;
        this.secondaryNum = 8;
        this.tertiaryNum = 2;
        this.num = 1 + this.primaryNum + this.secondaryNum + this.tertiaryNum;

        this.windowSize = 140;

        this.lifes = [];
        this.life_user = new Life_user();

        this.lifes.push(this.life_user);

        for (let i = 1; i < this.num; i++) {
            if (i < 1+this.primaryNum) {
                const l = new Life_primaryConsumer(i, this.windowSize);
                this.lifes.push(l);
            } else if (i < 1+this.primaryNum+this.secondaryNum && i >= 1+this.primaryNum){
                const l = new Life_secondaryConsumer(i, this.windowSize);
                this.lifes.push(l);
            } else {
                const l = new Life_tertiaryConsumer(i, this.windowSize);
                this.lifes.push(l);
            }
            
        }

        this.control_life = new Controller_life(this.life_user);
        this.display();     
        
        this.userText= new UserText("Myself",threeSystemController.worldThreeSystem,document.querySelector("#world"))
        this.userText.createLabel()
    }

    update(){
        for (let i = 0; i < this.lifes.length; i++) {
            if (this.lifes[i].index == 0) this.lifes[i].update_user();
            if (this.lifes[i].index >= 1) this.lifes[i].update();
        }
        
        for (let i = this.lifes.length-1; i >= 0 ; i--) {
            if (this.lifes[i].isDead == true){
                this.lifes.splice(i, 1);
                //console.log(i + 'delete');
            }
        }

        this.control_life.update();

        this.userText.updateLabel(this.life_user.life.position)
    }

    display(){

    }
}

class Controller_life{
    constructor(user_life){
        this.user = user_life;
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
        //console.log('focus mode : ' + this.isLifeFocusOn);
        
        this.timer = 1;

        this.camera_focusOn_init();
    }

    update(){
        this.key_check();
        
        if (this.user.isDead == false){
            this.lerpLoad();
        }

        if (this.isLifeFocusOn == true){
            this.camera_focusOn_update();
            //this.key_update();
            this.mouse_update();
        } 
    }

    key_check(){
        this.keyboard.update();

        if ( this.keyboard.down("Z") ) {
            this.isLifeFocusOn = !this.isLifeFocusOn;
            console.log('focus mode : ' + this.isLifeFocusOn);
            this.timer = 1;
            if (this.isLifeFocusOn == true){
                this.camera_focusOn_init();
            } else {
                this.camera_focusOff_init();
            }
        }
    }

    key_update(){
        var moveDistance = 500 * this.user.clock.getDelta();
        var rotateValue = 500 * this.user.clock.getDelta();

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

    camera_focusOff_init(){
        this.goal = new THREE.Object3D;
        this.follow = new THREE.Object3D;

        //======================================================
        //this.cam.position.set(50, 50, 200);
        this.camLerp = new THREE.Vector3(50, 50, -300);
        //this.cam.lookAt(0, 0, 0);
        this.orbitControl.target = new THREE.Vector3(0, 0, 0);
        this.orbitControl.update();
        this.orbitControl.enablePan = true;
    }

    lerpLoad(){
        if (this.timer > 0){
            this.orbitControl.enabled = false;
            this.timer -= 0.015;
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
            this.user.life.position.z - 50);

        this.orbitControl.target = this.user.life.position;
        this.orbitControl.enablePan = false;
    }

    camera_focusOn_update(){
        this.orbitControl.target = this.user.life.position;
        this.camLerp = new THREE.Vector3().subVectors(
            this.user.life.position,
            new THREE.Vector3(0, 0, 50));

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

        //console.log(this.cam.position);
        //console.log(this.orbitControl.object.position);
        //console.log(this.life.position);
        //console.log(mouseHold);
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