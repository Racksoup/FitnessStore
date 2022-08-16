const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
  },
});

module.exports = Cart = mongoose.model('cart', CartSchema);
