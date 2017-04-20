var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    'main': __dirname + '/src/main.js'
  },
  output: {
    path: __dirname + '/public',
    filename: './[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js' ],
  },
  devtool: 'inline-source-map',
  plugins: []
};