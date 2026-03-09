const jwt = require('jsonwebtoken');

const verificarUsuario = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};

const verificarAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.tipo !== 'admin') {
      return res.status(403).json({ erro: 'Acesso negado' });
    }
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};

module.exports = { verificarUsuario, verificarAdmin };