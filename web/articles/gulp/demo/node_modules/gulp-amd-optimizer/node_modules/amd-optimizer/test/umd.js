var fs = require('fs');
var optimize = require('../index.js');
var assert = require('assert');
var loadFile = require('./utils/loadFile');
var _ = require('lodash');

describe("Naming umd modules", function(){
  
  var cwd = __dirname;
  var base = cwd + '/umd/modules';
  var output = ['umd1', 'umd2', 'umd3', 'umd4'];
  
  before(function(done){
    var optimizer = optimize({
      baseUrl: base
    }, {
      umd: true
    });

    optimizer.on('dependency', function(dependency){
      loadFile(dependency, base, cwd, optimizer.addFile.bind(optimizer));
    });
    
    Promise.all(output.map(function(name){
      return {
        name: name,
        path: base+'/'+name+'.js',
        base: base,
        cwd: cwd
      };
    }).map(load))
    .then(function(files){
      files.map(function(file){
        optimizer.addFile(file);
      });
      optimizer.done(function(optimized){
        output = optimized;
      
        done();
      });
    }).catch(function(err){
      done(err);
    });
  });
  
  it("should have 4 items", function(){
    assert.equal(output.length, 4);
  });

  output.forEach(function(name){
    it(name + " should have a named module", function(){
      assert.equal(_.where(output, {name:name})[0].content, fs.readFileSync(cwd + '/umd/namedModules/' + name + '.js').toString('utf8'));
    });
  });
});


function load(file){
  return new Promise(function(resolve, reject){
    loadFile(file, file.base, file.cwd, function(file){
      resolve(file);
    });
  });
}