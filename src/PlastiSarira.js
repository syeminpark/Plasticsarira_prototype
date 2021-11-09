//전체 총괄 클래스 
class PlastiSarira {
    constructor() {
        this.threeSystemController = new ThreeSystemController();
        this.lifeSystem = new LifeSystem(this.threeSystemController);
        this.particleSystem_microPlastic = new ParticleSystem(this.lifeSystem);
        this.particleMaterial = this.particleSystem_microPlastic.display(this.threeSystemController)
    }

    initializeBodystem() {
        this.bodySystemList = new Array(0)
        
        let bodySystemWindow = new BodySystemWindow(this.threeSystemController.sariraThreeSystem);
        this.convexMaterial = bodySystemWindow.createConvexMaterial()
        bodySystemWindow.createBuffer(this.particleMaterial)
        bodySystemWindow.createSarira(this.convexMaterial)
        bodySystemWindow.createTerminal()
        this.bodySystemList.push(bodySystemWindow)

        for (let index = 0; index < this.lifeSystem.num; index++){
        let bodySystem = new BodySystem(this.threeSystemController.worldThreeSystem, index);
        bodySystem.createBuffer(this.particleMaterial)
        bodySystem.createSarira(_.cloneDeep(this.lifeSystem.lifes[index].position), this.convexMaterial)
        this.bodySystemList.push(bodySystem)
    }
}
   
update() {
    for (let [index, bodySystem] of this.bodySystemList.entries()) {
        bodySystem.update()
    }
    for (let index = 0; index < this.lifeSystem.num; index++) {
        this.bodySystemList[index + 1].getLifePosition(_.cloneDeep(this.lifeSystem.lifes[index].position))
    }
    this.threeSystemController.update()
    this.particleSystem_microPlastic.update(this.bodySystem, this.threeSystemController.sariraThreeSystem);
    this.lifeSystem.update();
}
}


//bodySystemController를 하나를 만들자. 
//객체의 메서드로만 소통하자. getter와 setter를 만들어서 .
//floating을 다시 구현시키자. 붙는 간격 조절할 수 있도록. 