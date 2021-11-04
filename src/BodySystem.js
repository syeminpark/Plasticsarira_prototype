class BodySystem {

    constructor() {

        this.floatingPlasticsList = new Array(0)
        //pe=0, pp=1
        this.densityList = [0.92,0.94]
        this.tensileStrengthList = [5440,4554]

        document.addEventListener('mousedown', this.addFloatingPlastics.bind(this), false);
    }

    createBuffer(threeSystem) {

        //만드는 순서가 중요함 .
        this.floatingBuffer = new Buffer()
        this.floatingBuffer.initialize(threeSystem)
        this.sariraBuffer = new Buffer()
        this.sariraBuffer.initialize(threeSystem)
    }

    createSarira() {
        this.sarira = new Sarira()
        this.sarira.initializeTerminal(this.sariraBuffer.bufferGeometry)
        this.sarira.initializeCore(this.sariraBuffer.bufferGeometry)
        this.sarira.initializeCoreMetaData()

    }

    update(threesystem) {
        this.moveFloatingPlastics()
        this.updateSarira(threesystem)

        this.sarira.getPosition(this.sariraBuffer.bufferGeometry)
        this.sarira.initializeConvex(this.sariraBuffer.bufferGeometry, threesystem)

    }

    addFloatingPlastics() {
        let tempMicro = new PE()
        tempMicro.initialize()
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
                micro.getPosition(this.floatingBuffer.bufferGeometry, index)
                micro.updateBuffer(this.sariraBuffer.bufferGeometry, this.sarira.plasticList.length)
                micro.switch(this.floatingBuffer.bufferGeometry, index, this.floatingPlasticsList)

                this.sarira.updateConvex(micro, threesystem)
            }
        }
    }
}

//랜덤하게 움직이다 결국 중앙으로 수렴되는 현상 해결하기.
