import React from 'react'

export default class WalkThroughFormSimple extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            steps: props.steps,
            userState: props.userState
        };
    }

    componentWillMount() {

    }

    render() {
        const steps = this.state.steps;

        return (
            <form>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Your Height:</label>
                                &nbsp;&nbsp;{steps.simple_height_feet.value}&nbsp;&nbsp;
                                ft
                                &nbsp;&nbsp;{steps.simple_height_inch.value}&nbsp;&nbsp;
                                in
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Your Weight (lbs):</label>
                                &nbsp;&nbsp;{steps.simple_weight.value}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Your Age:</label>
                                &nbsp;&nbsp;{steps.simple_age.value}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Your Gender:</label>
                                &nbsp;&nbsp;{steps.simple_gender.value}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label># of Children:</label>
                                &nbsp;&nbsp;{steps.simple_children.value}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Do you smoke? - </label>
                                &nbsp;&nbsp;{steps.simple_smoker.value}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Your State:</label>
                                &nbsp;&nbsp;{this.state.userState}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}