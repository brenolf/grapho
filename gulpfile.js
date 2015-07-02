var gulp        = require('gulp'),
    babelify    = require('babelify'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    bufferify   = require('vinyl-buffer'),
    jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    jscs        = require('gulp-jscs-custom'),
    mocha       = require('gulp-mocha');

gulp.task ('default', ['code-check', 'test']);

gulp.task ('watch', ['static'], function () {
    gulp.watch('./src/js/**/*', ['scripts']);
});

gulp.task('test', ['code-check'], function () {
    require('babel/register');

    return gulp
    .src('./test/**/*', {read: false})
    .pipe(mocha({reporter: 'dot'}));
});

gulp.task ('code-check', function () {
  return gulp
  .src('./src/js/**/*')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jscs({esnext: true}));
});

gulp.task ('build', function () {
    browserify({
        entries: './src/grapho.js',
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('grapho.min.js'))
    .pipe(bufferify())
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});
