import { combineReducers } from "redux";
// import { routerReducer } from "react-router-redux";
import user from "./user/reducers";

export default combineReducers({
    user,
});
