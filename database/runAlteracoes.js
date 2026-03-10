const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../backend/.env' });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true
});

const sql = fs.readFileSync(path.join(__dirname, 'alteracoes.sql'), 'utf8');

connection.query(sql, (err) => {
  if (err) {
    console.error('Erro:', err);
  } else {
    console.log('Banco atualizado com sucesso!');
  }
  connection.end();
});