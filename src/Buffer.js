class Buffer {

    constructor() {
        this.maxPoints = 500;
        this.positionsEmptyList = new Float32Array(this.maxPoints * 3);
        this.colorsEmptyList = new Float32Array(this.maxPoints * 3);
    }

    initialize(threeSystem) {
        this.bufferGeometry = new THREE.BufferGeometry();

        this.pointMaterial = new THREE.PointsMaterial({
            vertexColors: THREE.VertexColors,
            size: 5
        });
        this.bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positionsEmptyList, 3));
        this.bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(this.colorsEmptyList, 3));
        
        let point = new THREE.Points(this.bufferGeometry, this.pointMaterial);

        let drawCount = 1;
        this.bufferGeometry.setDrawRange(0, drawCount);
   
        threeSystem.scene.add(point)
    }



}