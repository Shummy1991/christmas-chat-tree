import { LOGIN } from "./types";

export const login = (data) => async(dispatch, getState, api) => {
    const { data: { success, user } } = await api.post("/login", data);
    if (success) {
        dispatch({
            type: LOGIN,
            payload: user,
        });
    }
};
