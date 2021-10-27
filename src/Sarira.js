class Sarira {
    constructor(bufferGeometry) {
        this.plasticList = []
        this.plasticList.push(new Core())
        this.plasticList[0].initialize()
        this.plasticList[0].updateBuffer(bufferGeometry,this.plasticList.length)
    }

    addPlastics(micro) {
        this.plasticList.push(micro)
    }

}