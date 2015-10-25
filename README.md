
[gulp](http://gulpjs.com/)-file-contents-to-modules
================================================

Input some files, output ES6 exports of their contents.
Very helpful when working with HTML template files, so each of them could be imported using ES6 syntax.

I recommend using [rollup](https://github.com/rollup) for ES6 modules bundling.

Installation
------------

```shell
$ npm install gulp-file-contents-to-modules
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

**gulp-file-contents-to-modules** reads in each file, and outputs a _single JSON file_ representing the _contents_ of each file within the folder. When a directory is encountered, it becomes a nested object within the JSON blob, like so:

```javascript
export var bar = "This is bar.";
export var foo = "This is foo.\r\n";
export var my-folder__baz = "This is baz.\r\n";
```

How to Use
----------

For example, to read in the contents of the `my-files` folder and output `dist/contents.js`, simply add the following gulp task inside `gulpfile.js`:

```javascript
var gulp    = require('gulp');
var fc2modules = require('gulp-file-contents-to-modules');

gulp.task('default', function() {
  gulp.src('templates/**/*')
      .pipe(fc2modules('templates.js'))
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
