//사리생성장면과 가상환경 장면의 카메라, 렌더링, 등을 총괄하는 클라스 
let threeSystemController
let bodySystem;

let particleSystem_microPlastic;
let lifeSystem;

setup()
draw()

function setup() {

    checkScreenSize()

    threeSystemController = new ThreeSystemController();
    bodySystem = new BodySystem();
    bodySystem.createBuffer(threeSystemController.sariraThreeSystem)
    bodySystem.createSarira()

    lifeSystem = new LifeSystem();
    particleSystem_microPlastic = new ParticleSystem(lifeSystem);

}

function draw() {
    requestAnimationFrame(draw);

    //매 프레임 실행되는 부분
    threeSystemController.update()
    bodySystem.update(threeSystemController.sariraThreeSystem)

    particleSystem_microPlastic.update();
    lifeSystem.update();
}

//------------------------------------------------------------------