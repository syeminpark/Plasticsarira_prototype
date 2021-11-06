class UserText {
    constructor(name, system, canvas) {
        this.name = name
        this.system = system
        this.canvas = canvas
    }

    createLabel() {
        const labelContainerElem = document.querySelector('#labels');
        this.text = document.createElement('div');
        this.text.textContent = this.name;
        labelContainerElem.appendChild(this.text);
    }

    updateLabel(positionVector3) {
        let tempV = _.cloneDeep(positionVector3)
        let orbitV = new THREE.Vector3();
        orbitV = this.system.controls.object.position
        tempV.project(this.system.camera);

        this.text.style.fontSize =  map(Math.abs(positionVector3.distanceTo(orbitV)),0,600,2,0)+"vh"
        const x = (tempV.x * .5 + .5) * this.canvas.clientWidth + this.canvas.getBoundingClientRect().left;
        const y = (tempV.y * -.5 + .5) * this.canvas.clientHeight + this.canvas.getBoundingClientRect().top
        this.text.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
    }
}