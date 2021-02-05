const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  desc: { type: "string", required: true },
  subjects: [{ type: "string", required: true }],
});

module.exports = mongoose.model("User", userSchema);
