//사리생성장면과 가상환경 장면의 카메라, 렌더링, 등을 총괄하는 클라스 
let threeSystemController
let bodySystem;

let microPlastics;

setup()
draw()

function setup() {
    threeSystemController = new ThreeSystemController();
    bodySystem= new BodySystem();

    microPlastics = new MicroPlastic_Particles(3000, 50);

    ///예시 코드 
    threeSystemController.addToWorldScene(microPlastics.points);
}

function draw() {
    requestAnimationFrame(draw);
    //매 프레임 실행되는 부분
    threeSystemController.update()
    bodySystem.update()

    microPlastics.update();
}

//------------------------------------------------------------------

