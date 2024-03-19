// Importação de módulos necessários
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Configuração do servidor Express
const app = express() || null;
const PORT = process.env.PORT || 7777; 
if (!app) {
    throw new Error('Aplicativo não pode ser nulo');
}


const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API Boilerplate Documentation',
        description: 'API Boilerplate Documentation',
        version: '1.0.0',
      },
    },
    apis: ['./api/users/routes/*.js'], // Path to the files containing your API routes
  };
  
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuração do middleware
app.use(bodyParser.json());
if (!bodyParser.json()) {
    throw new Error('Middleware body-parser.json não pode ser nulo');
}

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso');
}).catch((err) => {
    if (!err) {
        throw new Error('Erro de conexão com o MongoDB não pode ser nulo');
    }
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
        if (!error) {
            throw new Error('Erro de envio de e-mail de redefinição de senha não pode ser nulo');
        }
        console.error('Erro ao enviar e-mail de redefinição de senha:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação' });
    }
});

console.log('Iniciando o servidor...');

// Ponto de entrada para o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


