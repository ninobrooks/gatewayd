function bind(action, filename){
  module.exports[action] = require(__dirname+'/'+filename);
}

bind('registerUser', 'register_user.js');
bind('rippleTxt', 'build_ripple_txt.js');
bind('currencies', 'currencies.js');
bind('webapp', 'webapp.js');
bind('loginUser', 'login_user.js');
bind('setupWizard', 'setup_wizard.js');
