const mysqlPromise = require('../config/database');
const bcrypt = require('bcrypt');

const newsModel = {
  newsList: async function(params) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM users ORDER BY id DESC LIMIT ?, ?`, [params.offset, params.limit]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
  },
  newsDetail: async function(id) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM users WHERE id = ?`, [id]);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res[0] : null;
  },
  // Insert a new user (this is the new method)
  insertUser: async function(data) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    let result = null;

    try {
      const [res] = await connection.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [data.name, data.email, data.password]
      );
      connection.release();
      result = res;
    } catch (err) {
      console.error(err);
      connection.release();
      return false;
    }

    return result.insertId ? result.insertId : false;
  }
}

module.exports = newsModel;