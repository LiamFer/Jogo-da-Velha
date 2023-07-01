const cssPlugin = require("mini-css-extract-plugin");
const path = require('path')

module.exports = {
  entry: {
    index: "./src/script.js",
  },
  mode: "production",

  output: {
    path: path.resolve(__dirname,'game'),
    filename: "[name].min.js",
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },

      {
        test: /\.css$/,
        use: [cssPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [new cssPlugin()],
};
