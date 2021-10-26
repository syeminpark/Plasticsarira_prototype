class Sarira {
    constructor() {
        this.plasticList = []
        this.plasticList.push(new Core())
        this.plasticList[0].initialize()
    }

    addPlastics(micro) {
        this.plasticList.push(micro)
    }
    showPlastics() {
        for (let plastic of this.plasticList) {
            plastic.show();
        }
    }
}