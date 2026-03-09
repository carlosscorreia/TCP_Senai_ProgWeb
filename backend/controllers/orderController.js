const orderModel = require('../models/orderModel');

const create = async (req, res) => {
  try {
    const { total, endereco_entrega, observacao, itens } = req.body;
    const usuarioId = req.usuario.id;

    const pedidoId = await orderModel.create(usuarioId, total, endereco_entrega, observacao, itens);

    res.status(201).json({ mensagem: 'Pedido criado com sucesso!', pedidoId });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar pedido' });
  }
};

const getMeusPedidos = async (req, res) => {
  try {
    const [pedidos] = await orderModel.getByUsuario(req.usuario.id);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar pedidos' });
  }
};

const getAll = async (req, res) => {
  try {
    const [pedidos] = await orderModel.getAll();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar pedidos' });
  }
};

const getById = async (req, res) => {
  try {
    const [itens] = await orderModel.getById(req.params.id);
    res.json(itens);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar itens do pedido' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await orderModel.updateStatus(req.params.id, status);
    res.json({ mensagem: 'Status atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar status' });
  }
};

module.exports = { create, getMeusPedidos, getAll, getById, updateStatus };