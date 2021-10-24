import ThreeSystem from "./ThreeSystem.js";

let threeSystem

setup()
draw()

function setup() {
    threeSystem = new ThreeSystem()
    threeSystem.init()



}

function draw() {

    requestAnimationFrame(draw);
    threeSystem.update(draw)

}