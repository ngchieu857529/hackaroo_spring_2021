import React from 'react'
import { Grid, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainChatIcon from "../Chat/MainChatIcon"
import ChatIconWindow from "../Chat/ChatIconWindow"
import Covid19Info from "../Covid19Info/Covid19Info"
import HealthInsurance from "../HealthInsurance/HealthInsurance"
import NotFound from "../NotFound/NotFound"

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: 0
        }
    }

    componentDidMount() {
        if (window.location.pathname === "/covid-19") {
            this.setState({
                currentView: 0
            })
        } else if (window.location.pathname === "/health-insurance") {
            this.setState({
                currentView: 1
            })
        } else { //Default to 0
            this.setState({
                currentView: 0
            })
        }
    }

    handleMenuSelect(option) {
        this.setState({
            currentView: option
        })
    }

    render() {
        const currentView = this.state.currentView

        return (
            <Router>
                <Grid columns={1}>
                    <Grid.Column>
                        <Sidebar.Pushable as={Segment}>
                            <Sidebar
                                animation='push'
                                as={Menu}
                                icon='labeled'
                                inverted
                                vertical
                                visible={true}
                                width='thin'
                            >
                                <Link to="/covid-19">
                                    <Menu.Item
                                        name="COVID-19 Info"
                                        onClick={this.handleMenuSelect.bind(this, 0)}
                                        active={currentView === 0}
                                    >
                                        <Icon name="object group outline" />
                                        COVID-19 Info
                                    </Menu.Item>
                                </Link>
                                <Link to="/health-insurance">
                                    <Menu.Item
                                        name="Health Insurance Info"
                                        onClick={this.handleMenuSelect.bind(this, 1)}
                                        active={currentView === 1}
                                    >
                                        <Icon name="legal" />
                                        Health Insurance Info
                                    </Menu.Item>
                                </Link>
                            </Sidebar>

                            <Switch>
                                <Route exact path="/" component={Covid19Info} />
                                <Route exact path="/covid-19" component={Covid19Info} />
                                <Route exact path="/health-insurance" component={HealthInsurance} />
                                <Route component={NotFound} />
                            </Switch>
                        </Sidebar.Pushable>
                    </Grid.Column>
                </Grid>

                <MainChatIcon />
                <ChatIconWindow />
            </Router>
        )
    }
}