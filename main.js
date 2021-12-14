let threeSystemController
let lifeSystem
let particleSystem_microPlastic
let serverClientCommunication
let userDead = false;


checkDeviceType(writeName)
draw()
done()


function setup() {

    let dataOrganizer= new DataOrganizer(document.getElementById('userName').textContent)
    serverClientCommunication = new ServerClientCommunication(dataOrganizer)
    serverClientCommunication.createUser()

    threeSystemController = new ThreeSystemController();
    lifeSystem = new LifeSystem();
    particleSystem_microPlastic = new ParticleSystem(lifeSystem);
    particleSystem_microPlastic.display(threeSystemController, 0.3)
    //

}

function draw() {
    requestAnimationFrame(draw);
    if (document.getElementById('userName')) {
        //
        threeSystemController.update()
        particleSystem_microPlastic.update();
        lifeSystem.update();
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