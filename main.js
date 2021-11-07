let plastiSarira

//checkScreenSize()
setup()
draw()

function setup() {
    plastiSarira = new PlastiSarira()
    plastiSarira.initializeCorePositionList()
    plastiSarira.initializeBodystem()
}

function draw() {
    requestAnimationFrame(draw);
    plastiSarira.update()
    //매 프레임 실행되는 부분
}