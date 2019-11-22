import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { logout } from "../../../common/store/user/actions";

const Button = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 18px;
    font-family: inherit;
    background-color: #4d9cb4;
    color: white;
    border-radius: 10px;
    border: none;
    cursor: pointer;
`;

const Logout = ({ logout }) => (
    <Button onClick={logout}>
        Log out
    </Button>
);

export default connect(null, { logout })(Logout);
