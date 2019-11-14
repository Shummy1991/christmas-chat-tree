import React, { Component } from "react";
import { connect } from "react-redux";

import ChristmasTree from "../../components/ChristmasTree";
import Users from "../../components/Users";
import Login from "../../components/Login";

class Home extends Component {
    render() {
        const { user, users } = this.props;
        return (
            <ChristmasTree>
                <Users users={users}/>
                {user.username
                    ? null
                    : <Login/>
                }
            </ChristmasTree>
        );
    }
}

const mapStateToProps = ({ user, communication: { users } }) => ({ user, users });

export default {
    component: connect(mapStateToProps)(Home),
    renderSeo: () => {},
};
