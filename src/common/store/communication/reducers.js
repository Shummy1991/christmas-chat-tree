import { GET_USERS } from "./types";

export default (communication = { users: [], usersInitialized: false }, action) => {
    switch (action.type) {
        case GET_USERS: {
            return {
                ...communication,
                users: action.payload,
                usersInitialized: true,
            };
        }
        default:
            return communication;
    }
};
