var gateway = require(__dirname+'/../../../../');

module.exports = function (req, res){
  configurationParameters = req.body.config || {};
  gateway.api.setupWizard(configurationParameters, function(err, resp){
    if (err) {
      res.send(400, { errors: err});
    } else {
      res.send(200);
    }
  });
};
