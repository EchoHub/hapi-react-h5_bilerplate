const webpack = require('webpack')
const library = '[name]_lib'
const path = require('path')

module.exports = {
  entry: {
    vendors: ['react', 'lodash']
  },

  output: {
    filename: '[name].dll.js',
    path: 'dist/',
    library
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-manifest.json'),
      name: library
    }),
  ],
}