var fs = require('fs');
var optimize = require('../index.js');
var assert = require('assert');
var loadFile = require('./utils/loadFile');

describe("files with windows slashes", function(done){
  
  var cwd = __dirname;
  var base = cwd + '/slashes';
  var output = ['dep', 'multiple'];
  
  before(function(done){
    var optimizer = optimize({
      baseUrl: base
    });

    optimizer.on('dependency', function(dependency){
      done('it should not fetch dependencies' + dependency.path);
    });

    loadFile({path: base + '/dir/file.js', name: 'dir\\file'}, base, cwd, function(file){
      file.path = file.path.replace(/\//g, '\\');//force windows backwards path separator
      optimizer.addFile(file);
      
      loadFile({path: base + '/dir/dep.js', name: 'dir\\dep'}, base, cwd, function(file){
        file.path = file.path.replace(/\//g, '\\');//force windows backwards path separator
        optimizer.addFile(file);
        optimizer.done(function(optimized){
          output = optimized;

          done();
        });
      });
    });
  });
  
  it("should have 2 items", function(){
    assert.equal(output.length, 2);
  });

  it("should have the dep first", function(){
    assert.equal(output[0].name, 'dir/dep');
  });

  it("should have the correct name in the output", function(){
    assert.equal(output[0].content, fs.readFileSync(base+'/dir/namedDep.js', 'utf8'));
  });

  it("should have the multiple last", function(){
    assert.equal(output[1].name, 'dir/file');
  });

  it("should have the multiple last", function(){
    assert.equal(output[1].content, fs.readFileSync(base+'/dir/namedFile.js', 'utf8'));
  });
});