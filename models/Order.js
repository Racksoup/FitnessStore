const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  invoice: {
    type: Object,
    required: true,
  },
});

module.exports = Order = mongoose.model('order', OrderSchema);
