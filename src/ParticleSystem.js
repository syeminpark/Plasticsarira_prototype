class ParticleSystem{
    constructor(){
        this.num = 4000;
        this.size = 100;

        this.particles = [];
        this.p_positions = [];
        
        for (let i = 0; i < this.num; i++) {
            this.p = new MicroPlastic(i, this.size);
            this.particles.push(this.p);
            this.p_positions.push(this.p.position);
        }

        this.display();
    }

    update(){
        const positions = this.points.geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            var index = i/3;

            this.particles[index].update();
    
            positions[i+0] = this.particles[index].position.x;
            positions[i+1] = this.particles[index].position.y;
            positions[i+2] = this.particles[index].position.z;

            this.particles[index].wrap(this.size);
        }

        this.points.geometry.attributes.position.needsUpdate = true;
    }

    display(){
        var geometry = new THREE.BufferGeometry().setFromPoints(this.p_positions);
        
        var material = new THREE.PointsMaterial({
            size: random(0.1, 0.3),
            color:'white'
        });
        //var material = new THREE.MeshNormalMaterial({wireframe:false});

        this.points = new THREE.Points(geometry, material);
        this.points.position.set(0, 0, 0);

        threeSystemController.addToWorldScene(this.points);
    }
}