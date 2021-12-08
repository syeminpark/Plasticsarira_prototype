class ServerClientCommunication {
    constructor(userName) {

        this.url = `https://plasticsariraserver.herokuapp.com`
        //this.url = "http://localhost:3000"
        this.name = userName
        this.type = this.chooseType()

        if (this.name == "admin") {
            document.addEventListener('keydown', (event) => {
                const keyName = event.key;
                if (keyName === 'Control') {
                    serverClientCommunication.deleteUsersByName()
                    serverClientCommunication.deleteSarirasByName()
                    return;
                }
            })
        }
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

    async deleteUsersByName() {
        await $.ajax({
            type: "DELETE",
            url: `${this.url}/users/all/${this.name}`,
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

    async deleteSarirasByName() {
        await $.ajax({
            type: "DELETE",
            url: `${this.url}/sarira/all/${this.name}`,
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