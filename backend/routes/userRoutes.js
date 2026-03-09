const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verificarUsuario } = require('../middleware/auth')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', verificarUsuario, userController.getProfile);


module.exports = router;