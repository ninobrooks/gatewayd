var gateway = require(__dirname + '/../');
var express = require('express');
var passport = require('passport');
var userCtrl = require(__dirname + '/http/controllers/users');
var publicCtrl = require(__dirname + '/http/controllers/public');
var ApiRouter = require(__dirname+'/http/routers/api_router.js');
var ResourcesRouter = require(__dirname+'/http/routers/resources_router.js');
var passportAuth = require(__dirname + '/http/passport_auth');

process.env.DATABASE_URL = gateway.config.get('DATABASE_URL');

passport.use(passportAuth.adminBasic);
passport.use(passportAuth.userBasic);

app = express();
app.use("/", express.static(gateway.config.get('WEBAPP_PATH')));
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());

var apiRouter =  new ApiRouter({
  passport: passport,
  authName: 'adminBasic'
});

var resourcesRouter =  new ResourcesRouter({
  passport: passport,
  authName: 'adminBasic'
});

apiRouter.bind(app);
resourcesRouter.bind(app);

app.get('/ripple.txt', publicCtrl.rippleTxt);
app.post('/v1/config/wizard', publicCtrl.setupWizard);

if (gateway.config.get('WEBAPP')) {
  app.get('/app', publicCtrl.webapp);
  app.post('/v1/register', publicCtrl.registerUser);
}

if (gateway.config.get('USER_AUTH')) {
  function userAuth() {
    return passport.authenticate('userBasic', {session: false });
  }
  app.post('/v1/users/login', userAuth(), publicCtrl.loginUser);
  app.get('/v1/users/:id', userAuth(), userCtrl.show);
  app.get('/v1/users/:id/external_accounts', userAuth(), userCtrl.externalAccounts);
  app.get('/v1/users/:id/external_transactions', userAuth(), userCtrl.externalTransactions);
  app.get('/v1/users/:id/ripple_addresses', userAuth(), userCtrl.rippleAddresses);
  app.get('/v1/users/:id/ripple_transactions', userAuth(), userCtrl.rippleTransactions);
}

module.exports = app;

