var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var util = require('util');
var config = require(__dirname+'/../config/config.js');

function GatewayProcessManager() {

  this.processNames = [
    'deposits',
    'outgoing',
    'incoming',
    'withdrawals'
  ];

  if (config.get('HTTP_SERVER')) {
    this.processNames.push('server');
  }

  this.processes = {};

}

GatewayProcessManager.prototype.start = function(opts) {
  if (!opts) { opts = {}; }

  var manager = this;

  var processNames = opts.processes || manager.processNames;
  
  processNames.forEach(function(name) {
    exec('pm2 --cron "0 * * * *" start '+ __dirname+'/../processes/'+name+'.js --name '+name);
  });

  if (config.get('WITHDRAWALS_CALLBACK_URL')) {
    exec('pm2 --cron "0 * * * *" start '+ __dirname+'/../processes/withdrawal_callbacks.js --name callbacks');
  }

  if (config.get('RIPPLE_REST_PATH')) {
    var path = config.get('RIPPLE_REST_PATH');
    exec('pm2 --cron "0 * * * *" start '+path+'/server.js --name ripplerest');
  }

  util.puts('Starting gateway processes and running `pm2 list`...');
  setTimeout(function(){
    var pm2 = spawn('pm2', ['list']);
    pm2.stdout.on('data', function (data) {
      util.puts(data.toString());
    });
  }, 3000);
};

GatewayProcessManager.prototype.stop = function(opts) {
  if (!opts) { opts = {}; }

  var manager = this;

  var processNames = opts.processes || manager.processNames;
  
  processNames.forEach(function(name) {

    exec('pm2 stop '+ __dirname+'/../../processes/'+name+'.js');

  });

  util.puts('Stopping gateway processes and running `pm2 list`...');
  setTimeout(function(){
    var pm2 = spawn('pm2', ['list']);
    pm2.stdout.on('data', function (data) {
      util.puts(data.toString());
    });
  }, 3000);
};

GatewayProcessManager.prototype.restart = function(opts) {
  if (!opts) { opts = {}; }

  var manager = this;

  var processNames = opts.processes || manager.processNames;
  
  processNames.forEach(function(name) {
    
    exec('pm2 restart '+ __dirname+'/../../processes/'+name+'.js');

  });

  util.puts('Restarting gateway processes and running `pm2 list`...');
  setTimeout(function(){
    var pm2 = spawn('pm2', ['list']);
    pm2.stdout.on('data', function (data) {
      util.puts(data.toString());
    });
  }, 3000);
};

GatewayProcessManager.prototype.listProcesses = function(opts, fn) {
  var command;
  if (typeof opts === 'function'){
    fn = opts;
    opts = { json: true };
  }

  if (opts.json){
    command = 'prettylist';
  } else {
    command = 'list';
  }

  var output = '';
  var pm2 = exec('pm2 '+command);

  pm2.stdout.on('data', function (data) {
    output += data;
  });

  pm2.on('close', function () {
    if (opts.json){
      fn(null, output);
    } else {
      fn(null, output);
    }
  });
};

module.exports = GatewayProcessManager;

