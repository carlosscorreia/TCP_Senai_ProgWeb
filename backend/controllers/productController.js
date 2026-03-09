const productModel = require('../models/productModel');

const getAll = async (req, res) => {
  try {
    const [produtos] = await productModel.getAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
};

const getById = async (req, res) => {
  try {
    const [produtos] = await productModel.getById(req.params.id);
    if (produtos.length === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json(produtos[0]);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar produto' });
  }
};

const create = async (req, res) => {
  try {
    await productModel.create(req.body);
    res.status(201).json({ mensagem: 'Produto criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar produto' });
  }
};

const update = async (req, res) => {
  try {
    await productModel.update(req.params.id, req.body);
    res.json({ mensagem: 'Produto atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar produto' });
  }
};

const remove = async (req, res) => {
  try {
    await productModel.remove(req.params.id);
    res.json({ mensagem: 'Produto removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover produto' });
  }
};

module.exports = { getAll, getById, create, update, remove };