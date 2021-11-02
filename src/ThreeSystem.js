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
        
        // this.controls.autoRotate=true;
        //lights
        this.setLights()
      //마우스로 컨트롤 
        this.setOrbitcontrols();
        //프레임 레이트 모니터링 
        this.setStats()

        this.setFog()
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
        if(this.element==document.querySelector('#sarira')){
        const near = 10
        const far = 2000;
        const color = '#000000'
        this.scene.fog = new THREE.Fog(color, near, far);
        this.scene.background = new THREE.Color(color);
        }
        
    }

    setLights() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 5);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        this.directionalLight.position.set(.5, 0, 0.866);
        this.directionalLight.target.position.set(0, 0, 0);
        
        //this.directionalLight.castShadow = true;
      
        this.hemiLight  = new THREE.HemisphereLight();
        this.scene.add(this.ambientLight, this.directionalLight,this.hemiLight, this.directionalLight.target);
    }
    setStats(){
       
        this.stats = new Stats()
        this.element.appendChild(this.stats.dom)
        this.stats.dom.style.left = this.element.style.left
    }

 
}