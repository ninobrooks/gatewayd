var assert = require('assert');
var gatewayd = require(__dirname+'/../../');

describe('Retrieve and set last payment hash', function(){
  
  it('should get last payment hash and set it to the config file', function(done){
    gatewayd.api.setLastPaymentHash(function(error, response){
      assert(!error);
      assert(response);
      assert.strictEqual(response, gatewayd.config.get('LAST_PAYMENT_HASH'));
      done();
    });
  });

});
