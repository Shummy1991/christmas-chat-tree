import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import communication from "./communication";
import cors from "cors";


const allowAccess = res => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "localhost:4000");
}
export default (app) => {
    app.use(cors());
    app.post("*", (req, res, next) => {
        allowAccess(res);
        if (req.url.slice(0, 5) === "/api/") {
            req.url = req.url.slice(4);
            return next();
        }
        req.url = "/";
        return next();
    });

    app.get("*", (req, res, next) => {
        allowAccess(res);
        if (req.url.slice(0, 5) === "/api/") {
            req.url = req.url.slice(4);
            return next();
        }
        req.url = "/";
        return next();
    });

    if (process.env.NODE_ENV === "development") {
        const logRequestStart = (req, res, next) => {
            console.info(`${req.method} ${req.originalUrl}`);
            next();
        };
        app.use(logRequestStart);
    }

    app.use(bodyParser.urlencoded({
        extended: true,
        limit: "10mb"
    }));
    app.use(bodyParser.json({
        limit: "10mb"
    }));

    app.use(cookieParser());

    communication(app);
};
