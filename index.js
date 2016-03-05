'use strict';

var through2 = require('through2');
var gutil = require('gulp-util');
var path = require('path');

var PLUGIN_NAME = 'gulp-file-contents-to-modules';

module.exports = function (options) {
  options = options || {};

  var first = null;

  function createExport( file ){
      var output = '';
      var name = file.path.replace(file.base, '').replace(/\\/g,'__').replace(/-/g,'_');   // 'foo/bar/baz-meh.txt' => 'foo__bar__baz_meh'

      // now I added the below line which removed the DOT extension
      output += 'export var ' + name.split('.').slice(0, -1).join('.') + ' = ';
      var contents = file.contents.toString("utf-8");

      if( options.minify )
          contents = contents.replace( /\s[\r\n ]+/g, '' ) // remove new lines
                             .replace(/>\s+</g, "><");     // remove whitespaces between tags

      if( options.compile === true )
        output += '_.template(' + JSON.stringify(contents, null, 1) + ');';
      else if( options.compile )
        output += options.compile +'(' + JSON.stringify(contents, null, 1) + ');';
      else
        output += JSON.stringify(contents, null, 1) + ';';

      return output;
  }

  //
  // Setup the stream to be returned.
  // through2.obj(fn) is a convenience wrapper around
  // through2({ objectMode: true }, fn)
  //
  return through2.obj(function( file, enc, callback ){

    //
    // Always error if file is a stream or null.
    //
    if ( file.isNull() ) {
      this.push(file);
      return callback();
    }
    else if ( file.isStream() ) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported.'));
      return callback();
    }

    try {
      first = first || file;

      //
      // Create file which will "host" the templates' exports.
      //
      file.contents = new Buffer( createExport(file) );
      file.path = gutil.replaceExtension(file.path, '.js');

      // var out = new gutil.File({
      //   base: first.base,
      //   cwd: first.cwd,
      //   path: path.join(file.base, options.dest),
      //   contents: new Buffer(output)
      // });
    } catch (err) {
      // this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Error:', err));
      this.emit('error', new PluginError(PLUGIN_NAME, err, {fileName: filePath}));
      callback(e);
    }

    this.push(file);
    callback();

  });

};
