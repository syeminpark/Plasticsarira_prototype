//사리생성장면과 가상환경 장면의 카메라, 렌더링, 등을 총괄하는 클라스 
let threeSystemController
let bodySystem;

setup()
draw()

function setup() {
    threeSystemController = new ThreeSystemController();
    bodySystem= new BodySystem();


    ///예시 코드 
    threeSystemController.addToSariraScene(ellipse([40, 0, 0], 5, [32, 16], 0xff0000))
    threeSystemController.addToSariraScene(point([0, 0, 0], 5, color(255, 255, 255)))
    threeSystemController.addToWorldScene(createCube())
}

function draw() {
    requestAnimationFrame(draw);
    //매 프레임 실행되는 부분
    threeSystemController.update()
 



}

//------------------------------------------------------------------

