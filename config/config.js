var nconf = require('nconf');

nconf
  .file({ file: __dirname+'/config.json' })
  .env();

nconf.defaults({
  'RIPPLE_REST_API': 'http://localhost:5990/',
  'RIPPLE_REST_PATH': null,
  'RUN_RIPPLE_REST': false,
  'DATABASE_URL': 'postgres://postgres:password@localhost:5432/ripple_gateway',
  'RIPPLE_DATAMODEL_ADAPTER': 'ripple-gateway-data-sequelize',
  'SSL': true,
  'SSL_KEY_PATH': __dirname+'/../env/certs/server.key',
  'SSL_CERTIFICATE_PATH': __dirname+'/../env/certs/server.crt',
  'HTTP_SERVER': true, // Serve http/json api
  'BASIC_AUTH': true, // Require admin key for http api
  'KEY': false, // Required for BASIC_AUTH
  'USER_AUTH': true, // Enable user routes with name/password basic auth
  'WEBAPP': true,
  'WEBAPP_PATH': __dirname+"/../node_modules/ripple-gateway-webapp-example/",
  'PORT': 5000, // Port of http api server
  'HOST': 'localhost',
  'DOMAIN': 'example.com', // Domain of gateway, for ripple.txt and auth
  'HOT_WALLET': { address: false, secret: false }, // Required
  'COLD_WALLET': null, // Required
  'CURRENCIES': null, // Required
  'WITHDRAWAL_FEE': 0.01, // Required - default 1%
  'DEPOSIT_FEE': 0.01, // Required - default 1%
  'WITHDRAWALS_CALLBACK_URL': null, // URL to POST callback of withdrawals
  'WITHDRAWALS_CALLBACK_CERTIFICATE': null, // Used to validate SSL on callbacks
  'DEPOSITS_CALLBACK_URL': null, // URL to POST callback of withdrawals
  'DEPOSITS_CALLBACK_CERTIFICATE': null, // Used to validate SSL on callbacks
  'SETUP_COMPLETE': false,
  'PROGRESS': 0
});

module.exports = nconf;
