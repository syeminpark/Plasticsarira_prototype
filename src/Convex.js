class Convex {

    constructor(threeSystem) {
        this.vertices = new Array(0)
        this.meshObject = {}
        this.group = new THREE.Object3D
        this.groupName = Symbol()
        this.threeSystem = threeSystem
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

        this.clearObject()

        this.vertices.push(plastic.positionVector3);
        this.meshGeometry = new THREE.ConvexGeometry(this.vertices);
    }

    updateVertices(bufferGeometry, sariraListlength) {

        this.clearObject()
        this.vertices = []

        const positionAttribute = bufferGeometry.getAttribute('position');

        for (let i = 0; i < sariraListlength; i++) {
            const vertex = new THREE.Vector3();
            vertex.fromBufferAttribute(positionAttribute, i);
            this.vertices.push(vertex)
        }

        this.meshGeometry = new THREE.ConvexGeometry(this.vertices);
    }



    initializeMesh(material) {

        this.convexMeshBack = new THREE.Mesh(this.meshGeometry, material);
        this.convexMeshBack.material.side = THREE.BackSide; // back faces
        this.convexMeshBack.renderOrder = 0;
        this.convexMeshFront = new THREE.Mesh(this.meshGeometry, material.clone());
        this.convexMeshFront.material.side = THREE.FrontSide; // front faces
        this.convexMeshFront.renderOrder = 1

        this.group.add(this.convexMeshBack)
        this.group.add(this.convexMeshFront)
        this.group.name = this.groupName
        this.threeSystem.scene.add(this.group)
        
    }


    initializeMaterial() {
        let material = new THREE.MeshPhysicalMaterial({
            transmission: 0.95,
            thickness: 0.1,
            roughness: 0.4,
            clearcoat: 1,
            clearcoatRoughness: 0,
        });
        return material
    }

    clearObject() {
        let selectedObject = this.threeSystem.scene.getObjectByName(this.groupName);
        this.threeSystem.scene.remove(selectedObject);
        this.meshGeometry.dispose()
        this.group.clear()
    }

}
///add unique id then add to scene.