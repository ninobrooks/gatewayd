var gateway = require(__dirname+'/../../../../');

/*
* @require Api
* @function setLastPaymentHash
* @description HTTP version of setLastPaymentHash api call
* @param {RippleTransactionHash} payment_hash
*
*/

module.exports = function(request, response){
  gateway.api.setLastPaymentHash(function(error){
    if (error) {
      response.send(500, { error: error });
    } else {
      response.send({ 'LAST_PAYMENT_HASH': gateway.config.get('LAST_PAYMENT_HASH') });
    } 
  });
};

