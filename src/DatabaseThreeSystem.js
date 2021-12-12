class DataBaseThreeSystem extends ThreeSystem {
    constructor() {
        super()
        this.template = document.getElementById("template").text;
        this.content= document.getElementById("content");

    }

    createElement(i) {
        let element = document.createElement("div");
        element.className = "list-item";
        element.innerHTML = this.template.replace('$', i);
        // Look up the element that represents the area
        // we want to render the scene
        this.element = element.querySelector(".scene");
        this.content.appendChild(element);
    }

    //temp code
    addToUserData() {
        this.scene.userData.camera = this.camera;
        this.scene.userData.controls = this.controls;
        this.scene.userData.element = this.element
    }

}