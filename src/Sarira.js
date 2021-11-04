class Sarira {
    constructor() {
        this.plasticList = []
        this.isConvexMade = false

    }

    initializeTerminal(bufferGeometry) {
        this.terminal = new Terminal()
        this.terminal.initializeCategory()
        this.initializeCore(bufferGeometry)
        this.terminal.createMetaDataText()
    }


    addPlastics(micro, threeSystem) {
        this.plasticList.push(micro)
        this.addMetaData()
        this.terminal.createMetaDataText()
        if (this.convex != undefined) {
            this.convex.updateBuffer(micro)
            let [convexMeshFront, convexMeshBack] = this.convex.getMesh()
            threeSystem.scene.add(convexMeshFront, convexMeshBack)
        }
    }

    addMetaData() {
        //iterate over every (new) plastic inside sarira. 
        let plastic = this.plasticList[this.plasticList.length - 1]
        //iterate over every metadata for plastic 
        for (let [index, dataElement] of plastic.passDataList.entries()) {
            this.terminal.metaDataList[index].push(dataElement)
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

    initializeConvex(bufferGeometry, threeSystem) {
        if (this.isConvexMade == false && this.plasticList.length > 2) {
            this.isConvexMade = true
            this.convex = new Convex(bufferGeometry)
            let [convexMeshFront, convexMeshBack] = this.convex.getMesh()
            threeSystem.scene.add(convexMeshFront, convexMeshBack)
        }

    }
}