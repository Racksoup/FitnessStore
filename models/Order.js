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
  returnedItems: {
    type: Array,
  },
});

module.exports = Order = mongoose.model('order', OrderSchema);
