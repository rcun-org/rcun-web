const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {template} = require("@babel/core");

let mode = "development"

if (process.env.NODE_ENV === "production") {
    mode = "production"
}

module.exports = {
    mode: mode,
    target: 'web',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset"
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin(
            {
                template: "./src/index.html"
            }
        )
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devtool: 'source-map',
    devServer: {
        static: "./dist",
        hot: true
    }
}