'use strict';
var configInputOutputDone = require('./utils/configInputOutputDone');

describe("umd testing", function(){




  it('should not name umd modules when umd is false', function(done){

    configInputOutputDone({
      umd: false
    }, [
      {
        path: 'myModule.js',
        contents: 'define(["deps/umd"], function(){ return "test"; })'
      }
    ], [
      {
        path: 'deps/umd',
        contents: "(function(){}(typeof define === 'function' && define['amd'] ? define : null))\n\n"
      },
      {
        path: 'myModule',
        contents: 'define("myModule", ["deps/umd"], function(){ return "test"; })\n\n'
      }
    ], done);
  });



  it('should name umd modules when umd is false', function(done){

    configInputOutputDone({
      umd: true
    }, [
      {
        path: 'myModule.js',
        contents: 'define(["deps/umd"], function(){ return "test"; })'
      }
    ], [
      {
        path: 'deps/umd',
        contents: "(function(){}(typeof define === 'function' && define['amd'] ? define.bind(null, \"deps/umd\") : null))\n\n"
      },
      {
        path: 'myModule',
        contents: 'define("myModule", ["deps/umd"], function(){ return "test"; })\n\n'
      }
    ], done);
  });
});