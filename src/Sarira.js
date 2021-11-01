class Sarira {
    constructor(bufferGeometry) {
        this.plasticList = []
        this.isConvexMade = false

        this.terminalController=new TerminalController()
        this.terminalController.initializeCategory()
        this.initializeCore(bufferGeometry)
        this.terminalController.createMetaDataText()
        
    }
    update(bufferGeometry) {
        this.getPosition(bufferGeometry)
        this.initializeConvex(bufferGeometry)
    }

    addPlastics(micro) {
        this.plasticList.push(micro)
        this.addMetaData()
        this.terminalController.createMetaDataText()
        if (this.plasticList.length > 5) {
            this.convex.updateBuffer(micro)
        }
    }

    addMetaData() {
        //iterate over every (new) plastic inside sarira. 
        let plastic = this.plasticList[this.plasticList.length - 1]
        //iterate over every metadata for plastic 
        for (let [index, dataElement] of plastic.passDataList.entries()) {
           this.terminalController.metaDataList[index].push(dataElement)
        }
    }

    getPosition(bufferGeometry) {
        for (let [index, plastic] of this.plasticList.entries()) {
            plastic.getPosition(bufferGeometry, index);
        }
    }

    initializeCore(bufferGeometry) {
        this.plasticList.push(new Core([0, 0, 0]))
        this.plasticList[0].initialize()
        this.plasticList[0].updateBuffer(bufferGeometry, this.plasticList.length);
        this.addMetaData()
    }

    initializeConvex(bufferGeometry) {
        if (this.isConvexMade == false) {
            if (this.plasticList.length > 2) {
                this.convex = new Convex(bufferGeometry)
                this.isConvexMade = true
            }
        }

    }
}