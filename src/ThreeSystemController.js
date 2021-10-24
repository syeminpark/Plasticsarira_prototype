class ThreeSystemController {

    constructor() {

        //초기 카메라 위치값 x,y,z
        this.cameraPositionList = [50, 50, 50]
        //카메라가 바라보는 시점  x, y, z
        this.cameraLookPositionList = [0, 0, 0]

        //adjust renderSize when screen is maximized or minimized
        window.addEventListener('resize', this.refreshWindowSize.bind(this))


    }

    //---------------------------------------------------------------------------------------

    init() {

        this.stats = new Stats();
        this.stats.dom.style.left = '700px';
        this.container = document.getElementById('c');
        this.container.appendChild(this.stats.dom)

        //가상현실 생성 장면 시스템 
        this.worldThreeSystem = new ThreeSystem(2)
        //사리 생성 장면 시스템 
        this.sariaThreeSystem = new ThreeSystem(2)


        //카메라 생성, 렌더러 설정, 마우스 이동 가능(orbitcontrols), 빛 두개(ambient,directional)생성 
        this.sariaThreeSystem.init(this.cameraPositionList, this.cameraLookPositionList)
        this.worldThreeSystem.init(this.cameraPositionList, this.cameraLookPositionList)


        //if window size minimize or maximize, change canvas size
        this.refreshWindowSize()

    }
    //---------------------------------------------------------------------------------------

    //매 프레임 실행되는 메서드.
    update() {
        //orbit controls, renderer, frame rate 업데이트 
        this.sariaThreeSystem.update()
        this.worldThreeSystem.update()

        //프레임레이트 표시하는 창 업데이트
        this.stats.update();

    }

    refreshWindowSize() {

        this.sariaThreeSystem.windowSizeUpdate()
        this.worldThreeSystem.windowSizeUpdate()

    }


    //장면에 요소를 추가하기 위한 메서드 
    addToSariraScene(element) {
        this.sariaThreeSystem.scene.add(element)
    }
    addToWorldScene(element) {
        this.worldThreeSystem.scene.add(element)

    }
    //---------------------------------------------------------------------------------------
}