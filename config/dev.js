const webpack = require('webpack');
const common = require('./common');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = merge({}, common, {
  mode: 'development',
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "./../dist"),
    compress: true,
    open: true,
    port: 1234,
    host: '0.0.0.0',
    hot: true,
    inline: true,
    before: function (resp) {
      console.log('🐑🐑🐑...')
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      showErrors: true
    }),
  ],
})