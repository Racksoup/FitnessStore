const User = require('../../models/User');
const userAuth = require('../../middleware/userAuth');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

//  Desc    Create User
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

      user = new User({
        email,
        password,
        name,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
});

//  Desc    Get User
router.get('/', userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  Desc    Get User Auth
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

module.exports = router;
