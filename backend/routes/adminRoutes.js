const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verificarAdmin } = require('../middleware/auth');

router.post('/login', adminController.login);
router.get('/dashboard', verificarAdmin, adminController.dashboard);
router.get('/loja-status', adminController.getLojaStatus);
router.put('/loja-status', verificarAdmin, adminController.setLojaStatus);

module.exports = router;