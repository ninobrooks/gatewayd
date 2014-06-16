var ripple = require(__dirname+'/remote.js');
var Amount = require('ripple-lib').Amount;

/**
* Send currency from one account to another
*
* @param {string} to_account
* @param {string} from_account
* @param {string} issuer
* @param {decimal} amount
* @param {string} currency
* @param {string} secret
* @param {function(err, deposit)} callback
* @returns {Payment}
*/

function sendCurrency(opts, fn) {
  var amount = opts.amount;
  var currency = opts.currency;
  var issuer = opts.issuer
  var to_account = opts.to_account;
  var from_account = opts.from_account;
  var secret = opts.secret;
  var destination_tag = opts.destination_tag || 0;
  var human = amount+currency;

  ripple.set_secret(from_account, secret);

  ripple.connect(function(){
    var amount = Amount.from_human(human);
    amount.set_issuer(issuer);

    var transaction = ripple.transaction();
    transaction.destinationTag(destination_tag);
    transaction.payment({
      from: from_account,
      to: to_account,
      amount: amount
    });

    transaction.submit();
    transaction.on('success', function(tx){
      fn(null, tx);
      ripple.disconnect();
    })
    transaction.on('error', function(err) {
      fn(err, null);
      ripple.disconnect();
    });
  });
}

module.exports = sendCurrency;
