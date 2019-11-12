import matchPath from "react-router/matchPath";
import Router from "react-router/Router";

// ensure we're using the exact code for default root match
const computeMatch = Router.prototype.computeMatch;


const matchRoutes = function matchRoutes(routes, pathname) {
    const branch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    routes.some(function(route) {
        const match = route.path
            ? matchPath(pathname, route) : branch.length ? branch[branch.length - 1].match // use parent match
                : computeMatch(pathname); // use default "root" match

        if (match) {
            branch.push({ route: route, match: match });

            if (route.routes) {
                matchRoutes(route.routes, pathname, branch);
            }
        }

        return match;
    });

    return branch;
};

export default matchRoutes;
