var fs = require('fs');
var File = require('vinyl');

module.exports = function loadFile(dependency, base, cwd, done){
  fs.readFile(dependency.path, function(err, contents){
    if(err) console.log(err);
    
    var file = new File({
      path: dependency.path,
      cwd: cwd,
      base: base,
      contents: contents
    });
    file.name = dependency.name;
    done(file);
  });
}