let threeSystemController
let lifeSystem
let particleSystem_microPlastic
let bodySystemController
let serverClientCommunication
let userDead = false;

setup()
draw()
done()

function setup() {

    writeName().then(() => {
        serverClientCommunication = new ServerClientCommunication(document.getElementById('userId').textContent)
        serverClientCommunication.createUser()
    })

    threeSystemController = new ThreeSystemController();
    lifeSystem = new LifeSystem();
    particleSystem_microPlastic = new ParticleSystem(lifeSystem);
    let particleMaterial = particleSystem_microPlastic.display(threeSystemController, 0.3)

    //
    bodySystemController = new BodySystemController(threeSystemController, lifeSystem, particleMaterial)
    bodySystemController.createConvexMaterial()
    bodySystemController.createConvexWindowMaterial()
    bodySystemController.createWindowBodySystem()
    bodySystemController.createOtherBodySystem()
}

function draw() {
    requestAnimationFrame(draw);
    if (document.getElementById('userId')) {
        //
        threeSystemController.update()
        particleSystem_microPlastic.update(bodySystemController, threeSystemController.sariraThreeSystem);
        lifeSystem.update();
        bodySystemController.updateBodySystem()
    }
}

function done() {
    requestAnimationFrame(done);
    if (userDead) {
        serverClientCommunication.postSariraById(bodySystemController.getSariraDataForServer()).then(() => {
            //window.location = `${window.location.href}database.html`;
           
        })
        userDead = false;

    }
}