'use strict';
// ES6: 'use strict' is unnecessary inside of modules.
// http://node.green
// http://es6-features.org/#ExpressionBodies
// http://es6-features.org/#DefaultParameterValues
// http://es6-features.org/#StringInterpolation
// http://es6-features.org/#CustomInterpolation
// http://es6-features.org/#PropertyShorthand
// http://es6-features.org/#ValueExportImport

// https://gist.github.com/demisx/beef93591edc1521330a
// http://stackoverflow.com/questions/32475614/gulp-4-gulpfile-js-set-up
// https://gist.github.com/CodeTheory/cc7d79d1dad0622a9f9c
// https://blog.wearewizards.io/migrating-to-gulp-4-by-example
// https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

// ES5
const gulp     = require('gulp'),
      gls      = require('gulp-live-server'),
      rename   = require('gulp-rename'),
      stylus   = require('gulp-stylus'),
      cleanCSS = require('gulp-clean-css'),
      uglify   = require('gulp-uglify'),
      download = require('gulp-download'),
      replace  = require('gulp-replace');

/*// ES6
// Modules will be supported from Node v7
// https://github.com/nodejs/help/issues/53
import gulp from 'gulp';
//import {src, dest, watch, parallel, series} from 'gulp';
import gls from 'gulp-live-server';
import rename from 'gulp-rename';
import stylus from 'gulp-stylus';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import download from 'gulp-download';
import replace from 'gulp-replace';*/

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
  vendor: [
    'https://raw.githubusercontent.com/jquery/jquery-dist/master/dist/jquery.min.js',
    'https://raw.githubusercontent.com/kenwheeler/slick/master/slick/slick.js'
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

const server = gls.new([
  // https://github.com/nodejs/CTC/issues/7#issuecomment-229588116
  // https://github.com/targos/node/tree/v8-5.2
  '--trace-deprecation', '--trace-sync-io', '--ignition', 'index',
  //{ env: { NODE_ENV: 'production' } }
]);

//you can access cwd args in `bin/www` via `process.argv`
gulp.task('start', () => server.start());

/////////////////////////////////////////////////////////////
// CSS
/////////////////////////////////////////////////////////////

// Stylus
gulp.task('stylus', () =>
  gulp.src(paths.styles.stylus)
    .pipe(stylus({'include css': true, compress: false}))
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('public/stylesheets/src'))
);

// MINIFY CSS
// http://goalsmashers.github.io/css-minification-benchmark/
gulp.task('minify-css', () =>
  gulp.src(paths.styles.css)
    // Arrow functions: 'concise body' vs 'block body'
    .pipe(cleanCSS({compatibility: '*', debug: true}, details =>
      console.log('%s: The file was reduced from %s bytes to %s bytes. This means %s% reduction in size!',
        details.name,
        details.stats.originalSize,
        details.stats.minifiedSize,
        Math.round(details.stats.efficiency * 100)
      )
    ))
    .pipe(rename({ basename: 'style', extname: '.min.css' }))
    .pipe(gulp.dest('public/stylesheets'))
);

gulp.task('css', gulp.series('stylus', 'minify-css'));

/////////////////////////////////////////////////////////////
// CLIENT LIBRARIES
/////////////////////////////////////////////////////////////

/*gulp.task('vendor', () => {
  for (let i=0; i<paths.vendor.length; i++) {
    return console.log(paths.vendor[i]);
  };
});*/

/*gulp.task('vendor', (res) => {
  const url = request.get(paths.vendor[index++]).pipe(res);
  const str = JSON.stringify(url, null, 4);
  return console.log('%s', str);
  //return gulp.src(url)
  //  .pipe(gulp.dest('public/vendor'));
});*/

gulp.task('vendor', () =>
  download(paths.vendor)
    .pipe(gulp.dest('public/vendor'))
);

gulp.task('slick', () =>
  gulp.src(['public/vendor/slick.js'])
    .pipe(replace(
      /animProps\[_\.animType\] = 'translate3d\(' \+ targetLeft \+ 'px, 0px, 0px\)';/igm,
      'animProps[_.animType] = \'translate(\' + targetLeft + \'px, 0px)\'; // FIX BY LANTI'
    ))
    .pipe(replace(
      /animProps\[_\.animType\] = 'translate3d\(0px,' \+ targetLeft \+ 'px, 0px\)';/igm,
      'animProps[_.animType] = \'translate(0px,\' + targetLeft + \'px)\'; // FIX BY LANTI'
    ))
    .pipe(replace(
      /positionProps\[_\.animType\] = 'translate3d\(' \+ x \+ ', ' \+ y \+ ', 0px\)';/igm,
      'positionProps[_.animType] = \'translate(\' + x + \', \' + y + \')\'; // FIX BY LANTI'
    ))
    .pipe(replace(/mozHidden/igm, 'hidden'))
    .pipe(replace(/mozVisibilityState/igm, 'visibilityState'))
    .pipe(uglify({ output: {quote_style: 1} }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('public/vendor'))
);

gulp.task('vendors', gulp.series('vendor', 'slick'));

/////////////////////////////////////////////////////////////
// UGLIFY JS
/////////////////////////////////////////////////////////////

gulp.task('uglify', () =>
  gulp.src(paths.uglify)
    .pipe(uglify({ output: {quote_style: 1} }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('public/javascripts'))
);

/////////////////////////////////////////////////////////////
// FILES
/////////////////////////////////////////////////////////////

gulp.task('files', () => gulp.src(paths.files));

/////////////////////////////////////////////////////////////
// INIT: APP
/////////////////////////////////////////////////////////////

gulp.task('app', gulp.parallel('start', 'css', 'uglify', 'files'));

/////////////////////////////////////////////////////////////
// WATCH
// Rerun the task when a file changes
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body
// var func = x => x * x;                  // concise syntax, implied "return"
// var func = (x, y) => { return x + y; }; // with block body, explicit "return" needed
/////////////////////////////////////////////////////////////

gulp.task('watch:start', () =>
  gulp.watch(paths.app, gulp.series('start'), file => server.notify.apply(server, [file])) // server.start
);

gulp.task('watch:stylus', () =>
  gulp.watch(paths.styles.stylus, gulp.series('stylus'), server.notify)
);

gulp.task('watch:css', () =>
  gulp.watch(paths.styles.css, gulp.series('minify-css'), server.notify)
);

gulp.task('watch:uglify', () =>
  gulp.watch(paths.uglify, gulp.series('uglify'), server.notify)
);

gulp.task('watch:files', () =>
  gulp.watch(paths.files, gulp.series('files'), server.notify)
);

gulp.task('watch', gulp.parallel('watch:start', 'watch:stylus', 'watch:css', 'watch:uglify', 'watch:files'));

/////////////////////////////////////////////////////////////
// EXECUTE GULP
/////////////////////////////////////////////////////////////

gulp.task('default', gulp.parallel('app', 'watch'));
