class ParticleSystem{
    constructor(lifeSystem){
        this.size = lifeSystem.windowSize;
        this.num = lifeSystem.windowSize * 80;

        this.particles = [];
        this.particles_positions = [];
        
        for (let i = 0; i < this.num; i++) {
            var p = new MicroPlastic(i, this.size);
            this.particles.push(p);
            this.particles_positions.push(p.position);
        }

        this.lifes = lifeSystem.lifes; 
        this.life_user = lifeSystem.lifes[0];

        this.material = createPointMaterial();
    }

    update(){
        const positions = this.points.geometry.attributes.position.array; // buffer attribute position array
        
        for (let i = 0; i < positions.length; i += 3) {
            const index = i/3;

            positions[i+0] = this.particles[index].position.x;
            positions[i+1] = this.particles[index].position.y;
            positions[i+2] = this.particles[index].position.z;

            //this.particles[index].update();

            this.lifes.forEach(life => {
               life.breath(this.particles[index]);
                if (life.energy < life.hungryValue) life.eat(this.particles[index]);  
            });

            this.life_user.eat(this.particles[index]);
            this.life_user.breath(this.particles[index]);
        }

        this.points.geometry.attributes.position.needsUpdate = true;
    }

    display(threeSystemController){
        var geometry = new THREE.BufferGeometry().setFromPoints(this.particles_positions);
        
        this.points = new THREE.Points(geometry, this.material);
        this.points.position.set(0, 0, 0);

        threeSystemController.addToWorldScene(this.points);
    }
}