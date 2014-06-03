var gateway = require(__dirname+'/../../../../');

module.exports = function (req, res){
  var configurationParameters = req.body.config || {};
  gateway.api.setupWizard(configurationParameters, function(err, resp){
    if (err) {
      res.send(400, { success: false, errors: err});
    } else {
      res.send(200, { success: true, results: resp });
    }
  });
};
