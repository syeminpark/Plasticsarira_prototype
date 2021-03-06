class ThreeSystem {

    constructor(element = null) {

        this.element = element;
        this.scene = new THREE.Scene();
        this.controls;
        this.camera;
        this.controls_pointerLock;

        //this.stats;
        //this.setStats()
    }

    update() {
        if (this.controls.enable == true) this.controls.update();
        if (this.stats != undefined) {
            this.stats.update()
        }
     
    }
    
////setters
    setControlMaxDistance(distance){
        this.controls.maxDistance=distance;
    }


    setControls(state){
        this.controls.enabled=state;
    }

    setCameraAspectRatio(ratio){
        this.camera.aspect=ratio;
        this.camera.updateProjectionMatrix();
    }
    setCamera(cameraPositionList, cameraLookPositionList) {
  
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.001, 10000);
        this.camera.position.set(cameraPositionList[0], cameraPositionList[1], cameraPositionList[2]);
        this.camera.lookAt(cameraLookPositionList[0], cameraLookPositionList[1], cameraLookPositionList[2]);
        this.camera.rotation.order = 'YXZ';
    }

    setOrbitcontrols(restrictDistance) {
        this.controls = new THREE.OrbitControls(this.camera, this.element);
        this.controls.listenToKeyEvents(window); // use arrow keys to move camera
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        if (restrictDistance) {
            this.controls.enableZoom = false;
        }
    }
    
    setPointerLockControls(){
        this.controls_pointerLock = new THREE.PointerLockControls(this.camera, this.element);
        document.querySelector('#world').addEventListener('click', function () {
            //this.controls_pointerLock.lock();
        } );
    }

    setFog() {
        const near = 10
        const far = 25
        const color = '#000000'
        this.scene.fog = new THREE.Fog(color, near, far);
        this.scene.background = new THREE.Color(color);
    }

    setLights(ambientStrength, directionalStrength, hemiStrength) {
        let ambientLight = new THREE.AmbientLight(0xffffff, ambientStrength);
        let directionalLight = new THREE.DirectionalLight(0xffffff, directionalStrength);
        directionalLight.position.set(0, 1, 0);
        directionalLight.target.position.set(0, 0, 0);
        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, hemiStrength);
        this.scene.add(ambientLight, directionalLight, hemiLight, directionalLight.target);
    }

    setStats() {
        this.stats = new Stats()
        this.element.appendChild(this.stats.dom)
        this.stats.dom.style.left = this.element.style.left
    }

////getters
    getElementBoundingRect(){
        return this.element.getBoundingClientRect();
    }
    getScene(){
        return this.scene;
    }
    getCamera(){
        return this.camera;
    }
    getControlsPosition(){
        return this.controls.object.position
    }


    addToScreen(...args){
        this.scene.add(...args)
    }

    
}
