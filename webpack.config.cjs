const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/main.tsx",
    output: {
      path: path.resolve(__dirname, "dist-webpack"),
      filename: "assets/[name].[contenthash].js",
      publicPath: "/",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: { loader: "ts-loader", options: { transpileOnly: true } },
          exclude: /node_modules/,
        },
        {
          test: /\.mjs$/,
          resolve: { fullySpecified: false },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./index.webpack.html" }),
      new CopyWebpackPlugin({
        patterns: [{ from: "public", to: "." }],
      }),
      ...(isProduction
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: "static",
              reportFilename: "webpack-stats.html",
              openAnalyzer: true,
            }),
          ]
        : []),
    ],
    devServer: {
      port: 8080,
      static: path.resolve(__dirname, "public"),
      open: true,
    },
    optimization: {
      concatenateModules: false,
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
  };
};
