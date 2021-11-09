//전체 총괄 클래스 

class PlastiSarira {
    constructor() {
        this.threeSystemController = new ThreeSystemController();
        this.lifeSystem = new LifeSystem(this.threeSystemController);
        this.particleSystem_microPlastic = new ParticleSystem(this.lifeSystem);
        this.particleMaterial = this.particleSystem_microPlastic.display(this.threeSystemController)
    }
    initializeBodySystem() {
        this.bodySystemController = new BodySystemController(this.threeSystemController, this.lifeSystem, this.particleMaterial)
        this.bodySystemController.createConvexMaterial()
        this.bodySystemController.createWindowBodySystem()
        this.bodySystemController.createOtherBodySystem()
    }


    update() {
        this.bodySystemController. bodySystemUpdate()
        this.threeSystemController.update()
        this.particleSystem_microPlastic.update(this.bodySystem, this.threeSystemController.sariraThreeSystem);
        this.lifeSystem.update();
    }
}


//bodySystemController를 하나를 만들자. 
//객체의 메서드로만 소통하자. getter와 setter를 만들어서 .
//floating을 다시 구현시키자. 붙는 간격 조절할 수 있도록. 