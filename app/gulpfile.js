'use strict';
// ES6: "use strict" is unnecessary inside of modules.

// https://gist.github.com/demisx/beef93591edc1521330a
// http://stackoverflow.com/questions/32475614/gulp-4-gulpfile-js-set-up
// https://gist.github.com/CodeTheory/cc7d79d1dad0622a9f9c

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

// ES5
const gulp       = require('gulp'),
      gls        = require('gulp-live-server'),
      rename     = require('gulp-rename'),
      stylus     = require('gulp-stylus'),
      cleanCSS   = require('gulp-clean-css'),
      uglify     = require('gulp-uglify');

// ES6
// Modules will be supported from Node v7
// https://github.com/nodejs/help/issues/53
/*//import gulp     from 'gulp';
import { src, dest, watch, parallel, series } from 'gulp';
import gls      from 'gulp-live-server';
import rename   from 'gulp-rename';
import stylus   from 'gulp-stylus';
import cleanCSS from 'gulp-clean-css';
import uglify   from 'gulp-uglify';*/

const paths = {
  styles: {
    stylus: 'public/stylesheets/src/main.styl',
    css: 'public/stylesheets/src/main.css'
  },
  app: [
    'app.js',
    'sockets.js',
    'bin/www',
    'routes/**/*.js',
    'lib/**/*.js',
    'config/**/*.js'
  ],
  uglify: [
    'public/javascripts/src/main-vanilla.js',
    'public/javascripts/src/ajax-vanilla.js',
    'public/javascripts/src/main-jquery.js',
    'public/javascripts/src/slick.js'
  ],
  files: [
    'views/*.hbs',
    'views/**/*.hbs',
    'database/data.json',
    'locales/*.json'
  ]
};

/////////////////////////////////////////////////////////////
// SERVER
/////////////////////////////////////////////////////////////

// this will achieve `node --trace-deprecation --trace-sync-io ./bin/www`
const server = gls.new([
  '--trace-deprecation', '--trace-sync-io', 'bin/www',
  //'--trace-deprecation', 'bin/www',
  //{ env: { NODE_ENV: 'production' } }
]);

//you can access cwd args in `bin/www` via `process.argv`
gulp.task('start', () => {
  return server.start();
});

/////////////////////////////////////////////////////////////
// CSS
/////////////////////////////////////////////////////////////

// Stylus
gulp.task('stylus', () => {
  return gulp.src(paths.styles.stylus)
    .pipe(stylus({'include css': true, compress: false}))
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('public/stylesheets/src'));
});

// MINIFY CSS
// http://goalsmashers.github.io/css-minification-benchmark/
//gulp.task('minify-css', ['stylus'], () => {
gulp.task('minify-css', () => {
  return gulp.src(paths.styles.css)
    .pipe(cleanCSS({compatibility: '*', debug: true}, (details) => {
      console.log('%s: The file was reduced from %s bytes to %s bytes. This means %s% reduction in size!',
        details.name,
        details.stats.originalSize,
        details.stats.minifiedSize,
        Math.round(details.stats.efficiency * 100)
      );
    }))
    .pipe(rename({ basename: 'style', extname: '.min.css' }))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('css', gulp.series('stylus', 'minify-css'));

/////////////////////////////////////////////////////////////
// UGLIFY JS
/////////////////////////////////////////////////////////////

gulp.task('uglify', () => {
  return gulp.src(paths.uglify)
    .pipe(uglify({ output: {quote_style: 1} }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('public/javascripts'));
});

/////////////////////////////////////////////////////////////
// FILES
/////////////////////////////////////////////////////////////

gulp.task('files', () => {
  return gulp.src(paths.files);
});

/////////////////////////////////////////////////////////////
// INIT: APP
/////////////////////////////////////////////////////////////

gulp.task('app', gulp.parallel('start', 'css', 'uglify', 'files'));

/////////////////////////////////////////////////////////////
// WATCH
// Rerun the task when a file changes
/////////////////////////////////////////////////////////////

gulp.task('watch:start', () => {
  //gulp.watch(paths.app, gulp.series('start'), server.start); // restart my server
  gulp.watch(paths.app, gulp.series('start'), (file) => {
    server.notify.apply(server, [file]);
  });
});

gulp.task('watch:stylus', () => {
  gulp.watch(paths.styles.stylus, gulp.series('stylus'), server.notify);
});

gulp.task('watch:css', () => {
  gulp.watch(paths.styles.css, gulp.series('minify-css'), server.notify);
});

gulp.task('watch:uglify', () => {
  gulp.watch(paths.uglify, gulp.series('uglify'), server.notify);
});

gulp.task('watch:files', () => {
  gulp.watch(paths.files, gulp.series('files'), server.notify);
});

gulp.task('watch', gulp.parallel('watch:start', 'watch:stylus', 'watch:css', 'watch:uglify', 'watch:files'));

/////////////////////////////////////////////////////////////
// EXECUTE GULP
/////////////////////////////////////////////////////////////

//gulp.task('default', ['watch', 'start', 'minify-css', 'uglify', 'files']);
gulp.task('default', gulp.parallel('app', 'watch'));
