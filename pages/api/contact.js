export default function (req, res) {
  require("dotenv").config();

  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    host: "grid3.vmconcepts.be", // hostname
    // secureConnection: false, // TLS requires secureConnection to be false
    secure: true,
    port: 465, // port for secure SMTP
    // tls: {
    // ciphers: "SSLv3",
    // },
    auth: {
      user: "noreply@kelderdeuntjes.be",
      pass: process.env.password,
    },
  });
  const mailData = {
    from: "noreply@kelderdeuntjes.be",
    to: "nick_janssen21@hotmail.com",
    subject: `Message From ${req.body.firstname} ${req.body.lastname}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  res.status(200).json({ sent: "ok" });
}
