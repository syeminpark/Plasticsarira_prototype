let threeSystemController;
let bodySystemController;
let serverClientCommunication;

let userController;
let virtualKeyboard;
let myMath;

let world;
let userDead = false;
let virtualKeyboard

checkDeviceType();
moveToTopWindow();
done();


async function setup() {
    //await userHoverGuide();
    //await userSmallWindowGuide();

    let dataOrganizer = new DataOrganizer(document.getElementById('userName').textContent)
    serverClientCommunication = new ServerClientCommunication(dataOrganizer)
    serverClientCommunication.createUser()
    threeSystemController = new ThreeSystemController();
    virtualKeyboard = new VirtualKeyboard();

    world = new World(200);

    userController = new UserController(world, virtualKeyboard);

    draw();
}

function draw() {
    requestAnimationFrame(draw);
    if (document.getElementById('userName')) {
        threeSystemController.update();
        world.update();
        userController.update();
    }
}

async function done() {
    requestAnimationFrame(done);
    if (userDead) {
        userDead = false;
        await serverClientCommunication.postSariraById(lifeSystem.life_user.getSariraDataForServer());
        window.location = `${window.location.href}database.html`;
    }
}