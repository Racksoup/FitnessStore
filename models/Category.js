const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  main: {
    type: Boolean,
    required: true,
  },
  mainID: {
    type: String,
  },
});

module.exports = Category = mongoose.model('category', CategorySchema);
