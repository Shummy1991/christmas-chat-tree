import React from "react";
import styled from "styled-components";
import Elements, { Username } from "./Heads";

const MessageWrapper = styled.div`
    font-size: 14px;
    margin-top: 6px;
    max-width: 200px;
    position: absolute;
    z-index: 4;
    top: calc(100% + 8px);
    width: 200px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
`;

const Connector = styled.div`
    width: 10px;
    height: 9px;
    background-color: #b21f29;
    position: absolute;
    top: -3px;
    left: calc(50% - 5px);
    border-radius: 3px;
    transform: rotate(45deg);

`;
const Message = styled.div`
    background-color: #b21f29;
    border-radius: 10px;
    padding: 6px;
    display: inline-block;
    text-align: left;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
`;

const StyledUsers = styled.div`
  img {
    transform: scale(0.7);
  }
`;

export default ({ users, messages }) => (
    <StyledUsers>
        {users.map((user, index) => {
            if (!user || index >= Elements.length) return null;
            const { username } = user; 
            const Element = Elements[index];
            const message = messages.find(m => m.user.username === username);
            return (
                <Element key={index}>
                    <Username>{username}</Username>
                    {message && (
                        <MessageWrapper>
                            <Message>
                                <Connector/>
                                {message.message}
                            </Message>
                        </MessageWrapper>
                    )}
                </Element>
            );
        })}
    </StyledUsers>
);
