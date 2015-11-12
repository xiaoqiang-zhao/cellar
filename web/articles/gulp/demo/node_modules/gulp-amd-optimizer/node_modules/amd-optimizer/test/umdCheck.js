var fs = require('fs');
var parse = require('../source/parse');
var locateUmdDefine = require('../source/locateUmdModule')
var nameAnonymousModule = require('../source/nameAnonymousModule');
var print = require('../source/print');
var assert = require('assert');
var loadFile = require('./utils/loadFile');
var _ = require('lodash');

describe("UMD checking", function(){
  
  var cwd = __dirname;
  var base = cwd + '/umd/modules';
  var files = ['umd1', 'umd2', 'umd3', 'umd4'];
  
  files.forEach(function(name){
    it(name + " should have a named module", function(done){
      var fileName = name;
      loadFile({path: base + '/'+fileName+'.js', name: fileName}, base, cwd, function(file){
        
        var ast = parse(file);
        var define = locateUmdDefine(ast.program.body[0]);
        nameAnonymousModule(define, fileName);
        var result = print([ast.program.body[0]], fileName).code;
        assert.equal(result, fs.readFileSync(cwd + '/umd/namedModules/' + fileName + '.js').toString('utf8'));
        done();
      });
    });
  });
});
