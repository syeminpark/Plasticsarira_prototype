class MicroPlastic {
    constructor(index, size) {
      //this.type = [PP, PE, PET];
      this._index = index;
      this.size = size;

      this.velV = 0.01;
  
      this.position = new THREE.Vector3(
        random(-this.size, this.size), 
        random(-this.size, this.size), 
        random(-this.size, this.size));

      if (this.position.length() > size) this.position.setLength(size);
      
        this.velocity = new THREE.Vector3(
        random(-this.velV, this.velV),
        random(-this.velV, this.velV),
        random(-this.velV, this.velV));
      this.acceleration = new THREE.Vector3(0, 0, 0);
  
      this.angle = new THREE.Vector3(0, 0, 0);
      this.angleVelocity = new THREE.Vector3(0, 0, 0);
      this.angleAcceleration = new THREE.Vector3(0, 0, 0);
    
      this.color = new THREE.Color('white');
      this.opacity = 1.0;
  
      this.toxicity = false;

      this.isEaten = false;
    }
  
    update(){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.velocity.clampLength(0, 0.5);
      if (this.velocity.length() > 0.4) this.velocity.multiplyScalar(0.05);
      this.acceleration.setLength(0);
    }
  
    follow_flowField(vectors){
      var x = Math.floor(this.pos.x / this.gridSize);
      var y = Math.floor(this.pos.y / this.gridSize);
      var z = Math.floor(this.pos.z / this.gridSize);
      var index = (y * (this.gridSize * this.gridSize)) + (x * this.gridSize) + z;
      var force = vectors[index];
      this.applyForce(force);
    }
  
    applyForce(force){
      this.acceleration.add(force);
    }
  
    wrap(size){
      const distance = this.position.length();

      if (distance > size*1.2){
        this.velocity.multiplyScalar(-1);
      } 
    }
  
    eaten_becomeSarira(){
      this.velocity.multiplyScalar(0.9999); //0.5, 0.1
      // if (this.velocity.length() < 0.000001) {
      //   this.velocity.setLength(0.0000001);
      // }

      //this.isEaten = true;
    }
  }
  