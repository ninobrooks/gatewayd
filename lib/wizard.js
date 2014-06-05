var validator = require(__dirname+'/validator');
var db = require(__dirname+'/data/sequelize');
var Client = require('ripple-rest-client');
var config = require(__dirname+'/../config/config');
var api = require('require-all-to-camel')(__dirname+'/api/');

/**
 * @description Wizard class that handles the entire process
 * @class Wizard
 * @constructor
 */
function Wizard () {
  this.errors = [];
  this.setupConfig = {};
}

/**
 * @description Validates each input's data.
 * @function validateInput
 * @param config
 * @param callback
 */
Wizard.prototype.validateInput = function(config, callback) {
  var errors = this.errors;

  if (!config.currencies) {
    errors.push({ field: 'currencies', message: 'please provide currencies' });
  } else {
    var allCurrenciesAreValid = true;

    for (var currency in config.currencies){
      if(!validator.isNumeric(config.currencies[currency])){
        allCurrenciesAreValid = false;
      }
    }

    if (!allCurrenciesAreValid) {
      errors.push({ field: 'currency_limit', message: 'please provide a valid currency limit amount' });
    }
  }

  if (!validator.isRippleAddress(config.ripple_address)) {
    errors.push({ field: 'ripple_address', message: 'please provide a valid ripple_address' });
  }

  if (validator.isURL(config.database_url, { protocols: ['postgres'] })){
    errors.push({ field: 'database_url', message: 'please provide a valid database_url' });
  }

  if (!validator.isURL(config.ripple_rest_url)){
    errors.push({ field: 'ripple_rest_url', message: 'please provide a valid ripple_rest_url' });
  }

  if(errors.length > 0){
    callback(errors, null);
  } else {
    callback(null, config);
  }

};

/**
 * @description This public function verifies required data to setup gatewayd using the wizard.
 * @function verify
 * @param config
 * @param callback
 */

Wizard.prototype.verify = function(config, callback){

  this.client = new Client({
    api: config.ripple_rest_url,
    account: config.ripple_address
  });

  var self = this;
  var setupConfig = this.setupConfig;
  //Empty object to be populated by each sub-routine and passed up on a successful verification.


  self._verifyRippleRestConnection(config.ripple_rest_url, function(err, rippleRestConnected){
    if(err){
      callback(err, null);
    } else {
      // Ripple REST connection status
      setupConfig.ripple_rest = rippleRestConnected;
      self._checkAccountBalance(config.ripple_address, function(err, balance){
        if(err){
          callback(err, null);
        } else {
          // Account balance
          setupConfig.account_balance = balance;
          self._verifyPostgresConnection(function(err, databaseConnection){
            if(err){
              callback(err, null);
            } else {
              // Database conncection status
              setupConfig.database_connected = databaseConnection;
              callback(null, setupConfig);
            }
          });
        }
      });
    }
  });
};

/**
 * @function _verifyPostgresConnection
 * @description Verifies database connection.
 * @param callback
 * @private
 */

Wizard.prototype._verifyPostgresConnection = function(callback) {

  db
    .authenticate()
    .complete(function(err){
      if(err){
        callback({ field: 'database_url', message: 'database is not connected' }, null);
      } else {
        callback(null, true);
      }

    });
};
/**
 * @description Verifies that Ripple REST is up and running.
 * @function _verifyRippleRestConnection
 * @param rippleRestUrl
 * @param callback
 * @private
 */
Wizard.prototype._verifyRippleRestConnection = function(rippleRestUrl, callback){

  this.client.ping(function(err, body){
    if(err || !body.success) {
      callback({ field: 'ripple_rest', message: 'ripple rest is not running' }, null);
    } else {
      callback(null, body.success);
    }
  });
};
/**
 * @description Checks account (cold wallet) balance to verify that there are at least 100 XRPs.
 * @function _checkAccountBalance
 * @param coldWalletAddress
 * @param callback
 * @private
 */

Wizard.prototype._checkAccountBalance = function(coldWalletAddress, callback){

  this.client.getAccountBalance(function(err, balance){
    if(err){
      callback({ field: 'ripple_address', message: 'account balance not available'}, null)
    } else if (Number(balance.balances[0].value) < 100) {
      callback({ field: 'ripple_address', message: 'account balance must be at least 100 XRP'}, null);
    } else {
      callback(null, balance.balances[0]);
    }
  });
};

/**
 * @description This public function handles configuration tasks step by step and bubbles any error that may arise.
 * @function configure
 * @param configProperties
 * @param callback
 */
Wizard.prototype.configure = function (configProperties, callback){
  var self = this;

  self._setColdWallet(configProperties, function(err, config){
    if(err){
      callback(err, null);
    } else {
      self._setHotWallet(function(err, config){
        if(err){
          callback(err, null);
        } else {
          self._fundHotWallet(configProperties, function(err, config){
            if(err){
              callback(err, null);
            } else {
                self._setTrustLine(configProperties, function(err, currency){
                  if(err){
                    callback(err, null);
                  } else {
                    callback(null, currency);
                  }
              });
            }
          });
        }
      });
    }
  });
};

/**
 * @description Sets the specified cold wallet address in the config file.
 * @function _setColdWallet
 * @param config
 * @param callback
 * @private
 */
Wizard.prototype._setColdWallet = function(config, callback){
  api.setColdWallet(config.ripple_address, function(err, address){
    if(err){
      callback(err, null)
    } else {
      callback(null, address);
    }
  });
};

/**
 * @description Generates a new ripple account/secret and sets it to the config file.
 * @function _setHotWallet
 * @param callback
 * @private
 */

Wizard.prototype._setHotWallet = function(callback){
  var self = this;
  api.generateWallet(function(err, wallet){
    if(err){
      callback(err, null);
    } else {
      api.setHotWallet(wallet.address, wallet.secret, function(err, hotWallet){
        if(err){
          callback(err, null)
        } else {
          self.setupConfig.hot_wallet = hotWallet;
          callback(null, self.setupConfig);
        }
      });
    }
  });
};

/**
 * @describe Funds newly create newly set hot wallet
 * @function _fundHotWallet
 * @param configProperties
 * @param secret
 * @param callback
 * @private
 */
Wizard.prototype._fundHotWallet = function (configProperties, callback){
  var self = this;
  api.fundHotWallet(60, 'XRP', configProperties.cold_wallet_secret, function(err, lines){
    if(err){
      callback(err, null);
    } else {
      self.setupConfig.lines = lines;
      callback(null, self.setupConfig);
    }
  });
};

/**
 * @description Sets strust line between the cold wallet and the new let hot waller.
 * @function _setTrustLine
 * @param config
 * @param callback
 * @private
 */
Wizard.prototype._setTrustLine = function(config, callback){
  var self = this;
  
  for (var currency in config.currencies) {
    api.setTrustLine(currency, 1000, function(err, response){
      if(err){
        callback(err, null);
      } else {
        self.setupConfig.transaction = response.transaction;
        callback(null, self.setupConfig);
      }
    });
  }
};

Wizard.prototype._setLastPaymentHash = function(){

};

module.exports = Wizard;
