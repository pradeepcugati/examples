const path = require("path");
module.exports = {
  entry: ["./src/js/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss?$/,
        use: ['style-loader','css-loader','sass-loader']/*extractPlugin.extract({
          use: ['css-loader','sass-loader']
        })*/
      }
    ]
  }
};