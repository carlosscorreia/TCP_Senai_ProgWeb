const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verificarUsuario, verificarAdmin } = require('../middleware/auth');

// Rotas do usuário
router.post('/', verificarUsuario, orderController.create);
router.get('/my', verificarUsuario, orderController.getMeusPedidos);

// Rotas do admin
router.get('/', verificarAdmin, orderController.getAll);
router.get('/:id', verificarAdmin, orderController.getById);
router.put('/:id/status', verificarAdmin, orderController.updateStatus);

module.exports = router;