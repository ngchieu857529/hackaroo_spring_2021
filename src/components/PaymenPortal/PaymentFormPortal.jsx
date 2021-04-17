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
            submitted: false
        }
    }

    componentDidMount() {
        console.log(this.state.insuranceData)
    }

    onSubmit (values){
        this.setState({
            cardNumber: values.number,
            submitted: true
        })
    }

    render () {
        const insuranceData = this.state.insuranceData;
        var cardNumber = this.state.cardNumber.replace(/.(?=.{4})/g, 'x')
        const randomConfNum = GenerateRandomCode.TextNumCode(8,6).toUpperCase();

        return (
            <div>
                <div style={{textAlign: "center"}}>
                    <h1>PAYMENT PORTAL</h1>
                    <br />
                </div>
                {this.state.submitted === false ? (
                <div className="col-md-12">
                    <div className="col-md-12">
                        <div>Here is the summary of your insurance plan you are paying for:</div>
                        <div>
                            Total Charge: {insuranceData.premium_charge.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                        </div>
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
        )
    }
}