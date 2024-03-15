const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const EmailService = {
  // Função para enviar e-mails de boas-vindas
  async sendWelcomeEmail(userEmail, userName) {
    if (!userEmail || !userName) {
      throw new Error('userEmail e userName são parâmetros necessários');
    }

    try {
      const msg = {
        to: userEmail,
        from: 'xonga73@gmail.com', // substitua pelo seu e-mail verificado no SendGrid
        subject: 'Bem-vindo ao nosso aplicativo!',
        text: `Olá ${userName},\n\nBem-vindo ao nosso aplicativo! Esperamos que você aproveite sua experiência.\n\nAtenciosamente,\nEquipe do Aplicativo`
      };

      await sgMail.send(msg);
      console.log('Email de boas-vindas enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o e-mail de boas-vindas:', error);
      throw error;
    }
  },

  // Função para enviar e-mails de redefinição de senha
  async sendPasswordResetEmail(userEmail, resetToken) {
    if (!userEmail || !resetToken) {
      throw new Error('userEmail e resetToken são parâmetros necessários');
    }

    try {
      const msg = {
        to: userEmail,
        from: 'xonga73@gmail.com', // substitua pelo seu e-mail verificado no SendGrid
        subject: 'Redefinição de senha',
        text: `Olá,\n\nVocê solicitou a redefinição de senha. Clique no link abaixo para redefinir sua senha:\n\nhttp://localhost:7777/reset-password?token=${resetToken}\n\nSe você não solicitou esta redefinição, ignore este e-mail.\n\nAtenciosamente,\nEquipe do Aplicativo`
      };

      await sgMail.send(msg);
      console.log('Email de redefinição de senha enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o e-mail de redefinição de senha:', error);
      throw error;
    }
  }
};

module.exports = EmailService;

