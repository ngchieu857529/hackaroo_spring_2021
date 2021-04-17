import React from 'react'

export default class WalkThroughFormSimple extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            steps: props.steps
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
                                <label>Your Height</label>
                                {steps.simple_height_feet.value}
                                ft
                                {steps.simple_height_inch.value}
                                in
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Your Weight (lbs)</label>
                                {steps.simple_weight.value}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Your Age</label>
                                {steps.simple_age.value}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Your Gender</label>
                                {steps.simple_gender.value}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label># of Children</label>
                                {steps.simple_children.value}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Do you smoke?</label>
                                {steps.simple_smoker.value}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Your Region</label>
                                {steps.simple_region.value}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}