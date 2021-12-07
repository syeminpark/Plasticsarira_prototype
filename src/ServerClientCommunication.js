class ServerClientCommunication {
    constructor(userName) {
        this.url = `http://localhost:3000`
        this.name = userName
        this.type = this.chooseType()

        if (this.name == "admin")
            window.addEventListener("beforeunload", this.deleteUserById.bind(this))
            window.addEventListener("beforeunload", this.deleteSariraById.bind(this))
    }

    async createUser() {
        try {

            let response = await $.post(`${this.url}/users`, {
                name: this.name,
                type: this.type
            });
            this.id = response.user._id

        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }

    async getUserById() {
        try {
            await $.get(`${this.url}/${this.id}`, response => {
                console.log(response)
            })
        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }

    async getAllUsers() {
        try {
            await $.get(`${this.url}/users`, response => {
                console.log(response)
            })

        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }

    async deleteUserById() {
        await $.ajax({
            type: "DELETE",
            url: `${this.url}/users/${this.id}`,
            success: function (response) {
                console.log(response)
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
    //Sarira

    async postSariraById(object) {
        try {
            let response = await $.post(`${this.url}/sarira/${this.id}`, {
                name: this.name,
                type: this.type,
                message: JSON.stringify(object)
       
            });
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    async getSariraById() {
        try {
            await $.get(`${this.url}/sarira/${this.id}`, response => {
                console.log(response)
            })

        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }


    async getAllSarira() {
        try {
            await $.get(`${this.url}/sarira`, response => {
                console.log(response)
            })

        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }


    async deleteSariraById() {
        await $.ajax({
            type: "DELETE",
            url: `${this.url}/sarira/${this.id}`,
            success: function (response) {
                console.log(response)
            },
            error: function (error) {
                console.log(error)
            }
        })
    }

    /////////////////////////////////////
    chooseType() {
        let type;
        this.name == "admin" ? type = "administrator" : type = "audience"
        return type;
    }

}