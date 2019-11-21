import React from "react";
import { render, hydrate } from "react-dom";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../common/store/reducers";
import { renderRoutes } from "./react-router-config";
import routes from "./routes";
import thunk from "redux-thunk";
import "babel-polyfill";
import "core-js/es6/map";
import "core-js/es6/set";
import "core-js/fn/array/find";
import "core-js/fn/array/includes";
import "core-js/fn/number/is-nan";
import "intl";

import axios from "axios";
import { $document } from "../common/window";
import baseURL from "../common/baseURL";
const history = createBrowserHistory();


const axiosInstance = axios.create({
    baseURL: baseURL,
    // baseURL: "/api"
    withCredentials: true,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    window.INITIAL_STATE,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(axiosInstance)))
);

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("../common/store/reducers", () => {
        store.replaceReducer(require("../common/store/reducers").default);
    });
}

const renderMethod = process.env.WEBPACK ? render : hydrate;


renderMethod(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                {renderRoutes(routes)}
            </div>
        </ConnectedRouter>
    </Provider>
    , $document.getElementById("root")
);
