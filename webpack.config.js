const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },

  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index_bundle.js"
  },
  devServer: {
    contentBase: "./dist",
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  mode: "production",
  plugins: [
    new HTMLWebpackPlugin({
      template: "src/index.html"
    })
  ]
};
