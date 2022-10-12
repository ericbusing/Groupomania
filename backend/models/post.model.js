const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  pseudo: { type: String, required: true },
  message: { type: String, trim: true, maxlength: 500 },
  picture: { type: String },
  likes: { type: Number, defaut: 0 },
  unlikes: { type: Number, defaut: 0 },
  usersLiked: { type: [String] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("post", postSchema);
