'use strict';
var optimize = require('amd-optimizer');
var gutil = require('gulp-util');
var through = require('through');
var fs = require('fs');
var path = require('path');
var slash = require('slash');

var File = gutil.File;
var Buffer = require('buffer').Buffer;
var PluginError = gutil.PluginError;
var baseName = /^(.*?)\.\w+$/;

function loadFile(path, name, done){
  fs.readFile(path, function(err, contents){
    if(err) return done(err);
    var file = new File({
      path: path,
      contents: contents
    });
    file.name = name;
    done(null, file);
  })
}

module.exports = function (config, options) {
  
  if(config == undefined || 'baseUrl' in config == false){
    throw new PluginError('gulp-amd-optimize', 'baseUrl is required in the config');
  }
  
  options = options || {};
  
  var sourceMapSupport = false;
  var cwd;
  
  var optimizer = optimize(config, options);

  optimizer.on('dependency', function(dependency){
    loadFile(dependency.path, dependency.name, function(err, file){
      if(err){
        optimizer.error('Could not load `'+dependency.name+'`\n required by `'+dependency.requiredBy+'`\n from path `'+dependency.path+'`\n because of '+err);
      }else{
        optimizer.addFile(file);
      }
    });
  });
  
  function onData(file) {
    if (file.isNull()) {
      this.push(file);
    }
    
    if(file.sourceMap){
      sourceMapSupport = true;
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-amd-optimize', 'Streaming not supported'));
      return
    }
    
    cwd = file.cwd;
    file.name = baseName.exec(file.relative)[1];
    
    optimizer.addFile(file);
    
  }
  
  function onEnd(){
    optimizer.done(function(output){
      output.forEach(function(module){
        var file = new File({
          path: module.name,
          base: path.join(cwd, config.baseUrl),
          cwd: cwd,
          contents: new Buffer(module.content + '\n\n')
        });

        if(sourceMapSupport){
          module.map.sourcesContent = [module.source];

          file.sourceMap = module.map;
        }
        this.queue(file);
      }.bind(this));
      this.queue(null);
    }.bind(this));
  }
  
  var transformer = through(onData, onEnd);
    
  optimizer.on('error', function(error){
    transformer.emit('error', error);
  });
  
  return transformer;
};