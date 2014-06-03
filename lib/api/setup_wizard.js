var validator = require('validator');
var UInt160 = require('ripple-lib').UInt160;

module.exports = function(config, callback){

  var errors = [];

  if (!config.currencies) {`
    errors.push({ field: 'currencies', message: 'please provide currencies' });
  } else {
    var allCurrenciesAreValid = true;

    for (var currency in config.currencies){
      if(!validator.isNumeric(config.currencies[currency])){
        allCurrenciesAreValid = false;
      }
    }

    if (!allCurrenciesAreValid) {
      errors.push({ field: 'currency_limit', message: 'please provide a valid currency limit amount' });
    }
  }

  if (!UInt160.is_valid(config.ripple_address)) {
    errors.push({ field: 'ripple_address', message: 'please provide a valid ripple_address' });
  }

  var validPostgresUrl = validator.isURL(config.database_url, {
    protocols: ['postgres']
  });

  var validRippleRestUrl = validator.isURL(config.ripple_rest_url);

  if (!validPostgresUrl){
    errors.push({ field: 'database_url', message: 'please provide a valid database_url' });
  }

  if (!validRippleRestUrl){
    errors.push({ field: 'ripple_rest_url', message: 'please provide a valid ripple_rest_url' });
  }

  if(errors.length > 0){
    callback(errors, null);
  } else {
    callback(null, config);
  }
}
