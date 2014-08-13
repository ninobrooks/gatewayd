var gateway = require(__dirname+'/../');
var http = require('superagent');
var queryString = require('qs');
var QueueWorker = require('sql-mq-worker');

var worker = new QueueWorker({
  Class: gateway.data.models.externalTransactions,
  predicate: { where: {
    status: 'queued',
    deposit: false
  }},
  job: function(withdrawal, callback) {
    logger.info('withdrawals:queued:popped', withdrawal.toJSON());
    http
      .post(gateway.config.get('WITHDRAWALS_CALLBACK_URL'))
      .send(queryString.stringify(withdrawal.toJSON()))
      .end(function(error, response) {
        if (error || response.statusCode != 200) {
          logger.error('withdrawal:callback:error', withdrawal.toJSON());
          callback();
        } else {
          withdrawal.status = 'notified';
          withdrawal.save().complete(function() {
            logger.info('withdrawal:notified', withdrawal.toJSON());
            callback();
          });
        }
      });
  }
});

worker.start();

