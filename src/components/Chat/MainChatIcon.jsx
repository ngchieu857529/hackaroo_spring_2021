import React from "react"

export default class MainChatIcon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <img src={process.env.PUBLIC_URL + '/chatbot_icon.jpg'} width="100px" height="100px"/>
        )
    }
}