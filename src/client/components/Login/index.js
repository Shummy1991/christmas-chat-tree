import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { login } from "../../../common/store/user/actions";

const StyledLogin = styled.div`
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    text-align: center;
    transition: 0.5s;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Form = styled.form`
    background-color: #2B2D65;
    border-radius: 5px;
    border: 4px solid white;
    color: white;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;

    input {
        height: 50px;
        font-size: 26px;
        margin-top: 16px;
        margin-bottom: 4px;
        text-align: center;
        font-family: inherit;
        color: #2B2D65;
        outline: none;
        padding: 6px;
        box-sizing: border-box;
    }

    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
    }

    img {
        width: 120px;
    }
`;

class Login extends React.Component {
    state = {
        username: ""
    }
    changeUsername = ({ target: { value } }) => {
        if (value.length > 12) return;
        this.setState({ username: value });
    }
    submit = (e) => {
        const { username } = this.state;
        e.preventDefault();
        if (!username) return;
        this.props.login({ username });
    }
    render() {
        const { username } = this.state;
        return (
            <StyledLogin>
                <Form onSubmit={this.submit}>
                    <label>Enter your Username</label>
                    <input name="username" value={username} onChange={this.changeUsername}/>
                    <button type="submit">
                        <img src="/images/UI_startBtn.svg" alt="" />
                    </button>
                </Form>
            </StyledLogin>
        );
    }
}

export default connect(null, { login })(Login);
