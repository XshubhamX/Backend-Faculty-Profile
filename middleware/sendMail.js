const nodemailer = require("nodemailer");

const otp = require("otp-generator");

const sendMail = (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shubhambhardwajfdb@gmail.com",
      pass: "Rupali#0987",
    },
  });

  var mailOptions = {
    from: "shubhambhardwajfdb@gmail.com",
    to: req.body.email,
    subject: "Confirmation Mail using Otp",
    text: otp.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    }),
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  next();
};

module.exports = { sendMail };
