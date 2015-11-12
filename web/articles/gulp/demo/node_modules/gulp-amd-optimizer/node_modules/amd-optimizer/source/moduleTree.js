var toposort = require('toposort');

module.exports = function(){
  
  var modules = Object.create(null);
  
  return {    
    defineModule: function(name, source, dependencies, file){
      modules[name] = {
        name: name,
        source: name in modules ? modules[name].source.concat([source]) : [source],
        dependencies: dependencies,
        file: file
      };
    },
    
    has: function(name){
      return name in modules;
    },
    
    isMissing: function(name){
      return !this.has(name);
    },
    
    leafToRoot: function(){
      var edges = [];
      var nodes = [];
      
      for(var name in modules){
        if(modules[name].dependencies.length > 0){
          edges = edges.concat(modules[name].dependencies.map(function(dep){
            return [name, dep];
          }));
        }
        nodes.push(name);
      }
      
      return toposort.array(nodes, edges)
      .reverse()
      .filter(function(name){
        return name in modules;
      }).map(function(name){
        return modules[name];
      });
    }
  };
  
};