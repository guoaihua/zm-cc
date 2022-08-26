const path = require("path");
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
    ],
  },
};
