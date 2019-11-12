import React, { Component } from "react";
import ChristmasTree from "../../components/ChristmasTree";
import Users from "../../components/Users";

class Home extends Component {
    render() {
        return (
            <ChristmasTree>
                <Users />
            </ChristmasTree>
        );
    }
}

export default {
    component: Home,
    // loadData: ({ dispatch }) => dispatch(getUser()),
    renderSeo: () => {},
};
