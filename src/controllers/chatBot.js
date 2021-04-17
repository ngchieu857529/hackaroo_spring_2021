import { server } from "./server"
import { modal } from "./modal"
import axios from 'axios'

class ChatBot {
    constructor() {
        this.state = {
            serverDomain: server.getServerDomain()
        }
    }

    processRequestSimpleForm(data, callback) {
        axios.get(this.state.serverDomain + "/api/model/quick?height=" + data.heightCm + "&weight=" + data.weightKg + "&age=" + data.age
        + "&children=" + data.children + "&smoker=" + data.smoker + "&region=" + data.region + "&sex=" + data.sex)
        .then(function(response) {
            if (callback) {
                callback(response)
            }
        })
        .catch(function(error) {
            console.log(error)
            modal.showInfo("Unable to process the data. See console log for more info.", "danger", "top", "center")
        })
    }
}

export let chatBot = new ChatBot();