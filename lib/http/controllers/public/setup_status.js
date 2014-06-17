var gateway = require(__dirname+'/../../../../');

module.exports = function (req, res){
  res.send(200, {
    success: true,
    progress: gateway.config.get('PROGRESS'),
    setup_complete: gateway.config.get('SETUP_COMPLETE')
  });
};
