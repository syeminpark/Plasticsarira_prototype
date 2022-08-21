//안씀
class Controller1 {
    constructor(user_life, windowSize) {
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

    update() {
        this.key_check();
        this.lerpLoad();

        if (this.isLifeFocusOn == true) {
            this.camera_focusOn_update();
        }

        if (this.user.isDead == false) {
            this.key_update();
            this.wrap();
            //this.mouse_update();
        }
    }

    key_check() {
        this.keyboard.update();

        if (this.keyboard.down("Z")) {
            this.isLifeFocusOn = !this.isLifeFocusOn;
            //console.log('focus mode : ' + this.isLifeFocusOn);
            this.timer = 1;
            if (this.isLifeFocusOn == true) {
                this.camera_focusOn_init();
            } else {
                this.camera_focusOff_init();
            }
        }
    }

    key_update() {
        var moveDistance = 100 * this.user.clock.getDelta();
        var rotateValue = 500 * this.user.clock.getDelta();

        // var moveDistance = 80 * this.user.clock.getDelta();
        // //var cameraLook = new THREE.Vector3().subVectors(this.life.position, this.cam.position);
        // var cameraLook = new THREE.Vector3().subVectors(this.user.life.position, this.orbitControl.object.position);
        // cameraLook.setLength(moveDistance);

        if (this.keyboard.pressed("W")) {
            this.user.life.translateY(moveDistance);
        }

        if (this.keyboard.pressed("S")) {
            this.user.life.translateY(-moveDistance);
        }

        if (this.keyboard.pressed("A")) {
            this.user.life.translateX(moveDistance);
        }

        if (this.keyboard.pressed("D")) {
            this.user.life.translateX(-moveDistance);
        }

        if (this.keyboard.pressed("Q")) {
            this.user.life.translateZ(moveDistance);
        }

        if (this.keyboard.pressed("E")) {
            this.user.life.translateZ(-moveDistance);
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

    mouse_update() {
        var moveDistance = 80 * this.user.clock.getDelta();
        //var cameraLook = new THREE.Vector3().subVectors(this.life.position, this.cam.position);
        var cameraLook = new THREE.Vector3().subVectors(this.user.life.position, this.orbitControl.object.position);
        cameraLook.setLength(moveDistance);

        document.addEventListener('contextmenu', onContextMenu, false);
        document.addEventListener('mousedown', onMouseDown, false);
        document.addEventListener('mouseup', onMouseUp, false);
        document.addEventListener('mousemove', onMouseMove, false);

        switch (mouseHold) {
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

    camera_focusOff_init() {
        this.goal = new THREE.Object3D;
        this.follow = new THREE.Object3D;

        //======================================================
        //this.cam.position.set(50, 50, 200);
        //this.cam.lookAt(0, 0, 0);

        this.camLerp = new THREE.Vector3(50, 50, 300);
        // this.camLerp = this.user.position.copy().add(new THREE.Vector3()).setLength(300);

        this.orbitControl.target = new THREE.Vector3(0, 0, 0);
        this.orbitControl.enablePan = true;
        this.orbitControl.enableZoom = true;
        this.orbitControl.update();
    }

    lerpLoad() {
        if (this.timer > 0) {
            this.orbitControl.enabled = false;
            this.timer -= 0.01;
            //this.cam.position.lerp(this.camLerp, 0.05);
            this.orbitControl.object.position.lerp(this.camLerp, 0.05);
        } else {
            this.orbitControl.enabled = true;
        }
    }

    camera_focusOn_init() {
        this.user.life.add(this.follow);
        //this.goal.add( this.cam );
        this.goal.add(this.orbitControl.object);

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

    camera_focusOn_update() {
        this.orbitControl.target = this.user.life.position;

        this.camLerp = new THREE.Vector3().subVectors(
            this.user.life.position,
            new THREE.Vector3(0, 0, this.camDis));

        this.a.lerp(this.user.life.position, 0.4);
        this.b.copy(this.goal.position);

        this.dir.copy(this.a).sub(this.b).normalize();

        const dis = this.a.distanceTo(this.b) - this.safetyDistance;
        this.goal.position.addScaledVector(this.dir, dis);
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