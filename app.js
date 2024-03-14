// Importação de módulos necessários
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

// Configuração do servidor Express
const app = express();
const PORT = process.env.PORT || 7777; 

// Configuração do middleware
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso');
}).catch((err) => {
    console.error('Erro de conexão com o MongoDB:', err);
});

app.get('/', (req, res) => {
    if (!res) {
        throw new Error('Resposta não pode ser nula');
    }
    res.send('Bem-vindo ao nosso aplicativo!');
});

//Rotas de Usuários
app.use('/api/users', userRoutes);

// Rota para solicitar redefinição de senha
app.post('/api/reset-password', async (req, res) => {
    if (!req || !req.body || !req.body.email) {
        throw new Error('Requisição inválida');
    }
    const { email } = req.body;
    try {
        // Aqui você pode adicionar lógica para gerar um token de redefinição de senha e enviar um e-mail com um link seguro para a página de redefinição de senha
        // Envio de e-mail de redefinição de senha
        // await emailService.sendPasswordResetEmail(email);
        res.status(200).json({ message: 'E-mail de redefinição de senha enviado com sucesso' });
    } catch (error) {
        console.error('Erro ao enviar e-mail de redefinição de senha:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação' });
    }
});


console.log('Iniciando o servidor...');

// Ponto de entrada para o servidor
app.listen(PORT, () => {
    if (!app) {
        throw new Error('Aplicativo não pode ser nulo');
    }
    console.log(`Servidor rodando na porta ${PORT}`);
});

