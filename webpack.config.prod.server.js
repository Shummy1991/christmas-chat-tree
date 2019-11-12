const path = require("path");

const nodeExternals = require("webpack-node-externals");

module.exports = {
    target: "node",

    entry: path.resolve(__dirname, "app"),
    output: {
        path: path.resolve(__dirname, ""),
        filename: "server.bundle.js",
        publicPath: "/"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: ["@babel/preset-env",
                            "@babel/preset-react"],
                        plugins: ["@babel/proposal-class-properties"]
                    }
                },
                include: path.resolve(__dirname, "src")
            }
        ]
    },
    externals: [nodeExternals()],
    node: {
        __dirname: false,
    }
};
