var ripple = require(__dirname+'/../ripple/');
var config = require(__dirname+'/../../config/config.js');

function issueCurrency(options, fn) {
  var opts = {
    to_account: config.get('HOT_WALLET').address,
    from_account: config.get('COLD_WALLET'),
    amount: options.amount,
    currency: options.currency,
    issuer: config.get('COLD_WALLET'),
    secret: options.secret,
    destination_tag: options.destination_tag
  }

  ripple.sendCurrency(opts, fn);
}


module.exports = issueCurrency;
