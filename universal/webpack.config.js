const webpack = require('webpack');
//const path = require('path');
//const debug = process.env.NODE_ENV !== 'production';

/////////////////////////////////////////////////////////////
// path.join Windows Hack
// http://stackoverflow.com/a/33590800/1442219
/////////////////////////////////////////////////////////////

/*if (process.platform === ('win32' || 'win64')) {
  path.join2 = path.join;
  path.sep = '/';
  path.join = (...args) => {
    let res = path.join2.apply({}, args);
    res = res.replace(/\\/g, path.sep);
    return res;
  };
}*/

/////////////////////////////////////////////////////////////
// Webpack Config
/////////////////////////////////////////////////////////////

module.exports = {
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'], // Imports without extension ''
  },
  //entry: path.join(__dirname, 'shared', 'entry.js'),
  output: {
    //path: path.join(__dirname, 'client', 'js'),
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
          // Also inserting Strict mode
          //presets: debug ? ['react', 'es2015', 'react-hmre'] : ['react', 'es2015'],
          presets: ['react', 'es2015'], // Also inserting Strict mode
        },
      },
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
      {
        test: /\.json$/,
        loader: 'json',
      },
      // "file" loader makes sure those assets end up in the `build` folder.
      // When you `import` an asset, you get its filename.
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        exclude: /\/favicon.ico$/,
        loader: 'file',
        query: {
          name: 'images/webpack/[name].[hash:8].[ext]',
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
    new webpack.optimize.OccurrenceOrderPlugin(), // helps in reducing the file size
    //new webpack.HotModuleReplacementPlugin(), // For hot reloading
    new webpack.NoErrorsPlugin(), // Webpack won't compile if finds errors
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: true, // Variable name mangling
      sourceMap: false, // Map error message locations to modules
      //beautify: true,
      output: {
        comments: false,
        screw_ie8: true,
      },
      //dead_code: false,
    }),
    /*new webpack.LoaderOptionsPlugin({
      options: {
        htmlLoader: {
          whateverProp: true,
        },
      },
    }),*/
  ],
};
