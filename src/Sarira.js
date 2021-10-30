class Sarira {
    constructor(bufferGeometry) {

        this.plasticList = []
        this.plasticList.push(new Core())
        this.plasticList[0].initialize()
        this.plasticList[0].updateBuffer(bufferGeometry, this.plasticList.length);

    }
    update(bufferGeometry) {
        this.getPosition(bufferGeometry)

    }

    addPlastics(micro) {
        this.plasticList.push(micro)
    }


    getPosition(bufferGeometry) {

        for (let [index, plastic] of this.plasticList.entries()) {
            plastic.getPosition(bufferGeometry, index);

        }

    }
    generateConvex(bufferGeometry) {

        const vertices = [];
        const positionAttribute = bufferGeometry.getAttribute('position');

        for (let i = 0; i < positionAttribute.count; i++) {
            const vertex = new THREE.Vector3();
            vertex.fromBufferAttribute(positionAttribute, i);
            vertices.push(vertex);
        }

        const meshMaterial = new THREE.MeshLambertMaterial( {
            color: 0xffffff,
            opacity: 0.5,
            transparent: true
        } );
        const meshGeometry = new ConvexGeometry( vertices );
       
        const mesh1 = new THREE.Mesh( meshGeometry, meshMaterial );
        mesh1.material.side = THREE.BackSide; // back faces
        mesh1.renderOrder = 0;
        threeSystemControlller.addToSariraScene( mesh1 );

        const mesh2 = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
        mesh2.material.side = THREE.FrontSide; // front faces
        mesh2.renderOrder = 1;
        threeSystemControlller.addToSariraScene( mesh2 );
    }


}