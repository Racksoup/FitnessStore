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
  address: {
    type: Object,
    required: true,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
