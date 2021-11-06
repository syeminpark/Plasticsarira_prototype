//전체 총괄 클래스 
class PlastiSarira {
    constructor() {
        this.threeSystemController
        this.bodySystem;
        this.particleSystem_microPlastic;
        this.lifeSystem;
    }

    initialize(){
        let userWindowCorePositionList=[0,0,0]
        let isUser=true

        this.threeSystemController = new ThreeSystemController();
        this.bodySystem = new BodySystem(isUser,this.threeSystemController.sariraThreeSystem);
        this.bodySystem.createBuffer()
        this.bodySystem.createSarira(userWindowCorePositionList)
        this.bodySystem.createTerminal()
    
        this.lifeSystem = new LifeSystem(this.threeSystemController);
        this.particleSystem_microPlastic = new ParticleSystem(this.lifeSystem,this.threeSystemController);
    
    }
    update(){
        this.threeSystemController.update()
        this.bodySystem.update()
    
        this.particleSystem_microPlastic.update(this.bodySystem,this.threeSystemController.sariraThreeSystem);
        this.lifeSystem.update();
    }
}