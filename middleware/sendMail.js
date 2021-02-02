const nodemailer = require("nodemailer");
const HttpError = require("../models/http-error");
const sgMail = require("@sendgrid/mail");

const gridKey =
  "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";
sgMail.setApiKey(gridKey);
const otp = require("otp-generator");

const yourOtp = otp.generate(6, {
  alphabets: false,
  digits: true,
  upperCase: false,
  specialChars: false,
});

const sendConfirmationEmail = async (req, res, next) => {
  try {
    await sgMail.send({
      to: req.body.email,
      from: "shubhambhardwajfdb@gmail.com",
      subject: `welcome ${req.body.name}`,
      html: `<h2>Your otp is ${yourOtp}</h2>`,
    });
    req.body.otp = yourOtp;
    next();
  } catch (e) {
    const error = new HttpError("not sent mail", 500);
    return next(error);
  }
};

module.exports = { sendConfirmationEmail };
