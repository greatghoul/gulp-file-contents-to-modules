'use strict';

var through2 = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');


var PLUGIN_NAME = 'gulp-file-contents-to-modules';

module.exports = function (dest) {

  var output = '';
  var first = null;
  var guid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0,v=c==='x'?r:r&0x3|0x8;return v.toString(16);
  });

  //
  // Setup the stream to be returned.
  // through2.obj(fn) is a convenience wrapper around
  // through2({ objectMode: true }, fn)
  //
  return through2.obj(function (file, enc, callback) {

    //
    // Always error if file is a stream or null.
    //
    if ( file.isNull() ) {
      return callback();
    }
    else if ( file.isStream() ) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported.'));
      return callback();
    }

    try {

      first = first || file;
      var id = file.path.replace(file.base, '').split('\\').join('__');   // 'foo/bar/bax.txt' => 'foo:bar:baz.txt'
	  // now I added the below line which removed the DOT extension
	  id = 'export var ' + id.split('.').slice(0, -1).join('.'); 
      var contents = file.contents.toString("utf-8");
	  
	  output += id + ' = ' + JSON.stringify(contents, null, 1) + ';\n'
		
      //
      // Create file which will "host" the templates' exports.
      //
      var out = new gutil.File({
        base: first.base,
        cwd: first.cwd,
        path: path.join(file.base, dest),
		contents: new Buffer(output)
      });

      this.push(out);
      callback();
    } catch (e) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Error:', e));
      callback(e);
    }

  });

};
