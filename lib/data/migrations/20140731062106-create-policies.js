var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('policies', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },   
    external_account_id: {
      type: 'int',
      notNull: true
    },
    ripple_address_id: {
      type: 'int',
      notNull: true
    },
    name: {
      type: 'string'
    },
    fee: {
      type: 'decimal'
    },
    createdAt: { type: 'datetime', notNull: true},
    updatedAt: { type: 'datetime', notNull: true},
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('policies', callback);
  callback();
};
