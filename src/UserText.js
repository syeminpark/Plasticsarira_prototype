class UserText {
    constructor(system, canvas) {

        this.system = system
        this.canvas = canvas
        this.text;
        
        //this.textName="I Is Another"

    }

    createLabel() {

        this.text = document.createElement('text');
        //this.text.type = "text";
        this.text.style.backgroundColor = "rgba(0,0,0,0)"
        this.text.style.color = "rgba(255,255,255,1)"

        this.text.style.textAlign = "center"
        this.text.size = 15

        this.text.style.border = "0px"
    
        this.text.style.position = 'fixed';
        document.body.appendChild(this.text);

    }

    updateLabel(positionVector3) {

        
        this.text.innerHTML=="" ?  this.text.innerHTML=document.getElementById("userName").textContent : null;
    
        //let tempV = _.cloneDeep(positionVector3)
        let tempV = _.cloneDeep(new THREE.Vector3(positionVector3.x, positionVector3.y + 5, positionVector3.z))
        let orbitV = new THREE.Vector3();
        orbitV = this.system.getControlsPosition();
        tempV.project(this.system.getCamera());

        //this.text.value != this.textName ? this.text.style.color = "rgba(255,255,255,1)" : this.text.style.color = "rgba(255,255,255,0.6)"

        this.text.style.fontSize = myMath.map(Math.abs(positionVector3.distanceTo(orbitV)), 0, 600, 2, 0) + "vh"
        const x = (tempV.x * .5 + .5) * this.canvas.clientWidth + this.canvas.getBoundingClientRect().left;
        const y = (tempV.y * -.5 + .5) * this.canvas.clientHeight + this.canvas.getBoundingClientRect().top
        this.text.style.left = x+"px"//`translate(-50%, -50%) translate(${x}px,${y}px)`;
        this.text.style.top=y+"px"

        
    }
}