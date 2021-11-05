class Sarira {
    constructor() {
        this.plasticList = []
        this.isConvexMade = false

    }

    initializeTerminal() {
        this.terminal = new Terminal()
        this.terminal.initializeCategory()
    }

    initializeCore(bufferGeometry) {
        this.plasticList.push(new Core([0, 0, 0]))
        this.plasticList[0].initialize()
        this.plasticList[0].updateBuffer(bufferGeometry, this.plasticList.length);
    }

    initializeCoreMetaData() {
        this.addMetaData()
        this.terminal.createMetaDataText()
    }

    initializeConvex(bufferGeometry, threeSystem, material) {
        if (this.isConvexMade == false && this.plasticList.length > 2) {
            this.isConvexMade = true

            this.convex = new Convex()
            this.convex.initializeBuffer(bufferGeometry)
            material != undefined ? this.material = material : this.material = this.convex.initializeMaterial();
            this.convex.initializeMesh(threeSystem,this.material)
        
        }
    }

    addPlastics(micro) {
        this.plasticList.push(micro)
        this.addMetaData()
        this.terminal.createMetaDataText()
    }

    addMetaData() {
        //iterate over every (new) plastic inside sarira. 
        let plastic = this.plasticList[this.plasticList.length - 1]
        //iterate over every metadata for plastic 
        for (let [index, dataElement] of plastic.passDataList.entries()) {
            this.terminal.metaDataList[index].push(dataElement)
        }
    }

    updateConvex(micro,threeSystem) {
        if (this.convex != undefined) {
            this.convex.updateBuffer(micro)
            this.convex.initializeMesh(threeSystem,this.material)
        }
    }

    getPosition(bufferGeometry) {
        for (let [index, plastic] of this.plasticList.entries()) {
            plastic.getPosition(bufferGeometry, index);
        }
    }


}