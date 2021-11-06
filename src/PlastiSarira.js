//전체 총괄 클래스 
class PlastiSarira {
    constructor() {
        this.threeSystemController
        this.bodySystemList=[]
        this.particleSystem_microPlastic;
        this.lifeSystem;
        this.corePositionList=[0,0,0]
    }

    initialize(){

       // this.corePositionListofLists.push([0,0,0])
        this.threeSystemController = new ThreeSystemController();
    
        this.lifeSystem = new LifeSystem(this.threeSystemController);
        this.particleSystem_microPlastic = new ParticleSystem(this.lifeSystem);
        this.particleMaterial=this.particleSystem_microPlastic.display(this.threeSystemController)

        this.bodySystem = new BodySystem(0);
        this.bodySystem.createBuffer(this.particleMaterial)
        this.bodySystem.createSarira(this.corePositionList)
        this.bodySystem.createTerminal()

        // for(let [index,life] of this.lifeSystem.num){
        //     if(index=0){
        //    let bodySystem= new BodySystem(index,this.threeSystemController);
        //     }
        // }
    
    }
    update(){

        this.threeSystemController.update()
        this.bodySystem.update()
    
        this.particleSystem_microPlastic.update(this.bodySystem,this.threeSystemController.sariraThreeSystem);
        this.lifeSystem.update();
    }
}