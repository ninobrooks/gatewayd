var GatewayProcessManager = require(__dirname+'/../process_manager.js');
var config = require(__dirname+'/../../config/config.js');
/**
 * @function startGateway
 * @requires GatewayProcessManager
 * @description Starts gateway processes.
 * @param opts
 */

function startGateway(opts) {
  processManager = new GatewayProcessManager();
  if(config.get('SETUP_COMPLETE')){
    processManager.start(opts);
  } else {
    console.log('Open up your browser and go to https://localhost:5000');
    processManager.start({ processes: ['server'] });
  }

}

module.exports = startGateway;

