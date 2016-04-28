'use strict';

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

const gulp       = require('gulp'),
      stylus     = require('gulp-stylus'),
      cleanCSS   = require('gulp-clean-css'),
      rename     = require('gulp-rename'),
      //livereload = require('gulp-livereload'),
      //server     = require('gulp-express'),
      gls        = require('gulp-live-server'),
      uglify     = require('gulp-uglify');

const paths = {
  pathStylus:   ['public/stylesheets/src/main'],
  pathCSS:      ['public/stylesheets/src/**/*'],
  pathServer:   ['app.js', 'bin/www', 'routes/**/*.js', 'lib/**/*.js', 'config.js'],
  pathJsUglify: ['public/javascripts/src/main-vanilla.js', 'public/javascripts/src/main-jquery.js', 'public/javascripts/src/slick.js'],
  pathFiles:    ['views/*.hbs', 'views/**/*.hbs', 'database/data.json', 'locales/*.json']
};

/////////////////////////////////////////////////////////////
// SERVER
/////////////////////////////////////////////////////////////

/*gulp.task('start', function () {
  server.run(['bin/www']);
});*/

// this will achieve `node --trace-deprecation --trace-sync-io ./bin/www`
const server = gls.new(['--trace-deprecation', '--trace-sync-io', 'bin/www']);
gulp.task('start', function() {
  //you can access cwd args in `myapp.js` via `process.argv` 
  server.start();
});

/////////////////////////////////////////////////////////////
// STYLUS CSS
/////////////////////////////////////////////////////////////

gulp.task('stylus', function () {
  return gulp.src(paths.pathStylus + '.styl')
    .pipe(stylus({'include css': true, compress: false}))
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('public/stylesheets/src'));
});

/////////////////////////////////////////////////////////////
// MINIFY CSS
/////////////////////////////////////////////////////////////

gulp.task('minify-css', ['stylus'], function() {
  return gulp.src(paths.pathStylus + '.css')
    .pipe(cleanCSS({compatibility: '*', debug: true}, function(details) {
      console.log(details.name + ': The file was reduced from ' + details.stats.originalSize + ' bytes to ' + details.stats.minifiedSize + ' bytes. This means ' + Math.round(details.stats.efficiency * 100) + '% reduction in size!');
    }))
    .pipe(rename({ basename: 'style', extname: '.min.css' }))
    .pipe(gulp.dest('public/stylesheets'));
    //.pipe(livereload());
});

/////////////////////////////////////////////////////////////
// UGLIFY JS
/////////////////////////////////////////////////////////////

gulp.task('uglify', function() {
  return gulp.src(paths.pathJsUglify)
    .pipe(uglify({ output: {quote_style: 1} }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('public/javascripts'));
    //.pipe(livereload());
});

/////////////////////////////////////////////////////////////
// FILES
/////////////////////////////////////////////////////////////

gulp.task('files', function() {
  return gulp.src(paths.pathFiles);
    //.pipe(livereload());
});

/////////////////////////////////////////////////////////////
// WATCH
// Rerun the task when a file changes
/////////////////////////////////////////////////////////////

/*gulp.task('watch', function() { // Rerun the task when a file changes
  //livereload.listen();
  //gulp.watch(paths.pathServer, ['start']).on('change', livereload.changed);
  gulp.watch(paths.pathServer, ['start']).on('change', server.notify);
  gulp.watch(paths.pathCSS, ['stylus', 'minify-css']).on('change', server.notify);
  gulp.watch(paths.pathJsUglify, ['uglify']).on('change', server.notify);
  gulp.watch(paths.pathFiles, ['files']).on('change', server.notify);
});*/

gulp.task('watch', function() {
  gulp.watch(paths.pathServer, ['start']).on('change', server.start.bind(server));
  gulp.watch(paths.pathCSS, ['stylus', 'minify-css']).on('change', server.notify.bind(server));
  gulp.watch(paths.pathJsUglify, ['uglify']).on('change', server.notify.bind(server));
  gulp.watch(paths.pathFiles, ['files']).on('change', server.notify.bind(server));
});

/////////////////////////////////////////////////////////////
// EXECUTE GULP
/////////////////////////////////////////////////////////////

gulp.task('default', ['start', 'stylus', 'minify-css', 'uglify', 'files', 'watch']);
