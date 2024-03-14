const nodemailer = require('nodemailer');

const EmailService = {
  // Função para enviar e-mails de boas-vindas
  async sendWelcomeEmail(userEmail, userName) {
    try {
      // Criar um transporte SMTP reutilizável usando as credenciais do Google
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'seu-email@gmail.com',
          pass: 'sua-senha'
        }
      });

      // Configurar as opções do e-mail
      let mailOptions = {
        from: 'seu-email@gmail.com',
        to: userEmail,
        subject: 'Bem-vindo ao nosso aplicativo!',
        text: `Olá ${userName},\n\nBem-vindo ao nosso aplicativo! Esperamos que você aproveite sua experiência.\n\nAtenciosamente,\nEquipe do Aplicativo`
      };

      // Enviar o e-mail
      await transporter.sendMail(mailOptions);

      console.log('Email de boas-vindas enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o e-mail de boas-vindas:', error);
    }
  },

  // Função para enviar e-mails de redefinição de senha
  async sendPasswordResetEmail(userEmail, resetToken) {
    try {
      // Criar um transporte SMTP reutilizável usando as credenciais do Google
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'seu-email@gmail.com',
          pass: 'sua-senha'
        }
      });

      // Configurar as opções do e-mail
      let mailOptions = {
        from: 'seu-email@gmail.com',
        to: userEmail,
        subject: 'Redefinição de senha',
        text: `Olá,\n\nVocê solicitou a redefinição de senha. Clique no link abaixo para redefinir sua senha:\n\nhttp://localhost:7777/reset-password?token=${resetToken}\n\nSe você não solicitou esta redefinição, ignore este e-mail.\n\nAtenciosamente,\nEquipe do Aplicativo`
      };

      // Enviar o e-mail
      await transporter.sendMail(mailOptions);

      console.log('Email de redefinição de senha enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o e-mail de redefinição de senha:', error);
    }
  }
};

module.exports = EmailService;
