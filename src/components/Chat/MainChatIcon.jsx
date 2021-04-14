import React from "react"
import $ from "jquery"

export default class MainChatIcon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayChatWindow: true
        }
    }

    componentDidMount() {

    }

    onChatIconClicked() {
        if (this.state.displayChatWindow === true) {
            $(".chat-icon-window").css("visibility", "visible");
        } else {
            $(".chat-icon-window").css("visibility", "hidden");
        }
        
        this.setState({
            displayChatWindow: !this.state.displayChatWindow
        })
    }

    render() {
        return (
            <img alt="Chat Bot Icon" onClick={this.onChatIconClicked.bind(this)} src={process.env.PUBLIC_URL + '/chatbot_icon.jpg'} width="100px" height="100px"/>
        )
    }
}