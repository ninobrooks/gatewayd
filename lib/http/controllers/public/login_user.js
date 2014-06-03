var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var adminEmail = 'admin@' + gateway.config.get('DOMAIN');

  if  (name == adminEmail) {

    if (password == gateway.config.get('KEY')) {
      var user = {
        admin: true
      };
      res.send({ user: user });
    } else {
      res.send(401);
    }

  } else {

    gateway.data.users.read({ name: name }, function(err, user) {
      if (err) { res.send(500, { error: err }); return }
      var verified = gateway.data.users.verifyPassword(password, user.salt, user.password_hash);
      if (verified) {
        res.send({ user: user });
      } else {
        res.send(401);
      }
    });
  }
};
