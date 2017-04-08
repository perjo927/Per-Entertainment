const path = require('path');
const webpack = require('webpack');

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
};