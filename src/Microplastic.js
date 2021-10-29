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
        this.mass = this.density * this.size 
    }

    applyForce(force) {
        let f = _.cloneDeep(force)
        f.divideScalar(this.mass);
        this.acceleration.add(f);
    }

    walk(bufferGeometry,index) {
        this.velocity.add(this.acceleration)
        bufferGeometry.attributes.position.array[index*3] += this.velocity.x
        bufferGeometry.attributes.position.array[(index*3)+1] += this.velocity.y
        bufferGeometry.attributes.position.array[(index*3)+2] += this.velocity.z
        this.acceleration.multiplyScalar(0)
    }
    getPosition(bufferGeometry,index) {
        bufferGeometry.attributes.position.needsUpdate = true
        bufferGeometry.attributes.color.needsUpdate = true
        bufferGeometry.attributes.size.needsUpdate = true
        for (let i = 0; i < 3; i++) {
            this.positionList[i] = bufferGeometry.attributes.position.array[index*3+i]
        }
        this.positionVector3.set(this.positionList[0], this.positionList[1], this.positionList[2])
    }

    updateBuffer(bufferGeometry, index) {
     
        for (let i = 0; i < 3; i++) {
            bufferGeometry.attributes.position.array[((index - 1) * 3) + i] = this.positionList[i]
            bufferGeometry.attributes.color.array[((index - 1) * 3) + i] = this.color[i]
        }
        bufferGeometry.attributes.size.array[index-1] = this.size
        bufferGeometry.setDrawRange(0, index);
    }

    deleteBuffer(bufferGeometry, index) {
     
        for (let i = 0; i < 3; i++) {
            bufferGeometry.attributes.position.array[((index - 1) * 3) + i] = 0
            bufferGeometry.attributes.color.array[((index - 1) * 3) + i] =  0
        }
        bufferGeometry.attributes.size.array[index-1] = 0
        bufferGeometry.setDrawRange(0, index-1);
    }

    checkStuck(others){
        
        for (let i = 0; i < others.length; i++) {
            let d2 = this.positionVector3.distanceTo(others[i].positionVector3)
            print(this.size+others[i].size)

            if (d2 <(this.size + others[i].size)){
              // print(true) //+ (this.tensileStrength + others[i].tensileStrength) / 2)) {
               return true
             }
        }
        return false
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