var config = require(__dirname+'/../../config/config.js');

/**
* @requires Config
*
* Add a new currency code to the Gateway's ripple.txt file,
* broadcasting to the entire network your intention to accept
* and process the currency code specified.
*
* @param {string} currency The currency code to be supported by the Gateway.
* @returns [{Currencies}]
*/


function addCurrency(currency, amount, fn){
  var currencies = config.get('CURRENCIES') || {};
  if (!(currency in currencies)) {
    currencies[currency] = amount;
  }
  config.set('CURRENCIES', currencies);
  config.save(function(){
    fn(null, currencies);
  });
}

module.exports = addCurrency;

