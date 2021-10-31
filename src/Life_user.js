class Life_user extends Life {
    constructor(){
        super(1, 0);
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.acceleration = new THREE.Vector3();

        this.angle = new THREE.Vector3();
        this.angleVelocity = new THREE.Vector3();
        this.angleAcceleration = new THREE.Vector3();

        this.isLifeFocusOn = false;

        this.checkCountOn = false;
    }

    update_position(){

        this.life.position.set(this.position.x, this.position.y, this.position.z);
        this.life.rotation.set(this.angle.x, this.angle.y, this.angle.z);

        this.acceleration.add(new THREE.Vector3(
            random(-0.01, 0.01),
            random(-0.01, 0.01),
            random(-0.01, 0.01)
            ));

        this.lifeFocus();
        
        if (this.velocity.length() > 0.1) this.velocity.multiplyScalar(0.01);
        this.velocity.clampLength(0, 0.25);

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        
        this.acceleration.setLength(0);
    }

    lifeFocus(){
        window.addEventListener("keydown", (e) => {
            if (e.key == 'f'){
                this.checkCountOn = true;
            }
        });

        //run once
        if (this.checkCountOn == true){
            this.isLifeFocusOn = !this.isLifeFocusOn;
            console.log(this.isLifeFocusOn);
            if (this.isLifeFocusOn == true){
                threeSystemController.worldThreeSystem.controls.enabled = false;
            } else {
                threeSystemController.worldThreeSystem.camera.position.set(50, 50, 120);
                threeSystemController.worldThreeSystem.camera.lookAt(0, 0, 0);
                threeSystemController.worldThreeSystem.controls.enabled = true;
            }
            this.checkCountOn = false;
        }

        if (this.isLifeFocusOn == true){
            this.keyControl();
            threeSystemController.worldThreeSystem.camera.position.set(
                this.position.x + (this.size + this.sizeMax), 
                this.position.y + (this.size + this.sizeMax), 
                this.position.z + (this.size + this.sizeMax)*3);
            threeSystemController.worldThreeSystem.camera.lookAt(this.position.x, this.position.y, this.position.z);
        } 
        
    }

    keyControl(){
        window.addEventListener("keydown", (e) => {
            //console.log(e);
            if (e.key == 'w'){
                this.acceleration.z -= 0.01;
            } 
            if (e.key == 's') {
                this.acceleration.z += 0.01;
            }
            if (e.key == 'a') {
                this.acceleration.x -= 0.01;
            }
            if (e.key == 'd') {
                this.acceleration.x += 0.01;
            }

            this.acceleration.setLength(1);
        });
    }

    goLeft(){
        
    }
}