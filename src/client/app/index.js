
import React, { Component, Fragment } from "react";
import { renderRoutes } from "../react-router-config";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
// import routing from "../routing";

import { ThemeProvider } from "styled-components";
// import { getUser } from "../actions/user";
import GlobalCss from "../style/index.js";
import theme from "../style/theme";


class App extends Component {
    // componentDidMount() {
    //     const { user } = this.props;
    //     if (!user || !user.loggedIn) {
    //         this.props.getUser();
    //     } else {
    //         const { _id: id, email } = user;
    //         // if (window.OneSignal) {
    //         //     window.OneSignal.push(function() {
    //         //         window.OneSignal.showNativePrompt();
    //         //     });
    //         // }
    //     }
    //     this.setState({loaded: true});
    // }
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
    user: state.user ? {...state.user} : null
});

export default {
    component: withRouter(connect(mapStateToProps, {})(App)),
    // loadData: ({ dispatch }) => dispatch(getUser()),
    renderSeo: () => {},
};
