const express = require('express');
const app = express();
const nodemailer = require("nodemailer");

require('dotenv').config();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const mailOptions = (from, text) => ({
  from,
  to: process.env.EMAIL,
  subject: 'Contact Form Portfolio - Message',
  text
});

app.post('/contact', function (req, res) {
  const { email, message } = req.body;
  const mailOption = mailOptions(email, message);
  transporter.sendMail(mailOption, (err, data) => {
    if (err) {
      return res.send({ status: 'error', error: err });
    }
    return res.send({ status: 'success' });
  });
});

if (!module.parent) {
  app.listen(process.env.PORT, () => console.log(`Example app listening at http://localhost:${ process.env.PORT }`));
}