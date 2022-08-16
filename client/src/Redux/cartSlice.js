import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cart: [],
};

export const selectCart = (state) => state.cart.cart;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    gotCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { gotCart } = cartSlice.actions;

export const getCart = (userID) => async (dispatch) => {
  console.log(userID);
  try {
    const res = await axios.get(`/api/cart/${userID}`);
    console.log(res.data);
    dispatch(gotCart(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default cartSlice.reducer;
