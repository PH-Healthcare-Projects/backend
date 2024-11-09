/* const mysql = require('mysql2/promise');
require('dotenv').config();

module.exports.DATABASE = mysql.createPool({
    "host": process.env.DB_HOST,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT
}); */


// database.js
const { Sequelize } = require('sequelize');

// Replace these with your actual database configuration details
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql' // or 'postgres', 'sqlite', etc., based on your database
});

module.exports = sequelize;

