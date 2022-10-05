const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  pseudo: { type: String, required: true },
  message: { type: String, trim: true, maxlength: 500 },
  picture: { type: String },
  likers: { type: [String] },
});

module.exports = mongoose.model("post", postSchema);
