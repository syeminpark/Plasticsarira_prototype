class Core extends Microplastic {
    constructor() {
        super()
        this.size = 5
        this.positionList = [0,0,0]
        this.density = 0.92
    }

    initialize() {
        super.initialize(this.positionList, this.size)
    }


    attract(floatingMicro) {
        // Calculate direction of force
        let force = new THREE.Vector3(0, 0, 0)
        force.subVectors(this.positionVector3, floatingMicro.positionVector3);
        // Distance between objects
        let distance = constrain(force.length(), 5, 50);
        // Calculate gravitional force magnitude
        let gForce = 2
        let strength = (2 * this.mass * floatingMicro.mass) / (distance * distance);
        // Get force vector --> magnitude * direction
        force.setLength(strength);
        return force;
    }
}