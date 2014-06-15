var gulp = require('gulp');
var traceur = require('gulp-traceur');
var traceurOptions = require('./config').traceur;
var connect = require('gulp-connect');
var rimraf = require('rimraf');

var path = {
  src: './src/**/*.js'
};

// clean the output directory
gulp.task('clean', function(cb){
    rimraf('compiled/src', cb);
});

// TRANSPILE ES6
gulp.task('build', ['clean'], function() {
  gulp.src(path.src)
      .pipe(traceur(traceurOptions))
      .pipe(gulp.dest('compiled/src'));
});

// WATCH FILES FOR CHANGES
gulp.task('watch', function() {
  gulp.watch(path.src, ['build']);
});

// WEB SERVER
gulp.task('serve', connect.server({
  root: [__dirname],
  port: 8000,
  open: true,
  livereload: false
}));
