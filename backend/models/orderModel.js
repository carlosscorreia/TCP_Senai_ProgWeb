const db = require('../config/db');

const create = async (usuarioId, total, enderecoEntrega, observacao, itens, modalidade, frete, pagamento, troco) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      'INSERT INTO pedidos (usuario_id, total, endereco_entrega, observacao, modalidade, frete, pagamento, troco) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [usuarioId, total, enderecoEntrega, observacao, modalidade, frete, pagamento, troco]
    );

    const pedidoId = result.insertId;

    for (const item of itens) {
      const nomeProduto = item.nome_produto || item.nome || 'Produto';
      const produtoId = item.produto_id || null;

      await connection.query(
        'INSERT INTO itens_pedido (pedido_id, produto_id, nome_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?, ?)',
        [pedidoId, produtoId, nomeProduto, item.quantidade, item.preco_unitario]
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
    `SELECT ip.*, 
            COALESCE(ip.nome_produto, pr.nome, 'Produto') as produto_nome
     FROM itens_pedido ip
     LEFT JOIN produtos pr ON ip.produto_id = pr.id
     WHERE ip.pedido_id = ?`,
    [id]
  );
};

const updateStatus = (id, status) => {
  return db.query('UPDATE pedidos SET status = ? WHERE id = ?', [status, id]);
};

module.exports = { create, getByUsuario, getAll, getById, updateStatus };