class Core extends Microplastic {
    constructor(positionList) {

        super(positionList)
        this.type = "PP"; // polypropylene was identified in baby
        this.dateCreated = 1951
        this.originalPurposeList = ["Syringe", "Chip Bag", "Specimen Bottle", "Plastic Chair", "Car Battery Case", "Instrument Panel", "Rug", "Lunch Box", "Packing Tape", "Coffee Machine"]
        this.pastOwnersList = ["Mom", "Dad", "brother","Mom"]
        this.density = 0.92
        this.retrievedMethod = "Inheritance"
        this.dateRetrieved = "Before Birth"
        this.tensileStrength = 5440
        
    }

    //pastOwnersList, retrievedMethod, dateRetrieved
    initialize() {
        super.initialize(this.pastOwnersList,this.retrievedMethod, this.dateRetrieved)
    }

    attract(floatingMicro) {
        // Calculate direction of force
        let force = new THREE.Vector3(0, 0, 0)
        force.subVectors(this.positionVector3, floatingMicro.positionVector3);
        // Distance between objects
        let distance = constrain(force.length(), 5, 30);
        // Calculate gravitional force magnitude
        let strength = (2 * this.mass * floatingMicro.mass) / (distance * distance);
        // Get force vector --> magnitude * direction
        force.setLength(strength);
        return force;
    }
}