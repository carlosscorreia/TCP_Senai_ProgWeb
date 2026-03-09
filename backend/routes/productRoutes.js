const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verificarAdmin } = require('../middleware/auth');

// Rotas públicas
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

// Rotas protegidas (só admin)
router.post('/', verificarAdmin, productController.create);
router.put('/:id', verificarAdmin, productController.update);
router.delete('/:id', verificarAdmin, productController.remove);

module.exports = router;