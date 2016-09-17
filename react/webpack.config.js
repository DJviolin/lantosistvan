const path = require('path');
const webpack = require('webpack');

module.exports = {
  debug: true,
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
  },
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
