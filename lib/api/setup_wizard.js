var Wizard = require(__dirname+'/../wizard');
var config = require(__dirname+'/../../config/config.js');

module.exports = function(config, callback) {
  var wizard = new Wizard();
  wizard.validateInput(config, function (err, results) {
    if (err) {
      callback(err, null);
    } else {
      wizard.verify(config, function (err, results) {
        if (err) {
          callback(err, null);
        } else {
          wizard.configure(config, function (err, results) {
            if (err) {
              callback(err, null);
            } else {
              callback(null, results);
              // Launch Gateway
            }
          });

        }
      });
    }
  });
};
