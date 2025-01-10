const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: false,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isTeacher: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
