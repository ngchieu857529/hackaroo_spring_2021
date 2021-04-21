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
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-9" style={{width: "100%", height: "110%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-10" style={{width: "100%", height: "100%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-12" style={{width: "100%", height: "100%"}}></iframe>
                <iframe title="KC311 311 Visualization" src="https://hackaroo.ngrok.io/page-11" style={{width: "100%", height: "190%"}}></iframe>
            </div>
        )
    }
}