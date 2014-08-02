var database = require(__dirname+"/../sequelize.js");
var Sequelize = require("sequelize");

var Policy = database.define('policies', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  external_account_id: {
    type: Sequelize.STRING,
    validate: {
      notNull: true
    }
  },
  ripple_address_id: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },
  name: {
    type: Sequelize.STRING
  },
  fee: {
    type: Sequelize.DECIMAL
  }
});

module.exports = Policy

