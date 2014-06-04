var validator = require('validator');
var UInt160 = require('ripple-lib').UInt160;

validator.extend('isRippleAddress', function(string){
  return UInt160.is_valid(string);
});

module.exports = validator;
