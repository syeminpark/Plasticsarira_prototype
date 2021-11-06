class ThreeSystem {

    constructor(element,cameraPositionList, cameraLookPositionList) {
        
        this.element=element;

        //createScene
        this.scene = new THREE.Scene();
        //creatCamera
        this.setCamera(cameraPositionList, cameraLookPositionList);
        //orbit controls. move camera by mouse 
        this.canvas = document.querySelector('#oribit');
        this.controls = new THREE.OrbitControls(this.camera, this.element);
        
        //lights
        this.setLights()
      //마우스로 컨트롤 
        this.setOrbitcontrols();
        //프레임 레이트 모니터링 
        this.setStats()

    }

    update() {
        this.controls.update();
        this.stats.update()
    }

    setCamera(cameraPositionList, cameraLookPositionList) {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000);
        this.camera.position.set(cameraPositionList[0], cameraPositionList[1], cameraPositionList[2]);
        this.camera.lookAt(cameraLookPositionList[0], cameraLookPositionList[1], cameraLookPositionList[2]);
        this.camera.rotation.order = 'YXZ';
    }

    setOrbitcontrols() {
        this.controls.listenToKeyEvents(window); // use arrow keys to move camera
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
    }

    setFog(){
        const near = 10
        const far = 1500;
        const color = '#000000'
        this.scene.fog = new THREE.Fog(color, near, far);
        this.scene.background = new THREE.Color(color);
        
    }
    setLights() {
        let ambientLight = new THREE.AmbientLight(0xffffff, 3);
        let directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        directionalLight.position.set(.5, 0, 0.866);
        directionalLight.target.position.set(0, 0, 0);
        let hemiLight  = new THREE.HemisphereLight();
        this.scene.add(ambientLight, directionalLight,hemiLight, directionalLight.target);
    }
    
    setStats(){
        this.stats = new Stats()
        this.element.appendChild(this.stats.dom)
        this.stats.dom.style.left = this.element.style.left
    }

 
}