const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  pseudo: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  admin: { type: Boolean, default: false },
  bio: { type: String },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
