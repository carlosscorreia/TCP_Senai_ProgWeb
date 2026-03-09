const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { nome, email, senha, telefone, cep, rua, numero, bairro, cidade, estado } = req.body;

    // Verifica se o e-mail já está cadastrado
    const [existente] = await userModel.findByEmail(email);
    if (existente.length > 0) {
      return res.status(400).json({ erro: 'E-mail já cadastrado' });
    }

    // Criptografa a senha
    const senha_hash = await bcrypt.hash(senha, 10);

    await userModel.create({ nome, email, senha_hash, telefone, cep, rua, numero, bairro, cidade, estado });

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });

  } catch (error) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const [usuarios] = await userModel.findByEmail(email);
    if (usuarios.length === 0) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
    }

    const usuario = usuarios[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: 'usuario' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, nome: usuario.nome });

  } catch (error) {
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};

const getProfile = async (req, res) => {
  try {
    const [usuarios] = await userModel.getById(req.usuario.id);
    res.json(usuarios[0]);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar perfil' });
  }
};

module.exports = { register, login, getProfile };