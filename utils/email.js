const pug = require('pug');
const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

// new Email(user, url).sendWelcome();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Jiawen Zhang <${process.env.EMAIL_FROM}>`;
  };

  createTransport() {
    if (process.env.NODE_ENV === 'production') return 1;

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  };

  send(template, subject) {
    // render the HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`);

    // define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject, html,
      text: options.message,
    };

    // create a transport and email
  };

  sendWelcome() {
    this.send('Welcome', 'Welcome to the Natours family!');
  }
}

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Jiawen Zhang <jiawenz>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
