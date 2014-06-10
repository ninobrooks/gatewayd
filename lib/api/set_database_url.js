var config = require(__dirname+'/../../config/config.js');

/**
 * @require Config
 * @function setDatabaseUrl
 * @description Set database URL
 *
 * @param opts
 * @param opts.url database base URL
 * @params {function} callback
 */

module.exports = function(opts, callback){
  config.set('DATABASE_URL', opts.database_url);
  config.save(function(err){
    if (err) {
      callback(err, null);
    } else {
      callback(null, config.get('DATABASE_URL'));
    }
  });
};
