const Ticket = require('../../models/Ticket');
const userAuth = require('../../middleware/userAuth');
const adminAuth = require('../../middleware/adminAuth');

const express = require('express');
const router = express.Router();

router.get('/', userAuth, async (req, res) => {
  try {
    const ticket = await Ticket.find();
    res.json(ticket);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/', userAuth, async (req, res) => {
  const postItem = {};

  try {
    const ticket = new Ticket(postItem);
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    console.log(error.message);
  }
});

router.put('/', adminAuth, async (req, res) => {
  const postItem = {};

  try {
    const ticket = Ticket.res.json(ticket);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
