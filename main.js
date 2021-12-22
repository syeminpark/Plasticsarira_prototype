let threeSystemController
let lifeSystem
let particleSystem_microPlastic
let bodySystemController
let serverClientCommunication
let userDead = false;
let virtualKeyboard 


checkDeviceType()
moveToTopWindow()
done()


async function setup() {

    await userHoverGuide()
    await userSmallWindowGuide()  

    let dataOrganizer= new DataOrganizer(document.getElementById('userName').textContent)
    serverClientCommunication = new ServerClientCommunication(dataOrganizer)
    serverClientCommunication.createUser()
    threeSystemController = new ThreeSystemController();
    virtualKeyboard = new VirtualKeyboard()
    lifeSystem = new LifeSystem(virtualKeyboard);
    particleSystem_microPlastic = new ParticleSystem(lifeSystem);
    particleSystem_microPlastic.display(threeSystemController, 0.3)

    draw()
}

function draw() {
    requestAnimationFrame(draw);
    if (document.getElementById('userName')) {
        threeSystemController.update()
        particleSystem_microPlastic.update();
        lifeSystem.update();
    }
}

async function done() {
    requestAnimationFrame(done);
    if (userDead) {
        userDead = false;
        await serverClientCommunication.postSariraById(lifeSystem.life_user.getSariraDataForServer())
        window.location = `${window.location.href}database.html`;
    }
}