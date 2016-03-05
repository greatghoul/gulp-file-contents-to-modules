var gulp       = require('gulp');
var fc2modules = require('./index');
var concat     = require('gulp-concat');

gulp.task('default', function() {
    gulp.src('my-files/**/*')
         .pipe(fc2modules({
            compile : true,
            minify  : true,
        }))
        .pipe(concat('output.js'))
        .pipe(gulp.dest('./dist/'));
});
