//'use strict';

/////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES
/////////////////////////////////////////////////////////////

const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');

const paths = {
  src: [
    'src/**/*.jsx',
  ],
};

/////////////////////////////////////////////////////////////
// WEBPACK
/////////////////////////////////////////////////////////////

gulp.task('webpack', () =>
  gulp.src('src/index.jsx')
    .pipe(babel({ presets: ['es2015'] })) // Also inserting Strict mode
    //.pipe(webpack())
    .pipe(gulp.dest('dist'))
);

/////////////////////////////////////////////////////////////
// INIT: APP
/////////////////////////////////////////////////////////////

//gulp.task('app', gulp.parallel('webpack'));

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
gulp.task('default', gulp.parallel('webpack', 'watch:webpack'));
