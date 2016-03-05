
[gulp](http://gulpjs.com/)-file-contents-to-modules
================================================

Input some files, output ES6 exports of their contents.
Very helpful when working with HTML template files, so each of them could be imported using ES6 syntax.

I recommend using [rollup](https://github.com/rollup) for ES6 modules bundling.

I've written [another plugin](https://github.com/yaireo/gulp-file-contents-to-modules) which only exports templates' string and can also wrap them with a compilation function

## Install

```shell
$ npm install gulp-file-contents-to-modules
```


## Example

Given a nested directory of files like so,

```
my-files
├── bar.html
├── foo.html
└── my-folder
    └── baz.html
```

```javascript
export var bar = "This is bar.";
export var foo = "This is foo.";
export var my-folder__baz = "This is baz.";
```

### when used with the `compiled` setting:

```javascript
export var bar = _.template("This is bar.");
export var foo = _.template("This is foo.");
export var my-folder__baz = _.template("This is baz.");
```

## How to Use

For example, to read in the contents of the `my-files` folder and output `dist/contents.js`, simply add the following gulp task inside `gulpfile.js`:

```javascript
var gulp    = require('gulp');
var fc2modules = require('gulp-file-contents-to-modules');

gulp.task('default', function() {
  gulp.src('templates/**/*')
      .pipe(fc2modules({
            compile : true, // 'true' (use '_.template') or pass any other string to wrap the template string with

            minify  : true, // remove new lines and whitespaces between tags
      })
      .pipe(gulp.dest('./dist/'));
});
```

Simply run the following and you're done:

```shell
$ gulp
```


## License

MIT © Yair Even-Or
