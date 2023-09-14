import * as path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as webpack from "webpack";
import "webpack-dev-server";

let isProduction = process.env.NODE_ENV === "production";

console.log("> %cisProduction", "color: #218eff", " - ", isProduction);
// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const config: webpack.Configuration = {
  mode: isProduction ? "production" : "development",
  entry: "./src/main",
  devtool: isProduction ? false : "eval-cheap-module-source-map",
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "./dist"),
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".css"],
    alias: {
      Components: path.resolve(__dirname, "src/components/"),
    },
    // plugins: [
    //   new TsconfigPathsPlugin({
    //     configFile: path.resolve(__dirname, "tsconfig.json"),
    //     extensions: [".ts", ".tsx", ".js", ".jsx"],
    //   }),
    // ],
  },
  module: {
    rules: [
      {
        test: /.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
          // "ts-loader",
          {
            loader: "imports-loader",
            options: {
              type: "module",
              imports: [`default Components/For For`],
            },
          },
        ],
      },
      {
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
          // "style-loader",
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[local]--[hash:base64:5]",
                exportLocalsConvention: "camelCase",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      stage: 3,
                      features: {
                        "nesting-rules": true,
                      },
                      autoprefixer: {
                        grid: true,
                      },
                      browsers: [
                        "> 1%",
                        "last 2 versions",
                        "not ie <= 8",
                        "ios >= 8",
                        "android >= 4.0",
                      ],
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: isProduction,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      name(module, chunks, cacheGroupKey) {
        const moduleFileName = module
          .identifier()
          .split("/")
          .reduceRight((item) => item);
        const allChunksNames = chunks.map((item) => item.name).join("~");
        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
      },
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    // 打包时生成一个 html 模板文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
    //
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  devServer: {
    port: 3000,
    open: false,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    liveReload: false,
  },
};

export default config;
