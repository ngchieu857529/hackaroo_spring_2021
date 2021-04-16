import React from "react"
import update from "immutability-helper"
import PropTypes from "prop-types"
import { modal } from "../../controllers/modal"

var currentData = {}

export default class RequestFormSimple extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trigger: false,
            userData: {
                heightFeet: 1,
                heightInch: 0,
                weight: 0,
                age: 1,
                sex: "Male",
                children: 0,
                smoker: "No",
                region: "Northeast",
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

    handleHeightFeetChange(e) {
        if (this.state.userData) {
            if (this.state.userData.heightFeet) {
                this.setState({
                    userData: update(this.state.userData, {
                        heightFeet: {$set: e.target.value}
                    })
                });
            } else {
                const newUserData = {...this.state.userData, heightFeet: e.target.value}
                this.setState({
                    userData: newUserData
                })
            }
        } else {
            const newUserData = {...this.state.userData, heightFeet: e.target.value}
            this.setState({
                userData: newUserData
            })
        }
    }

    handleHeightInchChange(e) {
        if (this.state.userData) {
            if (this.state.userData.heightInch) {
                this.setState({
                    userData: update(this.state.userData, {
                        heightInch: {$set: e.target.value}
                    })
                });
            } else {
                const newUserData = {...this.state.userData, heightInch: e.target.value}
                this.setState({
                    userData: newUserData
                })
            }
        } else {
            const newUserData = {...this.state.userData, heightInch: e.target.value}
            this.setState({
                userData: newUserData
            })
        }
    }

    handleWeightChange(e) {
        if (this.state.userData) {
            if (this.state.userData.weight) {
                this.setState({
                    userData: update(this.state.userData, {
                        weight: {$set: e.target.value}
                    })
                });
            } else {
                const newUserData = {...this.state.userData, weight: e.target.value}
                this.setState({
                    userData: newUserData
                })
            }
        } else {
            const newUserData = {...this.state.userData, weight: e.target.value}
            this.setState({
                userData: newUserData
            })
        }
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

    handleGenderChange(e) {
        if (this.state.userData) {
            if (this.state.userData.sex) {
                this.setState({
                    userData: update(this.state.userData, {
                        sex: {$set: e.target.value}
                    })
                });
            } else {
                const newUserData = {...this.state.userData, sex: e.target.value}
                this.setState({
                    userData: newUserData
                })
            }
        } else {
            const newUserData = {...this.state.userData, sex: e.target.value}
            this.setState({
                userData: newUserData
            })
        }
    }

    handleNumberOfChildrenChange(e) {
        if (this.state.userData) {
            if (this.state.userData.children) {
                this.setState({
                    userData: update(this.state.userData, {
                        children: {$set: e.target.value}
                    })
                });
            } else {
                const newUserData = {...this.state.userData, children: e.target.value}
                this.setState({
                    userData: newUserData
                })
            }
        } else {
            const newUserData = {...this.state.userData, children: e.target.value}
            this.setState({
                userData: newUserData
            })
        }
    }

    handleSmokerChange(e) {
        if (this.state.userData) {
            if (this.state.userData.smoker) {
                this.setState({
                    userData: update(this.state.userData, {
                        smoker: {$set: e.target.value}
                    })
                });
            } else {
                const newUserData = {...this.state.userData, smoker: e.target.value}
                this.setState({
                    userData: newUserData
                })
            }
        } else {
            const newUserData = {...this.state.userData, smoker: e.target.value}
            this.setState({
                userData: newUserData
            })
        }
    }

    handleRegionChange(e) {
        if (this.state.userData) {
            if (this.state.userData.region) {
                this.setState({
                    userData: update(this.state.userData, {
                        region: {$set: e.target.value}
                    })
                });
            } else {
                const newUserData = {...this.state.userData, region: e.target.value}
                this.setState({
                    userData: newUserData
                })
            }
        } else {
            const newUserData = {...this.state.userData, region: e.target.value}
            this.setState({
                userData: newUserData
            })
        }
    }

    validate() {
        const userData = this.state.userData;

        var weight = userData.weight.toString().replace(',', '').replace('.', '');
        if (weight <= 0) {
            modal.showInfo("You must enter a positive number for your weight.", "warning", "top", "center");
            return false;
        } else if (isNaN(weight)) {
            modal.showInfo("You must enter a valid number for your weight.", "warning", "top", "center");
            return false;
        }  else if (weight.length > 3) {
            modal.showInfo("You must enter a number that has 3 or less digits.", "warning", "top", "center");
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
        const feetOptions = this.buildNumbersList(1, 8)
        const inchOptions = this.buildNumbersList(0, 12)
        const ageOptions = this.buildNumbersList(1, 100)
        const childrenOptions = this.buildNumbersList(0, 10)

        if (this.edit === true) {
            return (
                <form>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Your Height</label>
                                    <select className="form-control" value={userData.heightFeet} onChange={this.handleHeightFeetChange.bind(this)}>
                                        { feetOptions }
                                    </select>
                                    ft
                                    <select className="form-control" value={userData.heightInch} onChange={this.handleHeightInchChange.bind(this)}>
                                        { inchOptions }
                                    </select>
                                    in
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Your Weight (lbs)</label>
                                    <input type="text" className="form-control" value={userData.weight} placeholder="lbs" onChange={this.handleWeightChange.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Your Age</label>
                                    <select className="form-control" value={userData.age} onChange={this.handleAgeChange.bind(this)}>
                                        { ageOptions }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Your Gender</label>
                                    <select className="form-control" value={userData.sex} onChange={this.handleGenderChange.bind(this)}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label># of Children</label>
                                    <select className="form-control" value={userData.children} onChange={this.handleNumberOfChildrenChange.bind(this)}>
                                        { childrenOptions }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Do you smoke?</label>
                                    <select className="form-control" value={userData.smoker} onChange={this.handleSmokerChange.bind(this)}>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Your Region</label>
                                    <select className="form-control" value={userData.region} onChange={this.handleRegionChange.bind(this)}>
                                        <option value="Northeast">Northeast</option>
                                        <option value="Northwest">Northwest</option>
                                        <option value="Southeast">Southeast</option>
                                        <option value="Southwest">Southwest</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {!this.state.trigger && (
                        <div className="row">
                            <button type="button" onClick={this.saveSubmission.bind(this)}>
                                Save Submission
                            </button>
                        </div>
                        )}
                    </div>
                </form>
            );
        } else {
            return (
                <form>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Your Height</label>
                                    {userData.heightFeet}
                                    ft
                                    {userData.heightInch}
                                    in
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Your Weight (lbs)</label>
                                    {userData.weight}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Your Age</label>
                                    {userData.age}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Your Gender</label>
                                    {userData.sex}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label># of Children</label>
                                    {userData.children}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Do you smoke?</label>
                                    {userData.smoker}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Your Region</label>
                                    {userData.region}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            );
        }
    }
}

RequestFormSimple.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
};

RequestFormSimple.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};