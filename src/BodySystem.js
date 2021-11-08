class BodySystem {

    constructor(threeSystem, index) {

        index == 0 ? this.isUser = true : this.isUser = false;

        this.threeSystem = threeSystem

        this.floatingPlasticsList = new Array(0)
        //Polyethylene= 1  Polypropylene =2  "Polystyrene =3,  Polyamide=4, Polyester =5, Acrylic=6,  Polyacetal=7, PolyvinylChloride=8, Polyurethane=9
        this.densityList = [0.94, 0.92, 1.05, 1.14, 1.4, 1.2, 1.42, 1.38, 0.425]
        this.tensileStrengthList = [4554, 5440, 7700, 12400, 11500, 9400, 10007, 7500, 2596]
        //document.addEventListener('mousedown', this.addFloatingPlastics.bind(this), false);
    }

    getLifePosition(positionList) {
        this.sarira.updateVerticesFromLife(positionList)
        this.sarira.updateConvexList()
    }


    createBuffer(material) {
        this.floatingBuffer = new Buffer()
        this.microMaterial = material;

        this.floatingBuffer.initialize(this.threeSystem, this.microMaterial)
        this.sariraBuffer = new Buffer()
        this.sariraBuffer.initialize(this.threeSystem, this.microMaterial)
        //print(this.sariraBuffer)
    }

    createSarira(corePostionList,convexMaterial) {
       
        this.convexMaterial=convexMaterial
        this.sarira = new Sarira(this.threeSystem,  this.convexMaterial,this.sariraBuffer.bufferGeometry,)
        this.sarira.initializeCore(corePostionList,  this.isUser)
    }


    update() {
       // this.moveFloatingPlastics()
        this.updateSarira()
        this.sarira.getPosition()
    }


    addFloatingPlastics(positionList,passDataList) {

        //추후에 microplastic을 만드는 것으로 변경 
        let tempMicro = new Microplastic(this.threeSystem)

      
        tempMicro.initialize(positionList, this.densityList[this.checkIndex(passDataList)], this.tensileStrengthList[this.checkIndex(passDataList)])
        if (this.isUser) {
            tempMicro.initializePassDataList(passDataList)
        
        }
        this.floatingPlasticsList.push(tempMicro)
        tempMicro.updateBuffer(this.floatingBuffer.bufferGeometry, this.floatingPlasticsList.length)
    }

    moveFloatingPlastics() {
        //print(this.sariraBuffer.bufferGeometry)
        for (let [index, micro] of this.floatingPlasticsList.entries()) {
           // let force = this.sarira.plasticList[0].attract(micro);
            micro.getPosition(this.floatingBuffer.bufferGeometry, index);
          //  micro.applyForce(force);
           // micro.walk(this.floatingBuffer.bufferGeometry, index)
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

                micro.getPosition(this.floatingBuffer.bufferGeometry, index)
                micro.updateBuffer(this.sariraBuffer.bufferGeometry, this.sarira.plasticList.length)
                micro.switch(this.floatingBuffer.bufferGeometry, index, this.floatingPlasticsList)

              
                this.sarira.initializeConvex()
               // print(this.sarira.plasticList.length, this.sariraBuffer.bufferGeometry)
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