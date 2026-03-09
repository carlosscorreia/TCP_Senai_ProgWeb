const db = require('../config/db');

const getAll = () => {
  return db.query('SELECT * FROM produtos WHERE disponivel = 1');
};

const getById = (id) => {
  return db.query('SELECT * FROM produtos WHERE id = ?', [id]);
};

const create = (dados) => {
  const { nome, descricao, preco, preco_promocional, categoria, imagem_url } = dados;
  return db.query(
    'INSERT INTO produtos (nome, descricao, preco, preco_promocional, categoria, imagem_url) VALUES (?, ?, ?, ?, ?, ?)',
    [nome, descricao, preco, preco_promocional, categoria, imagem_url]
  );
};

const update = (id, dados) => {
  const { nome, descricao, preco, preco_promocional, categoria, imagem_url, disponivel } = dados;
  return db.query(
    'UPDATE produtos SET nome=?, descricao=?, preco=?, preco_promocional=?, categoria=?, imagem_url=?, disponivel=? WHERE id=?',
    [nome, descricao, preco, preco_promocional, categoria, imagem_url, disponivel, id]
  );
};

const remove = (id) => {
  return db.query('DELETE FROM produtos WHERE id = ?', [id]);
};

module.exports = { getAll, getById, create, update, remove };