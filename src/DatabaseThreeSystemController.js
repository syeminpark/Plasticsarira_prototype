class DatabaseThreeSystemController {
    constructor(otherSariraData) {
        this.threeSystemList = []
        this.scenes = []
        this.canvas = document.getElementById("d");
        this.geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.5, 12, 8),
            new THREE.DodecahedronGeometry(0.5),
            new THREE.CylinderGeometry(0.5, 0.5, 1, 12),
        ]
        this.material=createConvexMaterial()
        this.otherSariraData=otherSariraData


    }
    createSystem() {
        for (let i = 0; i <  this.otherSariraData.length; i++) {
            let threeSystem = new DataBaseThreeSystem()
          
            threeSystem.createElement(this.otherSariraData[i].name)
            threeSystem.setCamera([0, 0, 20], [0, 0, 0])
            threeSystem.setOrbitcontrols(true)
            threeSystem.setLights(3,0,5)
            
            //threeSystem.scene.add(new THREE.Mesh(geometry, this.material));
            threeSystem.addToUserData()
            this.threeSystemList.push(threeSystem)
            this.scenes.push(threeSystem.scene)
        }

    }
    
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setClearColor(0xffffff, 1);
        this.renderer.setPixelRatio(window.devicePixelRatio);
     
    }

    render() {
   
        this.updateSize()

        this.renderer.setClearColor(0x000000);
        this.renderer.setScissorTest(false);
        this.renderer.clear();

        //this.renderer.setClearColor(0xe0e0e0);
        this.renderer.setScissorTest(true);

        let renderer = this.renderer
        this.scenes.forEach(function (scene) {

            scene.rotation.y = Date.now() * 0.001;
            let element = scene.userData.element;
            let rect = element.getBoundingClientRect();

            // check if it's offscreen. If so skip it
            if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
                rect.right < 0 || rect.left > renderer.domElement.clientWidth) {
                return; // it's off screen

            }
            // set the viewport
            let width = rect.right - rect.left;
            let height = rect.bottom - rect.top;
            let left = rect.left;
            let bottom = renderer.domElement.clientHeight - rect.bottom;

            renderer.setViewport(left, bottom, width, height);
            renderer.setScissor(left, bottom, width, height);
            renderer.render(scene, scene.userData.camera)
        })
    }

    updateSize() {
        let width = this.canvas.clientWidth;
        let height = this.canvas.clientHeight;

        if (this.canvas.width !== width || this.canvas.height != height) {
            this.renderer.setSize(width, height, false);

        }
    }

    getThreeSystemList(){
        return this.threeSystemList
    }



}