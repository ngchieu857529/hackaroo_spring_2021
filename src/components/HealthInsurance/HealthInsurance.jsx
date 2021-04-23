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
                <div>
                    <ul>
                        <li>Health Insurance Datasets:</li>
                        <ul>
                            <li><a href="https://www.census.gov/data/datasets/time-series/demo/cps/cps-asec.html">https://www.census.gov/data/datasets/time-series/demo/cps/cps-asec.html</a> - Census Health Insurance Data and Demographics (updated April 13, 2021)</li>
                            <li><a href="https://www2.census.gov/programs-surveys/cps/datasets/2020/march/ASEC2020ddl_pub_full.pdf">https://www2.census.gov/programs-surveys/cps/datasets/2020/march/ASEC2020ddl_pub_full.pdf</a> - Census Health Insurance Data and Demographics Data Dictionary (updated April 13, 2021)</li>
                            <li><a href="https://www.healthcare.gov/health-and-dental-plan-datasets-for-researchers-and-issuers/">https://www.healthcare.gov/health-and-dental-plan-datasets-for-researchers-and-issuers/</a> - Health Insurance Plans and Prices for Individuals and Families (2017-2021)</li>
                            <li><a href="https://www.kaggle.com/teertha/ushealthinsurancedataset">https://www.kaggle.com/teertha/ushealthinsurancedataset</a> - Simplified Health Insurance</li>
                        </ul>
                    </ul>
                </div>
            </div>
        )
    }
}