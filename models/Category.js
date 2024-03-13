const mongoose = require("mongoose");

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
  image_filename: {
    type: String,
    required: true,
  },
});

module.exports = Category = mongoose.model("category", CategorySchema);
