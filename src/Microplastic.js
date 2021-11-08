class Microplastic {

    //later create size and color parameter
    constructor(threeSystem) {
        this.velocity = new THREE.Vector3(1, 0, 0)
        this.acceleration = new THREE.Vector3(0, 0, 0)
        this.positionVector3 = new THREE.Vector3(0, 0, 0)
        // this.color = [1, 1, 1] // [Math.random(), Math.random(), Math.random()]
        this.size = plastiSarira.particleMaterial.size

        this.threeSystem = threeSystem
    }

    initialize(positionList, density, tensileStrength) {

        this.positionList = [positionList.x, positionList.y, positionList.z]
        this.mass = density * this.size / 10
        this.tensileStrength = map(tensileStrength, 2596, 12400, 0, 0.1)
    }

    initializePassDataList(passDataList) {
        let today = new Date()
        let dateRetrieved = `${today.getFullYear()}.${(today.getMonth() + 1)}.${today.getDate()}/${today.getHours()}:${today.getMinutes()}:${this.addZeroToSeconds(today)} ${this.getAmPm(today)}`;
        this.passDataList = _.cloneDeep(passDataList)
        this.passDataList.push(dateRetrieved)
    }

    applyForce(force) {
        let f = _.cloneDeep(force)
        f.divideScalar(this.mass);
        this.acceleration.add(f);
    }

    walk(bufferGeometry, index) {
        this.velocity.add(this.acceleration)
        bufferGeometry.attributes.position.array[index * 3] += this.velocity.x
        bufferGeometry.attributes.position.array[(index * 3) + 1] += this.velocity.y
        bufferGeometry.attributes.position.array[(index * 3) + 2] += this.velocity.z
        this.acceleration.multiplyScalar(0)
    }

    getPosition(bufferGeometry, index) {
        bufferGeometry.attributes.position.needsUpdate = true
        //  bufferGeometry.attributes.color.needsUpdate = true
        let positionList = []
        for (let i = 0; i < 3; i++) {
            this.positionList[i] = bufferGeometry.attributes.position.array[(index * 3) + i]
        }
        this.positionVector3.set(this.positionList[0], this.positionList[1], this.positionList[2])

    }

    updateBuffer(bufferGeometry, indexLength) {
        
        for (let i = 0; i < 3; i++) {
            bufferGeometry.attributes.position.array[((indexLength - 1) * 3) + i] = this.positionList[i]
            //  bufferGeometry.attributes.color.array[((indexLength - 1) * 3) + i] = this.color[i]
        }
        bufferGeometry.setDrawRange(0, indexLength);
    }

    switch (bufferGeometry, index, list) {
        let lastIndex = list.length - 1
        for (let i = 0; i < 3; i++) {
            bufferGeometry.attributes.position.array[(index * 3) + i] = bufferGeometry.attributes.position.array[(lastIndex * 3) + i]
            // bufferGeometry.attributes.color.array[(index * 3) + i] = bufferGeometry.attributes.color.array[(lastIndex * 3) + i]
        }

        for (let i = 0; i < 3; i++) {
            bufferGeometry.attributes.position.array[(lastIndex * 3) + i] = 0
            //  bufferGeometry.attributes.color.array[(lastIndex * 3) + i] = 0
        }

        list[index] = list[lastIndex]
        list.splice(lastIndex, 1)
        bufferGeometry.setDrawRange(0, lastIndex);
    }

    checkStuck(others) {

        for (let i = 0; i < others.length; i++) {

            let d2 = this.positionVector3.distanceTo(others[i].positionVector3)
            if ((d2 < this.size + others[i].size) +
                (this.tensileStrength + others[i].tensileStrength) / 2) {
                return true
            }
        }
        return false
    }

    moveWithLife(lifePositionList, bufferGeometry, index) {

        let newLifePositionList = [lifePositionList.x, lifePositionList.y, lifePositionList.z]
        for (let i = 0; i < 3; i++) {
            bufferGeometry.attributes.position.array[(index * 3) + i] = newLifePositionList[i] + this.positionList[i]
            bufferGeometry.attributes.position.needsUpdate = true
        }
    }



    addZeroToSeconds(today) {
        return today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds()
    }

    getAmPm(today) {
        return today.getHours() >= 12 ? 'PM' : 'AM';
    }
}