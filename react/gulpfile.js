//'use strict';

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

const gulp = require('gulp');
const babel = require('gulp-babel');
//const webpack = require('webpack-stream');
//const webpackConfig = require('./webpack.config.js');

const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const paths = {
  src: [
    'src/**/*.jsx',
  ],
};

/////////////////////////////////////////////////////////////
// WEBPACK
/////////////////////////////////////////////////////////////

/*gulp.task('webpack', () =>
  gulp.src('src/index.jsx')
    .pipe(babel({ presets: ['es2015', 'react'] })) // Also inserting Strict mode
    //.pipe(webpack(webpackConfig))
    .pipe(webpack({
      debug: true,
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },
      entry: './src/index.jsx',
      output: {
        filename: 'bundle.js',
      },
    }))
    .pipe(gulp.dest('dist/'))
);*/

/*gulp.task('webpack', (callback) => {
  // run webpack
  webpack({
    // configuration
  }, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      // output options
    }));
    callback();
  });
});*/

gulp.task('webpack', (callback) => {
  // modify some webpack config options
  const myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify('production'),
      },
    })
  );
  // run webpack
  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true,
    }));
    callback();
  });
});

/////////////////////////////////////////////////////////////
// INIT: APP
/////////////////////////////////////////////////////////////

//gulp.task('app', gulp.parallel('webpack'));

/////////////////////////////////////////////////////////////
// WATCH
/////////////////////////////////////////////////////////////

gulp.task('watch:webpack', () =>
  gulp.watch(paths.src, gulp.series('webpack'))
);

//gulp.task('watch', gulp.parallel('watch:webpack'));

/////////////////////////////////////////////////////////////
// EXECUTE GULP
/////////////////////////////////////////////////////////////

//gulp.task('default', gulp.parallel('app', 'watch'));
gulp.task('default', gulp.parallel('webpack', 'watch:webpack'));
