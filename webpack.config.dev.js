const path = require("path");
const webpack = require("webpack");
// const autoprefixer = require("autoprefixer");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const eslintFormatter = require("react-dev-utils/eslintFormatter");

module.exports = {
    entry: [
        "webpack-hot-middleware/client",
        path.resolve(__dirname, "./src/client")
    ],
    output: {
        path: path.resolve(__dirname, "src/client"),
        filename: "bundle.js",
        publicPath: "/"
    },
    "devtool": "cheap-inline-module-source-map",
    devServer: {
        hot: true,
        inline: true,
        port: 3001,
    },
    plugins: [
        new StringReplacePlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
                WEBPACK: true
            }
        }),
    ],
    mode: "development",
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                use: {
                    loader: require.resolve("eslint-loader"),
                    options: {
                        formatter: eslintFormatter,
                        eslintPath: require.resolve("eslint"),

                    },
                },
                include: path.resolve(__dirname, "src"),
            },
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
                include: path.resolve(__dirname, "src"),
            }
        ]
    },
    node: {
        __dirname: false,
    }
};
