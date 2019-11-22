import axios from "axios";
import onesignalAppId from "../common/onesignalAppId";

const users = [];
const streams = [];

let nextStreamId = 0;

let nextMessageId = 0;

export default (app) => {
    app.post("/login", (req, res) => {
        const username = req.body.username || req.cookies.username;
        if (username) {
            res.cookie("username", username, { maxAge: 60 * 60 * 24 * 30, httpOnly: true });
            if (users.findIndex(u => u && u.username === username) === -1) {
                let newIndex = users.findIndex(u => u === null);
                if (newIndex === -1) newIndex = users.length;
                users[newIndex] = {
                    username,
                };
            }
            refreshUsers();
            res.json({ success: true, user: users.find(u => u && u.username === username)});
        } else {
            res.json({ success: false });
        }
    });

    app.post("/logout", (req, res) => {
        const { username } = req.cookies;
        const userIndex = users.findIndex(u => u && u.username === username);
        if (userIndex > -1) {
            users[userIndex] = null;
            refreshUsers();
        }
        res.clearCookie("username");
        res.end();
    });

    app.get("/users", (req, res) => {
        res.json(users);
    });

    const sendMessage = data => {
        streams.forEach(stream => {
            stream.res.write(sse(JSON.stringify({
                type: "message",
                data,
            })));
        });
    };

    app.post("/send-message", (req, res) => {
        const { username } = req.cookies;
        if (!username) return res.end();
        const user = users.find(u => u && u.username === username);
        if (!user) return res.end();
        const { message } = req.body;
        nextMessageId++;
        sendMessage({
            user,
            message,
            id: nextMessageId,
            expiresIn: 1000 + message.length * 100,
        });
        if (process.env.NODE_ENV === "production") {
            axios.post("https://onesignal.com/api/v1/notifications",
                {
                    "app_id": onesignalAppId,
                    "included_segments": ["All"],
                    "contents": {
                        en: `${user.username}: ${message}`
                    }
                }, {
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Authorization": `Basic ${process.env.ONESIGNAL_API_KEY}`
                    },
                }
            );
        }
        res.end();
    });



    app.get("/communication", async(req, res) => {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
        });
        const id = nextStreamId;
        streams.push({ res, id });
        nextStreamId++;
        res.write(sse(JSON.stringify({
            type: "connected"
        })));
        req.on("close", () => {
            streams.splice(streams.findIndex(stream => stream.id === id), 1);
        });
    });

    const refreshUsers = () => {
        streams.forEach(stream => {
            stream.res.write(sse(JSON.stringify({
                type: "users",
                data: users,
            })));
        });
    };
};

const sse = (message) => {
    return `data: ${ message }\n\n`;
};
