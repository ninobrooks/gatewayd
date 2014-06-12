var passport = require('passport');
var BasicStrategy = require("passport-http").BasicStrategy;
var utils = require("../lib/utils");
var nconf = require('./nconf.js');

function init(adapter) {

  passport.use(new BasicStrategy(
    function(username, password, done) {
      if (username == 'admin') {
        if (password && (password == nconf.get('KEY'))) {
          return done(null, { admin: true });
        } else {
          return done('Invalid admin key');
        }
      } else {
        adapter.users.read({ name: username }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            if (!utils.verifyPassword(password, user.salt, user.password_hash)) {
              return done(null, false);
            }
            return done(null, user);
          } else {
            return done('invalid credentials');
          }
        })
      }
    }
  ))

  return passport;
}

module.exports = init;
