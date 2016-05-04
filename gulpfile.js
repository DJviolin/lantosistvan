'use strict';
// ES6: "use strict" is unnecessary inside of modules.

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

// ES5
const gulp     = require('gulp'),
      gls      = require('gulp-live-server'),
      rename   = require('gulp-rename'),
      stylus   = require('gulp-stylus'),
      cleanCSS = require('gulp-clean-css'),
      uglify   = require('gulp-uglify');

// ES6
// Modules will be supported from Node v7
// https://github.com/nodejs/help/issues/53
/*
import gulp     from 'gulp';
import gls      from 'gulp-live-server';
import rename   from 'gulp-rename';
import stylus   from 'gulp-stylus';
import cleanCSS from 'gulp-clean-css';
import uglify   from 'gulp-uglify';
*/

const paths = {
  pathStylus:   ['public/stylesheets/src/main'],
  pathCSS:      ['public/stylesheets/src/**/*'],
  pathServer:   ['app.js',
                 'bin/www',
                 'routes/**/*.js',
                 'lib/**/*.js',
                 'config.js'],
  pathJsUglify: ['public/javascripts/src/main-vanilla.js',
                 'public/javascripts/src/main-jquery.js',
                 'public/javascripts/src/slick.js'],
  pathFiles:    ['views/*.hbs', 'views/**/*.hbs',
                 'database/data.json',
                 'locales/*.json']
};

/////////////////////////////////////////////////////////////
// SERVER
/////////////////////////////////////////////////////////////

// this will achieve `node --trace-deprecation --trace-sync-io ./bin/www`
const server = gls.new([
  '--trace-deprecation', '--trace-sync-io', 'bin/www',
  { env: { NODE_ENV: 'production' } }
]);

//you can access cwd args in `bin/www` via `process.argv` 
gulp.task('start', () => server.start());

/////////////////////////////////////////////////////////////
// STYLUS CSS
/////////////////////////////////////////////////////////////

gulp.task('stylus', () => {
  gulp.src(paths.pathStylus + '.styl')
    .pipe(stylus({'include css': true, compress: false}))
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('public/stylesheets/src'));
});

/////////////////////////////////////////////////////////////
// MINIFY CSS
/////////////////////////////////////////////////////////////

gulp.task('minify-css', ['stylus'], () => {
  gulp.src(paths.pathStylus + '.css')
    .pipe(cleanCSS({compatibility: '*', debug: true}, (details) => {
      console.log(
        details.name +
        ': The file was reduced from ' +
        details.stats.originalSize +
        ' bytes to ' +
        details.stats.minifiedSize +
        ' bytes. This means ' +
        Math.round(details.stats.efficiency * 100) +
        '% reduction in size!'
      );
    }))
    .pipe(rename({ basename: 'style', extname: '.min.css' }))
    .pipe(gulp.dest('public/stylesheets'));
});

/////////////////////////////////////////////////////////////
// UGLIFY JS
/////////////////////////////////////////////////////////////

gulp.task('uglify', () => {
  gulp.src(paths.pathJsUglify)
    .pipe(uglify({ output: {quote_style: 1} }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('public/javascripts'));
});

/////////////////////////////////////////////////////////////
// FILES
/////////////////////////////////////////////////////////////

gulp.task('files', () => gulp.src(paths.pathFiles));

/////////////////////////////////////////////////////////////
// WATCH
// Rerun the task when a file changes
/////////////////////////////////////////////////////////////

gulp.task('watch', () => {
  gulp.watch(paths.pathServer, ['start']).on('change', server.notify.bind(server));
  gulp.watch(paths.pathCSS, ['stylus', 'minify-css']).on('change', server.notify.bind(server));
  gulp.watch(paths.pathJsUglify, ['uglify']).on('change', server.notify.bind(server));
  gulp.watch(paths.pathFiles, ['files']).on('change', server.notify.bind(server));
});

/////////////////////////////////////////////////////////////
// EXECUTE GULP
/////////////////////////////////////////////////////////////

gulp.task('default', ['start', 'stylus', 'minify-css', 'uglify', 'files', 'watch']);
