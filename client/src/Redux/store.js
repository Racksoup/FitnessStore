import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import userReducer from './userSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
  },
});
