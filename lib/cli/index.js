
function loadAndBind(name, file) {
  module.exports[name] = require(__dirname+'/'+file);
};

loadAndBind('registerUser', 'register_user.js');
loadAndBind('listUsers', 'list_users.js');
loadAndBind('listUserExternalAccounts', 'list_user_external_accounts.js');
loadAndBind('addExternalAccount', 'add_external_account.js');
loadAndBind('fundHotWallet', 'fund_hot_wallet.js');
loadAndBind('setHotWallet', 'set_hot_wallet.js');
loadAndBind('listQueuedWithdrawals', 'list_queued_withdrawals.js');
loadAndBind('listIncomingPayments', 'list_incoming_payments.js');
loadAndBind('clearWithdrawal', 'clear_withdrawal.js');
loadAndBind('recordDeposit', 'record_deposit.js');
loadAndBind('listQueuedDeposits', 'list_queued_deposits.js');
loadAndBind('listOutgoingPayments', 'list_outgoing_payments.js');
loadAndBind('startGateway', 'start_gateway.js');
loadAndBind('stopGateway', 'stop_gateway.js');
loadAndBind('restartGateway', 'restart_gateway.js');
loadAndBind('setColdWallet', 'set_cold_wallet.js');
loadAndBind('addCurrency', 'add_currency.js');
loadAndBind('setLastPaymentHash', 'set_last_payment_hash.js');
loadAndBind('getLastPaymentHash', 'get_last_payment_hash.js');
loadAndBind('setKey', 'set_key.js');
loadAndBind('getKey', 'get_key.js');
loadAndBind('getTrustLines', 'get_trust_lines.js');
loadAndBind('setTrustLine', 'set_trust.js');
loadAndBind('refundColdWallet', 'refund_cold_wallet.js');
loadAndBind('listCurrencies', 'list_currencies.js');
loadAndBind('listProcesses', 'list_processes.js');
loadAndBind('activateUser', 'activate_user.js');
loadAndBind('deactivateUser', 'deactivate_user.js');
loadAndBind('listFailedPayments', 'list_failed_payments.js');
loadAndBind('retryFailedPayment', 'retry_failed_payment.js');
loadAndBind('listCleared', 'list_cleared.js');
loadAndBind('removeCurrency', 'remove_currency.js');
loadAndBind('setup', 'setup.js');

