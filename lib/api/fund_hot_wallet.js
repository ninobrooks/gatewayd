var ripple = require(__dirname+'/../ripple/');
var config = require(__dirname+'/../../config/config.js');

function issueCurrency(amount, currency, secret, fn) {
  var opts = {
    to_account: config.get('HOT_WALLET').address,
    from_account: config.get('COLD_WALLET'),
    amount: amount,
    currency: currency,
    issuer: config.get('COLD_WALLET'),
    secret: secret
  }

  ripple.sendCurrency(opts, fn);
}


module.exports = issueCurrency;
