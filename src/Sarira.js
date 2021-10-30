class Sarira {
    constructor(bufferGeometry) {

        this.plasticList = []
        this.initializeCore(bufferGeometry)
        this.isConvexMade = false

    }
    update(bufferGeometry) {
        this.getPosition(bufferGeometry)
        this.initializeConvex(bufferGeometry)

    }

    addPlastics(micro) {
        this.plasticList.push(micro)
  
        if (this.plasticList.length > 4) {
            this.convex.updateBuffer(micro)
        }
    }

    getPosition(bufferGeometry) {
        for (let [index, plastic] of this.plasticList.entries()) {
            plastic.getPosition(bufferGeometry, index);
        }
    }

    initializeCore(bufferGeometry) {
        this.plasticList.push(new Core())
        this.plasticList[0].initialize()
        this.plasticList[0].updateBuffer(bufferGeometry, this.plasticList.length);
    }

    //press key to generate
    initializeConvex(bufferGeometry) {
        if (this.isConvexMade == false) {
            if (this.plasticList.length > 3) {
                this.convex = new Convex(bufferGeometry)
                this.isConvexMade = true
            }
        }

    }

}