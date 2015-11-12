var requirejs = require('requirejs');

module.exports = function(moduleName){
  return requirejs.toUrl(moduleName+'.js');
};