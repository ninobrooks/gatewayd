var validator = require('validator');

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

  if(errors.length > 0){
    callback(errors, null);
  } else {
    callback(null, config);
  }
}