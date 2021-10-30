class Sarira {
    constructor(bufferGeometry) {

        this.plasticList = []
        this.plasticList.push(new Core())
        this.plasticList[0].initialize()
        this.plasticList[0].updateBuffer(bufferGeometry,this.plasticList.length);
        
    }
    update(bufferGeometry){
        this.getPosition(bufferGeometry)
        
    }

    addPlastics(micro) {
        this.plasticList.push(micro)
    }


    getPosition(bufferGeometry){

        for (let [index,plastic] of this.plasticList.entries()){
            plastic.getPosition(bufferGeometry,index);
        
        }


    }

}