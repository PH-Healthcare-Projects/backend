const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming your sequelize instance is in config/database

const Model1FB = sequelize.define('Model1FB', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  model1_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  icd10: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  feedback: {
    type: DataTypes.STRING,
    allowNull: true
  },
  missing: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}, {
    timestamps: false,  
    tableName: 'model1_feedback' // Specify custom table name here
  });

module.exports = Model1FB;
