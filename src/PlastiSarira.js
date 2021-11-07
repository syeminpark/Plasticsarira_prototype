//전체 총괄 클래스 
class PlastiSarira {
    constructor() {
        this.threeSystemController
        this.bodySystemList = []
        this.particleSystem_microPlastic;
        this.lifeSystem;
        this.corePositionList = [
            [0, 0, 0]
        ]
    }

    initialize() {

        // this.corePositionListofLists.push([0,0,0])
        this.threeSystemController = new ThreeSystemController();

        this.lifeSystem = new LifeSystem(this.threeSystemController);
        this.particleSystem_microPlastic = new ParticleSystem(this.lifeSystem);
        this.particleMaterial = this.particleSystem_microPlastic.display(this.threeSystemController)

        for (let index = 0; index < this.lifeSystem.num; index++) {
            if (index == 0) {
                let bodySystem = new BodySystem(index, this.threeSystemController);
                bodySystem.createBuffer(this.particleMaterial)
                bodySystem.createSarira(this.corePositionList[index])
                bodySystem.createTerminal()
                this.bodySystemList.push(bodySystem)
            }
        }

    }
    update() {
        for (let [index, bodySystem] of this.bodySystemList.entries()) {
            bodySystem.update()
        }

        this.threeSystemController.update()
        this.particleSystem_microPlastic.update(this.bodySystem, this.threeSystemController.sariraThreeSystem);
        this.lifeSystem.update();
    }

    initializeCorePositionList() {
        this.corePositionList.push()
    }

}