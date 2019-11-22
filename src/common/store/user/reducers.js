import { LOGIN, LOGOUT } from "./types";

export default (user = {}, action) => {
    switch (action.type) {
        case LOGIN: {
            return action.payload;
        }
        case LOGOUT: {
            return {};
        }
        default:
            return user;
    }
};
