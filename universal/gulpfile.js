//'use strict';

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

const gulp = require('gulp');
const gutil = require('gulp-util');
//const webpack = require('webpack');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
//const concat = require('gulp-concat');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');

const paths = {
  css: [
    './client/css/src/**/*.styl',
  ],
  images: [
    './client/images/**/*',
  ],
  js: [
    './shared/**/*.js',
  ],
};

/////////////////////////////////////////////////////////////
// CSS
/////////////////////////////////////////////////////////////

// Stylus
gulp.task('stylus', () =>
  gulp.src('./client/css/src/main.styl')
    .pipe(stylus({ 'include css': true, compress: false }))
    .pipe(rename({ basename: 'bundle', extname: '.css' }))
    .pipe(gulp.dest('./client/css'))
);

// Concat
/*gulp.task('concat', () =>
  gulp.src(paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./dist/css'))
);*/

// MINIFY CSS
// http://goalsmashers.github.io/css-minification-benchmark/
gulp.task('minify-css', () =>
  gulp.src('./client/css/bundle.css')
    // Arrow functions: 'concise body' vs 'block body'
    .pipe(cleanCSS({ compatibility: '*', debug: true }, details =>
      console.log('%s: The file was reduced from %s bytes to %s bytes. This means %s% reduction in size!',
        details.name,
        details.stats.originalSize,
        details.stats.minifiedSize,
        Math.round(details.stats.efficiency * 100)
      )
    ))
    .pipe(rename({ /*basename: 'bundle',*/ extname: '.min.css' }))
    .pipe(gulp.dest('./client/css'))
);

gulp.task('css', gulp.series('stylus', 'minify-css'));

/////////////////////////////////////////////////////////////
// IMAGES
/////////////////////////////////////////////////////////////

/*gulp.task('images', () =>
  gulp.src(paths.images)
    .pipe(gulp.dest('./client/images'))
);*/

/////////////////////////////////////////////////////////////
// JS
/////////////////////////////////////////////////////////////

// Webpack
gulp.task('webpack', () =>
  gulp.src('./shared/entry.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./client'))
);

/*gulp.task('webpack', (callback) => {
  // run webpack
  webpack({
    // configuration
    webpackConfig,
  }, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      // output options
    }));
    callback();
  });
});*/

// Uglify
/*gulp.task('uglify', () =>
  gulp.src('./client/js/bundle.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./client/js'))
);*/

//gulp.task('js', gulp.series('webpack', 'uglify'));
gulp.task('js', gulp.series('webpack'));

/////////////////////////////////////////////////////////////
// INIT: APP
/////////////////////////////////////////////////////////////

gulp.task('app', gulp.parallel('css', /*'images', */'js'));

/////////////////////////////////////////////////////////////
// WATCH
/////////////////////////////////////////////////////////////

gulp.task('watch:css', () =>
  gulp.watch(paths.css, gulp.series('css'))
);

/*gulp.task('watch:images', () =>
  gulp.watch(paths.images, gulp.series('images'))
);*/

gulp.task('watch:js', () =>
  gulp.watch(paths.js, gulp.series('js'))
);

gulp.task('watch', gulp.parallel('watch:css', /*'watch:images', */'watch:js'));

/////////////////////////////////////////////////////////////
// EXECUTE GULP
/////////////////////////////////////////////////////////////

//gulp.task('default', gulp.parallel('app', 'watch'));
//gulp.task('default', gulp.parallel('webpack', 'watch:webpack'));
gulp.task('default', gulp.parallel('app', 'watch'));
