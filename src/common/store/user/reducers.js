import { LOGIN } from "./types";

export default (user = {}, action) => {
    switch (action.type) {
        case LOGIN: {
            return action.payload;
        }
        default:
            return user;
    }
};
