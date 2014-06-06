var gateway = require(__dirname+'/../..');
var wizard = require(__dirname+'/../wizard');

module.exports = function() {
  
  var setupConfiguration = {
    database_url: gateway.config.get('DATABASE_URL'),
    ripple_rest_url: gateway.config.get('RIPPLE_REST_API'),
    ripple_address: gateway.config.get('COLD_WALLET'),
    currencies: gateway.config.get('CURRENCIES')
  };

  console.log('SETUP', setupConfiguration);

  gateway.api.setupWizard(setupConfiguration, function(err, resp){
    console.log('ERROR', err);
    console.log('RESP', resp);
  });

};

