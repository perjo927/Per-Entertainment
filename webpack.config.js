const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: [
            "babel-polyfill",
            './client/app.js',
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'client'),
        publicPath: '/assets/',
    },
    devServer: {
        contentBase: path.resolve(__dirname, './client'),
        port: 8081
    },
    module: {
        loaders: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                },
                exclude: /node_modules/
            },
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