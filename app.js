import express from "express";
import path from "path";
import createStore from "./src/common/createStore";
import renderer from "./src/client/renderer";
import { matchRoutes } from "./src/client/react-router-config";
import routes from "./src/client/routes";
import proxy from "express-http-proxy";
// import "babel-polyfill";
import IntlPolyfill from "intl";
import helmet from "helmet";
import timeout from "connect-timeout";
import { redirectToHTTPS } from "express-http-to-https";
import "regenerator-runtime";
import "regenerator-runtime/runtime";

import apiServer from "./src/server";
import http from "http";
import webpack from "webpack";


Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
const app = express();
const server = http.Server(app);

app.use(timeout("8s"));

global.appRoot = __dirname;

const isDev = process.env.NODE_ENV === "development";

app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

if (process.env.RENDERER) {
    app.use(
        "/api",
        proxy(process.env.API_SERVER || "localhost:8000", {
            limit: "10mb",
            proxyReqPathResolver: (req) => {
                return "/api" + req.path + "?" + Object.keys(req.query).map(param => param + "=" + req.query[param]).join("&");
            }
        })
    );
}


if (isDev) {
    const webpackConfigDev = require("./webpack.config.dev");
    const compiler = webpack(webpackConfigDev);
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static(path.resolve(__dirname, "src/public")));
} else if (process.env.NODE_ENV === "production") {
    // app.use((req, res) => {
    //     res.setHeader("Service-Worker-Allowed", "/");
    // });
    app.use(express.static("src/public"));
}

app.use(helmet({
    noSniff: false
}));

app.get("*", (req, res, next) => {
    if (req.url.slice(0, 5) === "/api/") {
        return next();
    }
    if (isDev) {
        renderer(req, null, {}, res);
    } else {
        const store = createStore(req);
        const context = {};
        const usedRoutes = [];
        const promises = matchRoutes(routes, req.path)
            .map(({ route }) => {
                usedRoutes.push(route);
                return route.loadData ? route.loadData(store, req.path) : null;
            })
            .map(promise => {
                if (promise) {
                    return new Promise((resolve, reject) => {
                        promise.then(resolve).catch(resolve);
                    });
                }
            });
        Promise.all(promises).then(() => {
            usedRoutes.forEach(route => {
                route.renderSeo(store);
            });
            renderer(req, store, context, res);
        });
    }
});

if (!process.env.RENDERER) {
    apiServer(app, server);
}


server.listen(process.env.PORT || 4000, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info("Listening at http://localhost:" + (process.env.PORT || 4000));
    }
});
