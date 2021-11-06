class BodySystem {

    constructor() {

        this.floatingPlasticsList = new Array(0)
        //Polyethylene= 1  Polypropylene =2  "Polystyrene =3,  Polyamide=4, Polyester =5, Acrylic=6,  Polyacetal=7, PolyvinylChloride=8, Polyurethane=9
        this.densityList = [0.94, 0.92, 1.05, 1.14, 1.4, 1.2, 1.42, 1.38, 0.425]
        this.tensileStrengthList = [4554, 5440, 7700, 12400, 11500, 9400, 10007, 7500, 2596]

        //document.addEventListener('mousedown', this.addFloatingPlastics.bind(this), false);
    }

    createBuffer(threeSystem, material) {

        //만드는 순서가 중요함 .
        this.floatingBuffer = new Buffer()
        material != undefined ? this.material = material : this.material = this.floatingBuffer.initializeMaterial()
        this.floatingBuffer.initialize(threeSystem, this.material)
        this.sariraBuffer = new Buffer()
        this.sariraBuffer.initialize(threeSystem, this.material)
    }

    createSarira(corePostionList) {
        this.sarira = new Sarira()
        this.sarira.initializeCore(corePostionList, this.sariraBuffer.bufferGeometry)
    }

    createTerminal() {
        this.terminal = new Terminal()
        this.terminal.initializeCategory()
        this.sarira.addMetaData(this.terminal)
        this.terminal.createMetaDataText()
    }

    update(threesystem) {
        this.moveFloatingPlastics()
        this.updateSarira(threesystem)

        this.sarira.getPosition(this.sariraBuffer.bufferGeometry)
        this.sarira.initializeConvex(this.sariraBuffer.bufferGeometry, threesystem)
    }

    addFloatingPlastics(positionList, passDataList) {
        //추후에 microplastic을 만드는 것으로 변경 

        let tempMicro = new PE( /*positionList*/ )
        //temp
        passDataList = [false, false, false, false, false]
        tempMicro.initialize(passDataList, /*this.densityList[this.checkIndex(passDataList)], this.tensileStrength[this.checkIndex(passDataList)]*/ )
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

    updateSarira(threesystem) {
        for (let [index, micro] of this.floatingPlasticsList.entries()) {
            if (micro.checkStuck(this.sarira.plasticList)) {
                this.sarira.addPlastics(micro)

                if (this.terminal != undefined) {
                    this.sarira.addMetaData(this.terminal)
                    this.terminal.createMetaDataText()
                }

                micro.getPosition(this.floatingBuffer.bufferGeometry, index)
                micro.updateBuffer(this.sariraBuffer.bufferGeometry, this.sarira.plasticList.length)
                micro.switch(this.floatingBuffer.bufferGeometry, index, this.floatingPlasticsList)

                this.sarira.updateConvex(micro, threesystem)
            }
        }
    }

    checkIndex(passDataList) {
        //microType
        let microType = ["Polyethylene", "Polypropylene", "Polystyrene", "Polyamide", "Polyester", "Acrylic", "Polyacetal", "PolyvinylChloride", "Polyurethane"]
        for (let i = 0; i < microType.length; i++) {
            if (passDataList[2] == microType[i]) {
                return i
            }
        }
    }
}