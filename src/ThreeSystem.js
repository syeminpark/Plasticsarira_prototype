class ThreeSystem {

    constructor(sceneInfo, windowSizeDivideFactor) {

        this.windowSizeDivideFactor = windowSizeDivideFactor
    }

    init(cameraPositionList, cameraLookPositionList) {

        //createScene
        this.scene = new THREE.Scene();


        //creatCamera
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

        //create Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        //orbit controls. move camera by mouse 
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        //lights
        this.ambientLight = new THREE.AmbientLight(0x404040, 1);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 5);

        //--------------------------------------------------------------------------------
        this.setCamera(cameraPositionList, cameraLookPositionList);
        this.setRenderer();
        this.setOrbitcontrols();
        this.setLights()

    }

    update() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }


    setCamera(cameraPositionList, cameraLookPositionList) {
        this.camera.position.set(cameraPositionList[0], cameraPositionList[1], cameraPositionList[2]);
        this.camera.lookAt(cameraLookPositionList[0], cameraLookPositionList[1], cameraLookPositionList[2]);
        this.camera.rotation.order = 'YXZ';
    }

    setRenderer() {
        this.renderer.shadowMap.enabled = true; //basic= unfiltered. pcf(default)= filters percentage close algorithm. pcf soft. vsm.   
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        console.log(this.renderer.domElement)
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
        this.scene.add(this.ambientLight, this.directionalLight, this.directionalLight.target);
    }

    windowSizeUpdate() {
        this.renderer.setSize(window.innerWidth / this.windowSizeDivideFactor, window.innerHeight / this.windowSizeDivideFactor);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();


    }


}