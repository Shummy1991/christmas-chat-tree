import { GET_USERS } from "./types";

export const getUsers = () => async(dispatch, getState, api) => {
    console.log("get users");
    const { data: users } = await api.get("/users");
    dispatch({
        type: GET_USERS,
        payload: users,
    });
};

export const startCommunication = () => async(dispatch, getState, api) => {
    const eventSource = new EventSource("/api/communication");
    eventSource.onmessage = (message) => {
        const { users, type } = JSON.parse(message.data);
        if (type === "users") {
            dispatch({
                type: GET_USERS,
                payload: users,
            });
        }
    };
};
