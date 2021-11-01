class Convex {

    constructor(bufferGeometry) {
        this.vertices = []

        this.initializeBuffer(bufferGeometry)
        this.initializeMaterial()
        this.initializeMesh()
    }

    //must be at least three points. 
    initializeBuffer(bufferGeometry) {
        const positionAttribute = bufferGeometry.getAttribute('position');

        for (let i = 0; i < 4; i++) {
            const vertex = new THREE.Vector3();
            vertex.fromBufferAttribute(positionAttribute, i);
            this.vertices.push(vertex);
        }
        this.meshGeometry = new THREE.ConvexGeometry(this.vertices);
    }

    updateBuffer(plastic) {
        this.meshGeometry.dispose()
        threeSystemController.sariraThreeSystem.scene.remove(this.mesh1);
        threeSystemController.sariraThreeSystem.scene.remove(this.mesh2);

        this.vertices.push(plastic.positionVector3);
        this.meshGeometry = new THREE.ConvexGeometry(this.vertices);
        this.initializeMesh()
    }

    initializeMesh() {
        this.mesh1 = new THREE.Mesh(this.meshGeometry, this.material);
        this.mesh1.material.side = THREE.BackSide; // back faces
        this.mesh1.renderOrder = 0;
        this.mesh2 = new THREE.Mesh(this.meshGeometry, this.material.clone());
        this.mesh2.material.side = THREE.FrontSide; // front faces
        this.mesh2.renderOrder = 1;

        threeSystemController.addToSariraScene(this.mesh1, this.mesh2);
    }

    initializeMaterial() {

        this.material = new THREE.MeshPhysicalMaterial({
            transmission: 0.95,
            thickness: 0.5,
            roughness: 0.44,
            metalness: 0,
            reflectivity:0.5,
            clearcoat: 1,
            clearcoatRoughness: 0,
        });
    }




}