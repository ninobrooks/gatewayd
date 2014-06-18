var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){

  gateway.api.addCurrency(req.body.currency, req.body.amount, function (err, currencies) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ currencies: currencies });
    }
  });
};
