class BodySystem {

    constructor(threeSystem, index = 0) {
        index == 0 ? this.isUser = true : this.isUser = false;
        this.threeSystem = threeSystem
        this.threeSystem.element==document.querySelector("#sarira") ? this.isWindow=true : this.isWindow=false
        

        this.floatingPlasticsList = new Array(0)

        this.microType = ["Polyethylene", "Polypropylene", "Polystyrene", "Polyamide", "Polyester", "Acrylic", "Polyacetal", "PolyvinylChloride", "Polyurethane"]
        this.densityList = [0.94, 0.92, 1.05, 1.14, 1.4, 1.2, 1.42, 1.38, 0.425]
        this.tensileStrengthList = [4554, 5440, 7700, 12400, 11500, 9400, 10007, 7500, 2596]

        this.positionVector3 = new THREE.Vector3(0, 0, 0)
    }

    getLifePosition(positionList) {

        this.sarira.updateVerticesFromLife(positionList) //microplastic.movewithlife
        this.sarira.updateConvexAll()
    }

    createBuffer(material) {
        this.floatingBuffer = new Buffer()
        this.particleMaterial = material;

        this.floatingBuffer.initialize(this.particleMaterial)
        
        this.sariraBuffer = new Buffer()
        this.sariraBuffer.initialize(this.particleMaterial)
        this.sariraBuffer.render(this.threeSystem)
    }

    createSarira(convexMaterial) {
        this.convexMaterial = convexMaterial
        this.sarira = new Sarira(this.threeSystem, this.particleMaterial, this.convexMaterial, this.sariraBuffer.bufferGeometry, )
        this.sarira.initializeCore(this.positionVector3, this.isUser)
    }

    createTerminal() {
        this.terminal = new Terminal()
        this.terminal.initializeCategory()
        this.sarira.addMetaData(this.terminal)
        this.terminal.createMetaDataText()
    }

    update() {
        this.moveFloatingPlastics()
        this.updateSarira() //micro.getposition-microupdateBuffer-micro.switch
        this.sarira.getPosition()

    }

    addFloatingPlastics(positionList, passDataList) {

        
        let tempMicro = new Microplastic(this.threeSystem, this.particleMaterial)

        tempMicro.initialize(positionList, this.densityList[this.checkIndex(passDataList)], this.tensileStrengthList[this.checkIndex(passDataList)])
        if (this.terminal != undefined) {
            tempMicro.initializePassDataList(passDataList)

        }
        this.floatingPlasticsList.push(tempMicro)
        tempMicro.updateBuffer(this.floatingBuffer.bufferGeometry, this.floatingPlasticsList.length)
    }

    moveFloatingPlastics() {

        for (let [index, micro] of this.floatingPlasticsList.entries()) {
            let force = this.sarira.plasticList[0].attract(micro);
            micro.getPosition(this.floatingBuffer.bufferGeometry, index);
            micro.applyForce(force);
            micro.walk(this.floatingBuffer.bufferGeometry, index)
        }
    }

    updateSarira() {
        for (let [index, micro] of this.floatingPlasticsList.entries()) {

            if (micro.checkStuck(this.sarira.plasticList)) {

                this.sarira.addPlastics(micro)

                if (this.terminal != undefined) {
                    this.sarira.addMetaData(this.terminal)
                    this.terminal.createMetaDataText()
                }
                // micro.getPosition(this.floatingBuffer.bufferGeometry, index)
                micro.updateBuffer(this.sariraBuffer.bufferGeometry, this.sarira.plasticList.length)
                micro.switch(this.floatingBuffer.bufferGeometry, index, this.floatingPlasticsList)

                if (this.terminal != undefined) {
                    this.sarira.updateConvex(micro)
                    this.sarira.updateConvexAll()

                }
                this.sarira.initializeConvex()
            }
        }
    }

    checkIndex(passDataList) {
        for (let i = 0; i < this.microType.length; i++) {
            if (passDataList[2] == this.microType[i]) {
                return i
            }
        }
    }
}