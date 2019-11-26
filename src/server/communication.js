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

    // only for server-side rendering
    app.get("/users", (req, res) => {
        res.json(users);
    });

    // TASK 2: communication
    // TASK 2C: broadcasting messages
    const sendMessage = data => {
        // for each stream send a message with type message along with the data
        // ...
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
        res.end();
    });


    // TASK 2A: connect client to server
    app.get("/communication", async(req, res) => {
        // set status to 200 and set the 2 required headers for a server-sent-event. Google it.
        // ...
        const id = nextStreamId;
        // push the res along with the id to the streams in an object
        // ...
        nextStreamId++;
        // send a welcome message to the client using the sse function. Stringify an object with the type connected. Use the write method.
        // ...
        req.on("close", () => {
            streams.splice(streams.findIndex(stream => stream.id === id), 1);
        });
    });

    // TASK 2B: resfreshing userlist
    const refreshUsers = () => {
        // for each stream send a message with type users along with users as the data.
        // ...
    };
};

const sse = (message) => {
    return `data: ${ message }\n\n`;
};
