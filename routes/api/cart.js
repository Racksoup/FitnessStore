const Cart = require('../../models/Cart');
const userAuth = require('../../middleware/userAuth');

const express = require('express');
const router = express.Router();

// Create One Cart
router.post('/', userAuth, async (req, res) => {
  const { userID } = req.body;

  const postItem = { userID };

  try {
    const cart = new Cart(postItem);
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.log(error.message);
  }
});

// Update One Cart
router.put('/:userID', userAuth, async (req, res) => {
  const { userID, cart } = req.body;

  const postItem = { userID };
  postItem.cart = JSON.parse(cart);

  try {
    const cart = await Cart.findOneAndUpdate({ _id: req.params.userID }, postItem);
    res.json(cart);
  } catch (error) {
    console.log(error.message);
  }
});

// Delete One Cart
router.delete('/:userID', userAuth, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete({ _id: req.params.userID });
    res.json(cart);
  } catch (error) {
    console.log(error.message);
  }
});

// Get One Cart
router.get('/:userID', userAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ _id: req.params.userID });
    res.json(cart);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
