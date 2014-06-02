GENERAL REQUIREMENTS
- sends payments to Ripple REST upon writing to a SQL table
- verifies outbound payments using Ripple REST notifications
- standard error messages for HTTP calls
- ability to map one deposit to n outgoing ripple transactions
- ability to map one incoming ripple transaction to n withdrawals
- record external_transaction_id of deposit in n ripple transactions
- record ripple_transaction_id of ripple_transaction in n withdrawals
- query to return n outgoing ripple transactions given a deposit
- query to return n withdrawals given incoming ripple transaction
- ripple_transaction records should have an incoming boolean
- notify via email when the hot wallet is low of any currency
- require notification email to be provided

BOUNCING INVALID PAYMENTS
- swap source address for destination address
- swap source tag for destination tag
- set destination amount as amount recieved, not amount they sent
- set partial payment flag on transaction so they pay the fee


COLD WALLET
- sets email flag of cold wallet
- sets domain flag of cold wallet
- sets tfDisallowXRP flag for cold wallet
- sets tfRequireDestTag flag for cold wallet

HOT WALLET
- sets tfDisallowXRP flag for hot wallet
- sets tfRequireAuth flag for hot wallet before extending trust lines
- set trust lines from hot wallet to cold wallet based on currencies
** only trust after setting tfRequireAuth 

CALLBACKS
- POST callback when a withdrawal is marked as queued
- POST callback upon notification of outbound ripple transaction

OUTBOUND RIPPLE TRANSACTIONS
- successes should be marked as sent
- tem failures should be marked as failed
- tel failures should be marked as failed
- tef failures should be marked as failed
- tej failures should be marked as failed
- ter failures should be retried

INBOUND RIPPLE TRANSACTIONS
- tec failures should be marked as failed
- tes success should marked as succeeded

NOTIFICATIONS
- poll ripple rest for outbound payment notitifications of tes transactions
- tec failures should be marked as failed
- tec failures should should record the transaction hash
- tec failures should mark the ripple_status with tec error code
- tes successes should be marked as incoming
- tes successes should record the transaction hash
- tes successes should mark the ripple_status with tesSUCCESS code
- bounce payments to invalid destination tags
- bounce xrp payments made to cold wallet
- bounce xrp payments made to hot wallet

DEPOSITS STATE MODEL
- queued
- processed

WITHDRAWALS STATE MODEL
- queued
- notified
- processed

RIPPLE TRANSACTIONS OUTGOING STATE MODEL
- outgoing
- sent
- failed
- succeeded
 
RIPPLE TRANSACTIONS INCOMING STATE MODEL
- incoming
- failed
- bounced
- succeeded

