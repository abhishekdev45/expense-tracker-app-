const Sequelize = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../utils/database');

const ForgotPasswordRequest = sequelize.define('ForgotPasswordRequest', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  expiresby: Sequelize.DATE
});

module.exports = ForgotPasswordRequest;
