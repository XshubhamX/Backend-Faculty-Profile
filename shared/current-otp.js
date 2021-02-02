const HttpError = require("../models/http-error");
let otpCheck = require("./otp");

const setOtp = (req, res, next) => {
  otpCheck.OTP = req.body.otp;
  res.json({ message: "otp send" });
};
module.exports = { setOtp };
