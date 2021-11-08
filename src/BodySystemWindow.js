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

    createSarira(convexMaterial){
        super.createSarira(this.positionVector3,convexMaterial)
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

    createConvexMaterial(){
        const hdrEquirect = new THREE.RGBELoader().load(
            "images/empty_warehouse_01_1k.hdr",  
            () => { 
              hdrEquirect.mapping = THREE.EquirectangularReflectionMapping; 
            }
          );
    
        let convexMaterial = new THREE.MeshPhysicalMaterial({
            transmission: 0.95,
            thickness: 0.1,
            roughness: 0.4,
            clearcoat: 1,
            metalness:0.06,
            clearcoatRoughness: 0.4,
            envMap: hdrEquirect,
          
            // normalMap: texture,
           
        });
        return  convexMaterial
    }
}