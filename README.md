
[gulp](http://gulpjs.com/)-file-contents-to-json
================================================

Slurp in some files, output a JSON representation of their contents.

Check out the broccoli equivalent [here](https://github.com/briangonzalez/broccoli-file-contents-to-json).

Installation
------------

```shell
$ npm install gulp-file-contents-to-json
```


How it works
------------

Given a nested directory of files like so,

```
my-files
├── bar.html
├── foo.html
└── my-folder
    └── baz.html
```

**gulp-file-contents-to-json** reads in each file, and outputs a _single JSON file_ representing the _contents_ of each file within the folder. When a directory is encountered, it becomes a nested object within the JSON blob, like so:

```json
{
  "bar.html": "Content of bar.",
  "foo.html": "Contents of foo.",
  "my-folder": {
    "baz.html": "Contents of baz."
  }
}
```

How to Use
----------

For example, to read in the contents of the `my-files` folder and output `dist/contents.json`, simply add the following gulp task inside `gulpfile.js`:

```javascript
var gulp    = require('gulp');
var fc2json = require('gulp-file-contents-to-modules');

gulp.task('default', function() {
  gulp.src('templates/**/*')
      .pipe(fc2json('templates.js'))
      .pipe(gulp.dest('./dist/'));
});
```

Simply run the following and you're done:

```shell
$ gulp
```


License
--------

MIT
