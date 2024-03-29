const userAuth = require('../../middleware/userAuth');
const User = require('../../models/User');
const Order = require('../../models/Order');

const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Stripe payment intent
// router.post('/create-payment-intent', userAuth, async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: 'cad',
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });
//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (e) {
//     res.status(400).json({ error: { message: e.message } });
//   }
// });

// Stripe payment intent
router.post('/invoice', userAuth, async (req, res) => {
  const { email, name, customer_stripe_id, user_id, priceItems } = req.body;

  try {
    // create new stripe customer if one doesn't exist
    let customer;
    if (customer_stripe_id == false) {
      customer = await stripe.customers.create({
        description: 'Invoicing Customer',
        email,
        name: name,
      });
      const user = await User.findOneAndUpdate(
        { _id: user_id },
        { $set: { customer_stripe_id: customer.id } },
        { new: true, strict: false }
      );
      await user.save();
    } else {
      customer = await stripe.customers.retrieve(customer_stripe_id);
    }

    // create invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      pending_invoice_items_behavior: 'exclude',
      collection_method: 'send_invoice',
      days_until_due: 7,
    });

    // create invoice items
    const invoiceItems = priceItems.map(async (x) => {
      const invoiceItem = await stripe.invoiceItems.create({
        invoice: invoice.id,
        customer: customer.id,
        price: x.stripe_price_id,
        quantity: x.quantity,
      });
      return invoiceItem;
    });
    Promise.all(invoiceItems).then(async () => {
      const finalInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
      const paymentIntent = await stripe.paymentIntents.retrieve(finalInvoice.payment_intent);
      res.json({ clientSecret: paymentIntent.client_secret, intentAmount: paymentIntent.amount });
    });
  } catch (e) {
    res.status(400).json({ error: { message: e.message } });
    console.log(e.message);
  }
});

// get stripe public key
router.get('/config', userAuth, async (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

// stripe webhook
router.post('/webhook', async (req, res) => {
  const payload = req.body;

  switch (payload.type) {
    case 'invoice.paid':
      // save order
      const invoice = payload.data.object;
      const order = new Order({ status: 'new', invoice });
      await order.save();
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${payload.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});

module.exports = router;
