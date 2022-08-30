const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { loader } = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "zm-cc.js",
    libraryTarget: "umd",
    library: "zm",
    path: path.resolve(__dirname, "./dist"),
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./template/index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: "ts-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    open: ["/index.html"],
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  resolve: {
    extensions: ['.js','.jsx','.tsx','.json']
  }
};
