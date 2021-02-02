const express = require("express");
const { signup, login } = require("../controllers/auth-controller");
const { sendConfirmationEmail } = require("../middleware/sendMail");
const { setOtp } = require("../shared/current-otp");

const router = express.Router();

const { check } = require("express-validator");

router.post(
  "/sendotp",
  [
    check("name").not().isEmpty(),
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  sendConfirmationEmail,
  setOtp
);

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
