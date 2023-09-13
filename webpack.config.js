const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: "production",
  entry: "./main",
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "./dist"),
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
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
          "ts-loader",
        ],
      },
      {
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
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
          "less-loader",
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
      template: path.resolve(__dirname, "./index.html"),
      filename: "index.html",
    }),
    //
    new CleanWebpackPlugin({
      path: path.resolve(__dirname, "./dist"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
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
  },
};
