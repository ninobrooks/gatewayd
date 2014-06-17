var Wizard = require(__dirname+'/../../lib/wizard.js');
var Client = require('ripple-rest-client');

describe('Wizard setup', function(){
  var wizard;
  before(function(){
    wizard = new Wizard();
  });

  it('should successfully account settings to', function(done){
    var opts = {
      ripple_address: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
      cold_wallet_secret: '<secret>'
    };

    wizard._updateAccountSettings(opts, function(err, response){
      if (err) {
        console.log('_updateAccountSettings err', err);
      } else {
        console.log('_updateAccountSettings success', response);
      }
      done();
    });
  });

  it('should successfully issue currency with amount', function(done){
    var opts = {
      secret: '<secret>',
      amount: 10,
      currency: 'SWG',
      destination_tag: 0
    };

    wizard._issueCurrency(opts, function(err, response){
      if (err) {
        console.log('_issueCurrency err', err);
      } else {
        console.log('_issueCurrency success', response);
      }
      done();
    });

  });

  it('should successfully set trustline b/n cold and hot wallet for currency and amount', function(done){
    this.timeout(10000);
    var opts = {
      currencies: {
        "XAW": 10
      }
    };

    wizard._setTrustLine(opts, function(err, response){
      if (err) {
        console.log('_setTrustLine err', err);
      } else {
        console.log('_setTrustLine success', response);
      }
      done();
    });
  });

  it('should successfully add a single or multiple currencies', function(done){
    this.timeout(30000);
    var opts = {
      secret: '<secret>',
      destination_tag: 0,
      currencies : {
        'SWG': 1,
        'XAW': 1,
        'CAT': 22
      }
    };

    wizard._addCurrency(opts, function(err, response){
      if (err) {
        console.log('_addCurrency err', err);
      } else {
        console.log('_addCurrency success', response);
      }
      done();
    });
  });

  it('should successfully issue a single or multiple currencies', function(done){
    this.timeout(10000);
    var opts = {
      secret: '<secret>',
      amount: 10,
      currency: 'XAW',
      destination_tag: 0,
      currencies : {
        'SWG': 1,
        'XAW': 1
      }
    };

    wizard._issueCurrencies(opts, function(err, response){
      if (err) {
        console.log('_issueCurrency err', err);
      } else {
        console.log('_issueCurrency success', response);
      }
      done();
    });
  });

});
