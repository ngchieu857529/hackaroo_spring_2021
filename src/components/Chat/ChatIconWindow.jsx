import React from "react"
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'

const chatbotTheme = {
    background: '#f5f8fb',
    headerBgColor: '#CD853F',
    headerFontColor: '#FFFFFF',
    headerFontSize: '25px',
    botBubbleColor: '#CD853F',
    botFontColor: '#FFFFFF',
    userBubbleColor: '#28a745',
    userFontColor: '#FFFFFF',
};

export default class ChatBotWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            voice: null,
            currentStepId: 0,
            steps: [
                {
                    id: "start_chat",
                    message: "Hello! How can I help you today?",
                    trigger: "start_options"
                },
                {
                    id: "start_options",
                    options: [
                        { value: "Submit", label: "Submit a 311 Request", trigger: "test_image" },
                        { value: "Quit", label: "Nothing", trigger: "end_chat" },
                    ],
                },
                {
                    id: "test_image",
                    message: "OKAY!!!!",
                    trigger: "start_chat"
                },
                {
                    id: "end_chat",
                    message: "Thank you for talking with me today!",
                    end: true,
                },
            ]
        }
    }

    componentDidMount() {
        this.setState({
            voice: window.speechSynthesis.getVoices()[4]
        })
    }

    render() {
        return (
            <div className="chat-icon-window">
                <div className="col-md-12">
                    <ThemeProvider theme={chatbotTheme}>
                        <ChatBot
                            // handleEnd={this.submitForm.bind(this)}
                            headerTitle="Chatbot"
                            speechSynthesis={{ enable: true, lang: 'en', voice: this.state.voice }}
                            steps={this.state.steps}
                            placeholder="Enter a message"
                            recognitionEnable={true}
                            width="100%"
                            userDelay={0}
                        />
                    </ThemeProvider>
                </div>
            </div>
        )
    }
}