const pug = require('pug');
const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Jiawen Zhang <${process.env.EMAIL_FROM}>`;
  };

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      console.log('production');

      return nodemailer.createTransport({
        host: process.env.BREVO_HOST,
        port: process.env.BREVO_PORT,
        auth: {
          user: process.env.BREVO_LOGIN,
          pass: process.env.BREVO_PASSWORD,
        },
      });
    };

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  };

  async send(template, subject) {
    // render the HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/email/${template}.pug`,
      { firstName: this.firstName, url: this.url, subject }
    );

    // define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject, html,
      text: htmlToText.convert(html),
    };

    // create a transport and email
    await this.newTransport().sendMail(mailOptions);
  };

  async sendWelcome() {
    await this.send('Welcome', 'Welcome to the Natours family!');
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Your password reset token (valid for 10 minutes)');
  }
  
}