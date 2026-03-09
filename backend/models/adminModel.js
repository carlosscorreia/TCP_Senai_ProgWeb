const db = require('../config/db');

const findByEmail = (email) => {
  return db.query('SELECT * FROM administradores WHERE email = ?', [email]);
};

module.exports = { findByEmail };