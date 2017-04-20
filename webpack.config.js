var webpack = require('webpack');

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
    extensions: ['.js', '.json' ],
  },
  devtool: 'inline-source-map',
  plugins: [],
  node: {
    fs: "empty",
    child_process: "empty",
    tls: "empty"
  }
};