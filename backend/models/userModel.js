const db = require('../config/db');

const findByEmail = (email) => {
  return db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
};

const create = (dados) => {
  const { nome, email, senha_hash, telefone, cep, rua, numero, bairro, cidade, estado } = dados;
  return db.query(
    'INSERT INTO usuarios (nome, email, senha_hash, telefone, cep, rua, numero, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nome, email, senha_hash, telefone, cep, rua, numero, bairro, cidade, estado]
  );
};

const getById = (id) => {
  return db.query('SELECT id, nome, email, telefone, cep, rua, numero, bairro, cidade, estado FROM usuarios WHERE id = ?', [id]);
};

module.exports = { findByEmail, create, getById };