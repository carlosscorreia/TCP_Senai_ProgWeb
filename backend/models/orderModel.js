const db = require('../config/db');

const create = async (usuarioId, total, enderecoEntrega, observacao, itens) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      'INSERT INTO pedidos (usuario_id, total, endereco_entrega, observacao) VALUES (?, ?, ?, ?)',
      [usuarioId, total, enderecoEntrega, observacao]
    );

    const pedidoId = result.insertId;

    for (const item of itens) {
      await connection.query(
        'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
        [pedidoId, item.produto_id, item.quantidade, item.preco_unitario]
      );
    }

    await connection.commit();
    return pedidoId;

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getByUsuario = (usuarioId) => {
  return db.query(
    'SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY criado_em DESC',
    [usuarioId]
  );
};

const getAll = () => {
  return db.query(
    `SELECT p.*, u.nome as cliente 
     FROM pedidos p 
     JOIN usuarios u ON p.usuario_id = u.id 
     ORDER BY p.criado_em DESC`
  );
};

const getById = (id) => {
  return db.query(
    `SELECT ip.*, pr.nome as produto_nome 
     FROM itens_pedido ip 
     JOIN produtos pr ON ip.produto_id = pr.id 
     WHERE ip.pedido_id = ?`,
    [id]
  );
};

const updateStatus = (id, status) => {
  return db.query('UPDATE pedidos SET status = ? WHERE id = ?', [status, id]);
};

module.exports = { create, getByUsuario, getAll, getById, updateStatus };