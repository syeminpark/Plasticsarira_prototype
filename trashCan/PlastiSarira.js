//전체 총괄 클래스 

class PlastiSarira {
    constructor() {
        this.threeSystemController = new ThreeSystemController();
        this.lifeSystem = new LifeSystem(this.threeSystemController);
        this.particleSystem_microPlastic = new ParticleSystem(this.lifeSystem);
        this.particleMaterial = this.particleSystem_microPlastic.display(this.threeSystemController,0.3)
    }
    initializeBodySystem() {
        this.bodySystemController = new BodySystemController(this.threeSystemController, this.lifeSystem, this.particleMaterial)
        this.bodySystemController.createConvexMaterial()
        this.bodySystemController.createConvexWindowMaterial()
        this.bodySystemController.createWindowBodySystem()
        this.bodySystemController.createOtherBodySystem()
    }

    update() {
        
        this.threeSystemController.update()
        this.particleSystem_microPlastic.update(this.bodySystem, this.threeSystemController.sariraThreeSystem);
        this.lifeSystem.update();
        this.bodySystemController. updateBodySystem()
    }
}

