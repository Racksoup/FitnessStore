const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subNewsletter: {
    type: Boolean,
    default: false,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
