var gateway = require(__dirname+'/../../../../');

module.exports = function (req, res){
  gateway.api.setupWizard(req.body.config, function(err, resp){
    if (err) {
      res.send(400, { errors: err});
    } else {
      res.send(200);
    }
  });
};
