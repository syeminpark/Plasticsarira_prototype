class ThreeSystemController {

    //매개변수들 설정 
    constructor() {

        //초기 카메라 위치값 x,y,z
        this.cameraPositionList = [50, 50, 50]
        //카메라가 바라보는 시점  x, y, z
        this.cameraLookPositionList = [0, 0, 0]

        //다른 매개변수들 추가 


    }

    //---------------------------------------------------------------------------------------
    init() {

        //-----------------------------------------------------------------------------
        //가상현실 생성 장면 시스템 
        this.worldThreeSystem = new ThreeSystem(document.querySelector('#world'))
        //사리 생성 장면 시스템 
        this.sariaThreeSystem = new ThreeSystem(document.querySelector('#sarira'))

         //카메라 생성, 렌더러 설정, 마우스 이동 가능(orbitcontrols), 빛 두개(ambient,directional)생성 
         this.sariaThreeSystem.init(this.cameraPositionList, this.cameraLookPositionList)
         this.worldThreeSystem.init(this.cameraPositionList, this.cameraLookPositionList)
         this.systemList = [this.sariaThreeSystem, this.worldThreeSystem]
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
        this.sariaThreeSystem.update()
        this.worldThreeSystem.update()

        //매 프레임 렌더링하기 
        this.render()
    
    }

    //장면에 요소를 추가하기 위한 메서드 
    addToSariraScene(element) {
        this.sariaThreeSystem.scene.add(element)
    }
    addToWorldScene(element) {
        this.worldThreeSystem.scene.add(element)

    }

    //화면 크기 조정 
     //---------------------------------------------------------------------------------------

     refreshWindowSize() {

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        for (let system of this.systemList) {
            system.camera.aspect = window.innerWidth / window.innerHeight;
            system.camera.updateProjectionMatrix();
        }
    }
    //렌도링 관련된 메서드 
     //---------------------------------------------------------------------------------------

    initializeRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true

        });
        this.renderer.shadowMap.enabled = true; //basic= unfiltered. pcf(default)= filters percentage close algorithm. pcf soft. vsm.   
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this.resizeRendererToDisplaySize()
        this.renderer.setScissorTest(false);
        this.renderer.clear(true, true);
        this.renderer.setScissorTest(true);
        this.renderSceneInfo();
    }

    initializeRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true

        });
        this.renderer.shadowMap.enabled = true; //basic= unfiltered. pcf(default)= filters percentage close algorithm. pcf soft. vsm.   
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    renderSceneInfo() {
        for (let system of this.systemList) {
            const {
                left,
                right,
                top,
                bottom,
                width,
                height
            } = system.element.getBoundingClientRect();
            const isOffscreen =
                bottom < 0 ||
                top > this.canvas.clientHeight ||
                right < 0 ||
                left > this.canvas.clientWidth;
            if (isOffscreen) {
                return;
            }
            system.camera.aspect = width / height;
            system.camera.updateProjectionMatrix();

            const positiveYUpBottom = this.canvas.clientHeight - bottom;
            this.renderer.setScissor(left, positiveYUpBottom, width, height);
            this.renderer.setViewport(left, positiveYUpBottom, width, height);

            this.renderer.render(system.scene, system.camera);

        }
    }
    resizeRendererToDisplaySize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        const needResize = this.canvas.width !== width || this.canvas.height !== height;
        if (needResize) {
            this.renderer.setSize(width, height, false);
        }
        return needResize;
    }

   
}