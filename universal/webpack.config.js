const webpack = require('webpack');
const path = require('path');
//const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
  },
  entry: path.join(__dirname, 'shared', 'entry.js'),
  output: {
    path: path.join(__dirname, 'client', 'js'),
    filename: 'bundle.js',
  },
  //devtool: 'source-map',
  //devtool: debug ? 'source-map' : null,
  devtool: null,
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // x is optional
        exclude: /(client|node_modules|server)/,
        //include: /shared/,
        loader: 'babel-loader', // 'babel' and 'babel-loader' is also a legal name to reference
        query: {
          cacheDirectory: 'babel_cache',
          //presets: debug ? ['react', 'es2015', 'react-hmre'] : ['react', 'es2015'], // Also inserting Strict mode
          presets: ['react', 'es2015'], // Also inserting Strict mode
        },
      },
    ],
  },
  //plugins: debug ? [] : [
  plugins: [
    /*new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),*/
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(), // removes all the duplicated files
    new webpack.optimize.OccurenceOrderPlugin(), // helps in reducing the file size
    //new webpack.HotModuleReplacementPlugin(), // For hot reloading
    new webpack.NoErrorsPlugin(), // Webpack won't compile if finds errors
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: true, // Variable name mangling
      sourceMap: false, // Map error message locations to modules
      beautify: false,
      output: {
        comments: false,
        screw_ie8: true,
      },
      //dead_code: false,
    }),
  ],
};
