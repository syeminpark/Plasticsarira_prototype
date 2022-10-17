class PlasticSpawner{
    constructor(world){
        this.world = world;

        this.loader_gltf = new THREE.GLTFLoader();
        this.filePath = [];
        
        this.particleCount = 0;
        this.particlePosArray = [];
        this.particleColorArray = [];
    }

    loadFile(){
        let geometry = new THREE.BufferGeometry(); 
        let material = createPointMaterial();

        this.loader_gltf.load(
            // resource URL
            '../models/plasticTest.gltf',
            // called when the resource is loaded
            function ( gltf ) {

                gltf.scene.traverse( function ( child ) {
                    if ( child.isObject3D ) {
                        //child.material.envMap = envMap;
                        //Setting the buffer geometry

                        geometry = child.geometry;
                    }
                } );
       
                
            }, 
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
                console.log( error );
            }
        );
    }
}