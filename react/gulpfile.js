//'use strict';

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

const gulp = require('gulp');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const paths = {
  src: [
    'src/**/*.jsx',
  ],
};

/////////////////////////////////////////////////////////////
// CSS
/////////////////////////////////////////////////////////////

// Concat
gulp.task('concat', () =>
  gulp.src('./src/*.css')
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./dist/css'))
);

// MINIFY CSS
// http://goalsmashers.github.io/css-minification-benchmark/
gulp.task('minify-css', () =>
  gulp.src('./dist/css/bundle.css')
    // Arrow functions: 'concise body' vs 'block body'
    .pipe(cleanCSS({ compatibility: '*', debug: true }, details =>
      console.log('%s: The file was reduced from %s bytes to %s bytes. This means %s% reduction in size!',
        details.name,
        details.stats.originalSize,
        details.stats.minifiedSize,
        Math.round(details.stats.efficiency * 100)
      )
    ))
    .pipe(rename({ /*basename: 'style',*/ extname: '.min.css' }))
    .pipe(gulp.dest('./dist/css'))
);

gulp.task('css', gulp.series('concat', 'minify-css'));

/////////////////////////////////////////////////////////////
// JS
/////////////////////////////////////////////////////////////

// Webpack
gulp.task('webpack', () =>
  gulp.src('./entry.js')
    //.pipe(babel({ presets: ['es2015', 'react'] })) // Also inserting Strict mode
    .pipe(webpack(webpackConfig))
    /*.pipe(webpack({
      debug: true,
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },
      entry: './src/index.jsx',
      output: {
        filename: 'bundle.js',
      },
    }))*/
    .pipe(gulp.dest('./dist/js'))
);

// UGLIFY JS
gulp.task('uglify', () =>
  gulp.src('./dist/js/bundle.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/js'))
);

gulp.task('js', gulp.series('webpack', 'uglify'));

/////////////////////////////////////////////////////////////
// INIT: APP
/////////////////////////////////////////////////////////////

gulp.task('app', gulp.parallel('css', 'js'));

/////////////////////////////////////////////////////////////
// WATCH
/////////////////////////////////////////////////////////////

gulp.task('watch:webpack', () =>
  gulp.watch(paths.src, gulp.series('webpack'))
);

//gulp.task('watch', gulp.parallel('watch:webpack'));

/////////////////////////////////////////////////////////////
// EXECUTE GULP
/////////////////////////////////////////////////////////////

//gulp.task('default', gulp.parallel('app', 'watch'));
//gulp.task('default', gulp.parallel('webpack', 'watch:webpack'));
gulp.task('default', gulp.parallel('app'));
