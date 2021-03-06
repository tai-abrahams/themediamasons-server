const express = require('express');

const router = express.Router();

const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  const text = `Forwarded from contact form: \n From: ${req.body.allValues.name}\nCity: ${req.body.allValues.city}\nPhone: ${req.body.allValues.phone}\nCompany: ${req.body.allValues.company}\nMessage: ${req.body.allValues.message}`;

  const transporter = nodemailer.createTransport({
    service: 'icloud',
    auth: {
      user: process.env.TRANS_EMAIL,
      pass: process.env.TRANS_PASS,
    },
  });

  const mailToOptions = {
    from: process.env.TRANS_EMAIL,
    to: 'dee.abrahams08@gmail.com',
    subject: 'Media Masons contact form',
    text,
  };

  transporter.sendMail(mailToOptions, (err, info) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      res.end();
    } else {
      // eslint-disable-next-line no-console
      console.log(info.response);
      res.end();
    }
  });
});

module.exports = router;
