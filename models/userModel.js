
const mongoose = require('mongoose');

// Definir o esquema do usuário
const userSchema = new mongoose.Schema({
  // Definir os campos do usuário
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Outros campos do usuário, se necessário
}, { timestamps: true }); // Adicionar timestamps automaticamente

// Criar o modelo de usuário a partir do esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
