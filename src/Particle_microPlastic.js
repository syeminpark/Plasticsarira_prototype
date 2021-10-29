class MicroPlastic {
    constructor(index, size) {
      //this.type = [PP, PE, PET];
      this._index = index;
      this.size = size;

      this.velV = 0.05;
  
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
    }
  
    update(){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      if (this.velocity.length() > 0.5) this.velocity.setLength(0.5);
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
      this.acceleration.add(new THREE.Vector3(force));
    }
  
    wrap(size){
      const distance = this.position.length();

      if (distance > size*1.2){
        this.velocity.multiplyScalar(-1);
      } 
    }
  
    eaten_follow(){
  
    }
  
    eaten_becomeSarira(){
      //reset position when this particle disappear
  
    }
  
  }
  