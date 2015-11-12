var _ = require('lodash');

module.exports = function(){
  
  var q = [];
  var map = Object.create(null);
  
  return {
    add: function(name, value){
      if(this.has(name)){
        return;
      }
      q.push(name);
      map[name] = value;
    },
    remove: function(name){
      delete map[name];
      return _.pull(q, name);
    },
    isEmpty: function(){
      return q.length == 0;
    },
    has: function(name){
      return _.contains(q, name);
    },
    isMissing: function(name){
      return !this.has(name);
    },
    forEach: function(cb){
      q.forEach(function(name){
        cb(map[name]);
      });
    }
  };
  
};