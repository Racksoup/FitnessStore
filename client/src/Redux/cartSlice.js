import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cart: [],
  checkout: [],
};

export const selectCart = (state) => state.cart.cart;
export const selectCheckout = (state) => state.cart.checkout;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    gotCart: (state, action) => {
      state.cart = action.payload;
    },
    updatedCart: (state, action) => {
      state.cart = action.payload;
    },
    setCheckout: (state, action) => {
      state.checkout = action.payload;
    },
  },
});

export const { gotCart, updatedCart, setCheckout } = cartSlice.actions;

export const getCart = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cart/${userID}`);
    dispatch(gotCart(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = (cartID, product, quantity) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ cartID, product, quantity });

  try {
    const res = await axios.put(`/api/cart/${cartID}`, body, config);
    dispatch(updatedCart(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default cartSlice.reducer;
