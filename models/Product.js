const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    requuired: true,
  },
  image_filename: {
    type: String,
    required: true,
  },
  details: {
    type: Object,
  },
});

module.exports = Product = mongoose.model('product', ProductSchema);
