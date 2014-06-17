var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.src("./index-production")
    .pipe(rename("index.html"))
    .pipe(gulp.dest("./dist"));