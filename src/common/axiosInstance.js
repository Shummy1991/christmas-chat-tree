import axios from "axios";


export default (req) => axios.create({
    baseURL: `${process.env.HOST || "http://localhost:4000"}/api`,
    headers: { cookie: req ? req.get("cookie") || "" : "" }
});
