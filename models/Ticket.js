const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
