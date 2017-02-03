const path = require('path');

const config = {
  entry: './src/demo.jsx',
  output: {
    path: './dist/',
    filename: 'index.js',
    sourceMapFilename: 'index.js.map'
  },
  //cache: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.json?$/,
        loader: "json-loader"
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      './node_modules',
    ]
  },
  resolveLoader: { modules: [
    './node_modules',
  ]}
}

module.exports = config;
