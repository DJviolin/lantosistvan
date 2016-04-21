'use strict';

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

const gulp       = require('gulp'),
      server     = require('gulp-express'),
      rename     = require('gulp-rename'),
      stylus     = require('gulp-stylus'),
      uglify     = require('gulp-uglify'),
      replace    = require('gulp-replace'),
      minifyCSS  = require('gulp-minify-css'),
      livereload = require('gulp-livereload');
      //connect = require('gulp-connect')
      //connectPHP = require('gulp-connect-php')

const paths = {
  pathCssStylusGlobal: ['dev/css/src/global.styl'],
  pathCssMinifyGlobal: ['dev/css/build/global.css'],
  pathJsUglify: ['dev/js/src/plugins.js', 'dev/js/src/main.js'],
  pathJsReplace: ['dev/js/plugins.min.js', 'dev/js/main.min.js'],
  pathHtmlPhp: ['dev/*.html', 'dev/*.php', 'dev/public/*.html', 'dev/public/*.php'],
  pathMinified: ['dev/css/*.css', 'dev/js/*.js', 'dev/js/vendor/*.js'],
  pathImages: 'dev/images/**/*'
};

/////////////////////////////////////////////////////////////
// STYLUS CSS
/////////////////////////////////////////////////////////////

gulp.task('stylus', function () {
  return gulp.src(paths.pathCssStylusGlobal)
    .pipe(stylus({'include css': true, compress: false}))
    .pipe(rename({ ext: 'css' }))
    .pipe(gulp.dest('dev/css/build'));
});

/////////////////////////////////////////////////////////////
// MINIFY CSS
/////////////////////////////////////////////////////////////

gulp.task('minify', ['stylus'], function() {
  return gulp.src(paths.pathCssMinifyGlobal)
    .pipe(minifyCSS({keepBreaks: false, keepSpecialComments: '*'}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dev/css'));
});

/////////////////////////////////////////////////////////////
// UGLIFY JS
/////////////////////////////////////////////////////////////

gulp.task('uglify', function() {
  return gulp.src(paths.pathJsUglify)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dev/js'));
});

/////////////////////////////////////////////////////////////
// REPLACE DOUBLE-QUOTES
/////////////////////////////////////////////////////////////

gulp.task('replace', ['uglify'], function() {
  return gulp.src(paths.pathJsReplace)
    .pipe(replace(/\"/g, '\''))
    .pipe(gulp.dest('dev/js'));
});

/////////////////////////////////////////////////////////////
// HTML & PHP FILES
/////////////////////////////////////////////////////////////

gulp.task('htmlphp', function() {
  return gulp.src(paths.pathHtmlPhp);
});

/////////////////////////////////////////////////////////////
// COPY FROM DEV TO DIST FOLDER WITH 'GULP MOVE' COMMAND
/////////////////////////////////////////////////////////////

var filesToMove = [
  'dev/css/*.*',
  'dev/images/**/*.*',
  'dev/js/*.*',
  'dev/js/vendor/*.*',
  'dev/public/**/*.*',
  'dev/*.*',
  'dev/.htaccess'
];

gulp.task('move', ['stylus', 'minify', 'uglify', 'replace', 'htmlphp'], function(){
  return gulp.src(filesToMove, { base: './dev' }) // 'base' sets the relative root for the files
  .pipe(gulp.dest('./dist'));
});

/////////////////////////////////////////////////////////////
// LIVERELOAD SERVER
/////////////////////////////////////////////////////////////

/*gulp.task('connect', function() {
  connect.server({
    port: 8000,
    root: 'dev',
    livereload: true
  });
});*/

gulp.task('connect', function() {
  connectPHP.server({
    hostname: '0.0.0.0',
    bin: 'C:/php/php.exe',
    ini: 'C:/php/php.ini',
    port: 8000,
    base: 'dev',
    livereload: true
  });
});

/////////////////////////////////////////////////////////////
// WATCH
/////////////////////////////////////////////////////////////

gulp.task('watch', function() { // Rerun the task when a file changes
  livereload.listen();
  gulp.watch(paths.pathCssStylusGlobal, ['stylus']).on('change', livereload.changed);
  gulp.watch(paths.pathCssMinifyGlobal, ['minify']).on('change', livereload.changed);
  gulp.watch(paths.pathJsUglify, ['uglify']).on('change', livereload.changed);
  gulp.watch(paths.pathJsReplace, ['replace']).on('change', livereload.changed);
  gulp.watch(paths.pathHtmlPhp, ['htmlphp']).on('change', livereload.changed);
  gulp.watch(paths.pathMinified, ['stylus', 'minify', 'uglify', 'replace', 'htmlphp']).on('change', livereload.changed);
});

/////////////////////////////////////////////////////////////
// EXECUTE GULP
/////////////////////////////////////////////////////////////

gulp.task('default', ['connect', 'watch']);
