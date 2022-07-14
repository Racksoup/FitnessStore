const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  ProductID: {
    type: String,
    required: true,
  },
  Data: {
    type: Array,
    required: true,
  },
});

module.exports = Rating = mongoose.model('rating', RatingSchema);
