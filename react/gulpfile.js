//'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

gulp.task('webpack', () =>
  gulp.src('src/app.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist'))
);
