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
router.put('/:_id', userAuth, async (req, res) => {
  const { cartID, product, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ _id: cartID });
    let inArr = false;
    cart.cart.map((prod) => {
      if (prod._id === product._id) {
        inArr = true;
        prod.quantity = quantity;
      }
    });

    if (!inArr) {
      cart.cart.push({ ...product, quantity });
    }

    const newCart = await Cart.findOneAndUpdate({ _id: cartID }, cart, { new: true });

    // // finds the cart.
    // // $push and $addToSet will both push. $addToSet only pushes if the object doesn't already exist
    // // if the product exists in the array already &addToSet wont do anything. i'm hoping upsert will update the document
    // // look through cart array, check _id for a match with product._id. spread product
    // //
    // const cart = await Cart.findOneAndUpdate(
    //   { _id: cartID },
    //   {
    //     $addToSet: { cart: { _id: product._id, ...product, quantity } },
    //   },
    //   { upsert: true, new: true }
    // );
    console.log(newCart);
    res.json(newCart);
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
    const cart = await Cart.findOne({ userID: req.params.userID });
    res.json(cart);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
