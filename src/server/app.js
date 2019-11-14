
import express from "express";
import IntlPolyfill from "intl";
import timeout from "connect-timeout";

import http from "http";
import apiServer from "./index";

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const app = express();
const server = http.Server(app);

app.use(timeout("8s"));

apiServer(app, server, true);

server.listen(process.env.PORT || 8000, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info("Listening at http://localhost:" + (process.env.PORT || 8000));
    }
});
