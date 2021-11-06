class MicroPlastic {
    constructor(index, spaceSize) {
      this.index = index;
      this.spaceSize = spaceSize;

      this.velV = 0.02;
  
      this.position = new THREE.Vector3(
        random(-spaceSize, spaceSize), 
        random(-spaceSize, spaceSize), 
        random(-spaceSize, spaceSize));

      if (this.position.length() > spaceSize) this.position.setLength(spaceSize);
      
        this.velocity = new THREE.Vector3(
        random(-this.velV, this.velV),
        random(-this.velV, this.velV),
        random(-this.velV, this.velV));
      this.acceleration = new THREE.Vector3(0, 0, 0);
  
      this.angle = new THREE.Vector3(0, 0, 0);
      this.angleVelocity = new THREE.Vector3(0, 0, 0);
      this.angleAcceleration = new THREE.Vector3(0, 0, 0);
      
      this.isEaten = false;

      this.wrap_init();

      //======================================================
      //DATA==================================================
      //this.type = [PP, PE, PET];
      this.color = new THREE.Color('white');
      this.opacity = 1.0;
  
      this.toxicity = false;
    }
  
    update(){
      this.applyForce(new THREE.Vector3(
        random(-0.001, 0.001),
        random(-0.001, 0.001),
        random(-0.001, 0.001)
      ));
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      if (this.velocity.length() > 0.1) this.velocity.multiplyScalar(0.01);
      this.acceleration.setLength(0);

      this.wrap();
    }
  
    applyForce(force){
      this.acceleration.add(force);
    }

    wrap_init(){
      this.wrapCenter = new THREE.Vector3(0, 0, 0);
      this.wrapSize = this.spaceSize * 1.2;
    }
  
    wrap(){
      var distance = this.wrapCenter.distanceTo(this.position);
      if (distance > this.wrapSize){
        this.velocity.multiplyScalar(-0.9999);
      } 
    }

    separate(otherParticles){
      const separationDistance = 0.3;
      const sum = new THREE.Vector3();
      const count = 0;

      for (let i = 0; i < otherParticles.length; i++) {
        var d = this.position.distanceTo(otherParticles[i].position);
        if (d < separationDistance && d > 0){
          var diff = new THREE.Vector3().subVectors(this.position, otherParticles[i].position);
          diff.normalize();
          diff.divideScalar(d);
          sum.add(diff);
          count++;
        }
      }

      if (count > 0){
        sum.divideScalar(count);
        sum.setLength(0.1);
        var steer = new THREE.Vector3().subVectors(sum, this.velocity);
        steer.clampLength(0, 0.1);
        return steer;
      }
    }

    seek(target){
      var desired = new THREE.Vector3().subVectors(target, this.position);
      desired.normalize();
      desired.multiplyScalar(0.1);
      var steer = new THREE.Vector3().subVectors(desired, this.velocity);
      steer.clampLength(0.1);
      return steer;
    }
  }
  