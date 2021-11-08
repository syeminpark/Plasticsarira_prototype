class BodySystemWindow extends BodySystem{
    constructor(threeSystem,index=0){
        super(threeSystem,index)
        this.positionVector3=new THREE.Vector3(0,0,0)
    }

    createTerminal() {
        if (this.isUser) {
            this.terminal = new Terminal()
            this.terminal.initializeCategory()
            this.sarira.addMetaData(this.terminal)
            this.terminal.createMetaDataText()
        }
    }

    createSarira(){
        super.createSarira(this.positionVector3)
    }

    updateSarira() {
        for (let [index, micro] of this.floatingPlasticsList.entries()) {
        
            if (micro.checkStuck(this.sarira.plasticList)) {
                this.sarira.addPlastics(micro)
                if (this.terminal != undefined) {
                    this.sarira.addMetaData(this.terminal)
                    this.terminal.createMetaDataText()
                }

                micro.getPosition(this.floatingBuffer.bufferGeometry, index)
                micro.updateBuffer(this.sariraBuffer.bufferGeometry, this.sarira.plasticList.length)
                micro.switch(this.floatingBuffer.bufferGeometry, index, this.floatingPlasticsList)

                this.sarira.updateConvex(micro)
                this.sarira.initializeConvex(this.sariraBuffer.bufferGeometry, this.threesystem)
               // print(this.sarira.plasticList.length, this.sariraBuffer.bufferGeometry)
            }
        }
    }
}