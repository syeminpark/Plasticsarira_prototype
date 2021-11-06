class Buffer {

    constructor() {
        this.maxPoints = 500;
        this.positionsEmptyList = new Float32Array(this.maxPoints * 3);
        this.colorsEmptyList = new Float32Array(this.maxPoints * 3);
    }

    initializeMaterial(){
        let pointMaterial = new THREE.PointsMaterial({
            vertexColors: THREE.VertexColors,
            size: 5
        });
        return pointMaterial
    }

    initialize(threeSystem,material) {
        this.bufferGeometry = new THREE.BufferGeometry();
        this.bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positionsEmptyList, 3));
        this.bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(this.colorsEmptyList, 3));
        this.bufferGeometry.setDrawRange(0, 1);

        let point = new THREE.Points(this.bufferGeometry, material);

        threeSystem.scene.add(point)
    }



}