const express = require("express");
const { signup, login } = require("../controllers/auth-controller");
const { sendMail } = require("../middleware/sendMail");

const router = express.Router();

const { check } = require("express-validator");

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  sendMail,
  signup
);
router.post("/login", login);

module.exports = router;
