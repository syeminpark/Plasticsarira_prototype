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
        this.sarira.update(this.buffer.sariraGeometry)
        
    }

    addFloatingPlastics() {
        let tempMicro = new Microplastic()
        tempMicro.initialize()
        this.floatingPlasticsList.push(tempMicro)
        tempMicro.updateBuffer(this.buffer.floatingGeometry, this.floatingPlasticsList.length)

    }

    moveFloatingPlastics() {
        for (let [index, micro] of this.floatingPlasticsList.entries()) {
            let force = this.sarira.plasticList[0].attract(micro);
       
            micro.getPosition(this.buffer.floatingGeometry, index);

            micro.applyForce(force);
            micro.walk(this.buffer.floatingGeometry, index)
  
       
            if (micro.checkStuck(this.sarira.plasticList)) {
               
                this.sarira.addPlastics(micro)
                micro.getPosition(this.buffer.floatingGeometry, index)
        
                micro.updateBuffer(this.buffer.sariraGeometry, this.sarira.plasticList.length)
              
                micro.switch(this.buffer.floatingGeometry, index, this.floatingPlasticsList)
           
            }

        }
    }
    generateConvex(){
        this.sarira.initializeConvex(this.buffer.sariraGeometry)
    }
}