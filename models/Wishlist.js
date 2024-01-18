const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  wishlist: {
    type: Array,
  },
});

module.exports = Wishlist = mongoose.model('wishlist', WishlistSchema);
