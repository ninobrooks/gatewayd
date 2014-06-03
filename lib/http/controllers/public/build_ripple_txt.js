var gateway = require(__dirname+'/../../../../');
var domain = gateway.config.get('DOMAIN');

module.exports = function(req, res) {
  res.set({ 'Content-Type': 'text/plain' });
  var rippleTxt = "";

  if (gateway.config.get('COLD_WALLET')) {
    rippleTxt += "[accounts]\n"+gateway.config.get('COLD_WALLET')+"\n\n";
  }

  if (gateway.config.get('HOT_WALLET') && gateway.config.get('HOT_WALLET').address) {
    rippleTxt += "[hotwallets]\n"+gateway.config.get('HOT_WALLET').address;
  }

  var currencies = gateway.config.get('CURRENCIES');
  if (currencies) {
    rippleTxt += "\n\n[currencies]\n";
    for (currency in gateway.config.get('CURRENCIES')) {
      rippleTxt += (currency+"\n");
    };
    rippleTxt += "\n";
  }

  if (domain) {
    rippleTxt += ('[domain]\n'+domain+'\n\n');
  }

  res.send(rippleTxt);

}
