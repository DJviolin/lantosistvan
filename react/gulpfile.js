//'use strict';

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const paths = {
  src: [
    'src/**/*.jsx',
  ],
};

/////////////////////////////////////////////////////////////
// BUNDLE
/////////////////////////////////////////////////////////////

/*gulp.task('bundle', () =>
  gulp.src('src/index.jsx') // entry point
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
    .pipe(gulp.dest('./dist'))
);*/

/////////////////////////////////////////////////////////////
// WEBPACK
/////////////////////////////////////////////////////////////

gulp.task('webpack', () =>
  gulp.src('entry.js')
    //.pipe(babel({ presets: ['es2015', 'react'] })) // Also inserting Strict mode
    .pipe(webpack(webpackConfig))
    /*.pipe(webpack({
      debug: true,
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },
      entry: './src/index.jsx',
      output: {
        filename: 'bundle.js',
      },
    }))*/
    .pipe(gulp.dest('dist/'))
);

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
//gulp.task('default', gulp.parallel('webpack', 'watch:webpack'));
gulp.task('default', gulp.parallel('webpack'));
