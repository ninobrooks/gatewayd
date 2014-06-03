var gateway = require(__dirname+'/../../../../');
var fs = require('fs');

module.exports = function(req, res) {
  var filePath = gateway.config.get('WEBAPP_PATH')+'/app.html';
  fs.readFile(filePath, 'utf8', function(err, text){
    res.send(text);
  });
};
