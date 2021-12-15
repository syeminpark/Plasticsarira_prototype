class HealthBar {
    constructor(id,system,canvas) {
        this.id=id;
        this.system = system
        this.canvas = canvas
    }

    createBar() {
        this.progress = document.createElement("progress");
        this.progress.id = this.id;
        this.progress.value = "500";
        this.progress.max = "500";
        this.progress.style.position = 'fixed';

        document.body.appendChild(this.progress)
    }

    updateHealth(value) {

        this.progress.value =`${value}`;
    }

    updatePosition(positionVector3){
    
        //let tempV = _.cloneDeep(positionVector3)
        let tempV = _.cloneDeep(new THREE.Vector3(positionVector3.x, positionVector3.y + 5, positionVector3.z))
        let orbitV = new THREE.Vector3();
        orbitV = this.system.controls.object.position
        tempV.project(this.system.camera);

        //this.text.value != this.textName ? this.text.style.color = "rgba(255,255,255,1)" : this.text.style.color = "rgba(255,255,255,0.6)"

        
        const x = (tempV.x * .5 + .5) * this.canvas.clientWidth + this.canvas.getBoundingClientRect().left;
        const y = (tempV.y * -.5 + .5) * this.canvas.clientHeight + this.canvas.getBoundingClientRect().top
        this.progress.style.left = x+"px"//`translate(-50%, -50%) translate(${x}px,${y}px)`;
        this.progress.style.top=y+30+"px"


    }
}