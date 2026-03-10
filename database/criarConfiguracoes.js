const mysql = require('mysql2');
require('dotenv').config({ path: '../backend/.env' });

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

conn.query(`
  CREATE TABLE IF NOT EXISTS configuracoes (
    chave VARCHAR(50) PRIMARY KEY,
    valor VARCHAR(255) NOT NULL
  );
`, (err) => {
  if (err) { console.error(err); conn.end(); return; }

  conn.query(`
    INSERT IGNORE INTO configuracoes (chave, valor) VALUES ('loja_aberta', 'true');
  `, (err2) => {
    if (err2) console.error(err2);
    else console.log('Tabela configuracoes criada!');
    conn.end();
  });
});