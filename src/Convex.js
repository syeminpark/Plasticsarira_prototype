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
        threeSystemController.sariraThreeSystem.scene.remove(this.convexMeshBack);
        threeSystemController.sariraThreeSystem.scene.remove(this.convexMeshFront);

        this.vertices.push(plastic.positionVector3);
        this.meshGeometry = new THREE.ConvexGeometry(this.vertices);
        this.initializeMesh()
    }

    initializeMesh() {
        this.convexMeshBack = new THREE.Mesh(this.meshGeometry, this.material);
        this.convexMeshBack.material.side = THREE.BackSide; // back faces
        this.convexMeshBack.renderOrder = 0;
        this.convexMeshFront = new THREE.Mesh(this.meshGeometry, this.material.clone());
        this.convexMeshFront.material.side = THREE.FrontSide; // front faces
        this.convexMeshFront.renderOrder = 1;

    }

    getMesh(){
       return [this.convexMeshFront,this.convexMeshBack,]
    }

    initializeMaterial() {
        this.material = new THREE.MeshPhysicalMaterial({
            transmission: 0.9,
            thickness: 0.1,
            roughness: 0.4,

            clearcoat: 1,
            clearcoatRoughness: 0,
        });
    }




}