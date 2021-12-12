let threeSystemController
let lifeSystem
let particleSystem_microPlastic
let bodySystemController
let serverClientCommunication
let userDead = false;

console.log("hello friend")
//forwarder
checkDeviceType()
writeName() 
draw()
done()


function setup() {

    let dataOrganizer= new DataOrganizer(document.getElementById('userName').textContent)
    serverClientCommunication = new ServerClientCommunication(dataOrganizer)
    serverClientCommunication.createUser()

    threeSystemController = new ThreeSystemController();
    lifeSystem = new LifeSystem();
    particleSystem_microPlastic = new ParticleSystem(lifeSystem);
    let particleMaterial = particleSystem_microPlastic.display(threeSystemController, 0.3)
    //
    bodySystemController = new BodySystemController(threeSystemController, lifeSystem, particleMaterial)
    bodySystemController.createWindowBodySystem()
    bodySystemController.createOtherBodySystem()
}

function draw() {
    requestAnimationFrame(draw);
    if (document.getElementById('userName')) {
        //
        threeSystemController.update()
        particleSystem_microPlastic.update(bodySystemController, threeSystemController.sariraThreeSystem);
        lifeSystem.update();
        bodySystemController.updateBodySystem()
    }
}

async function done() {
    requestAnimationFrame(done);
    if (userDead) {
        userDead = false;
        await serverClientCommunication.postSariraById(bodySystemController.getSariraDataForServer())
        window.location = `${window.location.href}database.html`;
    }
}