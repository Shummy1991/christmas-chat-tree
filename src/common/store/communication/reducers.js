import { GET_USERS, RECEIVE_MESSAGE, REMOVE_MESSAGE } from "./types";

export default (communication = { users: [], usersInitialized: false, messages: [] }, action) => {
    switch (action.type) {
        case GET_USERS: {
            return {
                ...communication,
                users: action.payload,
                usersInitialized: true,
            };
        }
        case RECEIVE_MESSAGE: {
            const message = action.payload;
            const messages = communication.messages.filter(m => m.user.username !== message.user.username);
            return {
                ...communication,
                messages: [
                    ...messages,
                    message,
                ]
            };
        }
        case REMOVE_MESSAGE: {
            return {
                ...communication,
                messages: communication.messages.filter(m => m.id !== action.payload),
            };
        }
        default:
            return communication;
    }
};
