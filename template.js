var templateReader = function(templatePath) {
  var fs = require('fs');
  var path = require('path');

  var filePath = path.join(__dirname, templatePath);
  return fs.readFileSync(filePath, {encoding: 'utf-8'});
};

module.exports.templateReader = templateReader;
