import React from "react";
import Switch from "react-router/Switch";
import Route from "react-router/Route";
const _extends = Object.assign || function(target) {
    for (let i = 1; i < arguments.length; i++) {
        let source = arguments[i];
        for (let key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};


const renderRoutes = function renderRoutes(routes) {
    const extraProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return routes ? React.createElement(
        Switch,
        null,
        routes.map(function(route, i) {
            if (typeof route.path === "object") {
                return route.path.map(path => React.createElement(Route, {
                    key: route.key || i,
                    path: path,
                    exact: route.exact,
                    strict: route.strict,
                    render: function render(props) {
                        return React.createElement(route.component, _extends({}, props, extraProps, { route: route }));
                    }
                }));
            } else {
                return [React.createElement(Route, {
                    key: route.key || i,
                    path: route.path,
                    exact: route.exact,
                    strict: route.strict,
                    render: function render(props) {
                        return React.createElement(route.component, _extends({}, props, extraProps, { route: route }));
                    }
                })];
            }
        }).reduce((a, b) => a.concat(b), [] )
    ) : null;
};

export default renderRoutes;
