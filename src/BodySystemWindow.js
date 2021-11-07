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

}