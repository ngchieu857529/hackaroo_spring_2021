import React from 'react'
import { Form, Field } from 'react-final-form'
import GenerateRandomCode from 'react-random-code-generator';

import Card from "./Card"
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from "./cardUtils"
import PaymentFormStyles from "./PaymentFormStyles"

export default class PaymentFormPortal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            insuranceData: props.insuranceData,
            cardNumber: "",
            submitted: false,
            curPlanType: "",
            curPlanName: ""
        }
    }

    componentDidMount() {
        var self = this;
        const insuranceData = this.state.insuranceData;

        Object.keys(insuranceData.plans).forEach(function(type) {
            Object.keys(insuranceData.plans[type]).forEach(function(plan) {
                self.setState({
                    curPlanType: type,
                    curPlanName: insuranceData.plans[type][plan]["Plan Marketing Name"]
                })
            })
        })
    }

    onSubmit (values){
        this.setState({
            cardNumber: values.number,
            submitted: true
        })
    }

    renderPlansList() {
        const insuranceData = this.state.insuranceData;
        return Object.keys(insuranceData.plans).map(function(type) {
            return Object.keys(insuranceData.plans[type]).map(function(plan) {
                var price = ""
                Object.keys(insuranceData.plans[type][plan]).map(function(detail) {
                    if (detail.includes("Age")) {
                        price = insuranceData.plans[type][plan][detail]
                    }
                })
                return (
                    <option key={type + " - " + insuranceData.plans[type][plan]["Plan Marketing Name"] + " - $" + price} value={type + " - " + insuranceData.plans[type][plan]["Plan Marketing Name"] + " - $" + price}>{type + " - " + insuranceData.plans[type][plan]["Plan Marketing Name"] + " - $" + price}</option>
                )
            })
        })
    }

    renderPlansDetails(planType, planName) {
        const insuranceData = this.state.insuranceData;
        return Object.keys(insuranceData.plans).map(function(type) {
            return (
                <div className="col-md-12">
                    {Object.keys(insuranceData.plans[type]).map(function(plan) {
                        if (insuranceData.plans[type][plan]["Plan Marketing Name"] === planName) {
                            return (
                                <div className="col-md-12">
                                    <div className="col-md-12">
                                        <table style={{width: "100%"}}>
                                            <th colSpan="2" style={{backgroundColor: "#00B050", color: "#FFFFFF"}}>
                                                {insuranceData.plans[type][plan]["Plan Marketing Name"]}
                                            </th>
                                            <tbody>
                                                <tr style={{backgroundColor: "lightgreen"}}>
                                                    <td><b>Plan Information</b></td>
                                                    <td><b>Description</b></td>
                                                </tr>
                                                {Object.keys(insuranceData.plans[type][plan]).map(function(detail) {
                                                    return (
                                                        <tr>
                                                            <td style={{width: "30%", textTransform: 'capitalize'}}>{detail}</td>
                                                            <td style={{width: "70%"}}>{insuranceData.plans[type][plan][detail]}</td>
                                                        </tr>        
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            )
        })
    }

    handlePlanChange(e) {
        const optionValue = e.target.value
        var firstIndex = 0
        var secondIndex = optionValue.lastIndexOf('-')
        
        for (var i = 0; i < optionValue.length; i++) {
            if (optionValue[i] === "-") {
                firstIndex = i
                break
            }
        }

        const curPlanType = optionValue.substring(0, firstIndex - 1)
        const curPlanName = optionValue.substring(firstIndex + 2, secondIndex - 1)

        this.setState({
            curPlanType: curPlanType,
            curPlanName: curPlanName
        })
    }

    render () {
        const insuranceData = this.state.insuranceData;
        var cardNumber = this.state.cardNumber.replace(/.(?=.{4})/g, 'x')
        const randomConfNum = GenerateRandomCode.TextNumCode(8,6).toUpperCase();
        const plansList = this.renderPlansList();
        const curPlanType = this.state.curPlanType;
        const curPlanName = this.state.curPlanName;

        return (
            <div>
                {Object.keys(insuranceData.plans).length > 0 ? (
                <div>
                    <div style={{textAlign: "center"}}>
                        <h1>PAYMENT PORTAL</h1>
                        <br />
                    </div>
                    {this.state.submitted === false ? (
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <div className="row">
                                Based on the provided information, here is what our prediction for the charge of your insurance plan: {insuranceData.premium_charge.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                            </div>
                            <br />
                            <div className="row">Select a plan below to view and pay!</div>
                                <select style={{width: "100%"}} className="form-control" value={curPlanType + " - " + curPlanName} onChange={this.handlePlanChange.bind(this)}>
                                    {plansList}
                                </select>
                                <br />
                                {this.renderPlansDetails(curPlanType, curPlanName)}
                            <br />
                            <div>Please enter your payment information below:</div>
                        </div>
                        <PaymentFormStyles>
                            <Form
                                onSubmit={this.onSubmit.bind(this)}
                                render={({
                                    handleSubmit,
                                    form,
                                    submitting,
                                    pristine,
                                    values,
                                    active
                                }) => {
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <Card
                                                number={values.number || ''}
                                                name={values.name || ''}
                                                expiry={values.expiry || ''}
                                                cvc={values.cvc || ''}
                                                focused={active}
                                            />
                                            <div>
                                                <Field
                                                    name="number"
                                                    component="input"
                                                    type="text"
                                                    pattern="[\d| ]{16,22}"
                                                    placeholder="Card Number"
                                                    format={formatCreditCardNumber}
                                                />
                                            </div>
                                            <div>
                                                <Field
                                                    name="name"
                                                    component="input"
                                                    type="text"
                                                    placeholder="Name"
                                                />
                                            </div>
                                            <div>
                                                <Field
                                                    name="expiry"
                                                    component="input"
                                                    type="text"
                                                    pattern="\d\d/\d\d"
                                                    placeholder="Valid Thru"
                                                    format={formatExpirationDate}
                                                />
                                                <Field
                                                    name="cvc"
                                                    component="input"
                                                    type="text"
                                                    pattern="\d{3,4}"
                                                    placeholder="CVC"
                                                    format={formatCVC}
                                                />
                                            </div>
                                            <div className="buttons">
                                                <button type="submit" disabled={submitting}>
                                                    Submit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={form.reset}
                                                    disabled={submitting || pristine}
                                                >
                                                    Reset
                                                </button>
                                            </div>
                                        </form>
                                    )
                                }}
                            />
                        </PaymentFormStyles>
                    </div>
                    ) : (
                    <div>
                        <h4 style={{textAlign: "center"}}>Your payment has been submitted successfully!</h4>
                        <br />
                        <div className="col-md-12">
                            <div>Below is the confirmation of your payment. Please save it for your record!</div>
                            <br />
                            <div>
                                Total Charge: {insuranceData.premium_charge.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                            </div>
                            <div>
                                Confirmation Number: {randomConfNum}
                            </div>
                            <div>
                                Card Number: {cardNumber}
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                ) : (
                <div>
                    <div style={{textAlign: "center"}}>
                        <h3>No insurance plans found based on the provided information. You can close this window and try again!</h3>
                        <br />
                    </div>
                </div>
                )}
            </div>
        )
    }
}