const express = require('express');

const router = express.Router();


const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  const text = `Forwarded from contact form: \n From: ${req.body.allValues.name}\nCity: ${req.body.allValues.city}\nPhone: ${req.body.allValues.phone}\nCompany: ${req.body.allValues.company}\nMessage: ${req.body.allValues.message}`;

  const transporter = nodemailer.createTransport({
    service: 'icloud',
    auth: {
      user: 'taiwo.abrahams@icloud.com',
      pass: 'wxoa-pkli-wyle-oszw',
    },
  });

  const mailToOptions = {
    from: 'taiwo.abrahams@icloud.com',
    to: 'dee.abrahams08@gmail.com',
    subject: 'Media Masons contact form',
    text,
  };

  // eslint-disable-next-line no-console
  console.log(req.body.allValues);

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
