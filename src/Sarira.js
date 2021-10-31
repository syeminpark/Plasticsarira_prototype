class Sarira {
    constructor(bufferGeometry) {
        this.plasticList = []
        this.isConvexMade = false

        this.terminalController=new TerminalController()
        this.terminalController.initialize()

        this.initializeCore(bufferGeometry)
        this.addMetaData()
    }

    update(bufferGeometry) {
        this.getPosition(bufferGeometry)
        this.initializeConvex(bufferGeometry)
    }

    addPlastics(micro) {
        this.plasticList.push(micro)
        this.addMetaData()
        if (this.plasticList.length > 4) {
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
    }

    initializeConvex(bufferGeometry) {
        if (this.isConvexMade == false) {
            if (this.plasticList.length > 3) {
                this.convex = new Convex(bufferGeometry)
                this.isConvexMade = true
            }
        }

    }
}