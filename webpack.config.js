const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: "production",
  entry: "./main",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["babel-preset-env", "babel-preset-react"],
            },
          },
          "ts-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin({
      path: path.resolve(__dirname, "./dist"),
    }),
  ],
  devServer: {
    port: 3000,
    open: true,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
  },
};
