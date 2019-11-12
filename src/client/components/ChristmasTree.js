import React, { Component } from "react";
import styled, { css } from "styled-components";

import { $window } from "../../common/window";


const VerticalHelper = styled.div`
    display: table-cell;
    vertical-align: middle;
`;

const ContentScale = styled.div`
    margin: auto;
    box-sizing: border-box;
`;

const Content = styled.div`
    width: ${p => p.theme.width}px;
    height: ${p => p.theme.height}px;
    transition: 1.2s;
`;

const backgroundCss = css`
    width: ${p => p.theme.width * 5}px;
    height: ${p => p.theme.height * 3}px;
    position: absolute;
    left: -${p => p.theme.width * 2}px;
    top: -${p => p.theme.height}px;
    img {
        margin-left: ${p => p.theme.width}px;
    }
`;

const StyledSkyBackground = styled.div`

  background : -moz-linear-gradient(50% 100% 90deg,rgba(172, 1, 1, 1) 16.67%,rgba(157, 1, 31, 1) 18.13%,rgba(140, 0, 66, 1) 20.12%,rgba(126, 0, 93, 1) 22.14%,rgba(117, 0, 112, 1) 24.19%,rgba(111, 0, 123, 1) 26.28%,rgba(109, 0, 127, 1) 28.49%,rgba(105, 3, 125, 1) 29.46%,rgba(49, 42, 102, 1) 44.83%,rgba(13, 66, 88, 1) 56.25%,rgba(0, 75, 82, 1) 62.37%,rgba(0, 22, 24, 1) 82.62%,rgba(0, 0, 0, 1) 93.01%);
  background : -webkit-linear-gradient(90deg, rgba(172, 1, 1, 1) 16.67%, rgba(157, 1, 31, 1) 18.13%, rgba(140, 0, 66, 1) 20.12%, rgba(126, 0, 93, 1) 22.14%, rgba(117, 0, 112, 1) 24.19%, rgba(111, 0, 123, 1) 26.28%, rgba(109, 0, 127, 1) 28.49%, rgba(105, 3, 125, 1) 29.46%, rgba(49, 42, 102, 1) 44.83%, rgba(13, 66, 88, 1) 56.25%, rgba(0, 75, 82, 1) 62.37%, rgba(0, 22, 24, 1) 82.62%, rgba(0, 0, 0, 1) 93.01%);
  background : -webkit-gradient(linear,50% 100% ,50% 0% ,color-stop(0.1667,rgba(172, 1, 1, 1) ),color-stop(0.1813,rgba(157, 1, 31, 1) ),color-stop(0.2012,rgba(140, 0, 66, 1) ),color-stop(0.2214,rgba(126, 0, 93, 1) ),color-stop(0.2419,rgba(117, 0, 112, 1) ),color-stop(0.2628,rgba(111, 0, 123, 1) ),color-stop(0.2849,rgba(109, 0, 127, 1) ),color-stop(0.2946,rgba(105, 3, 125, 1) ),color-stop(0.4483,rgba(49, 42, 102, 1) ),color-stop(0.5625,rgba(13, 66, 88, 1) ),color-stop(0.6237,rgba(0, 75, 82, 1) ),color-stop(0.8262,rgba(0, 22, 24, 1) ),color-stop(0.9301,rgba(0, 0, 0, 1) ));
  background : -o-linear-gradient(90deg, rgba(172, 1, 1, 1) 16.67%, rgba(157, 1, 31, 1) 18.13%, rgba(140, 0, 66, 1) 20.12%, rgba(126, 0, 93, 1) 22.14%, rgba(117, 0, 112, 1) 24.19%, rgba(111, 0, 123, 1) 26.28%, rgba(109, 0, 127, 1) 28.49%, rgba(105, 3, 125, 1) 29.46%, rgba(49, 42, 102, 1) 44.83%, rgba(13, 66, 88, 1) 56.25%, rgba(0, 75, 82, 1) 62.37%, rgba(0, 22, 24, 1) 82.62%, rgba(0, 0, 0, 1) 93.01%);
  background : -ms-linear-gradient(90deg, rgba(172, 1, 1, 1) 16.67%, rgba(157, 1, 31, 1) 18.13%, rgba(140, 0, 66, 1) 20.12%, rgba(126, 0, 93, 1) 22.14%, rgba(117, 0, 112, 1) 24.19%, rgba(111, 0, 123, 1) 26.28%, rgba(109, 0, 127, 1) 28.49%, rgba(105, 3, 125, 1) 29.46%, rgba(49, 42, 102, 1) 44.83%, rgba(13, 66, 88, 1) 56.25%, rgba(0, 75, 82, 1) 62.37%, rgba(0, 22, 24, 1) 82.62%, rgba(0, 0, 0, 1) 93.01%);
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#AC0101', endColorstr='#000000' ,GradientType=0)";
    background : linear-gradient(
        0deg,
        rgba(255, 255, 255, 1) 16.67%,
        rgba(50, 1, 15, 1) 18.13%,
        rgba(80, 0, 65, 1) 20.12%,
        rgba(126, 0, 93, 1) 22.14%,
        rgba(117, 0, 112, 1) 24.19%,
        rgba(111, 0, 123, 1) 26.28%,
        rgba(109, 0, 127, 1) 28.49%,
        rgba(105, 3, 125, 1) 29.46%,
        rgba(49, 42, 102, 1) 44.83%,
        rgba(13, 66, 88, 1) 56.25%,
        rgba(0, 75, 82, 1) 62.37%,
        rgba(0, 22, 24, 1) 82.62%,
        rgba(0, 0, 0, 1) 93.01%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000',endColorstr='#AC0101' , GradientType=0);

    z-index: -2;
    ${backgroundCss}
`;

export class SkyBackground extends Component {
    render() {
        return (
            <StyledSkyBackground>
                <img src="/images/stars.svg" alt="stars"/>
            </StyledSkyBackground>
        );
    }
}


const StyledDecorationMoon = styled.div`
    position: absolute;
    top: ${720 * 1.5 - 300}px;
    left: ${1420 * 2 - 200}px;
    img {
        height: 120px;
    }
`;

const StyledDecorationSnowflake = styled.div`
    position: absolute;
    top: ${720 * 1.5 - 340}px;
    left: ${1420 + 10}px;
    img {
        height: 130px;
    }
`;

const StyledDecorationTrees = styled.div`
    position: absolute;
    top: 1120px;
    left: 1340px;
`;






const StyledHouse = styled.div`
    position: absolute;
    top: 305px;
    left: 1150px;
    z-index: 1;
    img {
        height: 270px;
    }
`;
export const House = () => (
    <StyledHouse>
        <img src="/images/house.svg" alt="house"></img>
    </StyledHouse>
);

const LandscapeBackground = styled.div`
    ${backgroundCss}
`;

export class Landscape extends Component {
    render() {
        return (
            <LandscapeBackground>
                <img src="/images/landscape.svg" alt=""/>
                <StyledDecorationMoon>
                    <img src="/images/decoration_moon.svg" alt="moon"></img>
                </StyledDecorationMoon>
                <StyledDecorationSnowflake>
                    <img src="/images/decoration_snowflake.svg" alt="snowflakes"></img>
                </StyledDecorationSnowflake>
                <StyledDecorationTrees>
                    <img src="/images/decoration_trees.svg" alt="trees"></img>
                </StyledDecorationTrees>
            </LandscapeBackground>
        );
    }
}

const StyledMeteor = styled.div`
    position: absolute;
    top: -170px;
    left: 80px;
`;

export class Meteor extends Component {
    render() {
        return (
            <StyledMeteor><img src="/images/meteor.svg" alt="meteor"></img></StyledMeteor>
        );
    }
}

export default class ChristmasTree extends Component {
    state = {
        scale: 1,
        width: 1420,
        height: 720,
    }

    componentDidMount() {
        $window.addEventListener("resize", this.resize);
        this.resize();
    }

    resize = () => {
        let wW = window.innerWidth;
        let wH = window.innerHeight;
        let w = wH / wW;
        let cW = 1420;
        let cH = 720;
        let c = cH / cW;

        let tW;
        let tH;
        let tS;
        if (c > w) {
            tH = wH;
            tW = wH / c;
        } else {
            tW = wW;
            tH = wW * c;
        }
        tS = tH / cH;
        this.setState({
            width: tW,
            height: tH,
            scale: tS
        });
    }
    render() {
        const { width, height, scale } = this.state;
        const { children } = this.props;
        return (
            <VerticalHelper>
                <ContentScale style={{
                    width,
                    height,
                    transform: "scale(" + scale + ", " + scale + ")",
                    transformOrigin: "top left",
                }}>
                    <Content>
                        <SkyBackground/>
                        <House/>
                        <Landscape/>
                        <Meteor/>
                        {children}
                    </Content>
                </ContentScale>
            </VerticalHelper>
        );
    }
}
