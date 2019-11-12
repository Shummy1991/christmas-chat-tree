import React from "react";
import Elements, { Username } from "./Heads";


export default () => (
    <div>
        {Elements.map((Element, index) => (
            <Element>
                <Username>User {index}</Username>
            </Element>
        ))}
    </div>
);
