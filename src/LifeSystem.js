class LifeSystem {
    constructor(virtualKeyboard) {
        this.windowSize = 200;

        const minNum_p = Math.floor(this.windowSize/20);
        const minNum_s = Math.floor(this.windowSize/40);
        const minNum_t = Math.floor(this.windowSize/50);

        this.maxNum_p = Math.floor(this.windowSize/8);
        this.maxNum_s = Math.floor(this.windowSize/16);
        this.maxNum_t = Math.floor(this.windowSize/32);

        this.primaryNum = minNum_p;
        this.secondaryNum = minNum_s;
        this.tertiaryNum = minNum_t;
        this.num = 1 + this.primaryNum + this.secondaryNum + this.tertiaryNum;

        this.microPlastic_Material = createPointMaterial();
        this.microPlastic_ConvexMaterial = createConvexMaterial();

        this.lifes = [];
        this.life_user = new Life_user(this.microPlastic_Material, this.microPlastic_ConvexMaterial);

        this.lifes.push(this.life_user);

        for (let i = 1; i < this.num; i++) {
            if (i < 1 + this.primaryNum) {
                const l = new Life_primaryConsumer(i, this.windowSize, this.microPlastic_Material, this.microPlastic_ConvexMaterial);
                this.lifes.push(l);
            } else if (i < 1 + this.primaryNum + this.secondaryNum && i >= 1 + this.primaryNum) {
                const l = new Life_secondaryConsumer(i, this.windowSize, this.microPlastic_Material, this.microPlastic_ConvexMaterial);
                this.lifes.push(l);
            } else {
                const l = new Life_tertiaryConsumer(i, this.windowSize, this.microPlastic_Material, this.microPlastic_ConvexMaterial);
                this.lifes.push(l);
            }
        }

        this.control_life = new Controller2(this.life_user, this.windowSize, virtualKeyboard);

        this.userText = new UserText(threeSystemController.worldThreeSystem, document.querySelector("#world"))
        this.userText.createLabel();

        this.healthbar = new HealthBar('health', threeSystemController.worldThreeSystem, document.querySelector("#world"))
        this.healthbar.createBar(this.life_user.lifespan)
    }

    update() {
        for (let i = 0; i < this.lifes.length; i++) {
            if (this.lifes[i].index == 0) this.lifes[i].update_user();
            if (this.lifes[i].index >= 1) {
                this.lifes[i].update();
                if (this.primaryNum < this.maxNum_p && this.lifes[i].lifeName.includes('Plankton') == true) this.lifes[i].division(this.lifes, this);
                if (this.secondaryNum < this.maxNum_s && this.lifes[i].lifeName.includes('Herbivores') == true) this.lifes[i].division(this.lifes, this);
                if (this.tertiaryNum < this.maxNum_t && this.lifes[i].lifeName.includes('Carnivores') == true) this.lifes[i].division(this.lifes, this);

                // for (let j = 0; j < this.lifes.length; j++){
                //     this.lifes[i].eatLife(this.lifes[j]);
                // }
            }
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
        this.healthbar.updateHealth(this.life_user.lifespan - this.life_user.age)
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
class Controller2 {
    constructor(user_life, windowSize, virtualKeyboard) {
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
        this.checkFirst = 0;

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
        this.mouse_init();

        this.virtualKeyboard = virtualKeyboard;
    }

    update() {
        this.key_check();
        this.lerpLoad();

        if (this.isLifeFocusOn == true && this.user.isDead == false) {
            this.camera_focusOn_update();
                this.wrap();
                if (this.isDuringLerp == false) {
                    this.key_update();
                    this.mouse_update();
                }
        } else {
            if (this.user.isDead == true) {
                this.orbitControl.enabled = false;
                this.pointerLockControl.unlock();
                this.pointerLockControl.isLocked = false;
            }
            else this.orbitControl.target = new THREE.Vector3(0, 0, 0);
        }

        this.user.life.material.uniforms.viewVector.value = 
			new THREE.Vector3().subVectors( this.cam.position, this.user.position );
    }

    key_check() {
        this.keyboard.update();

        if (this.keyboard.down("Z") || this.virtualKeyboard.getKeyValue() == "Z") {
            this.virtualKeyboard.resetKeyValue()
            this.isLifeFocusOn = !this.isLifeFocusOn;
            //console.log('focus mode : ' + this.isLifeFocusOn);
            this.timer = 1;
            if (this.isLifeFocusOn == true) {
                this.camera_focusOn_init();
            } else {
                this.camera_focusOff_init();
                //console.log('orbit control on' + this.orbitControl.enabled);
            }
        }
    }

    key_update() {
        var moveDistance = 100 * this.user.clock.getDelta();

        if (this.keyboard.pressed("W") || this.virtualKeyboard.getKeyValue() == "W") {
            this.cam.translateZ(-moveDistance);
        } else if (this.keyboard.pressed("S") || this.virtualKeyboard.getKeyValue() == "S") {
            this.cam.translateZ(moveDistance);
        } else if (this.keyboard.pressed("A") || this.virtualKeyboard.getKeyValue() == "A") {
            this.cam.translateX(-moveDistance);
        } else if (this.keyboard.pressed("D") || this.virtualKeyboard.getKeyValue() == "D") {
            this.cam.translateX(moveDistance);
        }

        // if ( this.keyboard.pressed("Q") ){
        //     this.user.life.translateY( moveDistance );
        // }

        // if ( this.keyboard.pressed("E") ){
        //     this.user.life.translateY( -moveDistance );
        // }
    }

    mouse_init(){
        document.getElementById('world').addEventListener('contextmenu', onContextMenu, false);
        document.getElementById('world').addEventListener('mousedown', onMouseDown, false);
        document.getElementById('world').addEventListener('mouseup', onMouseUp, false);
        document.getElementById('world').addEventListener('mousemove', onMouseMove, false);

        // document.getElementById('world').addEventListener('touchstart', onMouseDown, false);
        // document.getElementById('world').addEventListener('touchend', onMouseUp, false);
        // document.getElementById('world').addEventListener('touchmove', onMouseMove, false);
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
        const wrapLength = this.windowSize - (this.camDis * 2);

        // var newParticlePos = [];
        // for (let i = 0; i < this.user.absorbedParticles.length; i++) {
        //     newParticlePos.push(this.user.absorbedParticles[i].position.clone());
        // }

        if (distance > wrapLength){
            this.isInWorld = false;
            this.cam.position.setLength(wrapLength);
        } else {
            this.isInWorld = true;
        }
    }

    lerpLoad() {
        if (this.timer > 0) {
            this.isDuringLerp = true;
            this.timer -= 0.01;

            if (this.checkFirst < 1) this.checkFirst += 0.01;

            if (this.isLifeFocusOn == true) {
                //this.pointerLockControl.unlock();
                this.pointerLockControl.isLocked = false;
                this.cam.lookAt(this.user.position.clone());
            } else {
                this.orbitControl.enabled = false;
            }

            //this.cam.position.lerp(this.camLerp, 0.05);
            this.orbitControl.object.position.lerp(this.camLerpPos, 0.05);
        } else {
            this.isDuringLerp = false;

            if (this.isLifeFocusOn == true) {
                //this.pointerLockControl.lock();
                this.pointerLockControl.isLocked = true;
            } else {
                this.orbitControl.enabled = true;
            }
        }
    }

    camera_focusOff_init() {
        //this.cam.position.set(50, 50, 200);
        this.cam.lookAt(0, 0, 0);
        this.camLerpPos = this.cam.position.clone().setLength(this.windowSize * 1.5);

        this.pointerLockControl.unlock();

        this.orbitControl.target = new THREE.Vector3(0, 0, 0);
        this.orbitControl.enablePan = true;
        this.orbitControl.enableZoom = true;
        this.orbitControl.enabled = true;
    }

    camera_focusOn_init() {
        const camDir = this.pointerLockControl.getDirection(this.cam.position.clone()).multiplyScalar(this.camDis);
        const camDis = new THREE.Vector3().subVectors(this.user.position.clone(), this.cam.position.clone()).setLength(this.camDis);

        this.cam.lookAt(this.user.position.clone());
        this.camLerpPos = new THREE.Vector3().subVectors(this.user.position.clone(), camDis);

        this.orbitControl.enabled = false;
    }

    camera_focusOn_update() {
        const camDir = this.pointerLockControl.getDirection(this.cam.position.clone()).multiplyScalar(this.camDis);
        const userPos = new THREE.Vector3().addVectors(this.cam.position.clone(), camDir);
        var lerpSpeed = 0.5;

        if (this.isDuringLerp == false) this.user.position.lerp(userPos, lerpSpeed);
    }
}

