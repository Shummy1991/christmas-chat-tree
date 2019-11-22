import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import ChristmasTree from "../../components/ChristmasTree";
import Users from "../../components/Users";
import Login from "../../components/Login";
import SendMessage from "../../components/SendMessage";
import Logout from "../../components/Logout";

class Home extends Component {
    render() {
        const { user, users, messages } = this.props;
        return (
            <ChristmasTree>
                <Users users={users} messages={messages}/>
                {user.username
                    ? <Fragment>
                        <SendMessage/>
                        <Logout/>
                    </Fragment>
                    : <Login/>
                }
                
            </ChristmasTree>
        );
    }
}

const mapStateToProps = ({ user, communication: { users, messages } }) => ({
    user,
    users,
    messages
});

export default {
    component: connect(mapStateToProps)(Home),
    renderSeo: () => {},
};
