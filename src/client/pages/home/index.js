import React, { Component } from "react";
import ChristmasTree from "../../components/ChristmasTree";

class Home extends Component {
    render() {
        return (
            <ChristmasTree>

            </ChristmasTree>
        );
    }
}

export default {
    component: Home,
    // loadData: ({ dispatch }) => dispatch(getUser()),
    renderSeo: () => {},
};
