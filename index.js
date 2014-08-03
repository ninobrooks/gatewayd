var requireAll = require('require-all-to-camel');

exports.config = require(__dirname + '/config/config.js');
exports.data   = require(__dirname +'/lib/data/');
exports.api = requireAll(__dirname+'/lib/api/');
exports.errors = requireAll(__dirname+'/lib/errors/');
exports.ripple = require(__dirname +'/lib/ripple/');
exports.validator = require(__dirname+'/lib/validator.js');
exports.server = require(__dirname+'/lib/app.js');

require(__dirname+'/Gatewaydfile')(exports);

