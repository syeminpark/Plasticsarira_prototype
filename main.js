
//사리생성장면과 가상환경 장면의 카메라, 렌더링, 등을 총괄하는 클라스 
let threeSystemController
let bodySystem;

setup()
draw()

function setup() {
    threeSystemController = new ThreeSystemController()

    //new Microplastic()
    //threeSystemController.addToSariraScene(ellipse([0,0,0],5,[32,16],0xff0000))
    threeSystemController.addToSariraScene(point([0,0,0],1,color(255,0,0)))
    threeSystemController.addToWorldScene(createCube())
}

function draw() {

    requestAnimationFrame(draw);
    //매 프레임 실행되는 부분
    threeSystemController.update()

    console.log()
}

//------------------------------------------------------------------

//예시 큐브 
function createCube() {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshPhongMaterial({
        color: '#8AC'
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0)
    return cube
}

