const Cart = require('../../models/Cart');
const userAuth = require('../../middleware/adminAuth');

const express = require('express');
const router = express.Router();

// Create One Cart
router.post('/', userAuth, async (req, res) => {
  const { id } = req.body;

  const postItem = { id };

  try {
    const cart = new Cart(postItem);
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.log(error.message);
  }
});

// Update One Cart
router.put('/:id', userAuth, async (req, res) => {
  const { id, cart } = req.body;

  const postItem = { id };
  postItem.cart = JSON.parse(cart);

  try {
    const cart = await Cart.findOneAndUpdate({ _id: req.params.id }, postItem);
    res.json(cart);
  } catch (error) {
    console.log(error.message);
  }
});

// Delete One Cart
router.delete('/:id', userAuth, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete({ _id: req.params.id });
    res.json(cart);
  } catch (error) {
    console.log(error.message);
  }
});

// Get One Cart
router.get('/:id', userAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ _id: req.params.id });
    res.json(cart);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
