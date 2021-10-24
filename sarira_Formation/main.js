//전역 변수 이름공간
const syemin = {
    //카메라 렌더링 라이트 등등
    threeSystem: 0,
    //사리 생성 및 미세플라스틱과 연관된 클래스 관리 
    bodySystem: 0
}

setup()
draw()

function setup() {
    syemin.threeSystem = new ThreeSystem()
    syemin.threeSystem.init()
    createCube()

}

function draw() {

    requestAnimationFrame(draw);
    syemin.threeSystem.update()

}

function createCube() {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshPhongMaterial({
        color: '#8AC'
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0)
    syemin.threeSystem.addToScene(cube)
}

///코딩 할일 우선순위
// 두개 윈도우 렌더링하기 