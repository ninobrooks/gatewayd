var gateway = require(__dirname+'/../');
var request = require('request');
var queryString = require('qs');

function getQueuedWithdrawal(fn){
  gateway.data.models.externalTransactions.find({
    where: {
      status: 'queued',
      deposit: false
    }
  }).complete(function(err, withdrawal){
    if (err){
      fn(err, null);
    } else {
      if (withdrawal){
        fn(null, withdrawal);
      } else {
        fn(null,null);
      }
    }
  });
}

function loop() {
  getQueuedWithdrawal(function(err, withdrawal){
    if (err || !withdrawal) {
      return setTimeout(loop, 500);
    }

    var url = gateway.config.get('WITHDRAWALS_CALLBACK_URL');
    postWithdrawalCallback(withdrawal, url, function(err){
      if (err) {
        setTimeout(loop, 500);
      } else {
        withdrawal.status = 'notified';
        withdrawal.save().complete(function(){
          logger.info('withdrawal:notified', withdrawal.toJSON());
          setTimeout(loop, 500);
        });
      }
    });

  });
}

function postWithdrawalCallback(withdrawal, url, fn) {
  request({
    method: 'POST',
    uri: url+'?'+queryString.stringify(withdrawal.toJSON())
  }, function(err, resp, body){
    if (err) {
      logger.error('withdrawal:failed', err);
    } else {
      logger.info('withdrawal:cleared', body, resp.statusCode);
    }
    fn(err, body);
  });
}

loop();
