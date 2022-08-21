const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extend: false }));

// routes
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/category', require('./routes/api/category'));
app.use('/api/header-images', require('./routes/api/headerImages'));
app.use('/api/sale-images', require('./routes/api/saleImages'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/payment', require('./routes/api/payment'));

// production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
