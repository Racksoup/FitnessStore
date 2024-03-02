const adminAuth = require('../../middleware/adminAuth');
const userAuth = require('../../middleware/userAuth');
const Refund = require('../../models/Refund');

const express = require('express');
const router = express.Router();

// Create refund request
router.post('/', userAuth, async (req, res) => {
  try {
    // check if refund created already
    const existingRefund = await Refund.findOne({ orderID: req.body.orderID });

    if (existingRefund) {
      console.log('Refund found:', existingRefund);
      // Handle the case where a refund already exists
    } else {
      const totalAmount = req.body.items.reduce((t, x) => t + x.amount, 0);

      const postItem = {
        userID: req.user.id,
        orderID: req.body.orderID,
        invoice: req.body.invoice,
        refund: {
          amount: totalAmount,
          reason: req.body.reason,
          isRefunded: false,
          date: new Date(), 
          itemsReturned: false,
          items: req.body.items,
        },
      };

      const refund = new Refund(postItem);

      await refund.save();
      res.json(refund);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin Update refund
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const postItem = {
      userID: req.body.id,
      invoice: req.body.invoice,
      refund: {
        amount: req.body.amount,
        reason: req.body.reason,
        isRefunded: req.body.isRefunded,
        date: req.body.date,
        itemsReturned: req.body.itemsReturned,
        items: req.body.items,
      },
    };

    const refund = await Refund.findOneAndUpdate({ _id: req.body.id }, postItem, {
      returnOriginal: false,
    });
    await refund.save();
    res.json(refund);
  } catch (error) {
    console.log(error);
  }
});

// Get all refunds
router.get('/', adminAuth, async (req, res) => {
  try {
    const refunds = await Refund.find();
    res.json(refunds);
  } catch (error) {
    console.log(error);
  }
});

// Get one refund
router.get('/:id', userAuth, async (req, res) => {
  try {
    const refund = await Refund.find({ orderID: req.params.id });
    res.json(refund);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
