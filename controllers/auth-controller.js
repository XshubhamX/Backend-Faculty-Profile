const { v4: uuidv4 } = require("uuid");

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
    res.status(201).json({
      message: "sign up",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const login = (req, res, next) => {
  let user;
  try {
    user = dummy_data.find(
      (x) => x.email === req.body.email && x.password === req.body.password
    );
    if (!user) {
      res.json({ message: "User Not found" });
    }
    res.status(201).json({
      message: "Logged In",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

module.exports = { signup, login };
