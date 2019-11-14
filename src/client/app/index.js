
import React, { Component, Fragment } from "react";
import { renderRoutes } from "../react-router-config";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
// import routing from "../routing";

import { ThemeProvider } from "styled-components";
import { login } from "../../common/store/user/actions";
import { getUsers, startCommunication } from "../../common/store/communication/actions";
import GlobalCss from "../style/index.js";
import theme from "../style/theme";


class App extends Component {
    componentDidMount() {
        const { user, communication } = this.props;
        if (!user.username) {
            this.props.login();
        }
        if (!communication.usersInitialized) {
            this.props.getUsers();
        }
        this.props.startCommunication();
    }
    render() {
        const { route, user } = this.props;
        if (user === null) return null;
        return (
            <ThemeProvider theme={theme}>
                <Fragment>
                    <GlobalCss/>
                    {renderRoutes(route.routes)}
                </Fragment>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    communication: state.communication,
});

export default {
    component: withRouter(connect(mapStateToProps, { login, getUsers, startCommunication })(App)),
    loadData: async({ dispatch }) => {
        console.log("load data app");
        await dispatch(login());
        await dispatch(getUsers());
    },
    renderSeo: () => {},
};
