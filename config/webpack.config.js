const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = require('./dimple.config')

module.exports = {
  entry: config.js.entry,
  output: {
    filename: config.js.output,
    path: path.resolve(__dirname, config.buildFolder)
  },
  context: path.resolve(__dirname, '.'),
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: false,
          output: {
            comments: false
          },
          minify: {},
          compress: {
            booleans: true
          }
        }
      })
    ]
  }
}
