var gateway = require(__dirname+'/../../');

function setLastPaymentHash(){
  gateway.api.setLastPaymentHash(function(error, paymentHash){
    if (error) {
      return logger.error(error);
    }
    logger.info('set the last payment hash to', paymentHash);
  });
}

module.exports = setLastPaymentHash;

