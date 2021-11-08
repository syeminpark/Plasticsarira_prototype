class ParticleSystem{
    constructor(lifeSystem){
        this.num = 10000;
        this.size = 150;

        this.particles = [];
        this.particles_positions = [];
        
        for (let i = 0; i < this.num; i++) {
            var p = new MicroPlastic(i, this.size);
            this.particles.push(p);
            this.particles_positions.push(p.position);
        }

        //this.positionAttributes = new THREE.BufferAttribute();

        this.lifes = lifeSystem.lifes; //array
        this.life_user = lifeSystem.lifes[0];
    }

    update(bodySystem,threeSystem){
        const positions = this.points.geometry.attributes.position.array; // buffer attribute position array
        
        for (let i = 0; i < positions.length; i += 3) {
            const index = i/3;

            positions[i+0] = this.particles[index].position.x;
            positions[i+1] = this.particles[index].position.y;
            positions[i+2] = this.particles[index].position.z;

            this.particles[index].update();

            this.lifes.forEach(life => {
                life.eat(this.particles[index]);  
                life.breath(this.particles[index]);  
            });

            this.life_user.eat(this.particles[index]);
            this.life_user.breath(this.particles[index]);
        }

        // for (let j = positions.length - 1; j >= 0; j-= 3) {
        //     const index = Math.floor(j/3);
        //     if (this.particles[index].becomeSarira == true) {
        //         this.particles.splice(index, 1);
        //         this.particles_positions.splice(index, 1);
        //         console.log(positions.length);
        //     }
        // }

        this.points.geometry.attributes.position.needsUpdate = true;
    }

    display(threeSystemController){
        var geometry = new THREE.BufferGeometry().setFromPoints(this.particles_positions);
        
        var material = new THREE.PointsMaterial({
            size: 0.1,
            color:'white'
        });
        //var material = new THREE.MeshNormalMaterial({wireframe:false});

        this.points = new THREE.Points(geometry, material);
        this.points.position.set(0, 0, 0);

        threeSystemController.addToWorldScene(this.points);
        return material
    }
}