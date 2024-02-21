import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import userReducer from './userSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';
import headerImagesReducer from './headerImageSlice';
import saleImagesReducer from './saleImageSlice';
import cartReducer from './cartSlice';
import orderSlice from './orderSlice';
import mailSlice from './mailSlice';
import wishlistSlice from './wishlistSlice';
import refundSlice from './refundSlice';
import ticketSlice from './ticketSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    headerImages: headerImagesReducer,
    saleImages: saleImagesReducer,
    cart: cartReducer,
    order: orderSlice,
    mail: mailSlice,
    wishlist: wishlistSlice,
    refund: refundSlice,
    ticket: ticketSlice,
  },
});
