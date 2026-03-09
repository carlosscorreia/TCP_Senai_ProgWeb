const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

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

module.exports = { login };