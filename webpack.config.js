const path = require('path');
const webpack = require('webpack');

module.exports = {
//   context: path.resolve(__dirname, './client'),
  entry: {
    app: './client/app.js',
  },
  output: {
    // path: path.resolve(__dirname, './client'),
    filename: './client/app.bundle.js',
  },
};