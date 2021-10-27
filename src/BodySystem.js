class BodySystem {

    constructor() {

        this.shader=new Shader();
        this.floatingPlasticsList = new Array(0)
        this.buffer=new Buffer(this.shader)
        this.buffer.initialize() 
        this.sarira = new Sarira(this.buffer.sariraGeometry)

        document.addEventListener('mousedown', this.addFloatingPlastics.bind(this), false);
    }

    update() {
        //this.updatePosition();
        //this.moveFloatingPlastics()
    }

    addFloatingPlastics() {
        let micro = new Microplastic()
        micro.initialize()
        micro.updateBuffer(this.buffer.floatingGeometry, this.floatingPlasticsList.length)
        this.floatingPlasticsList.push(micro)

    }

    moveFloatingPlastics() {
        for (let [index, micro] of this.floatingPlasticsList.entries()) {
            let force = this.sarira.plasticList[0].attract(micro);
            micro.applyForce(force);
            micro.walk()
        }
    }
    updatePosition() {
        for (let plastic of this.floatingPlasticsList) {
            plastic.getPosition()
        }
    }
}