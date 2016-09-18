const path = require('path');
const webpack = require('webpack');

module.exports = {
  debug: true,
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  //entry: './src/index.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // x is optional
        exclude: /(node_modules|bower_components)/,
        //include: /components/,
        loader: 'babel-loader', // 'babel' and 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015'],
        },
      },
      /*{
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        //include: /src/,
        loader: 'style-loader!css-loader',
      },*/
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.optimize.UglifyJsPlugin(),
    /*new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
    }),*/
  ],
  output: {
    filename: 'bundle.js',
  },
};
