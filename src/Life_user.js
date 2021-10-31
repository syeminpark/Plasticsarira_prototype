class Life_user extends Life {
    constructor(){
        super(1, 0);
        this.position = new THREE.Vector3();

        this.angle = new THREE.Vector3();
        this.angleVelocity = new THREE.Vector3();
        this.angleAcceleration = new THREE.Vector3();
    }

    update_position(){
        this.life.position.set(this.position.x, this.position.y, this.position.z);
        this.life.rotation.set(this.angle.x, this.angle.y, this.angle.z);

        window.addEventListener("keydown", (e) => {
            //console.log(e);
            if (e.key == 'w') this.acceleration.z -= 0.01;
            if (e.key == 's') this.acceleration.z += 0.01;
            if (e.key == 'a') this.acceleration.x -= 0.01;
            if (e.key == 'd') this.acceleration.x += 0.01;
        });

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.velocity.multiplyScalar(0.05);
        this.velocity.clampLength(0, 0.1);
        this.acceleration.setLength(0);
    }
}