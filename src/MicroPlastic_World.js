function MicroPlastic_Particles (num, size){
    this.num = num;

    this.pos = [];
    this.vel = [];
    this.acc = [];

    this.size = size;
    this.gridSize = 10;

    for (let i = 0; i < num; i++) {
        this.pos.push(new THREE.Vector3(
            random(-this.size, this.size),
            random(-this.size, this.size),
            random(-this.size, this.size)
        ));

        this.vel.push(new THREE.Vector3(
            random(-0.01, 0.01),
            random(-0.01, 0.01),
            random(-0.01, 0.01)
        ));

        this.acc.push(new THREE.Vector3(
            0,
            0,
            0
        ));
    }

    this.display();
}

MicroPlastic_Particles.prototype.display = function(){
    var geometry = new THREE.BufferGeometry().setFromPoints(this.pos);

    var material = new THREE.PointsMaterial({
        size: random(0.001, 0.05),
        color:'white'
    });

    this.points = new THREE.Points(geometry, material);
    this.points.position.set(random(-this.size/10, this.size/10), random(-this.size/10, this.size/10), 0);
}

MicroPlastic_Particles.prototype.follow = function(vectors){
    var x = Math.floor(this.pos.x / this.gridSize);
    var y = Math.floor(this.pos.y / this.gridSize);
    var z = Math.floor(this.pos.z / this.gridSize);
    var index = (y * (this.gridSize * this.gridSize)) + (x * this.gridSize) + z;
    var force = vectors[index];
    this.applyForce(force);
}

MicroPlastic_Particles.prototype.applyForce = function(force){
    const positions = this.points.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        var index = i/3;
        this.acc[index].add(new THREE.Vector3(force));
    }
}

MicroPlastic_Particles.prototype.update = function(){

    const positions = this.points.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {

        var index = i/3;

        // MOVE =============================
        this.vel[index].add(this.acc[index]);
        this.pos[index].add(this.vel[index]);
        if (this.vel[index].length() > 0.01) this.vel[index].setLength(0.01);
        this.acc[index].setLength(0);

        positions[i+0] = this.pos[index].x;
        positions[i+1] = this.pos[index].y;
        positions[i+2] = this.pos[index].z;

        // WRAP =============================
        if (this.pos[index].x > this.size) {
            this.pos[index].x = -this.size;
        } else if (this.pos[index].x < -this.size){
            this.pos[index].x = this.size - 1;
        }
        if (this.pos[index].y > this.size) {
            this.pos[index].y = -this.size;
        } else if (this.pos[index].y < -this.size){
            this.pos[index].y = this.size - 1;
        }
        if (this.pos[index].z > this.size) {
            this.pos[index].z = -this.size;
        } else if (this.pos[index].z < -this.size){
            this.pos[index].z = this.size - 1;
        }
    }

    this.points.geometry.attributes.position.needsUpdate = true;

    //this.points.geometry.computeBoundingBox();
    //this.points.geometry.computeBoundingSphere();
}
