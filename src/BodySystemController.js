class BodySystemController {

    constructor(threeSystemController, lifeSystem, particleMaterial) {
      
        this.threeSystemController=threeSystemController
        this.lifeSystem=lifeSystem
        this.particleMaterial=particleMaterial
        this.bodySystemList = new Array(0)
        this.lifePositionList=[]
        for (let index = 0; index < this.lifeSystem.num; index++){
            this.lifePositionList.push(0)
        }
    }

    createWindowBodySystem() {
        let bodySystemWindow = new BodySystem(this.threeSystemController.sariraThreeSystem);
        bodySystemWindow.createBuffer(this.particleMaterial)
        bodySystemWindow.createSarira(this.convexWindowMaterial)
        bodySystemWindow.createTerminal()
        this.bodySystemList.push(bodySystemWindow)
    }

    createOtherBodySystem() {

        for (let index = 0; index < this.lifeSystem.num; index++) {
            let bodySystem = new BodySystem(this.threeSystemController.worldThreeSystem, index);
            bodySystem.createBuffer(this.particleMaterial)
            bodySystem.createSarira(this.convexMaterial)
            this.bodySystemList.push(bodySystem)
        }
    }

    updateBodySystem() {
        for (let [index, bodySystem] of this.bodySystemList.entries()) {
            bodySystem.update()
        }
        for (let index = 0; index < this.lifeSystem.num; index++) {
            print( )
            this.bodySystemList[index + 1].getLifePosition(_.cloneDeep(this.lifePositionList[index]))
        }
    }

    updateLifePosition(index,position){
        this.lifePositionList[index]=position
    }

    createConvexMaterial() {
        this.convexMaterial = new THREE.MeshPhysicalMaterial({
            transmission: 0.95,
            thickness: 0.1,
            roughness: 0.2,
            clearcoat: 1,
            metalness: 0.06,
            clearcoatRoughness: 0.4,
            //envMap: hdrEquirect,

        })
    }

    createConvexWindowMaterial() {
        const hdrEquirect = new THREE.RGBELoader().load(
            "images/empty_warehouse_01_1k.hdr",
            () => {
                hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
            }
        );
        this.convexWindowMaterial=this.convexMaterial.clone()
        // this.convexWindowMaterial.roughness= 0.4
        // this.convexWindowMaterial.envMap= hdrEquirect
    }

}