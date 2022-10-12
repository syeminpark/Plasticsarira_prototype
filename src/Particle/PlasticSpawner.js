class PlasticSpawner{
    constructor(world){
        this.world = world;

        this.loader_gltf = new THREE.GLTFLoader();
        this.filePath = [];

        this.mesh;
        this.geometry;
        this.material = createPointMaterial();
        
        this.particleCount = 0;
        this.particlePosArray = [];
    }

    loadFile(){
        this.loader_gltf.load(
            // resource URL
            '../models/plasticTest.gltf',
            // called when the resource is loaded
            function ( gltf ) {
                gltf.scene.traverse( function ( child ) {
    
                    if ( child.isObject3D ) {
                        //child.material.envMap = envMap;
                        //Setting the buffer geometry
                        this.geometry = child.geometry;
                        console.log(this.geometry);
                    }
                } );
       
                this.mesh = new THREE.Points( this.geometry, this.material );

                this.setPlasticPositions();
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

    setPlasticPositions(){
        const positions = this.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
            const index = i/3;

            this.particleCount++;
            this.particlePosArray.push(new THREE.Vector3(positions[i+0], positions[i+1], positions[i+2]));
        }

        this.world.addPlastic();
    }
}