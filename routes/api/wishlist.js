const Wishlist = require('../../models/Wishlist');
const userAuth = require('../../middleware/userAuth');

const express = require('express');
const router = express.Router();

// Create One Wishlist
router.post('/', async (req, res) => {
  const { userID } = req.body;

  const postItem = { userID };

  try {
    const wishlist = new Wishlist(postItem);
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    console.log(error.message);
  }
});

// Update One Wishlist
router.put('/:_id', userAuth, async (req, res) => {
  const { wishlistID, product, quantity } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ _id: wishlistID });
    console.log(wishlist);
    let inArr = false;
    wishlist.wishlist.map((prod) => {
      if (prod._id === product._id) {
        inArr = true;
        prod.quantity = quantity;
      }
    });

    if (!inArr) {
      wishlist.wishlist.push({ ...product, quantity });
    }

    const newWishlist = await Wishlist.findOneAndUpdate({ _id: wishlistID }, wishlist, {
      new: true,
    });

    res.json(newWishlist);
  } catch (error) {
    console.log(error.message);
  }
});

router.put('/delete/:_id', userAuth, async (req, res) => {
  const { wishlistID, productID } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ _id: wishlistID });
    wishlist.wishlist = wishlist.wishlist.filter((prod) => prod._id !== productID);

    const newWishlist = await Wishlist.findOneAndUpdate({ _id: wishlistID }, wishlist);

    res.json(productID);
  } catch (error) {
    console.log(error.message);
  }
});

// Delete One Wishlist
router.delete('/:userID', userAuth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete({ _id: req.params.userID });
    res.json(wishlist);
  } catch (error) {
    console.log(error.message);
  }
});

// Get One Wishlist
router.get('/:userID', userAuth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userID: req.params.userID });
    res.json(wishlist);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
