const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  merchant: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    requuired: true,
  },
  image_filenames: {
    type: Array,
    required: true,
  },
  details: {
    type: Array,
    required: true,
  },
  tech_details: {
    type: Array,
    required: true,
  },
  about: {
    type: Array,
    required: true,
  },
  highlight: {
    type: Boolean,
    required: true,
  },
});

module.exports = Product = mongoose.model('product', ProductSchema);
