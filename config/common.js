const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
module.exports = {
  entry: {
    main: path.resolve(__dirname, './../src/app.tsx'),
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, './../dist')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './../src')
    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    noParse: /lodash/,
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader'],
        include: [
          path.resolve(__dirname, './../src')
        ]
      },
      {
        enforce: 'pre',
        test: /\.js|tsx?$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ?
            'style-loader' : CssExtractPlugin.loader,
          'css-loader', 'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require("autoprefixer")
              ]
            }
          }
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './assets/[name].[hash:8].[ext]',
              fallback: 'file-loader'
            }
          }
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new CleanWebpackPlugin(),
    new CssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[hash].js'
    })
  ],
}