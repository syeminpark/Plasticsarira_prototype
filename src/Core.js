class Core extends Microplastic {
    constructor(positionList) {

        super(positionList)
        this.microType = "Polypropylene"; // polypropylene was identified in baby
        this.madeIn = 1951
        this.originalFormList = ["Syringe", "Chip Bag", "Specimen Bottle", "Plastic Chair", "Car Battery Case", "Instrument Panel", "Rug", "Lunch Box", "Packing Tape", "Coffee Machine"]
        this.passedByList = ["Mom", "Dad", "brother", "Mom"]
        this.density = 0.92
        this.absorbedBy = "Inheritance"
        this.dateRetrieved = "When You Were A Fetus"
        this.tensileStrength = 5440

    }

    //pastOwnersList, retrievedMethod, dateRetrieved
    initialize() {
        super.initialize([this.originalFormList, this.madeIn, this.microType, this.passedByList, this.absorbedBy], this.density, this.tensileStrength, this.dateRetrieved, )
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


    createLabel(name) {
        const labelContainerElem = document.querySelector('#labels');
        const text = document.createElement('div');
        text.textContent = name;
        labelContainerElem.appendChild(text);
        return text


    }
    moveLabel(text, system, canvas) {
        let tempV = new THREE.Vector3();
        let orbitV = new THREE.Vector3();
        tempV.project(system.camera);
        orbitV= threeSystemController.sariraThreeSystem.controls.object.position
        text.style.fontSize = tempV.z+"vw"
        
        const x = (tempV.x * .5 + .5) * canvas.clientWidth + canvas.getBoundingClientRect().left;
        const y = (tempV.y * -.5 + .5) * canvas.clientHeight + canvas.getBoundingClientRect().top
        text.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
    }
}