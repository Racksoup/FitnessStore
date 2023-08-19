const Order = require('../../models/Order');
const adminAuth = require('../../middleware/adminAuth');

const express = require('express');
const router = express.Router();

router.get('/all', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.log(error.message);
  }
});

router.put('/change-status', adminAuth, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { status: req.body.status } },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
