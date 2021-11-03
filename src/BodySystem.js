class BodySystem {

    constructor() {

        this.floatingPlasticsList = new Array(0)
        document.addEventListener('mousedown', this.addFloatingPlastics.bind(this), false);
    }

    createBuffer(threeSystem) {
        this.sariraBuffer = new Buffer()
        this.sariraBuffer.initialize()
        let sariraMesh = this.sariraBuffer.getMesh()
    
        this.floatingBuffer = new Buffer()
        this.floatingBuffer.initialize()
        let floatingMesh = this.floatingBuffer.getMesh()
        threeSystem.scene.add(sariraMesh, floatingMesh)
    }

    createSarira() {
        this.sarira = new Sarira()
        this.sarira.initializeTerminal(this.sariraBuffer.bufferGeometry)
    print(this.sariraBuffer.bufferGeometry)
    }

    update(threesystem) {
        this.moveFloatingPlastics(threesystem)
        this.sarira.getPosition(this.sariraBuffer.bufferGeometry)
        this.sarira.initializeConvex(this.sariraBuffer.bufferGeometry,threesystem)
    }

    addFloatingPlastics() {
        let tempMicro = new PE()
        tempMicro.initialize()
        this.floatingPlasticsList.push(tempMicro)
        tempMicro.updateBuffer(this.floatingBuffer.bufferGeometry, this.floatingPlasticsList.length)

    }

    moveFloatingPlastics(threesystem) {
        for (let [index, micro] of this.floatingPlasticsList.entries()) {
            let force = this.sarira.plasticList[0].attract(micro);

            micro.getPosition(this.floatingBuffer.bufferGeometry, index);

            micro.applyForce(force);
            micro.walk(this.floatingBuffer.bufferGeometry, index)
            if (micro.checkStuck(this.sarira.plasticList)) {
                this.sarira.addPlastics(micro,threesystem)
                micro.getPosition(this.floatingBuffer.bufferGeometry, index)
                micro.updateBuffer(this.sariraBuffer.bufferGeometry, this.sarira.plasticList.length)
                micro.switch(this.floatingBuffer.bufferGeometry, index, this.floatingPlasticsList)
            }
        }
    }
}

//사리라 클래스 정리
//마이크로플라스틱 클래스 정리
//첨에 안보이는 현상 해결해보기 