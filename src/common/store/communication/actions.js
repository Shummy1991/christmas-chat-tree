import { GET_USERS, RECEIVE_MESSAGE, REMOVE_MESSAGE } from "./types";
import baseURL from "../../baseURL";

export const getUsers = () => async(dispatch, getState, api) => {
    const { data: users } = await api.get("/users");
    dispatch({
        type: GET_USERS,
        payload: users,
    });
};

export const startCommunication = () => async(dispatch, getState, api) => {
    const eventSource = new EventSource(baseURL + "/communication");
    eventSource.onmessage = (message) => {
        const { type, data } = JSON.parse(message.data);
        switch (type) {
            case "users": {
                return dispatch({
                    type: GET_USERS,
                    payload: data,
                });
            }
            case "message": {
                setTimeout(() => {
                    dispatch({
                        type: REMOVE_MESSAGE,
                        payload: data.id,
                    });
                }, data.expiresIn);
                return dispatch({
                    type: RECEIVE_MESSAGE,
                    payload: data,
                });
            }
            default:
                break;
        }
    };
};

export const sendMessage = data => async(dispatch, getState, api) => {
    await api.post("/send-message", data);
};
