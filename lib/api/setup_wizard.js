var Wizard = require(__dirname+'/../wizard');

module.exports = function(config, callback){

  var wizard = new Wizard();

  wizard.validateInput(config, function(err, results){
    wizard.verify(config, function(err, results){
      if(err){
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  });

};
