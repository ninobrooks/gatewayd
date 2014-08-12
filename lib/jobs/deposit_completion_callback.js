var gateway = require(__dirname+'/../../');
var queryString = require('qs');
var callbackUrl = gateway.config.get('DEPOSITS_CALLBACK_URL');
var request = require('request');


/**
* @requires Data
* @requires Config
*
* @function depositCompleteCallbackJob
* @description Job to fire up failure or success of
* a ripple transaction in the Ripple ledger, corresponding
* to a given External Transaction deposit record entered
* in the Gateway using the Gateway API record_deposit function.
*
* The job is designed to implement the Resque prototcol interface for
* background worker processes, to enable asynchronous processing of
* queues of jobs in a database-agnostic fashion.
*
* @params {RippleTransaction} rippleTransactionId
* @callback {ResqueCallback}
*
*/

function postDepositCallback(rippleTransaction, callback) {
  var body = rippleTransaction.toJSON();
  var url = callbackUrl + '?' + queryString.stringify(body);
  request({
    method: 'POST',
    form: body,
    uri: url
  }, function(error, resp, body){
    if (error) {
      logger.error('deposit:callback:error', error);
      callback(error, null);
    } else {
      logger.info('deposit:callback:success', body);
      if (resp) { logger.info('CODE', resp.statusCode); }
      logger.info('BODY', body);
      callback(null, body);
    }
  }); 
}

function getRippleTransaction(rippleTransactionId, callback){
  gateway.data.models.rippleTransactions.find({ 
    where: {id: rippleTransactionId }
  }).complete(function(err, rippleTransaction){
    if (err) {
      callback(err, null);
    } else if (rippleTransaction) {
      callback(null, rippleTransaction);
    } else {
      callback('no record found', null);
    }
  });
}

module.exports = {
  perform: function(args, callback){
    if (typeof callback !== 'function') { callback = function() {}; }

    if (callbackUrl) {
      logger.info('WORK DEPOSIT COMPLETION JOB', callbackUrl);
      logger.info(args[0]);
      getRippleTransaction(args[0], function(err, rippleTransaction){
        if (err) {
          callback(err, null);
        } else {
          postDepositCallback(rippleTransaction, callback);
        }
      });
    } else {
      callback('DEPOSITS_CALLBACK_URL not set', null);
    }
  }
};

