import React from 'react'

export default class Covid19Info extends React.Component {
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
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-1" style={{width: "100%", height: "100%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-2" style={{width: "100%", height: "100%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-3" style={{width: "100%", height: "100%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-4" style={{width: "100%", height: "100%"}}></iframe>
            </div>
        )
    }
}