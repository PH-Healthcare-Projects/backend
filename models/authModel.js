const mysqlPromise = require('../config/database');
const bcrypt = require('bcrypt');

const authModel = {
  findByUsername: async (username) => {
    const connection = await mysqlPromise.DATABASE.getConnection();
    try {
      const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
      return rows.length ? rows[0] : null;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      connection.release();
    }
  },  
  comparePassword: async (enteredPassword, storedPasswordHash) => {
    return bcrypt.compare(enteredPassword, storedPasswordHash);
  },
  registerUser: async (username, hashedPassword, email) => {
    const connection = await mysqlPromise.DATABASE.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO users (username, password,email) VALUES (?, ?, ?)', [username, hashedPassword, email]
      );
      return result.insertId; // Return the ID of the newly inserted user
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      connection.release();
    }
  },
  hashPassword: async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  },
}

module.exports = authModel;