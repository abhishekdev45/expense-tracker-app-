const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isPremiumUser: Sequelize.BOOLEAN ,
    totalExpense: {
        type: Sequelize.INTEGER,
        defaultValue: 0 
    }
});

module.exports = User;