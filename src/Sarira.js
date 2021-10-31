class Sarira {
    constructor(bufferGeometry) {
        this.plasticList = []
        this.initializeCore(bufferGeometry)
        this.iterm=new TerminalController()
        this.isConvexMade = false

        this.obtainedDataList = new Array(5)
        for (let i = 0; i < 6; i++) {
            this.obtainedDataList[i] = new Array(0)
        }
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
            this.obtainedDataList[index].push(dataElement)
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