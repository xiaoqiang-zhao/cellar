var parse = require('./source/parse');
var locateModules = require('./source/locateModules');
var findDependencies = require('./source/findDependencies');
var nameAnonymousModule = require('./source/nameAnonymousModule');
var print = require('./source/print');
var moduleTree = require('./source/moduleTree');
var missingModules = require('./source/missingModules');
var path = require('path');
var url = require('url');
var requirejs = require('requirejs');
var EventEmitter = require('events').EventEmitter;
var slash = require('slash');
var _ = require('lodash');

module.exports = function(config, options){
  
  config = config || {};
  options = options || {};
  
  var toExclude = getExclude(config, options);
  
  var context = requirejs(config);
  
  var modules = moduleTree();
  
  var pendingModules = missingModules();
  
  var onDone = null;
  
  return _.extend(new EventEmitter(), {
    addFile: function(file){
      if('contents' in file == false){
        this.emit('error', 'File object must contain content');
        return;
      }
      if('name' in file == false){
        this.emit('error', 'File object must contain property name');
        return;
      }
      if('relative' in file == false){
        this.emit('error', 'File object must contain property relative');
        return;
      }
      
      var filename = slash(file.name);
      if(modules.isMissing(filename)){
        pendingModules.remove(filename);

        locateModules(parse(file), options.umd).map(function(module){

          if(module.isModule){
            var moduleName = nameAnonymousModule(module.defineCall, filename);
            
            var dependencies = findDependencies(module.defineCall).filter(function(name){
              return !excluded(toExclude, name);
            })
            .map(function(name){
              if(hasProtocol(config.baseUrl)){
                return {path: url.resolve(config.baseUrl, context.toUrl(name)) + '.js', name: name, requiredBy: moduleName};
              } else {
                return {path: path.join(config.baseUrl, path.relative(config.baseUrl, context.toUrl(name))) + '.js', name: name, requiredBy: moduleName};
              }
            });
          }else{
            var dependencies = [];
            var moduleName = filename;
          }
          modules.defineModule(moduleName, module.rootAstNode, dependencies.map(function(dep){ return dep.name; }), file);

          return dependencies;

        }).reduce(function(a, b){
          return a.concat(b);
        }, []).forEach(function(dependency){
          if(modules.has(dependency.name) || pendingModules.has(dependency.name)){
            return;
          }
          
          pendingModules.add(dependency.name, dependency);
          if(onDone){
            this.emit('dependency', dependency);
          }
        }, this);
      }
      
      if(pendingModules.isEmpty()){
        onDone && onDone();
      }
    },
    done: function(done){
      if(pendingModules.isEmpty()){
        done(optimize());
      }else{
        pendingModules.forEach(function(module){
          this.emit('dependency', module);
        }.bind(this));
        onDone = function(){
          done(optimize());
        };
      }
    },
    error: function(err){
      this.emit('error', err);
    }
  });
  
  function optimize(){
    return modules.leafToRoot().map(function(module){
      var code = print(module.source, module.name);
      return {
        content: code.code,
        map: code.map,
        name: slash(module.name),
        source: module.file.source
      };
    });
  }

  // match to "http://", "https://", etc...
  function hasProtocol(targetUrl){
    return /^[a-z]+:\/\//.test(targetUrl);
  }
  
};

function excluded(exclude, name){
  var path = name.split('/');
  return exclude.some(function(prefix){
    var prefixPath = prefix.split('/');
    if(prefixPath.length > path.length) return false;
    var startOfPath = _.take(path, prefixPath.length);
    return _.zip(startOfPath, prefixPath).every(function(segment){
      return segment[0] === segment[1];
    });
  });
}

function getExclude(config, options){
  if('exclude' in config && 'exclude' in options){
    return _.uniq(config.exclude.concat(options.exclude))
  }else if('exclude' in config){
    return config.exclude;
  }else if('exclude' in options){
    return options.exclude;
  }else{
    return [];
  }
}