var validator = require('validator');
var UInt160 = require('ripple-lib').UInt160;

module.exports = function(config, callback){

  var errors = [];

  if (!config.currencies) {
    errors.push({ field: 'currencies', message: 'please provide currencies' });
  }
  if (!config.ripple_address) {
    errors.push({ field: 'ripple_address', message: 'please provide ripple_address' });
  }
  if (!config.ripple_rest_url) {
    errors.push({ field: 'ripple_rest_url', message: 'please provide ripple_rest_url' });
  }
  if (!config.postgres_url) {
    errors.push({ field: 'postgres_url', message: 'please provide postgres_url' });
  }

  var validPostgresUrl = validator.isURL(config.postgres_url, {
    protocols: ['postgres']
  });

  var validRippleRestUrl = validator.isURL(config.ripple_rest_url);

  if (!validPostgresUrl){
    errors.push({ field: 'invalid_postgres_url', message: 'please provide a valid postgres_url' });
  }

  if (!validRippleRestUrl){
    errors.push({ field: 'invalid_ripple_rest_url', message: 'please provide a valid ripple_rest_url' });
  }

  if (!UInt160.is_valid(config.ripple_address)) {
    errors.push({ field: 'invalid_ripple_address', message: 'please provide a valid ripple_address' });
  }

  if (config.currencies && !validator.isNumeric(config.currencies['SWD'])) {
    errors.push({ field: 'invalid_currency_trust', message: 'please provide a valid currency trust amount' });
  }

  if(errors.length > 0){
    callback(errors, null);
  } else {
    callback(null, config);
  }

}