const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const { template } = require("@babel/core");
let mode = "development";

if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  mode: mode,
  target: "web",
  entry: [
    "regenerator-runtime/runtime.js",
    path.resolve(__dirname, "src", "index.js")
  ],
  output: {
    publicPath: "/"
  },
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
    new Dotenv(),
    // new webpack.DefinePlugin({
    //     process: {env: {}}
    // }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/assets/favicon/favicon.ico"
    }),
    new CopyPlugin({
      patterns: [{ from: "netlify_config", to: "" }]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: ["", ".js", ".jsx"]
  },
  devtool: "source-map",
  devServer: {
    static: "./dist",
    hot: true,
    historyApiFallback: true
  }
};
