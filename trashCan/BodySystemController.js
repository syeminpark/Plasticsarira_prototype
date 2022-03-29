class BodySystemController {

    constructor(threeSystemController, lifeSystem, particleMaterial) {

        this.threeSystemController = threeSystemController
        this.lifeSystem = lifeSystem
        this.particleMaterial = particleMaterial
        this.bodySystemList = new Array(0)
        this.lifePositionList = []
        for (let index = 0; index < this.lifeSystem.num; index++) {
            this.lifePositionList.push(0)
        }
        this.convexMaterial=createConvexMaterial() 
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

    updateBodySystem() {
        for (let [index, bodySystem] of this.bodySystemList.entries()) {
            bodySystem.update()
        }
        for (let index = 0; index < this.lifeSystem.num; index++) {
            this.bodySystemList[index + 1].getLifePosition(_.cloneDeep(this.lifePositionList[index]))
        }
    }

    updateLifePosition(index, position) {
        this.lifePositionList[index] = position
    }

    getSariraDataForServer() {
        //user
        let newPositionArray = []
        let indexLength = 0;
        let originalPositionArray = this.bodySystemList[0].sariraBuffer.bufferGeometry.attributes.position.array

        for (let i = 1; i < 300; i++) {
            if (originalPositionArray[i * 3] == 0 && originalPositionArray[(i * 3) + 1] == 0 && originalPositionArray[(i * 3) + 2] == 0) {
                indexLength = i
                break;
            }
        }
        for (let i = 0; i < indexLength * 3; i++) {
            newPositionArray[i] = originalPositionArray[i]
        }

        let message={
            vertices: newPositionArray,
            metaData: this.bodySystemList[0].terminal.metaDataList
        }
        console.log(message)
        return message
        
    }
   
}





