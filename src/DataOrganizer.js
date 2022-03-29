class DataOrganizer {
    constructor(userName, userId) {
        this.owner = userName;
        this.owner == "admin" ? this.type = "administrator" : this.type = "audience"
        this.id = userId;
        this.totalSariraCount;
        this.type;
        this.mySariraData;
        this.otherSariraData = [];
        
    }

    getOwner() {
        return this.owner
    }

    getType() {
        return this.type
    }

    getId() {
        return this.id
    }
    getOtherSariraData() {
        return this.otherSariraData
    }

    setId(id) {
        this.id = id
    }

    setMySariraData(response) {
        this.mySariraData = response
    }

    setOtherSariraData(response) {
        this.organizeData(response)

    }

    setTotalSariraCount(response) {
        this.totalSariraCount = response

    }

    saveToSessionStorage() {
        sessionStorage.setItem("userName", this.name);
        sessionStorage.setItem("userId", this.id);
    }

    organizeData(response) {
        for (let i = 0; i < response.length; i++) {
            this.otherSariraData.push({
                name: response[i].name,
                vertices: JSON.parse(response[i].message).vertices,
                metaData: JSON.parse(response[i].message).metaData
            })         
        }
        console.log(this.otherSariraData)
    }

    deleteNamefromDom(){
        
    }
}