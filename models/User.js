// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'users', // Specify table name if different
  timestamps: false,  // Set to true if you want createdAt/updatedAt
});

module.exports = User;
