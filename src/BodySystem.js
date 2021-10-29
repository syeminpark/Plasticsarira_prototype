class BodySystem {

    constructor() {

        this.shader = new Shader();
        this.floatingPlasticsList = new Array(0)
        this.buffer = new Buffer(this.shader)
        this.buffer.initialize()
        this.sarira = new Sarira(this.buffer.sariraGeometry)

        document.addEventListener('mousedown', this.addFloatingPlastics.bind(this), false);
    }

    update() {
        this.moveFloatingPlastics()
        this.sarira.getPosition(this.buffer.sariraGeometry)
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
            micro.getPosition(this.buffer.floatingGeometry, index);
            micro.applyForce(force);
            micro.walk(this.buffer.floatingGeometry, index)

            if (micro.checkStuck(this.sarira.plasticList)) {
                //this.sarira.addPlastics(micro)
                //micro.updateBuffer(this.buffer.sariraGeometry, this.sarira.plasticsList.length)
                //micro.deleteBuffer(this.buffer.floatingGeometry, this.floatingPlasticsList.length)
                // nm this.floatingPlasticsList.splice(index, 1);
            }
        }
    }



}