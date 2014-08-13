var gateway = require(__dirname+'/../../');
var queryString = require('qs');
var http = require('superagent');

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
  http
    .post(gateway.config.get('DEPOSITS_CALLBACK_URL'))
    .send(queryString.stringify(rippleTransaction.toJSON()))
    .end(function(error, response) {
      if (error) {
        logger.error('deposit:callback:error', error);
        callback(error, null);
      } else {
        logger.info('deposit:callback:success', response.body);
        callback(null, response.body);
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
      callback(new Error('ripple transaction not found'), null);
    }
  });
}

module.exports = {
  perform: function(args, callback){
    if (typeof callback !== 'function') { callback = function() {}; }
    if (gateway.config.get('DEPOSITS_CALLBACK_URL')) {
      logger.info('deposit:callback:perform', gateway.config.get('DEPOSITS_CALLBACK_URL'), args[0]);
      getRippleTransaction(args[0], function(error, rippleTransaction){
        if (error) {
          callback(error);
        } else {
          postDepositCallback(rippleTransaction, callback);
        }
      });
    } else {
      callback('DEPOSITS_CALLBACK_URL not set', null);
    }
  }
};

