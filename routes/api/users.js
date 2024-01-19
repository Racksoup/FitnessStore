const User = require('../../models/User');
const userAuth = require('../../middleware/userAuth');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const url = require('url');

// Create User
router.post('/', async (req, res) => {
  const { email, password, name } = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const isEmail = emailRegex.test(email);

  if (isEmail) {
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      const address = {
        firstName: '',
        lastName: '',
        country: '',
        address: '',
        appartment: '',
        city: '',
        province: '',
        postalCode: '',
        phone: '',
        email: '',
      };

      user = new User({
        email,
        password,
        name,
        address,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const savedUser = await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.USER_SECRET, { expiresIn: '5h' }, async (err, token) => {
        if (err) throw err;

        res.json({ token, userID: savedUser._id });

        const baseURL = req.protocol + '://' + req.get('host');

        try {
          const cart = await axios.post(`${baseURL}/api/cart`, { userID: savedUser._id });
          console.log('Cart created:', cart.data); // Log the response data
        } catch (cartError) {
          console.error('Error creating cart:', cartError.message);
        }

        try {
          const wishlist = await axios.post(`${baseURL}/api/wishlist`, { userID: savedUser._id });
          console.log('Wishlist created:', wishlist.data); // Log the response data
        } catch (wishlistError) {
          console.error('Error creating wishlist:', wishlistError.message);
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
});

// Get User
router.get('/', userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get User Auth
router.post(
  '/userAuth',
  [
    check('name', 'Please include a Username or Email').exists(),
    check('password', 'Please include a Password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password } = req.body;

    try {
      const regex = new RegExp(['^', name, '$'].join(''), 'i');
      let user = await User.findOne({
        $or: [
          {
            name: name,
          },
          {
            email: regex,
          },
        ],
      });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.USER_SECRET, { expiresIn: '5h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//  Delete User
router.delete('/', userAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

// Update User Address
router.post('/update-address', userAuth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { address: req.body.address } },
      { returnOriginal: false }
    ).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
