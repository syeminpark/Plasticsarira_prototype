class ThreeSystem {

    constructor() {

        //나중에는 2 정도로 에상. 
        this.windowSizeDivideFactor = 2

        //createScene
        this.scene = new THREE.Scene();

        //createCamera
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

        //create Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        //orbit controls. move camera by mouse 
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        ///Monitor frame
        this.stats = new Stats();
        document.body.appendChild(this.stats.dom)

        //GUI
        this.gui = new dat.GUI()

        //lights
        this.ambientlight = new THREE.AmbientLight(0x404040, 1);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    }

    init() {
        this.setCamera(50, 50, 50);
        this.setRenderer();
        this.setOrbitcontrols();
        this.setLights()
        this.setGUI()
    }

    update() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
        this.windowSizeUpdate()


    }

    //씬에 추가할 요소 
    addToScene(element) {
        this.scene.add(element);
    }

    //////////////////////

    setCamera(x, y, z) {
        this.camera.position.set(x, y, z);
        this.camera.rotation.order = 'YXZ';
    }

    setRenderer() {
        this.renderer.shadowMap.enabled = true; //basic= unfiltered. pcf(default)= filters percentage close algorithm. pcf soft. vsm.   
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth / this.windowSizeDivideFactor, window.innerHeight / this.windowSizeDivideFactor);
        document.body.appendChild(this.renderer.domElement);
    }

    setOrbitcontrols() {
        this.controls.listenToKeyEvents(window); // use arrow keys to move camera
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
    }

    setLights() {
        this.directionalLight.position.set(25, 100, 10);
        this.directionalLight.target.position.set(0, 0, 0);
        this.directionalLight.castShadow = true;
        this.scene.add(this.ambientlight, this.directionalLight, this.directionalLight.target);
    }
    setGUI() {
        this.guiLights = this.gui.addFolder('Lights')
        this.guiLights.add(this.ambientlight, 'intensity', 0, 10)
    }

    windowSizeUpdate() {

        this.renderer.setSize(window.innerWidth / this.windowSizeDivideFactor, window.innerHeight / this.windowSizeDivideFactor);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

    }

}