const path = require("path");
const webpack = require("webpack");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src/client"),
    output: {
        path: path.resolve(__dirname, "src/public"),
        filename: "bundle.js",
        publicPath: "/"
    },
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                WEBPACK: true
            }
        }),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, "src", "assets"),
        //         to: path.resolve(__dirname, "public", "")
        //     }
        // ]),
    ],
    optimization: {
        minimize: true
    },
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
    }
};
