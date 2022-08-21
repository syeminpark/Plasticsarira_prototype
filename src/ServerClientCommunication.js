class ServerClientCommunication {
    constructor(dataOrganizer) {
        this.url = `https://plasticsariraserver.herokuapp.com`
        //this.url = "http://localhost:3000"
        this.dataOrganizer = dataOrganizer


        if (this.dataOrganizer.getOwner() == "admin" || this.dataOrganizer.getOwner() == "Admin") {
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
                name: this.dataOrganizer.getOwner(),
                type: this.dataOrganizer.getType()
            });
            console.log(JSON.stringify(response))

            this.dataOrganizer.setId(response.user._id)
            this.dataOrganizer.saveToSessionStorage()

        } catch (error) {
            console.log(error)
        }
    }

    async getUserById() {

        try {
            await $.get(`${this.url}/users/${this.dataOrganizer.getId()}`, response => {
                console.log(response)
            })
        } catch (error) {
            console.log(error)
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
            url: `${this.url}/users/${this.dataOrganizer.getId()}`,
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
            url: `${this.url}/users/all/${this.dataOrganizer.getOwner()}`,
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
            let response = await $.post(`${this.url}/sarira/${this.dataOrganizer.getId()}`, {
                name: this.dataOrganizer.getOwner(),
                type: this.dataOrganizer.getType(),
                message: JSON.stringify(object)

            });
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    async getSariraById() {
        try {
            await $.get(`${this.url}/sarira/${this.dataOrganizer.getId()}`, response => {
                this.dataOrganizer.setMySariraData(JSON.parse(response.sariraData.message))
            })

        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }

    async getAllSarira() {
        try {
            await $.get(`${this.url}/sarira`, {
                page: "0",
                limit: "100"

            }, response => {

                this.dataOrganizer.setOtherSariraData(response.allSariraData)
                this.dataOrganizer.setTotalSariraCount(response.totalCount)
            })

        } catch (error) {
            console.log(error)
        }
    }


    async deleteSariraById() {
        await $.ajax({
            type: "DELETE",
            url: `${this.url}/sarira/${this.dataOrganizer.getId()}`,
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
            url: `${this.url}/sarira/all/${this.dataOrganizer.getOwner()}`,
            success: function (response) {
                console.log(response)
            },
            error: function (error) {
                console.log(error)
            }
        })
    }

}