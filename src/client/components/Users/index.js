import React from "react";
import styled from "styled-components";
import Elements, { Username } from "./Heads";

const MessageWrapper = styled.div`
    font-size: 15px;
    margin-top: 6px;
    max-width: 200px;
    position: absolute;
    top: calc(100% + 8px);
    width: 200px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
`;

const Message = styled.div`
    background-color: #4d9cb4;
    border-radius: 10px;
    padding: 6px;
    display: inline-block;
    text-align: left;
`;

export default ({ users, messages }) => (
    <div>
        {users.map(({ username, position }) => {
            const Element = Elements[position];
            const message = messages.find(m => m.user.username === username);
            return (
                <Element key={position}>
                    <Username>{username}</Username>
                    {message && (
                        <MessageWrapper>
                            <Message>
                                {message.message}
                            </Message>
                        </MessageWrapper>
                    )}
                </Element>
            );
        })}
    </div>
);
