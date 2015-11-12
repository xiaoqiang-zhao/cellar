var fs = require('fs');
var url = require('url');
var path = require('path');
var File = require('vinyl');

module.exports = function loadFileFromFakeNet(dependency, base, cwd, done){
  var urlStr = dependency.path;
  var parsedUrl = url.parse(urlStr);
  var filePath = path.join(cwd, parsedUrl.pathname);
  fs.readFile(filePath, function(err, contents){
    if(err) console.log(err);

    var file = new File({
      path: filePath,
      cwd: cwd,
      base: base,
      contents: contents
    });
    file.name = dependency.name;
    done(file);
  });
}
