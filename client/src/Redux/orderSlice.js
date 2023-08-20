import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orders: null,
};

export const selectOrders = (state) => state.order.orders;

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    gotOrders: (state, action) => {
      state.orders = action.payload;
    },
    changedOrderStatus: (state, action) => {
      state.orders = state.orders.filter((x) => {
        x._id !== action.payload._id;
      });
      state.orders = [...state.orders, action.payload];
    },
  },
});

export const { gotOrders, changedOrderStatus } = orderSlice.actions;

export const getOrders = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/order/all');
    dispatch(gotOrders(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const changeOrderStatus = (id, status) => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const postItem = {
    id,
    status,
  };

  const body = JSON.stringify(postItem);

  try {
    const res = await axios.put('/api/order/change-status', body, config);
    dispatch(changedOrderStatus(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default orderSlice.reducer;