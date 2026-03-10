const mysql = require('mysql2');
require('dotenv').config({ path: '../backend/.env' });

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

conn.query(
  'UPDATE administradores SET senha_hash = ? WHERE email = ?',
  ['$2b$10$PfW1SlDY1GigipJaZjszOegqeXDgOioHbuLHg3Sy45PLqfWx3/WMy', 'admin@lanchonete.com'],
  (err) => {
    if (err) console.error(err);
    else console.log('Senha atualizada!');
    conn.end();
  }
);