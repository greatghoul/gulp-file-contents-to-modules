var gulp       = require('gulp');
var fc2modules = require('./index');

gulp.task('default', function() {
  gulp.src('my-files/**/*')
      .pipe(fc2modules('contents.js'))
      .pipe(gulp.dest('./dist/'));
});
