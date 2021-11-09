class Core extends Microplastic {
    constructor(threeSystem,particleMaterial) {
        super(threeSystem,particleMaterial)
        
        this.microType = "Polypropylene"; // polypropylene was identified in baby
        this.absorbedBy = "Inheritance"
        this.dateRetrieved = "When You Were A Fetus"
        this.madeIn = 1951
        this.originalFormList = ["Syringe", "Chip Bag", "Specimen Bottle", "Car Battery Case", "Instrument Panel", "Rug", "Crisp Bag", "Lunch Box", "Packing Tape", "Tobacco Package", "Beach Slipper", "Tote Bag", "Vacuum Cleaner", "Car Bumper", "Door Trim"]
        this.passedByList = ["Mom", "Dad", "brother", "Mom"]

        this.density = 0.92
        this.tensileStrength = 5440

    }
    initialize(positionList) {
        super.initialize(positionList,this.density, this.tensileStrength)
      
    }

    initializePassDataList() {
        this.originalForm = this.originalFormList[Math.round(random(0, this.originalFormList.length - 1))]
        this.madeIn = JSON.stringify(Math.round(random(this.madeIn, 2021)));
        this.passDataList = [this.originalForm, this.madeIn, this.microType, this.passedByList, this.absorbedBy, this.dateRetrieved]
    }

    attract(floatingMicro) {
        // Calculate direction of force
        let force = new THREE.Vector3(0, 0, 0)
        force.subVectors(this.positionVector3, floatingMicro.positionVector3);
        // Distance between objects
        let distance = constrain(force.length(), 0.1, 1);
        // Calculate gravitional force magnitude
        let strength = (10 * this.mass * floatingMicro.mass) / (distance * distance);
        // Get force vector --> magnitude * direction
        force.setLength(strength);
        return force;
    }



}