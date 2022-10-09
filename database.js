let databaseThreeSystemController
let serverClientCommunication
setup()
draw()



async function setup() {
    checkAccessRoute()
    createDomElement("div", true, "loader", null, document.body)

    let dataOrganizer = new DataOrganizer(document.getElementById('userName').textContent, document.getElementById('userId').textContent)
    serverClientCommunication = new ServerClientCommunication(dataOrganizer)
    //serverClientCommunication.getSariraById()
    await serverClientCommunication.getAllSarira()
    document.getElementById('loader').remove()


    databaseThreeSystemController = new DatabaseThreeSystemController(dataOrganizer.getOtherSariraData())
    databaseThreeSystemController.createSystem()
    databaseThreeSystemController.createRenderer()

    ///convex
    let threeSystemList = databaseThreeSystemController.getThreeSystemList()
    let convexMaterial = createConvexMaterial()
    let glassMaterial = createGlassMaterial()
    let pointMaterial = createPointMaterial()
    let standardMaterial = createStandardMaterial()
    let data = dataOrganizer.getOtherSariraData()

    let savedSariraList = []

    for (let i = 0; i < threeSystemList.length; i++) {
        let savedSarira = new SavedSarira(threeSystemList[i], data[i].vertices);
        savedSarira.setGLTFExportMaterial(standardMaterial)
        savedSarira.createCube(8, glassMaterial)
        savedSarira.createSarira(pointMaterial, convexMaterial)
        savedSariraList.push(savedSarira)
    }
    //add a function that cheks the num of vertices. if under 4 then only show the particls. 
}


function draw() {
    requestAnimationFrame(draw);
    if (databaseThreeSystemController != null)
        databaseThreeSystemController.render()

}