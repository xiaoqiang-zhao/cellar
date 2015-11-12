var assert = require('assert');
var gutil = require('gulp-util');
var amdOptimize = require('../../index');
var path = require('path');
var fs = require('fs');

module.exports = function configInputOutputDone(options, input, output, done){

  var stream = amdOptimize({
    baseUrl: __dirname+'/..'
  }, options);

  stream.on('data', function(file){

    var expected = output.shift();
    assert.equal(file.path, expected.path);
    assert.equal(file.contents.toString(), expected.contents);
  });

  stream.on('end', done);

  stream.on('error', function(error){
    done(error);
  });

  input.forEach(function(file){
    stream.write(new gutil.File({
      path: file.path,
      contents: new Buffer(file.contents)
    }));
  });

  stream.end();
};