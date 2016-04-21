'use strict';

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

const gulp       = require('gulp'),
      shell      = require('gulp-shell'),
      cleanCSS   = require('gulp-clean-css'),
      rename     = require('gulp-rename'),
      livereload = require('gulp-livereload');
      //server     = require('gulp-express')
      //stylus     = require('gulp-stylus')
      //uglify     = require('gulp-uglify')
      //replace    = require('gulp-replace')

const paths = {
  pathCleanCSS: ['public/stylesheets/style.css'],
  pathJsUglify:        ['dev/js/src/plugins.js', 'dev/js/src/main.js'],
  pathJsReplace:       ['dev/js/plugins.min.js', 'dev/js/main.min.js'],
  pathHtmlPhp:         ['dev/*.html', 'dev/*.php', 'dev/public/*.html', 'dev/public/*.php'],
  pathMinified:        ['dev/css/*.css', 'dev/js/*.js', 'dev/js/vendor/*.js'],
  pathImages:          'dev/images/**/*'
};

/////////////////////////////////////////////////////////////
// SERVER
/////////////////////////////////////////////////////////////

gulp.task('start', shell.task([
  'node --trace-deprecation --trace-sync-io ./bin/www'
]));

/////////////////////////////////////////////////////////////
// MINIFY CSS
/////////////////////////////////////////////////////////////

gulp.task('minify-css', function() {
  return gulp.src(paths.pathCleanCSS)
    .pipe(cleanCSS({compatibility: '*', debug: true}, function(details) {
      console.log(details.name + ': The file was reduced from ' + details.stats.originalSize + ' bytes to ' + details.stats.minifiedSize + ' bytes. This means ' + Math.round(details.stats.efficiency * 100) + '% reduction in size!');
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(livereload());
});

/////////////////////////////////////////////////////////////
// GULP-EXPRESS
/////////////////////////////////////////////////////////////

gulp.task('server', function () {
  // Start the server at the beginning of the task 
  //server.run(['./bin/www']);
  console.log('Gulp task \'server\' started...');

  // Restart the server when file changes 
  //gulp.watch(['app/**/*.html'], server.notify);
  //gulp.watch(['app/styles/**/*.scss'], ['styles:scss']);
  //gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]); 
  //Event object won't pass down to gulp.watch's callback if there's more than one of them. 
  //So the correct way to use server.notify is as following: 
  //gulp.watch(['{.tmp,app}/styles/**/*.css'], function(event){
  //  gulp.run('styles:css');
  //  server.notify(event);
    //pipe support is added for server.notify since v0.1.5, 
    //see https://github.com/gimm/gulp-express#servernotifyevent 
  //});

  //gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  //gulp.watch(['app/images/**/*'], server.notify);
  //gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
});

/////////////////////////////////////////////////////////////
// WATCH
/////////////////////////////////////////////////////////////

gulp.task('watch', function() { // Rerun the task when a file changes
  livereload.listen();
  gulp.watch(paths.pathCleanCSS, ['minify-css']).on('change', livereload.changed);
});

/////////////////////////////////////////////////////////////
// EXECUTE GULP
/////////////////////////////////////////////////////////////

gulp.task('default', ['start', 'minify-css', 'server', 'watch']);

















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

/*gulp.task('minify', ['stylus'], function() {
  return gulp.src(paths.pathCssMinifyGlobal)
    .pipe(minifyCSS({keepBreaks: false, keepSpecialComments: '*'}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dev/css'));
});*/

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

/*gulp.task('watch', function() { // Rerun the task when a file changes
  livereload.listen();
  gulp.watch(paths.pathCssStylusGlobal, ['stylus']).on('change', livereload.changed);
  gulp.watch(paths.pathCssMinifyGlobal, ['minify']).on('change', livereload.changed);
  gulp.watch(paths.pathJsUglify, ['uglify']).on('change', livereload.changed);
  gulp.watch(paths.pathJsReplace, ['replace']).on('change', livereload.changed);
  gulp.watch(paths.pathHtmlPhp, ['htmlphp']).on('change', livereload.changed);
  gulp.watch(paths.pathMinified, ['stylus', 'minify', 'uglify', 'replace', 'htmlphp']).on('change', livereload.changed);
});*/

/////////////////////////////////////////////////////////////
// EXECUTE GULP
/////////////////////////////////////////////////////////////

//gulp.task('default', ['connect', 'watch']);
