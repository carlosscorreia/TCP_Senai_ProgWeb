const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
  } else {
    console.log('Banco de dados conectado!');
    connection.release();
  }
});

module.exports = pool.promise();