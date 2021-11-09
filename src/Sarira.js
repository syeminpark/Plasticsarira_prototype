class Sarira {
    constructor(threeSystem,particleMaterial,convexMaterial,bufferGeometry) {
        this.plasticList = []
        this.threeSystem = threeSystem
        this.particleMaterial = particleMaterial
        this.convexMaterial=convexMaterial
        this.bufferGeometry=bufferGeometry


    }
    initializeCore(corePostionList, isUser) {
        this.plasticList.push(new Core(this.threeSystem,this.particleMaterial))
        this.plasticList[0].initialize(corePostionList)
        isUser ? this.plasticList[0].initializePassDataList() : null
        this.plasticList[0].updateBuffer(this.bufferGeometry, this.plasticList.length);
    }

    initializeConvex() {

        if (this.convex == undefined && this.plasticList.length > 3) {
            this.convex = new Convex(this.threeSystem,this.convexMaterial)
            this.convex.initializeBuffer(this.bufferGeometry)
            this.convex.initializeMesh()
        }
    }

    addPlastics(micro) {
        this.plasticList.push(micro)
    }

    addMetaData(terminal) {
        //iterate over every (new) plastic inside sarira. 
        let plastic = this.plasticList[this.plasticList.length - 1]
        //iterate over every metadata for plastic 

        for (let [index, dataElement] of plastic.passDataList.entries()) {
            terminal.metaDataList[index].push(dataElement)
        }
    }

    updateConvexList() {
        if (this.convex != undefined && this.plasticList.length > 3) {
            this.convex.updateVertices(this.bufferGeometry, this.plasticList.length)
            this.convex.initializeMesh()
        }
    }

    updateConvex(micro) {
        if (this.convex != undefined) {
            this.convex.updateBuffer(micro)
            this.convex.initializeMesh()
        }
    }


    getPosition() {
        for (let [index, plastic] of this.plasticList.entries()) {
            plastic.getPosition(this.bufferGeometry, index);

        }
    }

    updateVerticesFromLife(positionList) {
        for (let [index, plastic] of this.plasticList.entries()) {
            plastic.moveWithLife(positionList, this.bufferGeometry, index)
        }

    }
}