class ThreeSystemController {

    //매개변수들 설정 
    constructor() {


        this.renderer;

        //초기 카메라 위치값 x,y,z
        this.worldCameraPositionList = [50, 50, -400]
        this.sariraCameraPositionList = [0, 0, -10]
        //카메라가 바라보는 시점  x, y, z
        this.cameraLookPositionList = [0, 0, 0]


        //-----------------------------------------------------------------------------
        //가상현실 생성 장면 시스템 
        this.worldThreeSystem = new ThreeSystem(document.querySelector('#world'))
        //사리 생성 장면 시스템 
        //카메라 생성, 렌더러 설정, 마우스 이동 가능(orbitcontrols), 빛 두개(ambient,directional)생성 
        this.sariraThreeSystem = new ThreeSystem(document.querySelector('#sarira'))
        //this.sariraThreeSystem.setFog()
        this.systemList = [this.worldThreeSystem, this.sariraThreeSystem]

        this.worldThreeSystem.setCamera(this.worldCameraPositionList, this.cameraLookPositionList)
        this.sariraThreeSystem.setCamera(this.sariraCameraPositionList, this.cameraLookPositionList)

        this.worldThreeSystem.setOrbitcontrols();
        this.worldThreeSystem.setPointerLockControls();
        this.sariraThreeSystem.setOrbitcontrols();

        this.worldThreeSystem.setLights(3,0,5)
        this.sariraThreeSystem.setLights(3,0,5)

        //-----------------------------------------------------------------------------
        //css와 연관된, 렌더러가 렌더링하는 캔버스 명 
        this.canvas = document.querySelector('#c');
        //렌더러 생성 
        this.initializeRenderer()

        //adjust renderSize when screen is maximized or minimized
        window.addEventListener('resize', this.refreshWindowSize.bind(this))
    }
    //---------------------------------------------------------------------------------------

    //매 프레임 실행되는 메서드.
    update() {
        //orbit controls, renderer, frame rate 업데이트 
        this.sariraThreeSystem.update()
        this.worldThreeSystem.update()

    

        //매 프레임 렌더링하기 
        this.render()
    }

    stopOrbit() {
        let rect = this.sariraThreeSystem.getElementBoundingRect();

        if (event.clientX > rect.left && event.clientY < rect.bottom) {
            this.worldThreeSystem.setControls(false);
        } else {
            this.worldThreeSystem.setControls(true);
        }
    }

    //장면에 요소를 추가하기 위한 메서드 

    addToWorldScene(...args) {
        this.worldThreeSystem.addToScreen(...args);
    }

    //화면 크기 조정 
    //---------------------------------------------------------------------------------------

    refreshWindowSize() {
        for (let system of this.systemList) {
            system.setCameraAspectRatio( window.innerWidth / window.innerHeight)
        }
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    //렌도링 관련된 메서드 
    //---------------------------------------------------------------------------------------

    initializeRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });
        //화질 변경
        this.renderer.setPixelRatio(window.devicePixelRatio)
        
        this.renderer.setSize(window.innerWidth, window.innerHeight, false);

    }

    render() {
        this.resizeRendererToDisplaySize()
        this.renderer.setScissorTest(false);
        this.renderer.clear(true, true);
        this.renderer.setScissorTest(true);
        this.renderSceneInfo();
        const transform = `translateY(${window.scrollY}px)`;
        this.canvas.style.transform = transform;

    }

    renderSceneInfo() {
        for (let system of this.systemList) {
            const rect = system.getElementBoundingRect();
            const isOffscreen =
                rect.bottom < 0 ||
                rect.top > this.canvas.clientHeight ||
                rect.right < 0 ||
                rect.left > this.canvas.clientWidth;
            if (isOffscreen) {
                return;
            }
            system.setCameraAspectRatio( rect.width / rect.height)

            //worldThreeSystem 거리제한 
            this.worldThreeSystem.setControlMaxDistance(800);
            this.worldThreeSystem.setControls(false);

            const positiveYUpBottom = this.canvas.clientHeight - rect.bottom;
            this.renderer.setScissor(rect.left, positiveYUpBottom, rect.width, rect.height);
            this.renderer.setViewport(rect.left, positiveYUpBottom, rect.width, rect.height);
            this.renderer.render(system.getScene(), system.getCamera());
        }
    }

    resizeRendererToDisplaySize() {
        let width = this.canvas.clientWidth;
        let height = this.canvas.clientHeight;
        let needResize = this.canvas.width !== width || this.canvas.height !== height;
        if (needResize) {
            this.renderer.setSize(width, height, false);
    

        }

        return needResize;
    }


}