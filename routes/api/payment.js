const userAuth = require('../../middleware/userAuth');

const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_KEY);

// Stripe payment intent
router.post('/create-payment-intent', userAuth, async (req, res) => {
  const { paymentMethodType, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999,
      currency: currency,
      payment_method_types: [paymentMethodType],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({ error: { message: e.message } });
  }
});

module.exports = router;
