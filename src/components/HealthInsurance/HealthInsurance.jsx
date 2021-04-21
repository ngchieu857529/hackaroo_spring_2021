import React from 'react'

export default class HealthInsurance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="page-container">
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-1" style={{width: "100%", height: "170%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-2" style={{width: "50%", height: "85%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-3" style={{width: "50%", height: "85%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-4" style={{width: "50%", height: "90%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-6" style={{width: "50%", height: "90%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-5" style={{width: "100%", height: "70%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-7" style={{width: "50%", height: "140%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-8" style={{width: "50%", height: "140%"}}></iframe>
            </div>
        )
    }
}