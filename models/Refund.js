const mongoose = require('mongoose');

const RefundxSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  isRefunded: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  itemsReturned: {
    type: Boolean,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const RefundSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  invoice: {
    type: Object,
    required: true,
  },
  refund: {
    type: RefundxSchema,
    required: true,
  },
});

module.exports = Refund = mongoose.model('refund', RefundSchema);
