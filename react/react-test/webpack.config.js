//const path = require('path');
const webpack = require('webpack');

module.exports = {
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  //entry: './entry.js',
  output: {
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // x is optional
        exclude: /(node_modules|bower_components)/,
        //include: /src/,
        loader: 'babel-loader', // 'babel' and 'babel-loader' is also a legal name to reference
        query: {
          cacheDirectory: 'babel_cache',
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
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
    new webpack.HotModuleReplacementPlugin(), // For hot reloading
    new webpack.NoErrorsPlugin(), // Webpack won't compile if finds errors
    new webpack.optimize.UglifyJsPlugin({
      sourcemap: false,
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: false,
      output: {
        comments: false,
        screw_ie8: true,
      },
      //
      //mangle: true,
      beautify: false,
      //dead_code: true,
    }),
  ],
};
