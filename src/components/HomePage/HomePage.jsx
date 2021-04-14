import React from "react"
import MainChatIcon from "../Chat/MainChatIcon"
import ChatIconWindow from "../Chat/ChatIconWindow"

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="col-md-12">
                MORE GRAPHS HERE
                <MainChatIcon />
                <ChatIconWindow />
            </div>
        )
    }
}