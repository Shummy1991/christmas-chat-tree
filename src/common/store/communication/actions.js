import { GET_USERS, RECEIVE_MESSAGE, REMOVE_MESSAGE } from "./types";
import baseURL from "../../baseURL";

export const getUsers = () => async(dispatch, getState, api) => {
    const { data: users } = await api.get("/users");
    dispatch({
        type: GET_USERS,
        payload: users,
    });
};
// TASK 1: connection and getting data through SSE
export const startCommunication = () => async(dispatch, getState, api) => {
    // connect to the eventsource @ baseURL + "/communication"
    // ...
    // listen for messages (you can send a message to see a new message arrive)
    // ...
        // parse message.data
        // ...
        // switch
            // if message type is 'users' dispatch a GET_USERS type action with data as payload
            // { type: ..., payload: ... }
            // ...
            // if message type is message dispatch a RECEIVE_MESSAGE type action with data as paylaod
            // case ...
                // ...
                // after data.expiresIn ms dispatch a REMOVE_MESSAGE type action with data.id as payload 
                // ...
};

export const sendMessage = data => async(dispatch, getState, api) => {
    await api.post("/send-message", data);
};
