//사리생성장면과 가상환경 장면의 카메라, 렌더링, 등을 총괄하는 클라스 
let threeSystemController

setup()
draw()

function setup() {
    threeSystemController = new ThreeSystemController()
    threeSystemController.init()
    createCube()
}

function draw() {

    requestAnimationFrame(draw);
    threeSystemController.update()


}

function createCube() {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshPhongMaterial({
        color: '#8AC'
    });
    const cube = new THREE.Mesh(geometry, material);
    const cube2 = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0)
    threeSystemController.addToSariraScene(cube)
    threeSystemController.addToWorldScene(cube2)
}

///코딩 할일 우선순위
// 두개 윈도우 렌더링하기 