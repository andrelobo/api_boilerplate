const nodemailer = require('nodemailer');
require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env

const EmailService = {
  async sendWelcomeEmail(userEmail, userName) {
    try {
      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      let mailOptions = {
        from: process.env.SMTP_USER,
        to: userEmail,
        subject: 'Bem-vindo ao nosso aplicativo!',
        text: `Olá ${userName},\n\nBem-vindo ao nosso aplicativo! Esperamos que você aproveite sua experiência.\n\nAtenciosamente,\nEquipe do Aplicativo`
      };

      await transporter.sendMail(mailOptions);

      console.log('Email de boas-vindas enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o e-mail de boas-vindas:', error);
    }
  },

  async sendPasswordResetEmail(userEmail, resetToken) {
    try {
      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      let mailOptions = {
        from: process.env.SMTP_USER,
        to: userEmail,
        subject: 'Redefinição de senha',
        text: `Olá,\n\nVocê solicitou a redefinição de senha. Clique no link abaixo para redefinir sua senha:\n\nhttp://localhost:7777/reset-password?token=${resetToken}\n\nSe você não solicitou esta redefinição, ignore este e-mail.\n\nAtenciosamente,\nEquipe do Aplicativo`
      };

      await transporter.sendMail(mailOptions);

      console.log('Email de redefinição de senha enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o e-mail de redefinição de senha:', error);
    }
  }
};

module.exports = EmailService;
