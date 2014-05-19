var Client = require('ripple-rest-client');
var gateway = require(__dirname+'/../../');

var client;

function Listener () {}

var handleNotification = function (notification){
  if(notification.next_hash != ""){
    return notification.next_hash;
  }
};

var handlePayment = function(payment){
  return payment;
};

var saveLastHash = function(payment){
  var deferred = q.defer();


  gateway.config.set('LAST_PAYMENT_HASH', payment.hash);
  gateway.config.save(function(){
    console.log('saved last payment hash: ', payment.hash);
    deferred.resolve(payment);
  });
};

var handleError = function(err){
  console.log(err);
};

var getPayment = function(hash){
  client.getPayment(hash)
    .then(handlePayment)
    .catch(handleError);
};


Listener.prototype.start = function() {
  var listener = this;
  pollForPayments(this._startHash, pollForPayments);

}

Listener.prototype = {
  listen: function(){
    client.getNotification(gateway.config.get('LAST_PAYMENT_HASH'))
      .then(handleNotification)
      .then(getPayment)
      .then(handlePayment)
      .then(saveLastHash)
      .catch(handleError);
  },
  stop: function(){

  }
};

module.exports = new Listener();