class BodySystemController {

    constructor(threeSystemController, lifeSystem, particleMaterial) {
      
        this.threeSystemController=threeSystemController
        this.lifeSystem=lifeSystem
        this.particleMaterial=particleMaterial
        this.bodySystemList = new Array(0)
    }

    createWindowBodySystem() {
        let bodySystemWindow = new BodySystem(this.threeSystemController.sariraThreeSystem);
        bodySystemWindow.createBuffer(this.particleMaterial)
        bodySystemWindow.createSarira(this.convexMaterial)
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

    bodySystemUpdate() {
        for (let [index, bodySystem] of this.bodySystemList.entries()) {
            bodySystem.update()
        }
        for (let index = 0; index < this.lifeSystem.num; index++) {
            this.bodySystemList[index + 1].getLifePosition(_.cloneDeep(this.lifeSystem.lifes[index].position))
        }
    }

    createConvexMaterial() {
        const hdrEquirect = new THREE.RGBELoader().load(
            "images/empty_warehouse_01_1k.hdr",
            () => {
                hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
            }
        );

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
}