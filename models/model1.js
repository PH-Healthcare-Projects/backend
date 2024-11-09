// models/model1.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming your sequelize instance is in config/database

const Model1 = sequelize.define('Model1', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  cc: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  hoi: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  user: {
    type: DataTypes.STRING,
    allowNull: true
  },
  full_response: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}, {
    tableName: 'model1' // Specify custom table name here
  });

module.exports = Model1;
