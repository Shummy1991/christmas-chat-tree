import React from "react";
import Elements, { Username } from "./Heads";


export default ({ users }) => (
    <div>
        {users.map(({ username, position }) => {
            const Element = Elements[position];
            return (
                <Element key={position}>
                    <Username>{username}</Username>
                </Element>
            );
        })}
    </div>
);
