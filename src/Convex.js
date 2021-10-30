class Convex  {

    constructor(shader) {
        

    }

    initilaizeBuffer(points) {

        this.geometry = new THREE.ConvexGeometry();
    }
    
    initializeMaterial() {
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true
        });
    }
    makeMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        threeSystemController.addToSariraScene(this.mesh)
    }

}