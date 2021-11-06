let plastiSarira

//checkScreenSize()
setup()
draw()

function setup() {
    plastiSarira = new PlastiSarira()
    plastiSarira.initialize()
}

function draw() {
    requestAnimationFrame(draw);
    plastiSarira.update()
    //매 프레임 실행되는 부분
}