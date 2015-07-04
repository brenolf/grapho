var gulp        = require('gulp'),
    babelify    = require('babelify'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    bufferify   = require('vinyl-buffer'),
    jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    jscs        = require('gulp-jscs-custom'),
    mocha       = require('gulp-mocha');

gulp.task ('default', ['code-style', 'code-lint', 'test']);

gulp.task('test', ['code-style', 'code-lint'], function () {
    require('babel/register');

    return gulp
    .src('./test/*.js', {read: false})
    .pipe(mocha({reporter: 'dot'}));
});

gulp.task ('code-style', function () {
  return gulp
  .src('./src/**/*')
  .pipe(jscs({esnext: true}));
});

gulp.task ('code-lint', function () {
  return gulp
  .src('./src/**/*')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
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
