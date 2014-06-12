var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {
  var processes = req.body.processes;
  try {
    gateway.api.startGateway({ processes: processes });
    res.send({ processes: processes });
  } catch (err){
    res.send(500, {error: err});
  }
};

