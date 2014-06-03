var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {
  var currencies = [];
  for (currency in gateway.config.get('CURRENCIES')) {
    currencies.push(currency);
  };
  res.send({ currencies: currencies });
};
