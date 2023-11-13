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
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

module.exports = ForgotPasswordRequest;
