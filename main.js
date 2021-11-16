
let threeSystemController 
let lifeSystem 
let particleSystem_microPlastic 
let bodySystemController

checkScreenSize()
setup()
draw()

function setup() {
    threeSystemController = new ThreeSystemController();
    lifeSystem = new LifeSystem();
    particleSystem_microPlastic = new ParticleSystem(lifeSystem);
    let particleMaterial = particleSystem_microPlastic.display(threeSystemController,0.3)

    //
    bodySystemController = new BodySystemController(threeSystemController, lifeSystem, particleMaterial)
    bodySystemController.createConvexMaterial()
    bodySystemController.createConvexWindowMaterial()
    bodySystemController.createWindowBodySystem()
    bodySystemController.createOtherBodySystem()
}

function draw() {
    requestAnimationFrame(draw);
    //
    threeSystemController.update()
    particleSystem_microPlastic.update(bodySystemController, threeSystemController.sariraThreeSystem);
    lifeSystem.update();
    bodySystemController. updateBodySystem()
}