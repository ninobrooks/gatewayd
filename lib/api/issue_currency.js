var ripple = require(__dirname+'/../ripple');
var config = require(__dirname+'/../../config/config.js');
/**
* @requires ripple
* Issue Currency from Cold Wallet to Hot Wallet
* - the cold wallet's secret must be provided
*
* @param {string} opts.currency
* @param {decimal} opts.amount
* @param {string} opts.secret
* @param {string} opts.destination_tag
* @param {function(err, deposit)} callback
* @returns [Withdrawals]
*/

function issueCurrency(opts, fn) {
  var opts = {
    to_account: config.get('HOT_WALLET').address,
    from_account: config.get('COLD_WALLET'),
    amount: opts.amount,
    currency: opts.currency,
    issuer: config.get('COLD_WALLET'),
    secret: opts.secret,
    destination_tag: opts.destination_tag
  }

  ripple.sendCurrency(opts, fn);
}

module.exports = issueCurrency;

