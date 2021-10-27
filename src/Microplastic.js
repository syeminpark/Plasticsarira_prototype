class Microplastic {

    //later create size and color parameter
    constructor() {
        this.velocity = new THREE.Vector3(1, 0, 0)
        this.phase = Math.random()
        this.acceleration = new THREE.Vector3(0, 0, 0)
        this.density = 1;
        this.positionVector3 = new THREE.Vector3(0, 0, 0)
    }

    initialize(positionList, size) {

        this.positionList = positionList || this.randomPoint()
        this.size = size || Math.random() * (50 - 1) + 1
        this.color = [Math.random(), Math.random(), Math.random()]
        this.mass = this.density * this.size * 2
    }

    applyForce(force) {
        let f = _.cloneDeep(force)
        f.divideScalar(this.mass);
        this.acceleration.add(f);
    }

    walk() {
        this.velocity.add(this.acceleration)
        this.point.geometry.attributes.position.array[0] += this.velocity.x
        this.point.geometry.attributes.position.array[1] += this.velocity.y
        this.point.geometry.attributes.position.array[2] = this.velocity.z
        this.acceleration.multiplyScalar(0)
    }
    getPosition() {
        for (let i = 0; i < 3; i++) {
            this.positionList[i] = this.point.geometry.attributes.position.array[i]
        }
        this.positionVector3.set(this.positionList[0], this.positionList[1], this.positionList[2])
    }

    updateBuffer(bufferGeometry, index) {
        for (let i = 0; i < 3; i++) {
            bufferGeometry.attributes.position.array[((index - 1) * 3) + i] = this.positionList[i]
            bufferGeometry.attributes.color.array[((index - 1) * 3) + i] = this.color[i]
        }
        bufferGeometry.attributes.size.array[index] = this.size
        bufferGeometry.setDrawRange(0, index);

        bufferGeometry.attributes.position.needsUpdate = true
        bufferGeometry.attributes.color.needsUpdate = true
        bufferGeometry.attributes.size.needsUpdate = true
        print(this.bufferGeometry)
    }

    randomPoint() {
        let i = Math.round(Math.random() * 5)
        let x = Math.random() * (threeSystemController.sariraThreeSystem.controls.object.position.x + threeSystemController.sariraThreeSystem.controls.object.position.x) - threeSystemController.sariraThreeSystem.controls.object.position.x;
        let y = Math.random() * (threeSystemController.sariraThreeSystem.controls.object.position.y + threeSystemController.sariraThreeSystem.controls.object.position.y) - threeSystemController.sariraThreeSystem.controls.object.position.y;
        let z = Math.random() * (threeSystemController.sariraThreeSystem.controls.object.position.z + threeSystemController.sariraThreeSystem.controls.object.position.z) - threeSystemController.sariraThreeSystem.controls.object.position.z;
        let randPoint;
        if (i === 0) {
            //top
            randPoint = [x, threeSystemController.sariraThreeSystem.controls.object.position.y, z]
            //bottom
        } else if (i == 1) {
            randPoint = [x, -threeSystemController.sariraThreeSystem.controls.object.position.y, z]
            //left
        } else if (i == 2) {
            randPoint = [-threeSystemController.sariraThreeSystem.controls.object.position.x, y, z]
            //right 
        } else if (i == 3) {
            randPoint = [threeSystemController.sariraThreeSystem.controls.object.position.x, y, z]
        }
        //front
        else if (i == 4) {
            randPoint = [x, y, threeSystemController.sariraThreeSystem.controls.object.position.z]
        }
        //back     
        else {
            randPoint = [x, y, -threeSystemController.sariraThreeSystem.controls.object.position.z]
        }
        return randPoint
    }



}