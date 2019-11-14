import { combineReducers } from "redux";
// import { routerReducer } from "react-router-redux";
import user from "./user/reducers";
import communication from "./communication/reducers";

export default combineReducers({
    user,
    communication,
});
