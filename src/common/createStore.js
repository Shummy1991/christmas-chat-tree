import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./store/reducers";
import axiosInstance from "./axiosInstance";

export default req => {
    console.log(reducers);
    const store = createStore(
        reducers,
        {},
        applyMiddleware(thunk.withExtraArgument(axiosInstance(req)))
    );

    if (process.env.NODE_ENV === "development" && module.hot) {
        module.hot.accept();
        module.hot.accept("./store/reducers", () => {
            store.replaceReducer(require("./store/reducers").default);
        });
    }

    return store;
};
