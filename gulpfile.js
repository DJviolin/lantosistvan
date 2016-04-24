'use strict';

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

const gulp       = require('gulp'),
      //shell      = require('gulp-shell'),
      cleanCSS   = require('gulp-clean-css'),
      rename     = require('gulp-rename'),
      //livereload = require('gulp-livereload'),
      server     = require('gulp-express'),
      uglify     = require('gulp-uglify');

const paths = {
  pathCleanCSS:  ['public/stylesheets/style.css'],
  pathServer:    ['app.js', 'bin/www', 'routes/**/*.js', 'lib/**/*.js', 'config.js'],
  pathJsUglify:  ['public/javascripts/main-vanilla.js', 'public/javascripts/main-jquery.js'],
  pathFiles:     ['views/*.hbs', 'views/**/*.hbs', 'database/data.json', 'locales/*.json']
};

/////////////////////////////////////////////////////////////
// SERVER
/////////////////////////////////////////////////////////////

/*gulp.task('start', shell.task([
  'node --trace-deprecation --trace-sync-io ./bin/www'
]));*/

gulp.task('start', function () {
  /*return gulp.src(paths.pathServer)
    .pipe(shell([
      'node --trace-deprecation --trace-sync-io ./bin/www'
    ]));*/
  server.run(['bin/www']);
})

/////////////////////////////////////////////////////////////
// MINIFY CSS
/////////////////////////////////////////////////////////////

gulp.task('minify-css', function() {
  return gulp.src(paths.pathCleanCSS)
    .pipe(cleanCSS({compatibility: '*', debug: true}, function(details) {
      console.log(details.name + ': The file was reduced from ' + details.stats.originalSize + ' bytes to ' + details.stats.minifiedSize + ' bytes. This means ' + Math.round(details.stats.efficiency * 100) + '% reduction in size!');
    }))
    .pipe(rename({ extname: '.min.css' }))
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
/////////////////////////////////////////////////////////////

gulp.task('watch', function() { // Rerun the task when a file changes
  //livereload.listen();
  //gulp.watch(paths.pathServer, ['start']).on('change', livereload.changed);
  gulp.watch(paths.pathServer, ['start']).on('change', server.notify);
  gulp.watch(paths.pathCleanCSS, ['minify-css']).on('change', server.notify);
  gulp.watch(paths.pathJsUglify, ['uglify']).on('change', server.notify);
  gulp.watch(paths.pathFiles, ['files']).on('change', server.notify);
});

/////////////////////////////////////////////////////////////
// EXECUTE GULP
/////////////////////////////////////////////////////////////

gulp.task('default', ['start', 'minify-css', 'uglify', 'files', 'watch']);




/////////////////////////////////////////////////////////////
// STYLUS CSS
/////////////////////////////////////////////////////////////

/*gulp.task('stylus', function () {
  return gulp.src(paths.pathCssStylusGlobal)
    .pipe(stylus({'include css': true, compress: false}))
    .pipe(rename({ ext: 'css' }))
    .pipe(gulp.dest('dev/css/build'));
});*/

/////////////////////////////////////////////////////////////
// COPY FROM DEV TO DIST FOLDER WITH 'GULP MOVE' COMMAND
/////////////////////////////////////////////////////////////

/*var filesToMove = [
  'dev/css/*.*',
  'dev/js/*.*',
  'dev/js/vendor/*.*',
  'dev/*.*',
  'dev/.htaccess'
];

gulp.task('move', ['stylus', 'minify', 'uglify', 'replace', 'htmlphp'], function(){
  return gulp.src(filesToMove, { base: './dev' }) // 'base' sets the relative root for the files
  .pipe(gulp.dest('./dist'));
});*/