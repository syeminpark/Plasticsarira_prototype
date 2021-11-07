
        // randomPoint(threeSystem) {
        //     let i = Math.round(Math.random() * 5)
        //     let myPosition = this.threeSystem.controls.object.position
        //     let windowRect = document.getElementById("sarira").getBoundingClientRect()

        //     let randomX = random(myPosition.x + windowRect.width / 100, -myPosition.x - windowRect.width / 100)
        //     let randomY = random(myPosition.y + windowRect.width / 100, -myPosition.y - windowRect.width / 100)
        //     let randomZ = random(myPosition.z + windowRect.width / 100, -myPosition.z - windowRect.width / 100)
        //     let randPoint;

        //     if (i === 0) {
        //         //top
        //         randPoint = [randomX, myPosition.y, randomZ]
        //         //bottom
        //     } else if (i == 1) {
        //         randPoint = [randomX, -myPosition.y, randomZ]
        //         //left
        //     } else if (i == 2) {
        //         randPoint = [-myPosition.x, randomY, randomZ]
        //         //right 
        //     } else if (i == 3) {
        //         randPoint = [myPosition.x, randomY, randomZ]
        //     }
        //     //front
        //     else if (i == 4) {
        //         randPoint = [randomX, randomY, myPosition.z]
        //     }
        //     //back     
        //     else {
        //         randPoint = [randomX, randomY, -myPosition.z]
        //     }
        //     return randPoint
        // }