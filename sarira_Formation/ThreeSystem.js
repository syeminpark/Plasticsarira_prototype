import Stats from "/library/Stats.js";

class ThreeSystem {

    constructor() {

        //createScene
        this.scene = new THREE.Scene();

        //createCamera
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

        //create Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        //orbit controls //used to move camera by mouse 
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        ///small monitor 
        this.stats = new Stats();
        document.body.appendChild(this.stats.dom)

        //lights
        this.light = new THREE.AmbientLight(0x404040, 1);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    }

    init() {
        this.createCamera();
        this.createRenderer();
        this.createOrbitcontrols();
        this.createLights()
    }

    update() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
    }

    createCamera() {
        this.camera.position.set(0, 0, 100);
        this.camera.rotation.order = 'YXZ';
    }
    createRenderer() {
        this.renderer.shadowMap.enabled = true; //basic= unfiltered. pcf(default)= filters percentage close algorithm. pcf soft. vsm.   
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    createOrbitcontrols() {
        this.controls.listenToKeyEvents(window); // use arrow keys to move camera
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
    }

    createLights() {
        this.directionalLight.position.set(25, 100, 10);
        this.directionalLight.target.position.set(0, 0, 0);
        this.directionalLight.castShadow = true;
        this.scene.add(this.light, this.directionalLight);
    }
}

export {
    ThreeSystem as
    default
}