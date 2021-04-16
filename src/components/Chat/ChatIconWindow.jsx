import React from "react"
import ChatBot from "react-simple-chatbot"
import { ThemeProvider } from "styled-components"

import RequestFormSimple from "./RequestFormSimple"
import RequestFormComprehensive from "./RequestFormComprehensive"
import { chatBot } from "../../controllers/chatBot"

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

var currentFormData = {}

export default class ChatBotWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            voice: null,
            currentStepId: 0,
            steps: [
                {
                    id: "start_chat",
                    message: "Hello! I am a bot agent, and I am here to assist you with your insurance plan. What do you need help with?",
                    trigger: "start_options"
                },
                {
                    id: "start_options",
                    options: [
                        { value: "Submit", label: "Find an insurance plan", trigger: "start_find_plan" },
                        { value: "Quit", label: "Nothing", trigger: "end_chat" },
                    ],
                },
                {
                    id: "start_find_plan",
                    message: "Great! Do you want to fill out the form all at once or do you want me to walk you through the process?",
                    trigger: "select_process"
                },
                {
                    id: "select_process",
                    options: [
                        { value: "fill_form", label: "Fill out the form", trigger: "ask_form_type" },
                        { value: "walk_through", label: "Walk through the process step-by-step", trigger: "start_walk_through" },
                    ],
                },
                {
                    id: "ask_form_type",
                    message: "Do you want a simple analysis or a comprehensive analysis?",
                    trigger: "select_form_type"
                },
                {
                    id: "select_form_type",
                    options: [
                        { value: "simple", label: "Simple form", trigger: "start_fill_form_simple" },
                        { value: "comprehensive", label: "Comprehensive form", trigger: "start_fill_form_comprehensive" },
                    ],
                },
                
                //Entire Form's flow - SimpleRequestFormComprehensive
                {
                    id: "start_fill_form_simple",
                    component: <RequestFormSimple edit={true} onChangeFormData={this.onChangeFormData} />,
                    asMessage: true,
                    waitAction: true,
                    trigger: "confirm_submission_message_simple"
                },
                {
                    id: "confirm_submission_message_simple",
                    message: "Below is the overview of the form. Is this correct?",
                    trigger: "submission_form_simple"
                },
                {
                    id: "submission_form_simple",
                    component: <RequestFormSimple edit={false} onChangeFormData={this.onChangeFormData} />,
                    asMessage: true,
                    trigger: "confirm_submission_simple"
                },
                {
                    id: "confirm_submission_simple",
                    options: [
                        { value: "Yes", label: "Yes", trigger: "end_chat" },
                        { value: "No", label: "No", trigger: "reject_submission_simple" },
                    ],
                },
                {
                    id: "reject_submission_simple",
                    message: "What would you like to do next?",
                    trigger: "edit_submission_simple"
                },
                {
                    id: "edit_submission_simple",
                    options: [
                        { value: "edit_form", label: "Edit the form", trigger: "start_fill_form_simple" },
                        { value: "cancel", label: "The form looks correct. Let's submit", trigger: "confirm_submission_message_simple" },
                    ],
                },

                //Entire Form's flow - Comprehensive
                {
                    id: "start_fill_form_comprehensive",
                    component: <RequestFormComprehensive edit={true} onChangeFormData={this.onChangeFormData} />,
                    asMessage: true,
                    waitAction: true,
                    trigger: "confirm_submission_message_comprehensive"
                },
                {
                    id: "confirm_submission_message_comprehensive",
                    message: "Below is the overview of the form. Is this correct?",
                    trigger: "submission_form_comprehensive"
                },
                {
                    id: "submission_form_comprehensive",
                    component: <RequestFormComprehensive edit={false} onChangeFormData={this.onChangeFormData} />,
                    asMessage: true,
                    trigger: "confirm_submission_comprehensive"
                },
                {
                    id: "confirm_submission_comprehensive",
                    options: [
                        { value: "Yes", label: "Yes", trigger: "end_chat" },
                        { value: "No", label: "No", trigger: "reject_submission_comprehensive" },
                    ],
                },
                {
                    id: "reject_submission_comprehensive",
                    message: "What would you like to do next?",
                    trigger: "edit_submission_comprehensive"
                },
                {
                    id: "edit_submission_comprehensive",
                    options: [
                        { value: "edit_form", label: "Edit the form", trigger: "start_fill_form_comprehensive" },
                        { value: "cancel", label: "The form looks correct. Let's submit", trigger: "confirm_submission_message_comprehensive" },
                    ],
                },

                //Walk-through's flow
                {
                    id: "start_walk_through",
                    message: "Below is the overview of the form. Is this correct?",
                    trigger: "end_chat"
                },

                //End
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

    onChangeFormData(newData) {
        currentFormData = newData
    }

    submitForm() {
        var curFormData = currentFormData

        if (curFormData.sex === "Male") {
            curFormData.sex = 0
        } else if (curFormData.sex === "Female") {
            curFormData.sex = 1
        }

        if (curFormData.smoker === "No") {
            curFormData.smoker = 0
        } else if (curFormData.smoker === "Yes") {
            curFormData.smoker = 1
        }

        if (curFormData.region === "Northeast") {
            curFormData.region = 0
        } else if (curFormData.region === "Northwest") {
            curFormData.region = 1
        } else if (curFormData.region === "Southeast") {
            curFormData.region = 2
        } else if (curFormData.region === "Southwest") {
            curFormData.region = 3
        }

        curFormData.heightCm = curFormData.heightFeet * 30.48 + curFormData.heightInch * 2.54
        curFormData.weightKg = curFormData.weight * 0.45359237

        console.log(curFormData)

        chatBot.processRequestSimpleForm(curFormData, function(response) {
            console.log(response)
        })
    }

    render() {
        return (
            <div className="chat-icon-window">
                <div className="col-md-12">
                    <ThemeProvider theme={chatbotTheme}>
                        <ChatBot
                            handleEnd={this.submitForm.bind(this)}
                            headerTitle="Chatbot"
                            // speechSynthesis={{ enable: true, lang: 'en', voice: this.state.voice }}
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