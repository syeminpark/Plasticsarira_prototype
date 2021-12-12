let databaseThreeSystemController
let serverClientCommunication
setup()
draw()



async function setup() {
    checkAccessRoute()

    let dataOrganizer = new DataOrganizer(document.getElementById('userName').textContent, document.getElementById('userId').textContent)
    serverClientCommunication = new ServerClientCommunication(dataOrganizer)
    //serverClientCommunication.getSariraById()
    await serverClientCommunication.getAllSarira()


    databaseThreeSystemController = new DatabaseThreeSystemController(dataOrganizer.getOtherSariraData())
    databaseThreeSystemController.createSystem()
    databaseThreeSystemController.createRenderer()

    ///convex
    let threeSystemList = databaseThreeSystemController.getThreeSystemList()
    let convexMaterial = createConvexMaterial()
    let glassMaterial = createGlassMaterial()
    let pointMaterial = createPointeMaterial()
    let data = dataOrganizer.getOtherSariraData()



    for (let i = 0; i < threeSystemList.length; i++) {

        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const cube = new THREE.Mesh(geometry, glassMaterial);
        threeSystemList[i].scene.add(cube);

        let buffer = new Buffer(data[i].vertices)
        buffer.initialize(pointMaterial)
        buffer.render(threeSystemList[i])
        buffer.bufferGeometry.setDrawRange(0, data[i].vertices.length)

        if (data[i].vertices.length > 3) {
            let convex = new Convex(threeSystemList[i], convexMaterial)
            convex.updateVertices(buffer.bufferGeometry, data[0].vertices.length)
            convex.initializeMesh()
        }
    }

    //add a function that cheks the num of vertices. if under 4 then only show the particls. 

}


function draw() {
    requestAnimationFrame(draw);
    if (databaseThreeSystemController != null)
        databaseThreeSystemController.render()

}