const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: './client/app.js',
  },
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'client'),
    publicPath: '/assets/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './client')
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ]
};