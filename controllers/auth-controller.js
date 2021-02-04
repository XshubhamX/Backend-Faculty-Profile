const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");

let otpCheck = require("../shared/otp");

const dummy_data = [
  {
    id: "1",
    email: "shubhambhardwajfdb@gmail.com",
    name: "shubham",
    subjects: "cse101",
    desc: "i am a student in 2nd year",
    password: "Yellow#2001",
  },
];

const signup = (req, res, next) => {
  if (otpCheck.OTP === req.body.otp) {
    let newUser;
    try {
      newUser = {
        id: uuidv4,
        email: req.body.email,
        name: req.body.name,
        subjects: req.body.subjects,
        desc: req.body.desc,
        password: req.body.password,
      };
      dummy_data.push(newUser);
      console.log(newUser);
      res.json({
        ...newUser,
        password: undefined,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  } else {
    const error = new HttpError("Wrong Otp", 500);
    return next(error);
  }
};

const login = (req, res, next) => {
  let user;
  try {
    user = dummy_data.find(
      (x) => x.email === req.body.email && x.password === req.body.password
    );
    if (!user) {
      const error = new HttpError("User Not Found", 500);
      return next(error);
    }
    res.json({
      ...user,
      password: undefined,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const updateUser = (req, res, next) => {
  try {
    const { name, subjects, desc } = req.body;
    user = dummy_data.find((x) => x.id === req.body.id);

    if (!user) {
      const error = new HttpError("Authentication Revoked", 500);
      return next(error);
    }

    user.name = name;
    user.desc = desc;
    user.subjects = subjects;

    res.json({
      message: "update successfull",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = { signup, login, updateUser };
