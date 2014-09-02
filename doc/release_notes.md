##09/02/2014

###3.24.2

### Fixed Bugs
- Add empty log files for production, staging, and development
- Enable HTTP_SERVER option to toggle server process

### Added Features:
- Use api key as either user or password in basic auth.

##08/11/2014

###3.24.1

### Fixed Bugs
- Handle error cases when confirming outgoing payment
- Handle uncaught exceptions in process/outgoing.js by logging
- Only callback on queued withdrawals, not queued deposits

###Added Features:
- Update to Express 4, use body-parser library

##08/07/2014

###
3.24.0

###Added Features:
- Gatewaydfile.js for plugins
- Enable Loggly winston transport
- Add Policy database table and model
- No longer require user id for external account

###Fixed Bugs:
- api.stopGateway now stops processes

##07/28/2014

###
3.23.1

###Fixed Bugs:
- Do not log when there are no new notifications
- In WithdrawalProcessor update incomingPayment ripple transaction
  record state to 'succeeded'
- In Listener change log level from 'error' to 'info' and the event
  from 'processed' to 'received'

##07/27/2014

###
3.23.0

###Fixed Bugs:
- Check for source tag before appending
- Remove abbreviations
- Use options object instead of multiple arguments

###Added Features:
- api.enqueueOutgoingPayment and POST /payments/outgoing


##07/16/2014

###
3.22.1

###Fixed bugs:
- Handle ripple rest to rippled connection issues by retrying

###Added Features:
- Capistrano for deployment and setup
- Replace ripple-lib functionality with ripple rest client
- Winston logging
- Add http api integration tests
- Add code climate for code gpa score card
- JS Hint for code linting

##06/30/2014

###
3.22.0

###Fixed bugs:
- Outgoing payments now have logging
- Retry Failed Payment is now tested and properly implemented
- Bad outgoing payments now fail and are not retried
- Properly document fund_hot_wallet cli call parameters

###Added features:
- Robust logger with Winston
- Use ripple-rest-client for many ripple-rest related calls
- Capistrano configuration for deployment
- Use sql-mq-worker module for processing queues
- Add CLI for generate_wallet

##06/24/2014

##Version:
3.21.1

###Fixed bugs:
- On incoming payments record to_address_id not from_address_id
- Fix generate_wallet cli command
- Update fund_hot_wallet CLI command notes

##06/17/2014

##Version:
3.21.0

###Fixed bugs:
- Use 'state' column in list failed payments api call
- Default webapp paths under USER_AUTH

###Added features:
- HTTP / JSON Api Documenation
- List Trust Lines endpoint from account to cold wallet

##06/10/2014

###Version:
3.20.0

###Fixed bugs:
- Validate ripple address in registerUser api call
- correct migration task with gruntfile
- correct installation / setup instructions
- remove redundant list_users http endpoint

###Added features:
- CRUD http routes for external accounts
- HTTP route to create a user
- Add validator with isRippleAddress validation method
- Validate setup wizard parameters with tests

##06/03/2014

###Version: 
3.19.0

###Fixed bugs:
- Fix method name for startGateway http api endpoint
- Handle error for setKey http api endpoint
- Handle error for setRippleRestUrl http api endpoint
- Fix CLI function for setLastPaymentHash

###Added features:
- Add basic jsdoc to core api funtions
- Add setRippleRestUrl core api function
- Test http interface status codes
- Configure Travis.CI for continuous integration testing
- Merge gateway-data-sequelize into project

