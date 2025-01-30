const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    picture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const users = mongoose.model('users', userSchema);
module.exports = users;
