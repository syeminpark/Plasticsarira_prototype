class ThreeSystem {

    constructor(element) {

        //해당하는 css요소명 
        this.element = element
    }

    init(cameraPositionList, cameraLookPositionList) {

        //createScene
        this.scene = new THREE.Scene();
        //creatCamera
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

        //orbit controls. move camera by mouse 
        this.controls = new THREE.OrbitControls(this.camera, this.element);
        //lights
        this.ambientLight = new THREE.AmbientLight(0x404040, 1);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 5);

        //--------------------------------------------------------------------------------
        this.setCamera(cameraPositionList, cameraLookPositionList);
        //this.setRenderer();
        this.setOrbitcontrols();
        this.setLights()

        //프레임 레이트 모니터링 
        this.stats = new Stats()
        this.element.appendChild(this.stats.dom)
        this.stats.dom.style.left = this.element.style.left

    }

    update() {
        this.controls.update();
        this.stats.update()
    }

    setCamera(cameraPositionList, cameraLookPositionList) {
        this.camera.position.set(cameraPositionList[0], cameraPositionList[1], cameraPositionList[2]);
        this.camera.lookAt(cameraLookPositionList[0], cameraLookPositionList[1], cameraLookPositionList[2]);
        this.camera.rotation.order = 'YXZ';
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

}