/* eslint react/prop-types: 0 */
import App from "./app";
import Home from "./pages/home";
// import routing from "./routing";

export default [
    {
        ...App,
        routes: [
            {
                ...Home,
                path: "/",
                exact: true
            },
            // {
            //     ...NotFound
            // }
        ]
    }
];
