import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "./react-router-config";
import serialize from "serialize-javascript";
// import { Helmet } from "react-helmet";
import routes from "./routes";

import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { Helmet } from "react-helmet";

// import { onesignalAppId } from "../common/parameters";


const isDev = process.env.NODE_ENV === "development";


export default async(req, store, context, res) => {
    let language = req.renderLang;
    let assetHost = "/images";
    let url = "";
    const sheet = new ServerStyleSheet();
    let jsx;
    if (process.env.NODE_ENV !== "development") {
        url = `https://${req.headers.host}${req.path}`;
    }
    let alts = [{
        url,
        lang: "x-default"
    }];
    alts.unshift({
        url: url + (url.indexOf("?") === -1 ? "?" : "&") + "lang=hu",
        lang: "hu"
    });
    const helmet = Helmet.renderStatic();
    const htmlStart = `
        <!DOCTYPE html>
        <html lang="${language}">
            <head>
                <meta charset="utf-8">
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <link href="${url}" rel="canonical">
                ${alts.map(alt => `<link rel="alternate" hreflang="${alt.lang}" href="${alt.url}"
                `).join("")}
                <meta property="og:url" content="${url}">

                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no, user-scalable=yes">
                <meta name="lang" content="${language}">


                <link rel="shortcut icon" href="${assetHost}/favicon.ico">
                <link rel="apple-touch-icon" sizes="57x57" href="${assetHost}/apple-icon-57x57.png">
                <link rel="apple-touch-icon" sizes="60x60" href="${assetHost}/apple-icon-60x60.png">
                <link rel="apple-touch-icon" sizes="72x72" href="${assetHost}/apple-icon-72x72.png">
                <link rel="apple-touch-icon" sizes="76x76" href="${assetHost}/apple-icon-76x76.png">
                <link rel="apple-touch-icon" sizes="114x114" href="${assetHost}/apple-icon-114x114.png">
                <link rel="apple-touch-icon" sizes="120x120" href="${assetHost}/apple-icon-120x120.png">
                <link rel="apple-touch-icon" sizes="144x144" href="${assetHost}/apple-icon-144x144.png">
                <link rel="apple-touch-icon" sizes="152x152" href="${assetHost}/apple-icon-152x152.png">
                <link rel="apple-touch-icon" sizes="180x180" href="${assetHost}/apple-icon-180x180.png">
                <link rel="icon" type="image/png" sizes="192x192" href="${assetHost}/android-icon-192x192.png">
                <link rel="icon" type="image/png" sizes="32x32" href="${assetHost}/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="96x96" href="${assetHost}/favicon-96x96.png">
                <link rel="icon" type="image/png" sizes="16x16" href="${assetHost}/favicon-16x16.png">
                <meta name="msapplication-TileColor" content="#00968b">
                <meta name="msapplication-TileImage" content="${assetHost}/ms-icon-144x144.png">
                <meta name="theme-color" content="#00968b">
                <link href='${process.env.NODE_ENV === "development" ? "/font.css" : "/font-prod.css"}' rel="stylesheet" />
                ${process.env.NODE_ENV === "production" ? `
                    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
                    <script>
                        // var OneSignal = window.OneSignal || [];
                        // OneSignal.push(function() {
                        //     OneSignal.init({
                        //         appId: "",
                        //         autoResubscribe: true,
                        //         welcomeNotification: {
                        //             disable: true
                        //         }
                        //     });
                        // });
                    </script>` : ""}
            </head>
            <body>
                <div id="root">`;

    const htmlEnd = `</div>
            <div id="modal-root"></div>
            <div id="notification-root"></div>
            ${!isDev ? `<script> window.INITIAL_STATE = ${serialize(store.getState())}</script>` : ""}
            <script>
              function include(scriptUrl)
              {
                  var xmlhttp = new XMLHttpRequest();
                  xmlhttp.open("GET", scriptUrl);
                  xmlhttp.onprogress = function(e) {
                    console.log(e.loaded / e.total * 100);
                  }
                  xmlhttp.onreadystatechange = function()
                  {
                      if ((xmlhttp.status == 200) && (xmlhttp.readyState == 4))
                      {
                          eval(xmlhttp.responseText);
                      }
                  };
                  xmlhttp.send();
              }
              include('/bundle.js');
            </script>
        </body>
    </html>`;
    if (context.url) {
        return res.redirect(301, context.url);
    }
    if (process.env.NODE_ENV === "development") {
        return res.send(htmlStart + htmlEnd);
    }
    let headWritten = false;
    let jsxDone = false;
    res.write(htmlStart, () => {
        headWritten = true;
        if (jsxDone) {
            streamData(jsx, sheet, res, htmlEnd);
        }
    });

    jsx = sheet.collectStyles(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                <StyleSheetManager sheet={sheet.instance}>
                    {renderRoutes(routes)}
                </StyleSheetManager>
            </StaticRouter>
        </Provider>
    );
    jsxDone = true;
    if (headWritten) {
        streamData(jsx, sheet, res, htmlEnd);
    }
};

const streamData = (jsx, sheet, res, htmlEnd) => {
    let stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));
    stream.pipe(
        res,
        { end: false }
    );
    stream.on("end", () => {
        res.write(htmlEnd);
        res.end();
    });
};
