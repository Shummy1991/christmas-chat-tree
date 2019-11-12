import { createGlobalStyle } from "styled-components";


export default createGlobalStyle`
    body, html {
        margin: 0; padding: 0;
        height: 100%;
        overflow: hidden;
        font-size: 34px;
        color: white;
        overflow: hidden;
    }
    body {
        overflow-y: hidden;
        overflow-x: hidden;
    }
    #root, #root > div {
        height: 100%;
        width: 100%;
        background-color: black;
        display: table;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }


`;
