class MicroPlastic {
    constructor(index, size) {
      //this.type = [PP, PE, PET];
      this._index = index;
      this.size = size;
  
      this.position = new THREE.Vector3(random(-this.size, this.size), 
                                        random(-this.size, this.size), 
                                        random(-this.size, this.size));
      this.velocity = new THREE.Vector3(random(-0.01, 0.01),
                                        random(-0.01, 0.01),
                                        random(-0.01, 0.01));
      this.acceleration = new THREE.Vector3(0, 0, 0);
  
      this.angle = 0;
      this.angleVelocity = 0;
      this.angleAcceleration = 0;
  
      this.size = 0.05;
  
      this.color = new THREE.Color('white');
      this.opacity = 1.0;
  
      this.toxicity = false;
    }
  
    update(){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      if (this.velocity.length() > 0.01) this.velocity.setLength(0.01);
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
      if (this.position.x > size) {
        this.position.x = -size;
      } else if (this.position.x < -size){
          this.position.x = size - 1;
      }
      if (this.position.y > size) {
          this.position.y = -size;
      } else if (this.position.y < -size){
          this.position.y = size - 1;
      }
      if (this.position.z > size) {
          this.position.z = -size;
      } else if (this.position.z < -size){
          this.position.z = size - 1;
      }
    }
  
    eaten_follow(){
  
    }
  
    eaten_becomeSarira(){
      //reset position when this particle disappear
  
    }
  
  }
  