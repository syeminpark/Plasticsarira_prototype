class Microplastic {

    //later create size and color parameter
    constructor() {
        this.positionList = this.randomPoint()


        this.velocity = new THREE.Vector3(1, 0)

        this.phase = Math.random()

    }
    initialize() {

        //나중에 매개변수로 대체 
        this.size=Math.random()*(5-0.01)+0.01
        this.color=color(Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255))

        this.createPoint(this.size, this.color)
    }

    
    randomPoint() {
        //console.log(threeSystemController.sariraThreeSystem.controls.object.position)
        let i = Math.round( Math.random()*5 )
        console.log(i);
        let x = Math.random()* (threeSystemController.sariraThreeSystem.controls.object.position.x + threeSystemController.sariraThreeSystem.controls.object.position.x) -threeSystemController.sariraThreeSystem.controls.object.position.x ;
        let y = Math.random()* (threeSystemController.sariraThreeSystem.controls.object.position.y + threeSystemController.sariraThreeSystem.controls.object.position.y)-threeSystemController.sariraThreeSystem.controls.object.position.y;
        let z = Math.random() * (threeSystemController.sariraThreeSystem.controls.object.position.z + threeSystemController.sariraThreeSystem.controls.object.position.z)-threeSystemController.sariraThreeSystem.controls.object.position.z;

        if (i === 0) {
            //top
            return new THREE.Vector3(x, threeSystemController.sariraThreeSystem.controls.object.position.y, z);
            //bottom
        } else if (i == 1) {
            return new THREE.Vector3(x, -threeSystemController.sariraThreeSystem.controls.object.position.y, z)
            //left
        } else if (i == 2) {
            return new THREE.Vector3(-threeSystemController.sariraThreeSystem.controls.object.position.x, y, z)
            //right 
        } else if (i == 3) {
            return new THREE.Vector3(threeSystemController.sariraThreeSystem.controls.object.position.x, y, z)
        }
        //front
        else if (i == 4) {
            return new THREE.Vector3(x, y,threeSystemController.sariraThreeSystem.controls.object.position.z )
        }
        else{
            return new THREE.Vector3(x, y,-threeSystemController.sariraThreeSystem.controls.object.position.z )
        }
        //back
        

        
    }

    createPoint() {

        this.bufferGeometry = new THREE.BufferGeometry();
        this.bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new THREE.Vector3(...this.positionList).toArray(), 3));
        this.pointMaterial = new THREE.PointsMaterial({
            size: this.size,
            color: this.color
        });
        this.point = new THREE.Points(this.bufferGeometry, this.pointMaterial);
        threeSystemController.addToSariraScene(this.point)

    }

}