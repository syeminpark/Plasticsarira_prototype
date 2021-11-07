//전체 총괄 클래스 
class PlastiSarira {
    constructor() {
        this.threeSystemController = new ThreeSystemController();

        this.lifeSystem = new LifeSystem(this.threeSystemController);
        this.particleSystem_microPlastic = new ParticleSystem(this.lifeSystem);
        this.particleMaterial = this.particleSystem_microPlastic.display(this.threeSystemController)
    }


    initializeBodystem() {
        //     this.bodySystemList = new Array(0)
        //     for (let index = 0; index < this.lifeSystem.num; index++) {
        //         //지금은 하나만 만들고 나중에는 각 생물당 하나 만듦 
        //         if (index == 0) {
        //             let bodySystem = new BodySystem(index, this.threeSystemController);
        //             bodySystem.createBuffer(this.particleMaterial)
        //             bodySystem.createSarira(this.corePositionList[index])
        //             bodySystem.createTerminal()
        //             this.bodySystemList.push(bodySystem)
        //         }
        //     }

        //창용  유저 사리라 
        this.bodySystemList = new Array(0)
        let bodySystemWindow = new BodySystemWindow(this.threeSystemController.sariraThreeSystem);
        bodySystemWindow.createBuffer(this.particleMaterial)
        bodySystemWindow.createSarira()
        bodySystemWindow.createTerminal()
        this.bodySystemList.push(bodySystemWindow)

        //세계용 유저 사리라
        let bodySystem = new BodySystem(this.threeSystemController.worldThreeSystem,);
        bodySystem.createBuffer(this.particleMaterial)
        bodySystem.createSarira(this.lifeSystem.lifes[0].position)

        this.bodySystemList.push(bodySystem )
     
    }

    update() {
        for (let [index, bodySystem] of this.bodySystemList.entries()) {
            bodySystem.update()
        }

        this.updateBodyPosition()

        this.threeSystemController.update()
        this.particleSystem_microPlastic.update(this.bodySystem, this.threeSystemController.sariraThreeSystem);
        this.lifeSystem.update();
    }

    updateBodyPosition() {
        // for (let index = 0; index < this.lifeSystem.num; index++) {
        //     this.bodySystem.getLifePositon(this.lifeSystem.lifes[index].position)
        // }
     
        this.bodySystemList[1].getLifePosition(this.lifeSystem.lifes[0].position)

    }
}

//난관 리스트 

//1.각 개체 안의 corePosition update = sarira가 된 애들의 포지션 값을 바꿔야한다. 
//2. 유저 사리라 왼족 창에 만들어지는 것 그대로 왼쪽 창에 위치값만 바꿔서 옮길 수는 없을까?  미세플라스틱의 움직임도
//core position을 어떻게 해결할 것인가? 


