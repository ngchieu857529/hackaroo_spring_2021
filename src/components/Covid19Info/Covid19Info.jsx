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
                <div>
                    <ul>
                        <li>COVID-19 Dataset:</li>
                        <ul><li><a href="https://data.cdc.gov/Case-Surveillance/COVID-19-Case-Surveillance-Public-Use-Data-with-Ge/n8mc-b4w4">https://data.cdc.gov/Case-Surveillance/COVID-19-Case-Surveillance-Public-Use-Data-with-Ge/n8mc-b4w4</a> - COVID-19 Dataset (updated April 13, 2021) ~ 22.5 million records</li></ul>
                        <li>Vaccination Datasets:</li>
                        <ul>
                            <li><a href="https://data.cdc.gov/Vaccinations/COVID-19-Vaccine-Distribution-Allocations-by-Juris/saz5-9hgg/data">https://data.cdc.gov/Vaccinations/COVID-19-Vaccine-Distribution-Allocations-by-Juris/saz5-9hgg/data</a> - Vaccination Data - Moderna (April 2021)</li>
                            <li><a href="https://data.cdc.gov/Vaccinations/COVID-19-Vaccine-Distribution-Allocations-by-Juris/b7pe-5nws">https://data.cdc.gov/Vaccinations/COVID-19-Vaccine-Distribution-Allocations-by-Juris/b7pe-5nws</a> - Vaccination Data - Pfizer (April 2021)</li>
                        </ul>
                    </ul>
                </div>
            </div>
        )
    }
}