import React from "react";
import styled, { css } from "styled-components";

const UserHead = css`
    position: absolute;
    display: flex;
    flex-direction: column;
`;

const StyledDing = styled.div`
    ${UserHead}
    left: 787px;
    top: 487px;
    img {
        height: 105px;
    }
`;

export const Ding = ({ children }) => (
    <StyledDing>
        <img src="/images/icons/ding.svg" alt="Ding" />
        {children}
    </StyledDing>
);

const StyledJingle = styled.div`
    ${UserHead}
    left: 719px;
    top: 350px;
    img {
        height: 120px;
    }
`;

export const Jingle = ({ children }) => (
    <StyledJingle>
        <img src="/images/icons/jingle.svg" alt="Jingle" />
        {children}
    </StyledJingle>
);

const StyledAngel = styled.div`
    ${UserHead}
    top: 402px;
    left: 434px;
    img {
        height: 120px;
    }
`;

export const Angel = ({ children }) => (
    <StyledAngel>
        <img src="/images/icons/angel.svg" alt="Angel" />
        {children}
    </StyledAngel>
);

const StyledNut = styled.div`
    ${UserHead}
    top: 448px;
    left: 609px;
    img {
        height: 120px;
    }
`;

export const Nut = ({ children }) => (
    <StyledNut>
        <img src="/images/icons/nut.svg" alt="Nut" />
        {children}
    </StyledNut>
);



const StyledBell = styled.div`
    ${UserHead}
    top: 302px;
    left: 578px;
    img {
        height: 120px;
    }
`;

export const Bell = ({ children }) => (
    <StyledBell>
        <img src="/images/icons/bell.svg" alt="Bell" />
        {children}
    </StyledBell>
);

const StyledStar = styled.div`
    ${UserHead}
    top: 28px;
    left: 638px;
    img {
        height: 112px;
    }
`;

export const Star = ({ children }) => (
    <StyledStar>
        <img src="/images/icons/star.svg" alt="Bell" />
        {children}
    </StyledStar>
);

const StyledUsername = styled.div`
    div {
        background-color: #4d9cb4;
        ${"" /* border: solid 1px white; */}
        border-radius: 10px;
        display: inline-block;
        padding: 3px 6px;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
    }
    text-align: center;
    font-size: 16px;

`;

export const Username = ({ children }) => (
    <StyledUsername>
        <div>
            {children}
        </div>
    </StyledUsername>
);

export default [Star, Bell, Nut, Angel, Jingle, Ding];
