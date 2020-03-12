const webpack = require('webpack');
const common = require('./common');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DllLinkPlugin = require('dll-link-webpack-plugin');
module.exports = merge({}, common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        sourceMapFilename: 'map/[name].map'
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.API": JSON.stringify(process.env.API),
            "process.env.TRACK_DOMAIN": JSON.stringify(process.env.TRACK_DOMAIN),
        }),
        new HTMLWebpackPlugin({
            template: './src/index.html',
            minify: true,
            hash: true
        }),
    ].concat(process.env.Analyzer ? new BundleAnalyzerPlugin() : []),
})