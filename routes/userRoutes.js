const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Rota para criar um novo usuário


router.post('/', (req, res) => {
    console.log('Rota POST /users chamada');
    UserController.createUser(req, res);
});

// Rota para obter detalhes de um usuário pelo ID
router.get('/:id', UserController.getUserById);

// Rota para listar todos os usuários
router.get('/', UserController.getAllUsers);


// Rota para atualizar os detalhes de um usuário pelo ID
router.put('/:id', UserController.updateUserById);

// Rota para excluir um usuário pelo ID
router.delete('/:id', (req, res, next) => {
  if (!req || !req.params || !req.params.id) {
    return next(new Error('Bad request'));
  }
  UserController.deleteUserById(req, res, next);
});

module.exports = router;

