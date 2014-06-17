var gulp = require('gulp');
var traceur = require('gulp-traceur');
var traceurOptions = require('./config').traceur;
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var requirejs   = require('requirejs');
var rename = require("gulp-rename");
var es = require('event-stream');
var shell = require('gulp-shell')

gulp.task('clean', function(callback){
    es.concat(
        gulp.src('./transpiled/**/*.*')
            .pipe(clean()),
        gulp.src('./dist/**/*.*')
            .pipe(clean())
    ).on('end', callback);
});

gulp.task('transpile', ['clean'], function(callback) {

  es.concat(
      gulp.src(['src/**/*.js', '!src/runtime-config.js'])
          .pipe(traceur(traceurOptions))
          .pipe(gulp.dest('transpiled')),
      gulp.src('src/runtime-config.js')
          .pipe(gulp.dest('transpiled'))
  ).on('end', callback);

    //shell.task([
    //    'node_modules/traceur/traceur --script src/main.js --out transpiled/transpiled-with-source-maps.js --sourcemap'
    //]);

});

gulp.task('concatenate', ['transpile'], function() {
    requirejs.optimize({
        baseUrl : 'transpiled',
        mainConfigFile : 'transpiled/runtime-config.js',
        out : 'dist/build.js',
        include: ['traceur', 'runtime-config'],
        findNestedDependencies: true,
        wrap: true,
        name: '../bower_components/almond/almond',
        generateSourceMaps: true,
        optimize: 'uglify2',
        preserveLicenseComments: false
    });
});

gulp.task('build', ['clean', 'concatenate'/*, 'minify'*/], function() {
    gulp.src('index-production.html')
        .pipe(rename("index.html"))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(path.src, ['transpile']);
});

gulp.task('serve', connect.server({
  root: [__dirname],
  port: 8000,
  open: true,
  livereload: false
}));
