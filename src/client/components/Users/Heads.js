import React from "react";
import styled, { css } from "styled-components";

const UserHead = css`
    position: absolute;
    display: flex;
    flex-direction: column;
`;

const StyledDing = styled.div`
    ${UserHead}
    img {
        height: 105px;
    }
`;

const dingCoords = [
    {
        left: 721,
        top: 487,
    },
    {
        left: 483,
        top: 400,
    },
    {
        left: 603,
        top: 128,
    },
];

export const Ding = (coords) => ({ children }) => (
    <StyledDing style={coords}>
        <img src="/images/icons/ding.svg" alt="Ding" />
        {children}
    </StyledDing>
);

const StyledJingle = styled.div`
    ${UserHead}
    left: 691px;
    top: 366px;
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
    top: 462px;
    left: 363px;
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
    left: 620px;
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
    left: 614px;
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

const StyledGomb = styled.div`
    ${UserHead}
    img {
        height: 112px;
    }
`;

const gombCoords = [
    {
        top: 213,
        left: 739,
    },
    {
        top: 465,
        left: 536,
    },
    {
        top: 490,
        left: 826,
    },
    {
        top: 220,
        left: 584,
    },
];

export const Gomb = (coords) => ({ children }) => (
    <StyledGomb style={coords}>
        <img src="/images/icons/gomb.svg" alt="Gomb" />
        {children}
    </StyledGomb>
);

const StyledSzaloncukor = styled.div`
    ${UserHead}
    img {
        height: 112px;
    }

    .Szal {
      position: absolute;
      background-color: white;
      width: 1px;
      height: 28px;
      left: 34px;
      top: -1px;
    }
`;

const szalonCoords = [
    {
        top: 474,
        left: 913,
    },
    {
        top: 380,
        left: 584,
    },
    {
        top: 325,
        left: 782,
    },
    {
        top: 259,
        left: 694,
        noSzal: true,
    },
];

export const Szaloncukor = ({ noSzal, ...coords }) => ({ children }) => (
    <StyledSzaloncukor style={coords}>
        {!noSzal && (
            <div className="Szal"/>
        )}
        <img src="/images/icons/szaloncukor.svg" alt="Szaloncukor" />
        {children}
    </StyledSzaloncukor>
);

const StyledApple = styled.div`
    ${UserHead}
    img {
        height: 72px;
    }

    .Szal {
      position: absolute;
      background-color: white;
      width: 1px;
      height: 28px;
      left: 27px;
      top: -11px;
    }
`;

const appleCoords = [
    {
        top: 337,
        left: 544,
    },
    {
        top: 546,
        left: 459,
    },
    {
        top: 419,
        left: 829,
    },
    {
        top: 193,
        left: 689,
    },
];

export const Apple = (coords) => ({ children }) => (
    <StyledApple style={coords}>
        <div className="Szal" />
        <img src="/images/icons/apple.svg" alt="Apple" />
        {children}
    </StyledApple>
);


const StyledMoon = styled.div`
    ${UserHead}
    top: 65px;
    left: 1220px;
    img {
        height: 120px;
        transform: scale(1) translateY(-20px) !important;
    }

`;

export const Moon = ({ children }) => (
    <StyledMoon>
        <img src="/images/icons/moon.svg" alt="Moon" />
        {children}
    </StyledMoon>
);

const StyledHouse = styled.div`
    ${UserHead}
    top: 325px;
    left: 1150px;
    img {
        height: 270px;
        transform: scale(1) translateY(-20px) !important;
    }

`;

export const House = ({ children }) => (
    <StyledHouse>
        <img src="/images/icons/house.svg" alt="House" />
        {children}
    </StyledHouse>
);

const StyledSnowFlake = styled.div`
    ${UserHead}
    top: 40px;
    left: 42px;
    img {
        height: 130px;
        transform: scale(1) translateY(-30px) !important;
    }

`;

export const SnowFlake = ({ children }) => (
    <StyledSnowFlake>
        <img src="/images/icons/snowflake.svg" alt="House" />
        {children}
    </StyledSnowFlake>
);

const StyledForest = styled.div`
    ${UserHead}
    top: 412px;
    left: -36px;
    img {
        transform: scale(1) translateY(0) !important;
    }

`;

export const Forest = ({ children }) => (
    <StyledForest>
        <img src="/images/icons/forest.svg" alt="Forest" />
        {children}
    </StyledForest>
);

const StyledUsername = styled.div`
    div {
        background-color: #4d9cb4;
        ${"" /* border: solid 1px white; */}
        border-radius: 10px;
        display: inline-block;
        padding: 1px 5px;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
    }
    position: absolute;
    top: calc(100% - 20px);
    width: 100px;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    font-size: 14px;
`;


export const Username = ({ children }) => (
    <StyledUsername>
        <div>
            {children}
        </div>
    </StyledUsername>
);

export default [
    Star,
    Apple(appleCoords[0]),
    Szaloncukor(szalonCoords[2]),
    Gomb(gombCoords[1]),
    Ding(dingCoords[0]),
    House,
    Apple(appleCoords[3]),
    Bell,
    Forest,
    Nut,
    Szaloncukor(szalonCoords[0]),
    Angel,
    Moon,
    Gomb(gombCoords[3]),
    Jingle,
    Ding(dingCoords[1]),
    Gomb(gombCoords[2]),
    SnowFlake,
    Apple(appleCoords[2]),
    Szaloncukor(szalonCoords[1]),
    Gomb(gombCoords[0]),
    Apple(appleCoords[1]),
    Szaloncukor(szalonCoords[3]),
    Ding(dingCoords[2]),
];
