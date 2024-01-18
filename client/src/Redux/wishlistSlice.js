import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  wishlist: [],
};

export const selectWishlist = (state) => state.wishlist.wishlist;

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    gotWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    updatedWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    deletedWishlistItem: (state, action) => {
      state.wishlist.wishlist = state.wishlist.wishlist.filter((x) => x._id !== action.payload);
    },
  },
});

export const { gotWishlist, updatedWishlist, deletedWishlistItem } = wishlistSlice.actions;

export const getWishlist = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/wishlist/${userID}`);
    dispatch(gotWishlist(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateWishlist = (wishlistID, product, quantity) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ wishlistID, product, quantity });

  try {
    const res = await axios.put(`/api/wishlist/${wishlistID}`, body, config);
    dispatch(updatedWishlist(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteWishlistItem = (wishlistID, productID) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ wishlistID, productID });

  try {
    const res = await axios.put(`/api/wishlist/delete/${wishlistID}`, body, config);
    dispatch(deletedWishlistItem(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default wishlistSlice.reducer;
