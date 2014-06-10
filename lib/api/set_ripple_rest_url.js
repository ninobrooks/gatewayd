var config = require(__dirname+'/../../config/config.js');

/**
* @require Config
* @function setRippleRestApi
* @description Set ripple-rest base URL
*
* @param opts
* @param opts.url ripple-rest base URL
* @params {function} callback
*/

module.exports = function(opts, callback){
  config.set('RIPPLE_REST_API', opts.ripple_rest_url);
  config.save(function(err){
    if (err) {
      callback(err, null);
    } else {
      callback(null, config.get('RIPPLE_REST_API'));
    }
  });
};
