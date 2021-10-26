class Microplastic {

    //later create size and color parameter
    constructor() {
        this.velocity = new THREE.Vector3(1, 0, 0)
        this.phase = Math.random()
        this.acceleration = new THREE.Vector3(0, 0, 0)
        this.density = 1;

    }
    initialize(positionList, size) {

        this.positionList = positionList || this.randomPoint()
        this.size = size || Math.random() * (5 - 0.01) + 0.01
        this.color = color(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255))
        this.mass = this.density * this.size*2
        this.createPoint()
    }

    applyForce(force) {
        let f = _.cloneDeep(force)
        f.divideScalar(this.mass);
        this.acceleration.add(f);
    }

    walk() {
        this.velocity.add(this.acceleration)
        this.point.geometry.attributes.position.array[0]+= this.velocity.x
        this.point.geometry.attributes.position.array[1]+= this.velocity.y
        this.point.geometry.attributes.position.array[2]= this.velocity.z
        this.acceleration.multiplyScalar(0)
    }
    getPosition() {
        this.bufferGeometry.attributes.position.needsUpdate = true
        this.positionList.set(this.point.geometry.attributes.position.array[0], this.point.geometry.attributes.position.array[1], this.point.geometry.attributes.position.array[2])
        }

    randomPoint() {
        //console.log(threeSystemController.sariraThreeSystem.controls.object.position)
        let i = Math.round(Math.random() * 5)
        let x = Math.random() * (threeSystemController.sariraThreeSystem.controls.object.position.x + threeSystemController.sariraThreeSystem.controls.object.position.x) - threeSystemController.sariraThreeSystem.controls.object.position.x;
        let y = Math.random() * (threeSystemController.sariraThreeSystem.controls.object.position.y + threeSystemController.sariraThreeSystem.controls.object.position.y) - threeSystemController.sariraThreeSystem.controls.object.position.y;
        let z = Math.random() * (threeSystemController.sariraThreeSystem.controls.object.position.z + threeSystemController.sariraThreeSystem.controls.object.position.z) - threeSystemController.sariraThreeSystem.controls.object.position.z;
        let randPoint = new THREE.Vector3(0, 0, 0)
        if (i === 0) {
            //top
            randPoint = new THREE.Vector3(x, threeSystemController.sariraThreeSystem.controls.object.position.y, z);
            //bottom
        } else if (i == 1) {
            randPoint = new THREE.Vector3(x, -threeSystemController.sariraThreeSystem.controls.object.position.y, z)

            //left
        } else if (i == 2) {
            randPoint = new THREE.Vector3(-threeSystemController.sariraThreeSystem.controls.object.position.x, y, z)

            //right 
        } else if (i == 3) {
            randPoint = new THREE.Vector3(threeSystemController.sariraThreeSystem.controls.object.position.x, y, z)
        }
        //front
        else if (i == 4) {
            randPoint = new THREE.Vector3(x, y, threeSystemController.sariraThreeSystem.controls.object.position.z)
        }
        //back
        else {
            randPoint = new THREE.Vector3(x, y, -threeSystemController.sariraThreeSystem.controls.object.position.z)
        }

        return randPoint
    }

    createPoint() { 
        this.bufferGeometry = new THREE.BufferGeometry();
        this.bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new THREE.Vector3(...this.positionList).toArray(), 3));
        this.pointMaterial = new THREE.PointsMaterial({
            size: this.size,
            color: this.color
        });
        this.point = new THREE.Points(this.bufferGeometry, this.pointMaterial);
        threeSystemController.addToSariraScene(this.point)
    }

}