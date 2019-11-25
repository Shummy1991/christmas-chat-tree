import axios from "axios";
import onesignalAppId from "../common/onesignalAppId";

const users = [
    {username: "My User 1"},
    {username: "My User 2"},
    {username: "My User 3"},
    {username: "My User 4"},
    {username: "My User 5"},
    {username: "My User 6"},
    {username: "My User 7"},
    {username: "My User 8"},
    {username: "My User 9"},
    {username: "My User 10"},
    {username: "My User 11"},
    {username: "My User 12"},
    {username: "My User 13"},
    {username: "My User 14"},
    {username: "My User 15"},
    {username: "My User 16"},
    {username: "My User 17"},
    {username: "My User 18"},
    {username: "My User 19"},
    {username: "My User 20"},
    {username: "My User 21"},
    {username: "My User 22"},
    {username: "My User 23"},
    {username: "My User 24"},
    {username: "My User 25"},
];
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
