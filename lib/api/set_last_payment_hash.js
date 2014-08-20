var config = require(__dirname+'/../../config/config.js');
var async  = require('async');
var RippleRestClient = require('ripple-rest-client');

/**
* @require Config, Async
* @function setLastPaymentHash
* @description In order to poll Ripple REST for new payment notifications to
* the Gateway cold wallet, a starting-point transaction hash
* must be set.
*
* @param opts
* @param opts.hash Last transaction hash of the cold wallet address
* @params {function} callback
*/

function _getPaymentInfo(callback) {
  var rippleRestClient = new RippleRestClient({
    account: config.get('COLD_WALLET')
  });

  rippleRestClient.getAccountPayments(null, function(error, response){
    if (error) {
      callback(new Error(error))
    } else if (response.success){
      callback(null, response.payments);
    } else {
      callback(new Error(response.message));
    }
  });
}

function _setLastPaymentHash(paymentHash, callback) {
  if (!paymentHash) {
    callback(new Error("payment hash not found"));
  } else {
    config.set('LAST_PAYMENT_HASH', paymentHash[0].payment.hash);
    config.save(function(error){
      if (error) {
        callback(new Error(error));
      } else {
        callback(null, config.get('LAST_PAYMENT_HASH'));
      }
    });
  }
}

module.exports = function (callback) {
  async.waterfall([
    function(next){
      _getPaymentInfo(next);
    },
    function(paymentHash, next) {
      _setLastPaymentHash(paymentHash, next);
    }
  ], callback);
};
