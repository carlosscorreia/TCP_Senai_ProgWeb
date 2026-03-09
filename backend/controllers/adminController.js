const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');
const db = require('../config/db');

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const [admins] = await adminModel.findByEmail(email);
    if (admins.length === 0) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
    }

    const admin = admins[0];
    const senhaCorreta = await bcrypt.compare(senha, admin.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
    }

    const token = jwt.sign(
      { id: admin.id, tipo: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, nome: admin.nome });

  } catch (error) {
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};

const dashboard = async (req, res) => {
  try {
    const [pedidosHoje] = await db.query(
      `SELECT COUNT(*) as total FROM pedidos WHERE DATE(criado_em) = CURDATE()`
    );

    const [faturamento] = await db.query(
      `SELECT SUM(total) as total FROM pedidos WHERE DATE(criado_em) = CURDATE()`
    );

    const [totalProdutos] = await db.query(
      `SELECT COUNT(*) as total FROM produtos WHERE disponivel = 1`
    );

    const [vendasPorDia] = await db.query(
      `SELECT DATE(criado_em) as dia, COUNT(*) as pedidos, SUM(total) as faturamento
       FROM pedidos
       GROUP BY DATE(criado_em)
       ORDER BY dia DESC
       LIMIT 7`
    );

    res.json({
      pedidosHoje: pedidosHoje[0].total,
      faturamentoHoje: faturamento[0].total || 0,
      totalProdutos: totalProdutos[0].total,
      vendasPorDia
    });

  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar dados do dashboard' });
  }
};

module.exports = { login, dashboard };