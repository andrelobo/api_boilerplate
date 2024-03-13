// Importação de módulos necessários
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const userRoutes = require('./routes/userRoutes');
//const emailService = require('./services/emailService');

// Configuração do servidor Express
const app = express();
const PORT = process.env.PORT || 7777; // Usando a variável de ambiente PORT ou 7777 como padrão

// Configuração do middleware
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
   
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
    console.log('Conexão com o MongoDB estabelecida com sucesso');
});

// Rotas de Usuários
//app.use('/api/users', userRoutes);

// Rota para solicitar redefinição de senha
/* app.post('/api/reset-password', async (req, res) => {
    try {
        const { email } = req.body;
        // Aqui você pode adicionar lógica para gerar um token de redefinição de senha e enviar um e-mail com um link seguro para a página de redefinição de senha
        // Envio de e-mail de redefinição de senha
        await emailService.sendPasswordResetEmail(email);
        res.status(200).json({ message: 'E-mail de redefinição de senha enviado com sucesso' });
    } catch (error) {
        console.error('Erro ao enviar e-mail de redefinição de senha:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação' });
    }
}); */

// Ponto de entrada para o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
