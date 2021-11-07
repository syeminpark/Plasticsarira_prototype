class Sarira {
    constructor(threeSystem) {
        this.plasticList = []
        this.threeSystem=threeSystem
    
    }

    initializeCore(corePostionList,bufferGeometry,isUser) {
        this.plasticList.push(new Core(this.threeSystem))
        this.plasticList[0].initialize(corePostionList)
        isUser ? this.plasticList[0].initializePassDataList() : null
        this.plasticList[0].updateBuffer(bufferGeometry, this.plasticList.length);
    }

    initializeConvex(bufferGeometry, material) {

        if (this.convex==undefined && this.plasticList.length > 2) {
            this.convex = new Convex(this.threeSystem)
            this.convex.initializeBuffer(bufferGeometry)
            material != undefined ? this.material = material : this.material = this.convex.initializeMaterial();
            this.convex.initializeMesh(this.material)
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

    updateConvex(micro) {
        if (this.convex != undefined) {
            this.convex.updateBuffer(micro)

            this.convex.initializeMesh(this.material)
        }
    }

    getPosition(bufferGeometry) {
        for (let [index, plastic] of this.plasticList.entries()) {
            plastic.getPosition(bufferGeometry, index);
        } 
    }
}