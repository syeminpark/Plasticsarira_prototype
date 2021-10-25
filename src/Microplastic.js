class Microplastic {

    constructor() {
        this.position = randomPoint()
        print(this.postion)
    }
}





function randomPoint() {
    var i = Math.floor(random(4));

    if (i === 0) {
        let x = Math.random(window.innerWidth);
        return  new THREE.Vector3(x, 0,0);
    } else if (i == 1) {
        let x = Math.random(width);
        return new THREE.Vector3(x, height,0)
    } else if (i == 2) {
        let y = Math.random(height);
        return  new THREE.Vector3(0, y,0)
    } else {
        let y = Math.random(height);
        return new THREE.Vector3(width, y,0)
    }
}