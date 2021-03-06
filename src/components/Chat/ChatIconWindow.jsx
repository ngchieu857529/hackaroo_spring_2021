import React from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import NewWindow from 'react-new-window'
import Geocode from "react-geocode"

import FullFormSimple from "./Forms/FullFormSimple"
import WalkThroughFormSimple from "./Forms/WalkThroughFormSimple"
import { chatBot } from "../../controllers/chatBot"
import PaymentFormPortal from "../PaymenPortal/PaymentFormPortal"
// import ChatWithAgent from "../ChatWithAgent/ChatWithAgent.jsx"

const chatbotTheme = {
    background: '#f5f8fb',
    headerBgColor: '#00B050',
    headerFontColor: '#FFFFFF',
    headerFontSize: '25px',
    botBubbleColor: '#00B050',
    botFontColor: '#FFFFFF',
    userBubbleColor: '#28a745',
    userFontColor: '#FFFFFF',
};

var currentFormData = {}

function getcurrentLocation() {
    if (navigator && navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                resolve({
                    lat: coords.latitude,
                    lng: coords.longitude
                });
            });
        });
    }
}

var userState = "MO"
var curLocation = getcurrentLocation();

curLocation.then(function(result){
    if (result.lat != null && result.lng != null) {
        Geocode.fromLatLng(result.lat, result.lng, "AIzaSyAAKEUHaLzR2U_-XBdTwPE_VZ39ZPh6hb8").then(
            (response) => {
                userState = response.results[0]["address_components"][6]["short_name"]
            },
            (error) => {
                console.error(error);
            }
        );
    }
})

export default class ChatBotWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            voice: null,
            currentStepId: 0,
            showPaymentPortal: false,
            showChatWithAgentComponent: false,
            insuranceData: null,
            steps: [
                {
                    id: "start_chat",
                    message: "Hello! I am a virtual assistant, and I am here to assist you with your insurance plan. What do you need help with?",
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
                        { value: "fill_form", label: "Fill out the form", trigger: "start_fill_form_simple" },
                        { value: "walk_through", label: "Walk through the process step-by-step", trigger: "start_walk_through_simple" },
                    ],
                },
                
                //Entire Form's flow - Simple
                {
                    id: "start_fill_form_simple",
                    component: <FullFormSimple userState={userState} edit={true} onChangeFormData={this.onChangeFormData} />,
                    asMessage: true,
                    waitAction: true,
                    trigger: "confirm_submission_message_simple"
                },
                {
                    id: "confirm_submission_message_simple",
                    message: "Below is the overview of the form. Your location was retrieved automatically by GPS. Is this correct?",
                    trigger: "submission_form_simple"
                },
                {
                    id: "submission_form_simple",
                    component: <FullFormSimple userState={userState} edit={false} onChangeFormData={this.onChangeFormData} />,
                    asMessage: true,
                    trigger: "confirm_submission_simple"
                },
                {
                    id: "confirm_submission_simple",
                    options: [
                        { value: "Yes", label: "Yes", trigger: "ask_choose_next_step" },
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

                /* END OF FORM FLOW */

                /* START OF WALK THROUGH FLOW */

                //Walk through's flow - Simple
                {
                    id: "start_walk_through_simple",
                    message: "Please enter your height in feet only (no inch - I will ask you inch in the next step)!",
                    trigger: "simple_height_feet"
                },
                {
                    id: "simple_height_feet",
                    user: true,
                    validator: (value) => {
                        var testInt = /^[0-9\b]+$/
                        if (value === "") {
                            return "You must enter something!"
                        } else if (isNaN(value)) {
                            return "You must enter a valid number!"
                        } else if (testInt.test(value) === false || value < 1 || value > 8) {
                            return "This doesn't seem like a valid number for feet unit. Please try again!"
                        }
                        return true;
                    },
                    trigger: "simple_ask_height_inch"
                },
                {
                    id: "simple_ask_height_inch",
                    message: "Please enter your height in inch only!",
                    trigger: "simple_height_inch"
                },
                {
                    id: "simple_height_inch",
                    user: true,
                    validator: (value) => {
                        var testInt = /^[0-9\b]+$/
                        if (value === "") {
                            return "You must enter something!"
                        } else if (isNaN(value)) {
                            return "You must enter a valid number!"
                        } else if (testInt.test(value) === false || value < 0 || value > 12) {
                            return "This doesn't seem like a valid number for inch unit. Please try again!"
                        }
                        return true;
                    },
                    trigger: "simple_ask_weight"
                },
                {
                    id: "simple_ask_weight",
                    message: "Please enter your weight (lbs)!",
                    trigger: "simple_weight"
                },
                {
                    id: "simple_weight",
                    user: true,
                    validator: (value) => {
                        if (value === "") {
                            return "You must enter something!"
                        } else if (isNaN(value)) {
                            return "You must enter a valid number!"
                        } else if (value.length > 3) {
                            return "This doesn't seem like a valid number for lbs unit. Please try again!"
                        }
                        return true;
                    },
                    trigger: "simple_ask_age"
                },
                {
                    id: "simple_ask_age",
                    message: "Please enter your age!",
                    trigger: "simple_age"
                },
                {
                    id: "simple_age",
                    user: true,
                    validator: (value) => {
                        var testInt = /^[0-9\b]+$/
                        if (value === "") {
                            return "You must enter something!"
                        } else if (isNaN(value)) {
                            return "You must enter a valid number!"
                        } else if (testInt.test(value) === false || value > 120) {
                            return "This doesn't seem like a valid number for age. Please try again!"
                        }
                        return true;
                    },
                    trigger: "simple_ask_gender"
                },
                {
                    id: "simple_ask_gender",
                    message: "Please select your gender!",
                    trigger: "simple_gender"
                },
                {
                    id: "simple_gender",
                    options: [
                        { value: "Male", label: "Male", trigger: "simple_ask_children" },
                        { value: "Female", label: "Female", trigger: "simple_ask_children" },
                    ],
                },
                {
                    id: "simple_ask_children",
                    message: "Please enter the total number of children you have!",
                    trigger: "simple_children"
                },
                {
                    id: "simple_children",
                    user: true,
                    validator: (value) => {
                        var testInt = /^[0-9\b]+$/
                        if (value === "") {
                            return "You must enter something!"
                        } else if (isNaN(value)) {
                            return "You must enter a valid number!"
                        } else if (testInt.test(value) === false || value < 0 || value > 9) {
                            return "This doesn't seem like a valid number for a number of children. Please try again!"
                        }
                        return true;
                    },
                    trigger: "simple_ask_smoke"
                },
                {
                    id: "simple_ask_smoke",
                    message: "Do you smoke?",
                    trigger: "simple_smoker"
                },
                {
                    id: "simple_smoker",
                    options: [
                        { value: "Yes", label: "Yes", trigger: "ask_submit_simple_walk_through" },
                        { value: "No", label: "No", trigger: "ask_submit_simple_walk_through" },
                    ],
                },
                {
                    id: "ask_submit_simple_walk_through",
                    message: "Below is the overview of the submission. Your location was retrieved automatically by GPS. Is this correct?",
                    trigger: "show_submit_simple_walk_through"
                },
                {
                    id: "show_submit_simple_walk_through",
                    component: <WalkThroughFormSimple userState={userState} />,
                    asMessage: true,
                    trigger: "confirm_submit_simple_walk_through"
                },
                {
                    id: "confirm_submit_simple_walk_through",
                    options: [
                        { value: "Yes", label: "Yes", trigger: "ask_choose_next_step" },
                        { value: "No", label: "No", trigger: "reject_submit_simple_walk_through" },
                    ],
                },
                {
                    id: "reject_submit_simple_walk_through",
                    message: "What would you like to do next?",
                    trigger: "edit_submit_simple_walk_through"
                },
                {
                    id: "edit_submit_simple_walk_through",
                    options: [
                        { value: "edit_height_feet", label: "Edit Feet value of the height", trigger: "simple_edit_height_feet" },
                        { value: "edit_height_inch", label: "Edit Inch value of the height", trigger: "simple_edit_height_inch" },
                        { value: "edit_weight", label: "Edit weight value", trigger: "simple_edit_weight" },
                        { value: "edit_age", label: "Edit age", trigger: "simple_edit_age" },
                        { value: "edit_gender", label: "Edit gender", trigger: "simple_edit_gender" },
                        { value: "edit_children", label: "Edit number of children", trigger: "simple_edit_children" },
                        { value: "edit_smoke", label: "Edit smoke value", trigger: "simple_edit_smoke" },
                        { value: "edit_region", label: "Edit region", trigger: "simple_edit_region" },
                        { value: "cancel_and_submit", label: "Cancel Edit. Everything looks good!", trigger: "ask_choose_next_step" },
                    ],
                },
                {
                    id: "simple_edit_height_feet",
                    message: "Please enter your new height (in feet)!",
                    trigger: "update_height_feet"
                },
                {
                    id: "update_height_feet",
                    update: "simple_height_feet",
                    trigger: "ask_submit_simple_walk_through"
                },
                {
                    id: "simple_edit_height_inch",
                    message: "Please enter your new height (in inch)!",
                    trigger: "update_height_inch"
                },
                {
                    id: "update_height_inch",
                    update: "simple_height_inch",
                    trigger: "ask_submit_simple_walk_through"
                },
                {
                    id: "simple_edit_weight",
                    message: "Please enter your new weight (in lbs)!",
                    trigger: "update_weight"
                },
                {
                    id: "update_weight",
                    update: "simple_weight",
                    trigger: "ask_submit_simple_walk_through"
                },
                {
                    id: "simple_edit_age",
                    message: "Please enter your new age!",
                    trigger: "update_age"
                },
                {
                    id: "update_age",
                    update: "simple_age",
                    trigger: "ask_submit_simple_walk_through"
                },
                {
                    id: "simple_edit_gender",
                    message: "Please select your gender!",
                    trigger: "update_gender"
                },
                {
                    id: "update_gender",
                    options: [
                        { value: "Male", label: "Male", update: "simple_gender", trigger: "ask_submit_simple_walk_through" },
                        { value: "Female", label: "Female", update: "simple_gender", trigger: "ask_submit_simple_walk_through" },
                    ],
                },
                {
                    id: "simple_edit_children",
                    message: "Please enter your total number of children!",
                    trigger: "update_children"
                },
                {
                    id: "update_children",
                    update: "simple_children",
                    trigger: "ask_submit_simple_walk_through"
                },
                {
                    id: "simple_edit_smoke",
                    message: "Do you smoke?",
                    trigger: "update_smoke"
                },
                {
                    id: "update_smoke",
                    options: [
                        { value: "Yes", label: "Yes", update: "simple_smoker", trigger: "ask_submit_simple_walk_through" },
                        { value: "No", label: "No", update: "simple_smoker", trigger: "ask_submit_simple_walk_through" },
                    ],
                },
                {
                    id: "simple_edit_region",
                    message: "Select your region!",
                    trigger: "update_region"
                },
                {
                    id: "update_region",
                    options: [
                        { value: "Northeast", label: "Northeast", update: "simple_region", trigger: "ask_submit_simple_walk_through" },
                        { value: "Northwest", label: "Northwest", update: "simple_region", trigger: "ask_submit_simple_walk_through" },
                        { value: "Southeast", label: "Southeast", update: "simple_region", trigger: "ask_submit_simple_walk_through" },
                        { value: "Southwest", label: "Southwest", update: "simple_region", trigger: "ask_submit_simple_walk_through" },
                    ],
                },

                /* END OF WALK THROUGH FLOW */

                /* ASK NEXT STEP */
                {
                    id: "ask_choose_next_step",
                    message: "Your form has been submitted. What do you want to do next?",
                    trigger: "choose_next_step",
                },
                {
                    id: "choose_next_step",
                    options: [
                        { value: "pay", label: "Pay for your insurance plan", trigger: "end_chat_with_action" },
                        // { value: "chat_with_agent", label: "Chat to a live agent", trigger: "end_chat_with_action" },
                        { value: "end_chat", label: "Nothing. That's it for me!", trigger: "end_chat" },
                    ],
                },

                //End Chat
                {
                    id: "end_chat_with_action",
                    message: "Thank you for talking with me today! Refer to the new popup window for your next step!",
                    end: true,
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

    onChangeFormData(newData) {
        currentFormData = newData
    }

    submitForm({steps, values}) {
        if (steps.start_options.value === "Quit") {
            return
        }

        var self = this
        var curFormData = currentFormData

        if (Object.entries(curFormData).length !== 0) {
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

            curFormData.heightCm = curFormData.heightFeet * 30.48 + curFormData.heightInch * 2.54
            curFormData.weightKg = curFormData.weight * 0.45359237
        } else {
            curFormData.heightCm = steps.simple_height_feet.value * 30.48 + steps.simple_height_inch.value * 2.54
            curFormData.weightKg = steps.simple_weight.value * 0.45359237
            curFormData.age = steps.simple_age.value
            curFormData.children = steps.simple_children.value
            
            if (steps.simple_gender.value === "Male") {
                curFormData.sex = 0
            } else if (steps.simple_gender.value === "Female") {
                curFormData.sex = 1
            }

            if (steps.simple_smoker.value === "No") {
                curFormData.smoker = 0
            } else if (steps.simple_smoker.value === "Yes") {
                curFormData.smoker = 1
            }

            curFormData.state = userState
        }

        chatBot.processRequestSimpleForm(curFormData, function(response) {
            self.setState({
                insuranceData: response.data
            })
            
            if (steps.choose_next_step.value === "pay") {
                self.setState({
                    showPaymentPortal: true
                })
            } else if (steps.choose_next_step.value === "chat_with_agent") {
                self.setState({
                    showChatWithAgentComponent: true
                })
            }
        })
    }

    render() {
        return (
            <div className="chat-icon-window">
                <div className="col-md-12">
                    <ThemeProvider theme={chatbotTheme}>
                        <ChatBot
                            handleEnd={this.submitForm.bind(this)}
                            headerTitle="Virtual Assistant"
                            speechSynthesis={{ enable: true, lang: 'en', voice: this.state.voice }}
                            steps={this.state.steps}
                            placeholder="Enter a message"
                            recognitionEnable={true}
                            width="100%"
                            userDelay={0}
                        />
                    </ThemeProvider>

                    {this.state.showPaymentPortal === true && (
                    <NewWindow name="Payment Portal">
                        <PaymentFormPortal insuranceData={this.state.insuranceData}/>
                    </NewWindow>
                    )}

                    {this.state.showChatWithAgentComponent === true && (
                    <NewWindow>
                        {/* <ChatWithAgent /> */}
                    </NewWindow>
                    )}
                </div>
            </div>
        )
    }
}