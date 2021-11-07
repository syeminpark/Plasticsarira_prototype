//전체 총괄 클래스 
class PlastiSarira {
    constructor() {
        this.bodySystemList = new Array(0)
    }

    initialize() {
        this.threeSystemController = new ThreeSystemController();

        this.lifeSystem = new LifeSystem(this.threeSystemController);
        this.particleSystem_microPlastic = new ParticleSystem(this.lifeSystem);
        this.particleMaterial = this.particleSystem_microPlastic.display(this.threeSystemController)

        this.initializeCorePositionList()
        //유저 제외한 모든 생먕체의 사리 만들기 
        for (let index = 0; index < this.lifeSystem.num; index++) {
            //지금은 하나만 만들고 나중에는 각 생물당 하나 만듦 
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
        this.corePositionList = new Array(0)
        for (let index = 0; index < this.lifeSystem.num; index++) {
            index == 0 ? this.corePositionList.push([0, 0, 0]) : null
            this.corePositionList.push(this.lifeSystem.lifes[index].position) 
        }
    }
}


//난관 리스트 

//1.각 개체 안의 corePosition update = sarira가 된 애들의 포지션 값을 바꿔야한다. 
//2. 유저 사리라 왼족 창에 만들어지는 것 그대로 왼쪽 창에 위치값만 바꿔서 옮길 수는 없을까?  미세플라스틱의 움직임도