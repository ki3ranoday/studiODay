'use strict';
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

exports.submitOrder = functions.https.onRequest((req, res) => {
  console.log(gmailEmail, gmailPassword)
  cors(req, res, () => {
    if (req.method !== 'POST') {
      return;
    }
    
    const mailOptions = {
      from: gmailEmail,
      replyTo: gmailEmail,
      to: gmailEmail,
      subject: `Order for ${req.body.email}`,
      text: req.body.emailText,
      html: req.body.emailHTML
    };

    mailTransport.sendMail(mailOptions, (err, info) => {
      if(err){
        console.log(err)
        return
      }
      console.log(info)
    });

    res.status(200).send({ isEmailSend: true });
  });
});