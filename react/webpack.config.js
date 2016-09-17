const path = require('path');
const webpack = require('webpack');

module.exports = {
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
