class Buffer {

    constructor(shader) {
        this.maxPoints = 500;
        this.shader = shader
        this.positionsEmptyList = new Float32Array(this.maxPoints * 3);
        this.colorsEmptyList = new Float32Array(this.maxPoints * 3);
        this.sizeEmptyList = new Float32Array(this.maxPoints);
    }

    initialize() {
        this.initilaizeBuffer()
        this.initializeMaterial()
        this.setAttribute()
        this.makePoint()
        this.setDrawCount()

    }

    initilaizeBuffer() {
        this.floatingGeometry = new THREE.BufferGeometry();
        this.sariraGeometry = new THREE.BufferGeometry();
        this.bufferGeometryList = [this.floatingGeometry, this.sariraGeometry]

    }

    initializeMaterial() {
        this.pointMaterial = new THREE.PointsMaterial({
            vertexColors: THREE.VertexColors,
        });

    }
    setAttribute() {
        for (let bufferGeometry of this.bufferGeometryList) {
            bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positionsEmptyList, 3));
            bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(this.colorsEmptyList, 3));
            bufferGeometry.setAttribute('size', new THREE.Float32BufferAttribute(this.sizeEmptyList, 1).setUsage(THREE.DynamicDrawUsage));
        }
    }

    makePoint() {
        this.floatingPoint = new THREE.Points(this.floatingGeometry, this.shader.shaderMaterial);
        this.sariraPoint = new THREE.Points(this.sariraGeometry, this.shader.shaderMaterial);

        threeSystemController.addToSariraScene(this.floatingPoint, this.sariraPoint)

    }

    setDrawCount() {
        let drawCount = 1;
        this.floatingGeometry.setDrawRange(0, drawCount);
        this.sariraGeometry.setDrawRange(0, drawCount)
    }


}