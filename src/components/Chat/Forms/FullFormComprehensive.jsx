import React from "react"
import update from "immutability-helper"
import PropTypes from "prop-types"
import { modal } from "../../../controllers/modal"

var currentData = {}

export default class FullFormComprehensive extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trigger: false,
            userData: {
                age: "Default",
                employment_status: "Default",
                area_code: 0,
                income_level: 0
            }
        };

        this.steps = props.steps
        this.edit = props.edit
    }

    componentWillMount() {
        if (Object.entries(currentData).length !== 0) {
            this.setState({
                userData: currentData
            })
        }
    }

    triggerNext() {
        this.setState({ trigger: true }, () => {
          this.props.triggerNextStep();
        });
    }

    buildNumbersList(min, max) {
        var numbersList = []
        for (var i = min; i <= max; i++) {
            numbersList.push(i)
        }

        return numbersList.map((num) => {
            return <option key={num} value={num}>{num}</option>
        })
    }

    handleAgeChange(e) {
        if (this.state.userData) {
            if (this.state.userData.age) {
                this.setState({
                    userData: update(this.state.userData, {
                        age: {$set: e.target.value}
                    })
                });
            } else {
                const newUserData = {...this.state.userData, age: e.target.value}
                this.setState({
                    userData: newUserData
                })
            }
        } else {
            const newUserData = {...this.state.userData, age: e.target.value}
            this.setState({
                userData: newUserData
            })
        }
    }

    handleEmploymentStatusChange(e) {
        if (this.state.userData) {
            if (this.state.userData.employment_status) {
                this.setState({
                    userData: update(this.state.userData, {
                        employment_status: {$set: e.target.value}
                    })
                });
            } else {
                const newUserData = {...this.state.userData, employment_status: e.target.value}
                this.setState({
                    userData: newUserData
                })
            }
        } else {
            const newUserData = {...this.state.userData, employment_status: e.target.value}
            this.setState({
                userData: newUserData
            })
        }
    }

    handleAreaCodeChange(e) {
        if (this.state.userData) {
            if (this.state.userData.area_code) {
                this.setState({
                    userData: update(this.state.userData, {
                        area_code: {$set: e.target.value}
                    })
                });
            } else {
                const newUserData = {...this.state.userData, area_code: e.target.value}
                this.setState({
                    userData: newUserData
                })
            }
        } else {
            const newUserData = {...this.state.userData, area_code: e.target.value}
            this.setState({
                userData: newUserData
            })
        }
    }

    handleIncomeLevelChange(e) {
        if (this.state.userData) {
            if (this.state.userData.income_level) {
                this.setState({
                    userData: update(this.state.userData, {
                        income_level: {$set: e.target.value}
                    })
                });
            } else {
                const newUserData = {...this.state.userData, income_level: e.target.value}
                this.setState({
                    userData: newUserData
                })
            }
        } else {
            const newUserData = {...this.state.userData, income_level: e.target.value}
            this.setState({
                userData: newUserData
            })
        }
    }

    validate() {
        const userData = this.state.userData;
        const areaCodeFormat = /(^\d{5}$)|(^\d{5}-\d{4}$)/

        if (!userData || !userData.age || userData.age === "Default") {
            modal.showInfo("You must select a valid age number!", "warning", "top", "center");
            return false;
        }

        if (!userData || !userData.employment_status || userData.employment_status === "Default") {
            modal.showInfo("You must select a valid employment status!", "warning", "top", "center");
            return false;
        }

        if (!userData || !userData.area_code || areaCodeFormat.test(userData.area_code) === false) {
            modal.showInfo("You must enter a valid area code!", "warning", "top", "center");
            return false;
        }

        if (!userData || !userData.income_level || isNaN(userData.income_level) || userData.income_level <= 0) {
            modal.showInfo("You must enter a valid income number!", "warning", "top", "center");
            return false;
        }

        return true;
    }

    saveSubmission() {
        if (!this.validate()) {
            return;
        }

        currentData = this.state.userData
        this.props.onChangeFormData(currentData)

        this.triggerNext()
    }

    render() {
        const userData = this.state.userData;
        const ageOptions = this.buildNumbersList(1, 100)

        if (this.edit === true) {
            return (
                <form>
                    <div className="row">
                        <div className="form-group">
                            <label>Your Age</label>
                            <select className="form-control" value={userData.age} onChange={this.handleAgeChange.bind(this)}>
                                <option value="Default">Select a number</option>
                                { ageOptions }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Your Employment Status</label>
                                <select className="form-control" value={userData.employment_status} onChange={this.handleEmploymentStatusChange.bind(this)}>
                                    <option value="Default">Select a status</option>
                                    <option value="Employed">Employed</option>
                                    <option value="Unemployed">Unemployed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>Your Area Code</label>
                            <input type="text" className="form-control" value={userData.area_code} placeholder="Enter your area code" onChange={this.handleAreaCodeChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>Your Income Level (in USD)</label>
                            <input type="text" className="form-control" value={userData.income_level} placeholder="Enter your area code" onChange={this.handleIncomeLevelChange.bind(this)}/>
                        </div>
                        THIS IS COMPREHENSIVE FORM. MORE STUFF HERE!
                    </div>
                    {!this.state.trigger && (
                    <div className="row">
                        <button type="button" onClick={this.saveSubmission.bind(this)}>
                            Save Submission
                        </button>
                    </div>
                    )}
                </form>
            );
        } else {
            return (
                    <form>
                    <div className="row">
                        <div className="form-group">
                            <label>Your Age</label>
                            {userData.age}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Your Employment Status</label>
                                {userData.employment_status}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>Your Area Code</label>
                            {userData.area_code}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>Your Income Level (in USD)</label>
                            {userData.income_level}
                        </div>
                    </div>
                </form>
            );
        }
    }
}

FullFormComprehensive.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
};

FullFormComprehensive.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};