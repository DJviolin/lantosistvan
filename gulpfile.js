'use strict';

const gulp = require('gulp');
const gls = require('gulp-live-server');
const rename = require('gulp-rename');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const download = require('gulp-download');
const replace = require('gulp-replace');

const paths = {
  styles: {
    stylus: 'app/public/stylesheets/src/main.styl',
    css: 'app/public/stylesheets/src/main.css',
  },
  app: [
    'app/app.js',
    'app/sockets.js',
    'app/bin/www',
    'app/routes/**/*.js',
    'app/lib/**/*.js',
    'app/config/**/*.js',
  ],
  uglify: [
    'app/public/javascripts/src/main-vanilla.js',
    'app/public/javascripts/src/ajax-vanilla.js',
    'app/public/javascripts/src/main-jquery.js',
    'app/public/javascripts/src/slick.js',
  ],
  vendor: [
    'https://raw.githubusercontent.com/jquery/jquery-dist/master/dist/jquery.min.js',
    'https://raw.githubusercontent.com/kenwheeler/slick/master/slick/slick.js',
  ],
  files: [
    'app/views/*.hbs',
    'app/views/**/*.hbs',
    'app/database/data.json',
    'app/locales/*.json',
  ],
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////////////////////////////////////////////////////////

const server = gls.new([
  //'--trace-deprecation', '--trace-sync-io', '--ignition', 'index',
  '--trace-deprecation', '--ignition', 'app/index',
  //{ env: { NODE_ENV: 'production' } }
]);

//you can access cwd args in `bin/www` via `process.argv`
gulp.task('start', () => server.start());

////////////////////////////////////////////////////////////////////////////////////////////////////
// CSS
////////////////////////////////////////////////////////////////////////////////////////////////////

// Stylus
gulp.task('stylus', () =>
  gulp.src(paths.styles.stylus)
    .pipe(stylus({ 'include css': true, compress: false }))
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('app/public/stylesheets/src'))
);

// MINIFY CSS
// http://goalsmashers.github.io/css-minification-benchmark/
gulp.task('minify-css', () =>
  gulp.src(paths.styles.css)
    .pipe(cleanCSS({ compatibility: '*', debug: true }, details =>
      console.log('%s: The file was reduced from %s bytes to %s bytes. This means %s% reduction in size!',
        details.name,
        details.stats.originalSize,
        details.stats.minifiedSize,
        Math.round(details.stats.efficiency * 100)
      )
    ))
    .pipe(rename({ basename: 'style', extname: '.min.css' }))
    .pipe(gulp.dest('app/public/stylesheets'))
);

gulp.task('css', gulp.series('stylus', 'minify-css'));

////////////////////////////////////////////////////////////////////////////////////////////////////
// CLIENT LIBRARIES
////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('vendor', () =>
  download(paths.vendor)
    .pipe(gulp.dest('app/public/vendor'))
);

gulp.task('slick', () =>
  gulp.src(['app/public/vendor/slick.js'])
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
    .pipe(uglify({ output: { quote_style: 1 } }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('app/public/vendor'))
);

gulp.task('vendors', gulp.series('vendor', 'slick'));

////////////////////////////////////////////////////////////////////////////////////////////////////
// UGLIFY JS
////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('uglify', () =>
  gulp.src(paths.uglify)
    .pipe(uglify({ output: { quote_style: 1 } }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('app/public/javascripts'))
);

////////////////////////////////////////////////////////////////////////////////////////////////////
// FILES
////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('files', () => gulp.src(paths.files));

////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT: APP
////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('app', gulp.parallel('start', 'css', 'uglify', 'files'));

////////////////////////////////////////////////////////////////////////////////////////////////////
// WATCH: Rerun the task when a file changes
////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('watch:start', () =>
  // server.start OR server.notify
  gulp.watch(paths.app, gulp.series('start'), file => server.notify.apply(server, [file]))
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

////////////////////////////////////////////////////////////////////////////////////////////////////
// EXECUTE GULP
////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('default', gulp.parallel('app', 'watch'));
