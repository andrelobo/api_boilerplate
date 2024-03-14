const express = require('express');
const router = express.Router();

// Importar o controlador de usuários
const UserController = require('../controllers/UserController');

// Rota para criar um novo usuário
router.post('/users', UserController.createUser);

// Rota para obter detalhes de um usuário pelo ID
router.get('/users/:id', UserController.getUserById);

// Rota para atualizar os detalhes de um usuário pelo ID
router.put('/users/:id', UserController.updateUserById);

// Rota para excluir um usuário pelo ID
router.delete('/users/:id', UserController.deleteUserById);

module.exports = router;
