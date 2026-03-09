const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verificarAdmin } = require('../middleware/auth');

router.post('/login', adminController.login);
router.get('/dashboard', verificarAdmin, adminController.dashboard);

module.exports = router;